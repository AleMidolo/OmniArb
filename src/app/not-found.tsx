import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow"><span>404</span> Pagina non trovata</p>
      <h1>Questa rotta<br />non porta a un alert.</h1>
      <p>La pagina richiesta non esiste oppure è stata spostata.</p>
      <Link className="button button-primary" href="/">Torna alla pagina principale</Link>
    </main>
  );
}
