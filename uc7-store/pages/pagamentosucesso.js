"useclient";
import { useRouter } from "next/navigation";
import styles from "./pagamentosucesso.module.css";

export default function Home() {
  const Router = useRouter();

  // Redireciona para a página principal a cada 3 segundos
  setTimeout(() => {
    Router.push("/");
  }, 3000);
  return (
    <>
      <div className={styles.container}>
        <p className={styles.p}>
          Seu pedido foi enviado, estamos-lhe redirecionando para a página
          inicial
        </p>
        <div className={styles.gato}>
          <img src="/gato.png" alt="Loading" className={styles.gatoimg} />
        </div>
      </div>
    </>
  );
}
