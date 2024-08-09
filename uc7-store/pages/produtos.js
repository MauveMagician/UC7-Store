import styles from "./produtos.module.css";
import Cabecalho from "@/app/cabecalho";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Cabecalho></Cabecalho>
    <div className={styles.container}>
      <div className={styles.menu}>
        <Image src="/espadaromana.jpg" alt="Espada romana" width="400" height="400"></Image>
      </div>
      <div className={styles.descricao}>
        <h1>Espada Romana</h1>
        <h2>Sobre este item</h2>
        <ul>
          <li>Super afiada</li>
          <li>Feita manualmente</li>
          <li>Eficaz contra gladiadores</li>
        </ul>
      </div>
      <div className={styles.pagamento}>
        <p>R$ <span className={styles.valor}>2.691</span></p>
        <p className={styles.dev}>Devolução Grátis</p>
        <h3 className={styles.stock}>Em Estoque</h3>
        <div className={styles.number}>
        <select>
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
    </>
  );
}
