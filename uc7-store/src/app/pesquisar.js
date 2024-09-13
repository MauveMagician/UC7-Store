"use client";
import styles from "./pesquisar.module.css";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { RouteMatcher } from "next/dist/server/future/route-matchers/route-matcher";

export default function Pesquisar({ setRenderLogin, setSearchVisible }) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchButtonRef = useRef(null);
  const searchRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    searchRef.current.focus();
  }, []);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setRenderLogin(false);
      setSearchVisible(false);
      router.push(`/buscas/${searchTerm}`);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerfilho}>
          <form className={styles.form}>
            <input
              type="text"
              placeholder="O que você procura?"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
              ref={searchRef}
              className={styles.input}
            />
            <Link href={`/buscas/${searchTerm}`} ref={searchButtonRef}>
              <img className={styles.buttonstyle} src="/map.svg"></img>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
