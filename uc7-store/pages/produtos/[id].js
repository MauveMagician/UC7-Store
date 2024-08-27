"use client";
import Link from "next/link";
import Cabecalho from "@/app/cabecalho";
import Footer from "@/app/footer";
import { getProductById } from "@/query";
import styles from "../produtos.module.css";
import Image from "next/image";
import { useState } from "react";

export async function getServerSideProps(context) {
  const { id } = context.params;
  let product = null;

  try {
    product = await getProductById(id);
  } catch (error) {
    console.error(error);
  }

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product: JSON.parse(JSON.stringify(product)) }, // Serialize the product object
  };
}

export default function ProductPage({ product }) {
  const [showPrecoDesconto, setPrecoDesconto] = useState(
    product.price - product.price * product.discount
  );

  return (
    <>
      <Cabecalho></Cabecalho>
      <div className={styles.container}>
        <div className={styles.image}>
          <Image
            className={styles.img}
            src={product.imagePath}
            alt={product.name}
            width="400"
            height="400"
          ></Image>
        </div>
        <div className={styles.parte1}>
          <p className={styles.titulo}>{product.description}</p>
          {product.discount ? (
            <p className={styles.valor}>R${product.price}</p>
          ) : (
            <></>
          )}
          <p className={styles.value}>
            R$
            <span>{showPrecoDesconto} </span>
          </p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.dev}>Devolução Grátis</p>
        </div>
        <div className={styles.parte2}>
          <h3 className={styles.stock}>Vendidos:{product.sale}</h3>
          <h3 className={styles.stock}>Em estoque:{product.stock}</h3>
          <h3 className={styles.stock}>Categoria:{product.category}</h3>
          <div className={styles.number}>
            <select className={styles.select}>
              <option>Quantidade: 0</option>
              <option>Quantidade: 1</option>
              <option>Quantidade: 2</option>
              <option>Quantidade: 3</option>
            </select>
            <button className={styles.cart}>Adicionar ao carrinho</button>
            <button className={styles.money}>Comprar agora</button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
