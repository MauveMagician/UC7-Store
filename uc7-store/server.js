const express = require("express");
const next = require("next");
const session = require("express-session");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const { MongoClient, ObjectId } = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017";
const MONGODB_DB = "caverna";

let db;

app.prepare().then(async () => {
  const server = express();
  server.use(express.json());
  //conect MongoDB
  const client = new MongoClient(MONGODB_URI, {});

  // Use express-session middleware
  server.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: !dev, maxAge: 3600000 }, // 1 hour
    })
  );

  server.get("/api/product/:id", async (req, res) => {
    const { id } = req.params;
    const product = await db
      .collection("produtos")
      .findOne({ _id: new ObjectId(String(id)) });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  server.get("/api/ofertas", async (req, res) => {
    const data = await db
      .collection("produtos")
      .find({
        discount: { $gte: 0.25 },
      })
      .toArray();
    res.json(data);
  });
  server.get("/api/lancamentos", async (req, res) => {
    const data = await db
      .collection("produtos")
      .find({
        releaseDate: { $gte: new Date(2024, 7, 26, 19, 30, 54.089) },
      })
      .toArray();
    res.json(data);
  });

  server.get("/api/data/subtotal", async (req, res) => {
    //definir quem é o usuario logado
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    //puxar do banco de dados o carrinho do usuario
    const data = await db.collection("carrinho").findOne({ userId: userId });
    console.log(data.cart);
    //calcular o subtotal do carrinho
    let subtotal = 0;
    for (let item of data.cart) {
      //encontrar o produto no banco de dados para cada item do carrinho
      const product = await db
        .collection("produtos")
        .findOne({ _id: new ObjectId(String(item.productId)) });
      //somar o preco do item multiplicado pelo numero de unidades
      subtotal +=
        (product.price - product.price * product.discount) * item.quantity;
    }
    //respoder ao cliente com o subtotal
    console.log("subtotal", subtotal);
    res.json({ subtotal });
  });
  server.get("/api/sale", async (req, res) => {
    const data = await db
      .collection("produtos")
      .find({
        sale: { $gte: 50 },
      })
      .toArray();
    res.json(data);
  });
  await client.connect();
  db = client.db(MONGODB_DB);
  console.log("Conected Mongodb");

  //example API route
  server.get("/api/data", async (red, res) => {
    const data = await db.collection("produtos").find({}).toArray();
    res.json(data);
  });
  server.get("/api/carrinho", async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const data = await db.collection("carrinho").findOne({ userId: userId });
    console.log(data.cart);
    res.json(data.cart);
  });
  server.post("/api/cart/change/", async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    try {
      // Update the quantity of the specified product in the cart
      const result = await db
        .collection("carrinho")
        .updateOne(
          { userId: userId, "cart.productId": productId },
          { $set: { "cart.$.quantity": quantity } }
        );
      // Check if the product was found in the cart
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Product not found in cart" });
      }
      // Respond to the client with the OK and a success message
      res
        .status(200)
        .json({ message: "Product quantity updated successfully" });
    } catch (error) {
      console.error("Failed to update product quantity in cart", error);
      res
        .status(500)
        .json({ message: "Failed to update product quantity in cart" });
    }
  });

  server.post("/api/cart/remove/", async (req, res) => {
    const { productId } = req.body;
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    try {
      // Remover o produto do carrinho
      const result = await db
        .collection("carrinho")
        .updateOne({ userId: userId }, { $pull: { cart: { productId } } });
      //Responder ao cliente com o OK e uma mensagem de sucesso
      res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
      console.error("Failed to remove product from cart", error);
      res.status(500).json({ message: "Failed to remove product from cart" });
    }
  });

  server.post("/api/signup", async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    const result = await db
      .collection("users")
      .insertOne({ username, password });
    //Criar o carrinho do usuário vazio
    await db
      .collection("carrinho")
      .insertOne({ userId: result.insertedId, cart: [] }); //preencher com o objeto correto
    res.status(200).json({ message: "Sign up successful", data: result });
  });

  // Handle POST request to sign in a user
  server.post("/api/signin", async (req, res) => {
    const { username, password } = req.body;
    console.log("Attempting to sign in user:", username);
    const user = await db.collection("users").findOne({ username, password });
    if (user) {
      req.session.userId = user._id;
      res
        .status(200)
        .json({ message: "Sign in successful", sessionId: req.sessionID });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  });

  server.post("/api/logout", async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to log out" });
      }
      res.status(200).json({ message: "Logout successful" });
    });
  });

  // New API route to add a product to the cart
  server.post("/api/cart/add", async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    try {
      // Adicionar o id do produto ao carrinho do usuário. Precisamos achar o carrinho correto
      const result = await db
        .collection("carrinho")
        .updateOne(
          { userId: userId },
          { $push: { cart: { productId, quantity } } },
          { upsert: true }
        );
      //Responder ao cliente com o OK e uma mensagem de sucesso
      res.status(200).json({ message: "Product added to cart" });
    } catch (error) {
      console.error("Failed to add product to cart", error);
      res.status(500).json({ message: "Failed to add product to cart" });
    }
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`>Ready on http://localhost:${port}`);
  });
});

/* vamos usar isso como base para fazer rotas na API
const CartSchema = new mongoose.Schema({
  owner: mongoose.Schema.Types.ObjectId,
  items: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
    },
  ],
});

const Carts = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export async function getOrCreateCart(userId) {
  await connectToDatabase();
  try {
    const cart = await Carts.findOne({ owner: userId });

    if (!cart) {
      const newCart = await Carts.create({ owner: userId });
      return newCart;
    }
    return cart;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create or get cart for user.");
  }
}

export async function addToCart(userId, productId, quantity) {
  await connectToDatabase();
  try {
    const cart = await getOrCreateCart(userId);
    const product = await getProductById(productId);
    if (!product) {
      throw new Error("Product not found.");
    }
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId.toString()
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
    return cart;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add item to cart.");
  }
}

export async function removeFromCart(userId) {
  await connectToDatabase();
  try {
    const cart = await getOrCreateCart(userId);
    const product = await getProductById(productId);
    if (!product) {
      throw new Error("Products not found.");
    }
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId.toString()
    );
    await cart.save();
    return cart;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to remove item from the cart.");
  }
}

export async function changeQuantityInCart(userId, productId, newQuantity) {
  await connectToDatabase();
  try {
    const cart = await getOrCreateCart(userId);
    const product = await getProductById(productId);
    if (!product) {
      throw new Error("Product not found.");
    }
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId.toString()
    );
    if (!existingItem) {
      throw new Error("Item not found in cart.");
    }
    existingItem.quantity = newQuantity;
    await cart.save();
    return cart;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to change quantity in cart.");
  }
}

export async function getTotalPriceInCart(cart) {
  let totalPrice = 0;
  for (const item of cart.items) {
    const product = getProductById(item.productId);
    totalPrice += product.price * item.quantity;
  }
  return totalPrice;
}

export async function getCartItems(userId) {
  await connectToDatabase();
  try {
    const cart = await getOrCreateCart(userId);
    return cart.items;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get cart items.");
  }
}

*/
