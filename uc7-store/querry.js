const products = [
  {
    name: "Espada Justiceira Thundercats Lion Tamanho Real em Aço",
    price: 1424.0,
    imagePath: "/Captura de tela 2024-08-07 171904.png",
  },
  {
    name: "Machados de matar deuses de Valhalla",
    price: 990.0,
    imagePath: "machados.jpg",
  },
  {
    name: "Espada romana",
    price: 3500.0,
    imagePath: "espadaromana.jpg",
  },
  {
    name: "Espada Katana Dragão Vermelho",
    price: 398.9,
    imagePath: "/Captura de tela 2024-08-07 172247.png",
  },
  {
    name: "Espadinha fura cavaleiro",
    price: 749.0,
    imagePath: "/184523054a495584a17.webp",
  },
  {
    name: "Espaga grega",
    price: 2932.0,
    imagePath: "/espada.jpg",
  },
];
for (const product of products) {
  db.produtos.insertOne(product);
}
