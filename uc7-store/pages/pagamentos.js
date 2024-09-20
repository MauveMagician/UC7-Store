import Link from "next/link";
import styles from "./pagamentos.module.css";
import Resumo from "@/app/resumo.js";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [dadoUsuario, setDadoUsuario] = useState({});
  const handleFinalizar = async (e) => {
    e.preventDefault();
    // Enviar dados ao backend
    const response = await fetch("/api/finalizar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadoUsuario),
    });
    if (response.ok) {
      router.push("/pagamentosucesso");
    }
  };
  return (
    <>
      <form className={styles.planet} onSubmit={handleFinalizar}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.title}>Complete o seu cadastro</p>
            <p className={styles.asterisco}>
              Os campos marcados com um asterisco são obrigatórios.
            </p>
          </div>
          <div className={styles.info}>
            <p className={styles.campos}>Nome</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Nome*"
              onChange={(e) =>
                setDadoUsuario({ ...dadoUsuario, nome: e.target.value })
              }
              required={true}
            />
            <p className={styles.campos}>Sobrenome</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Sobrenome*"
              onChange={(e) =>
                setDadoUsuario({ ...dadoUsuario, sobrenome: e.target.value })
              }
              required={true}
            />
            <div className={styles.numero}>
              <div>
                <p className={styles.campos}>CPF</p>
                <input
                  className={styles.input3}
                  type="text"
                  placeholder="CPF*"
                  onChange={(e) =>
                    setDadoUsuario({ ...dadoUsuario, CPF: e.target.value })
                  }
                  required={true}
                />
              </div>
              <div>
                <p className={styles.campos}>Data de Nascimento</p>
                <input
                  className={styles.input3}
                  type="text"
                  placeholder="Data de Nascimento*"
                  onChange={(e) =>
                    setDadoUsuario({
                      ...dadoUsuario,
                      datanascimento: e.target.value,
                    })
                  }
                  required={true}
                />
              </div>
            </div>
            <p className={styles.campos}>Telefone/Celular</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Telefone/Celular*"
              onChange={(e) =>
                setDadoUsuario({ ...dadoUsuario, telefone: e.target.value })
              }
              required={true}
            />
            <p className={styles.campos}>E-mail</p>
            <input
              capture="capture"
              className={styles.input}
              type="email"
              placeholder="E-mail*"
              onChange={(e) =>
                setDadoUsuario({ ...dadoUsuario, email: e.target.value })
              }
              required={true}
            />
            <p className={styles.campos}>CEP</p>
            <input
              className={styles.input}
              type="text"
              placeholder="CEP*"
              onChange={(e) =>
                setDadoUsuario({ ...dadoUsuario, CEP: e.target.value })
              }
              required={true}
            />
            <p className={styles.campos}>Endereço</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Endereço*"
              onChange={(e) =>
                setDadoUsuario({ ...dadoUsuario, endereço: e.target.value })
              }
              required={true}
            />
            <div className={styles.numero}>
              <div>
                <p className={styles.campos}>Número</p>
                <input
                  className={styles.input3}
                  type="text"
                  placeholder="Número*"
                  onChange={(e) =>
                    setDadoUsuario({ ...dadoUsuario, numero: e.target.value })
                  }
                  required={true}
                />
              </div>
              <div>
                <p className={styles.campos}>Complemento</p>
                <input
                  className={styles.input3}
                  type="text"
                  placeholder="Complemento*"
                  onChange={(e) =>
                    setDadoUsuario({
                      ...dadoUsuario,
                      complemento: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    setDadoUsuario({ ...dadoUsuario, cidade: e.target.value })
                  }
                  required={true}
                />
              </div>
              <div>
                <p className={styles.campos}>Estado</p>
                <input
                  className={styles.input3}
                  type="text"
                  placeholder="Estado*"
                  onChange={(e) =>
                    setDadoUsuario({ ...dadoUsuario, estado: e.target.value })
                  }
                  required={true}
                />
              </div>
            </div>
          </div>
          <p>Formas de pagamento</p>
          <fieldset className={styles.fieldset} required={true}>
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
            <input className={styles.input2} type="checkbox" required={true} />
            Aceito os termos e condições
          </p>
          <div className={styles.buttons}>
            <button className={styles.button} type="submit">
              Finalizar compra
            </button>
            <button className={styles.button2}>Voltar</button>
          </div>
        </div>
      </form>
    </>
  );
}
