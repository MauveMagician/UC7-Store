import Link from "next/link";
import styles from "./suporte.module.css";
import Cabecalho from "@/app/cabecalho";
import Footer from "@/app/footer";
import Suportecard from "@/app/suportecard";

export default function Home() {
  return (
    <>
      <Cabecalho></Cabecalho>
      <div className={styles.pclass}>
        <h2 className={styles.heading}>Bem vindo(a) ao nosso suporte</h2>
      </div>
      <div className={styles.suportecard}>
        <Suportecard
          texto="Conta, endereço, segurança e privacidade"
          imagem="/padlock-lock-svgrepo-com.svg"
        ></Suportecard>
        <Suportecard
          texto="Uma entrega, pedido ou devolução"
          imagem="/chest-svgrepo-com.svg"
        ></Suportecard>
        <Suportecard
          texto="Pagamentos e segurança"
          imagem="/coin-svgrepo-com.svg"
        ></Suportecard>
        <Suportecard
          texto="Algo a mais"
          imagem="/hook-svgrepo-com.svg"
        ></Suportecard>
      </div>

      <Footer></Footer>
    </>
  );
}
