import styles from "./suportecard.module.css";
import Image from "next/image";

export default function Suportecard({ texto, imagem }) {
  return (
    <>
      <p className={styles.pclass}>
        <Image src={imagem} width="50" height="50"></Image>
        {texto}
      </p>
    </>
  );
}
