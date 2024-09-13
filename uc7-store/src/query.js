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

export async function getProductsByCategory(category) {
  await connectToDatabase(); // Ensure database connection
  const products = await Products.find({ category: category });
  if (!products) {
    throw new Error(`Product with category ${category} not found.`);
  }
  return products;
}

export async function SearchProducts(terms) {
  await connectToDatabase(); // Ensure database connection
  const products = await Products.find({
    $or: [
      { name: { $regex: RegExp(terms), $options: "i" } },
      { category: { $regex: RegExp(terms), $options: "i" } },
    ],
  });
  if (!products) {
    throw new Error(`Product with category ${category} not found.`);
  }
  return products;
}
