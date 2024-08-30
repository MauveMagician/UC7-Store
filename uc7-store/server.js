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
      const updatedCart = await addToCart(userId, productId, quantity);
      res.status(200).json({ message: "Product added to cart", cart: updatedCart });
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
