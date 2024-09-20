import styles from "./cardresumocontainer.module.css";
import Cardresumo from "./cardresumo.js";
import { useEffect } from "react";

export default function CardResumoContainer(data) {
  useEffect(() => {
    console.log("cardcarrinhocontainerdata", data);
  }, []);
  return (
    <div className={styles.container}>
      {data.data.map((item, index) => (
        <Cardresumo data={item}></Cardresumo>
      ))}
    </div>
  );
}
