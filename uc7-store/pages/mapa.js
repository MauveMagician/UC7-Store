import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Bem vindo a mapa</h1>
      <li>
        <Link href="/">Inicio do site</Link>
      </li>
      <li>
        <Link href="/ofertas">Bem vindo a ofertas</Link>
      </li>
      <li>
        <Link href="/produtos">Bem vindo a produtos</Link>
      </li>
      <li>
        <Link href="/lancamentos">Bem vindo a Lançamentos</Link>
      </li>
      <li>
        <Link href="/maisvendidos">Bem vindo a mais vendidos</Link>
      </li>
      <li>
        <Link href="/suporte">Bem vindo a suporte</Link>
      </li>
    </>
  );
}
