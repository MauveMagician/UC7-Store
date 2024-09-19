import Link from "next/link";
import styles from "./footer.module.css";
import { useState } from "react";
import Login from "@/app/login";

export default function Footer() {
  const [showConta, setConta] = useState(false);
  const handleConta = () => {
    setConta(!showConta);
  };
  return (
    <>
      {showConta && <Login setConta={setConta} />}
      <div className={styles.containerprincipal}>
        <div className={styles.atendimento}>
          <p className={styles.titulo} id={"footer"}>
            Atendimento
          </p>
          <p className={styles.contatos}>
            <img
              className={styles.svgstyle}
              src="/telephone-receiver-material-svgrepo-com.svg"
            ></img>
            Telephone:
          </p>
          <p className={styles.meiodecontato}>(01) 23456-7890</p>
          <p className={styles.contatos}>
            <img
              className={styles.svgstyle}
              src="/whatsapp-svgrepo-com (1).svg"
            ></img>
            whatsapp :
          </p>
          <p className={styles.meiodecontato}>(01) 23456-7890</p>
          <p className={styles.contatos}>
            <img
              className={styles.svgstyle}
              src="/email-8-svgrepo-com.svg"
            ></img>
            E-mail
          </p>
          <p className={styles.meiodecontato}>cavernadoguerreiro.com.br</p>
          <p className={styles.contatos}>
            <img
              className={styles.svgstyle}
              src="/clock-eight-svgrepo-com.svg"
            ></img>
            Horário de Atendimento
          </p>
          <p className={styles.meiodecontato}>
            De segunda à sexta, das 10:00 às 17:00 horas
          </p>
        </div>
        <div className={styles.institucional}>
          <p className={styles.titulo}>Institucional</p>
          <p className={styles.letranormal}>
            {" "}
            <Link href={"/suporte"} className={styles.link}>
              Fale conosco
            </Link>
          </p>
        </div>
        <div className={styles.minhaconta}>
          <p className={styles.titulo}>Minha Conta </p>
          <p
            className={styles.letranormal}
            onClick={() => handleConta()}
            id={"#cabecalho"}
          >
            Minha Conta
          </p>
          <p className={styles.letranormal}>
            {" "}
            <Link href={"/carrinho"} className={styles.link}>
              Meu carrinho
            </Link>
          </p>
          <p className={styles.letranormal}>
            {" "}
            <Link href={"/mapa"} className={styles.link}>
              Acessar mapa do Site
            </Link>
          </p>
        </div>
        <div className={styles.nossasredes}>
          <p className={styles.titulo}>Nossas Redes</p>
          <img
            className={styles.svgstyle1}
            src="/youtube-svgrepo-com.svg"
          ></img>
          <img
            className={styles.svgstyle1}
            src="/tiktok-icon-white-1-logo-svgrepo-com.svg"
          ></img>
          <img
            className={styles.svgstyle1}
            src="/instagram-svgrepo-com.svg"
          ></img>
          <img
            className={styles.svgstyle1}
            src="/facebook-svgrepo-com.svg"
          ></img>
        </div>
      </div>
    </>
  );
}
