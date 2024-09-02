const express = require("express");
const next = require("next");
const session = require("express-session");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const { MongoClient } = require("mongodb");
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

  // Handle POST request to sign up a new user
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
