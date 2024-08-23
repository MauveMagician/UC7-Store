"use client";
import Link from "next/link";
import Cabecalho from "@/app/cabecalho";
import Footer from "@/app/footer";
import Banner from "@/app/banner";
import Carta from "@/app/cartaCategoria";
import styles from "./index.module.css";
import Csecao from "@/app/cabecalhoDeSecao";
import CardContainer from "@/app/card-container";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const [showCookieConsent, setShowCookieConsent] = useState(true);

  const handleCookieConsent = (consent) => {
    setShowCookieConsent(false);
    if (consent) {
      // Fazer os cookies lembrarem do consentimento do usuário
      document.cookie =
        "cookieConsent=true; max-age31536000; path=/; SameSite=Strict; Secure";
    } else {
      // Fazer os cookies lembrarem da rejeição do usuário
      document.cookie = "cookieConsent=false; max-age31536000; path=/";
    }
  };

  useEffect(() => {
    // Verifica se o consentimento de cookies já foi implementado
    const consent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookieConsent="));
    if (consent) setShowCookieConsent(false);
    // Verifica se o usuário já está logado
    /*const usernameCookie = document.cookie.split("; ").find(row => row.startWith("username="));
    if (usernameCookie) {
      const loggedInUsername = usernameCookie.split("=")[1];
      setLoggedInUser(loggedInUser);
    }*/
  }, []);

  return (
    <>
      <div className={styles.container}>
        {showCookieConsent && (
          <div className={styles.cookies}>
            <h1 className={styles.h1}>Dados de navegação</h1>
            <p className={styles.p}>
              Nós usamos cookies para melhorar sua experiência. Ao usar nosso
              site, você concorda com nosso uso de cookies.
            </p>

            <div className={styles.botao}>
              <button
                className={styles.aceitar}
                onClick={() => handleCookieConsent(true)}
              >
                Aceitar
              </button>
              <button
                className={styles.recusar}
                onClick={() => handleCookieConsent(false)}
              >
                Recusar
              </button>
            </div>
          </div>
        )}
        <Cabecalho></Cabecalho>
        <Banner></Banner>
        <div className={styles.cartas}>
          <Carta texto="Espadas" imagem="/espada.jpg"></Carta>
          <Carta
            texto="Armaduras para Cavalos"
            imagem="/armaduraparacavalo.jpg"
          ></Carta>
          <Carta texto="Escudos" imagem="/escudo.jpg"></Carta>
          <Carta texto="Machados" imagem="/machados.jpg"></Carta>
        </div>
        <Csecao titulo="Lançamentos"></Csecao>
        <CardContainer data={data}></CardContainer>
        <Footer></Footer>
      </div>
    </>
  );
}
