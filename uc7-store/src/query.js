import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/caverna";

async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
    });
  }
}

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imagePath: String,
  discount: { type: Number, default: 0.0 },
  sale: { type: Number, default: 0.0 },
  releaseDate: { type: Date, default: new Date() },
  description: String,
  stock: { type: Number, default: 0 },
  category: String,
});

const Products =
  mongoose.models.Produto || mongoose.model("Produto", ProductSchema);

export async function getProductById(id) {
  await connectToDatabase(); // Ensure database connection

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid product ID");
    }

    const product = await Products.findById(id);

    if (!product) {
      throw new Error(`Product with id ${id} not found.`);
    }

    return product;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to get product with id ${id}.`);
  }
}

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

export async function getProductsByCategory(category) {
  await connectToDatabase(); // Ensure database connection
  const products = await Products.find({ category: category });
  if (!products) {
    throw new Error(`Product with category ${category} not found.`);
  }
  return products;
}
