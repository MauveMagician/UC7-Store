import { getProductsByCategory } from "@/query";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const products = await getProductsByCategory(id);

    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
