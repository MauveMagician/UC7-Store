import styles from "./card.module.css"

export default function Card(){
    return(
        <div className={styles.container}>
            <div className={styles.cartao}>
                <img src="/Captura de tela 2024-08-07 171904.png" alt="Espada 1"></img>
                <div className={styles.detalhes}>
                <div className={styles.titulo}>Espada Justiceira Thundercats Lion Tamanho Real em Aço</div>
                    <div className={styles.preco}>R$ 1.499,00</div>
                    <div class={styles.precodescontado}>R$ 1.424,05 no pix</div>
                    <div class={styles.parcelamento}>até <span>12x</span> de <span>R$ 124,91</span> sem juros </div>
                    <button>comprar agora</button>
                </div>
            </div>
            <div className={styles.cartao}>
                <span className={styles.desconto}>23%</span>
                <img src="/Captura de tela 2024-08-07 172247.png" alt="Espada 2"></img>
                <div className={styles.detalhes}>
                <div className={styles.titulo}>Espada Katana Dragão Vermelho</div>
                    <div className={styles.preco}>R$ 419,90</div>
                    <div class={styles.precodescontado}>R$ 398,90 no pix</div>
                    <div class={styles.parcelamento}>até <span>12x</span> de <span>R$ 34,99</span> sem juros </div>
                    <button>comprar agora</button>
                </div>
            </div>
            <div className={styles.cartao}>
                <span className={styles.desconto}>23%</span>
                <img src="/184523054a495584a17.webp" alt="Espada 3"></img>
                <div className={styles.detalhes}>
                <div className={styles.titulo}>Espadinha fura cavaleiro</div>
                    <div className={styles.preco}>R$ 1.990,00</div>
                    <div class={styles.precodescontado}>R$ 749,00</div>
                    <div class={styles.parcelamento}>até <span>12x</span> de <span>R$ 62,49</span> sem juros </div>
                    <button>comprar agora</button>
                </div>
            </div>
        <div className={styles.cartao}>
        <span className={styles.desconto}>23%</span>
        <img src="/184523054a495584a17.webp" alt="Espada 3"></img>
        <div className={styles.detalhes}>
        <div className={styles.titulo}>Espadinha fura cavaleiro</div>
            <div className={styles.preco}>R$ 1.990,00</div>
            <div class={styles.precodescontado}>R$ 749,00</div>
            <div class={styles.parcelamento}>até <span>12x</span> de <span>R$ 62,49</span> sem juros </div>
            <button>comprar agora</button>
        </div>
    </div>
    <div className={styles.cartao}>
    <span className={styles.desconto}>23%</span>
    <img src="/184523054a495584a17.webp" alt="Espada 3"></img>
    <div className={styles.detalhes}>
    <div className={styles.titulo}>Espadinha fura cavaleiro</div>
        <div className={styles.preco}>R$ 1.990,00</div>
        <div class={styles.precodescontado}>R$ 749,00</div>
        <div class={styles.parcelamento}>até <span>12x</span> de <span>R$ 62,49</span> sem juros </div>
        <button>comprar agora</button>
    </div>
</div>
<div className={styles.cartao}>
    <span className={styles.desconto}>23%</span>
    <img src="/184523054a495584a17.webp" alt="Espada 3"></img>
    <div className={styles.detalhes}>
    <div className={styles.titulo}>Espadinha fura cavaleiro</div>
        <div className={styles.preco}>R$ 1.990,00</div>
        <div class={styles.precodescontado}>R$ 749,00</div>
        <div class={styles.parcelamento}>até <span>12x</span> de <span>R$ 62,49</span> sem juros </div>
        <button>comprar agora</button>
    </div>
</div>
</div>
    );
}