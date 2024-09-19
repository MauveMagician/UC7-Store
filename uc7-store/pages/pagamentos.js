import Link from "next/link";
import styles from "./pagamentos.module.css";
import Resumo from "@/app/resumo.js";

export default function Home() {
  return (
    <>
      <div className={styles.planet}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.title}>Complete o seu cadastro</p>
            <p className={styles.asterisco}>
              Os campos marcados com um asterisco são obrigatórios.
            </p>
          </div>
          <div className={styles.info}>
            <p className={styles.campos}>Nome</p>
            <input className={styles.input} type="text" placeholder="Nome*" />
            <p className={styles.campos}>Sobrenome</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Sobrenome*"
            />
            <div className={styles.numero}>
              <div>
                <p className={styles.campos}>CPF</p>
                <input
                  className={styles.input3}
                  type="text"
                  placeholder="CPF*"
                />
              </div>
              <div>
                <p className={styles.campos}>Data de Nascimento</p>
                <input
                  className={styles.input3}
                  type="text"
                  placeholder="Data de Nascimento*"
                />
              </div>
            </div>
            <p className={styles.campos}>Telefone/Celular</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Telefone/Celular*"
            />
            <p className={styles.campos}>E-mail</p>
            <input
              capture="capture"
              className={styles.input}
              type="email"
              placeholder="E-mail*"
            />
            <p className={styles.campos}>CEP</p>
            <input className={styles.input} type="text" placeholder="CEP*" />
            <p className={styles.campos}>Endereço</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Endereço*"
            />
            <div className={styles.numero}>
              <div>
                <p className={styles.campos}>Número</p>
                <input
                  className={styles.input3}
                  type="text"
                  placeholder="Número*"
                />
              </div>
              <div>
                <p className={styles.campos}>Complemento</p>
                <input
                  className={styles.input3}
                  type="text"
                  placeholder="Complemento*"
                />
              </div>
            </div>
            <div className={styles.numero}>
              <div>
                <p className={styles.campos}>Cidade</p>
                <input
                  className={styles.input3}
                  type="text"
                  placeholder="Cidade*"
                />
              </div>
              <div>
                <p className={styles.campos}>Estado</p>
                <input
                  className={styles.input3}
                  type="text"
                  placeholder="Estado*"
                />
              </div>
            </div>
          </div>
          <p>Formas de pagamento</p>
          <fieldset className={styles.fieldset}>
            <div className={styles.pagamentos}>
              <div className={styles.pag}>
                <div className={styles.img}>
                  <img className={styles.svg} src="/visa-svgrepo-com.svg"></img>
                </div>
                <input
                  className={styles.input2}
                  type="radio"
                  name="pagamento"
                />
              </div>
              <div className={styles.pag}>
                <div className={styles.img}>
                  <img
                    className={styles.svg}
                    src="/mastercard-full-svgrepo-com.svg"
                  ></img>
                </div>
                <input
                  className={styles.input2}
                  type="radio"
                  name="pagamento"
                />
              </div>
              <div className={styles.pag}>
                <div className={styles.img}>
                  <img className={styles.svg} src="/pix-svgrepo-com.svg"></img>
                </div>
                <input
                  className={styles.input2}
                  type="radio"
                  name="pagamento"
                />
              </div>
              <div className={styles.pag}>
                <div className={styles.img}>
                  <img
                    className={styles.svg}
                    src="/barcode-svgrepo-com.svg"
                  ></img>
                </div>
                <input
                  className={styles.input2}
                  type="radio"
                  name="pagamento"
                />
              </div>
            </div>
          </fieldset>
          <Resumo />
          <p className={styles.pfooter}>
            <input className={styles.input2} type="checkbox" />
            Aceito os termos e condições
          </p>
          <div className={styles.buttons}>
            <button className={styles.button}>Finalizar compra</button>
            <button className={styles.button2}>Voltar</button>
          </div>
        </div>
      </div>
    </>
  );
}
