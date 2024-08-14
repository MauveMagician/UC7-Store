import styles from "./card.module.css";

export default function Card({ name, price, imagePath }) {
  return (
    <div className={styles.cartao}>
      <img src={`${imagePath}`} alt="imagem do produto"></img>
      <div className={styles.detalhes}>
        <div className={styles.titulo}>{name}</div>
        <div className={styles.preco}>R$ {price}</div>
        {/*<div className={styles.precodescontado}>R$ 1.424,05 no pix</div>
      <div className={styles.parcelamento}>
        até <span>12x</span> de <span>R$ 124,91</span> sem juros{" "}
      </div>*/}
        <button>comprar agora</button>
      </div>
    </div>
  );
}
