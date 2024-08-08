import "./globals.css";
import styles from './carta.module.css';

export default function Carta({texto, imagem}) {
    return (
        <div className={styles.overlay}>
            <div className={styles.card} style={{backgroundImage:`url('${imagem}')`}}>
                <p>{texto}</p>
            </div>
        </div>
    )
}