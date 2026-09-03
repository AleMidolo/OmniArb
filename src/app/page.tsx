import { getDeploymentMode } from "@/lib/config/commercial-mode";

const risks = [
  {
    number: "01",
    title: "Quote in movimento",
    text: "Una quota può cambiare prima che tutte le puntate siano confermate, modificando o annullando il margine teorico.",
  },
  {
    number: "02",
    title: "Limiti e rifiuti",
    text: "Un bookmaker può limitare l'importo, rifiutare una giocata o applicare regole specifiche al mercato.",
  },
  {
    number: "03",
    title: "Eventi annullati",
    text: "Una selezione o un mercato può essere invalidato. Le condizioni del singolo bookmaker restano determinanti.",
  },
  {
    number: "04",
    title: "Esecuzione manuale",
    text: "Sei tu a inserire gli importi e confermare le puntate: tempi, saldi disponibili ed errori operativi incidono sul risultato.",
  },
];

const faqs = [
  {
    question: "OmniArb piazza le scommesse al posto mio?",
    answer:
      "No. OmniArb segnala opportunità. Ogni utente decide in autonomia e inserisce personalmente le puntate sui propri conti bookmaker, usando i propri fondi.",
  },
  {
    question: "Il profitto è garantito?",
    answer:
      "Il margine è matematicamente positivo solo quando tutte le puntate necessarie vengono accettate alle quote indicate e restano valide. Quote variate, limiti, rifiuti, annullamenti o errori di esecuzione possono impedire il risultato teorico.",
  },
  {
    question: "Quanti alert riceverò?",
    answer:
      "La disponibilità varia con i mercati e le quote. OmniArb non promette un numero minimo di alert e non presenta gli esempi come una copertura permanente.",
  },
  {
    question: "Come funzionerà la prova gratuita?",
    answer:
      "Al lancio commerciale saranno previsti 7 giorni di accesso completo. Servirà un metodo di pagamento, senza addebito iniziale; salvo disdetta, seguiranno 50 € al mese. L'attivazione non è ancora disponibile.",
  },
  {
    question: "Posso annullare o chiedere un rimborso?",
    answer:
      "La disdetta durante la prova eviterà il primo addebito. Sul primo pagamento da 50 € è prevista una garanzia volontaria di rimborso di 7 giorni, senza domande; i diritti inderogabili del consumatore restano invariati. I termini finali saranno pubblicati dopo la revisione legale.",
  },
  {
    question: "Dove sarà disponibile il servizio?",
    answer:
      "Il lancio commerciale iniziale è previsto esclusivamente in Italia e per persone maggiorenni. Il criterio di idoneità definitivo sarà comunicato nei termini approvati prima dell'attivazione.",
  },
];

export default function Home() {
  const isPreLaunch = getDeploymentMode() === "PRE_LAUNCH";

  return (
    <>
      <a className="skip-link" href="#contenuto">
        Vai al contenuto
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#inizio" aria-label="OmniArb, torna all'inizio">
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span>OMNIARB</span>
          </a>

          <nav className="main-nav" aria-label="Navigazione principale">
            <a href="#metodo">Come funziona</a>
            <a href="#esempio">Esempio</a>
            <a href="#rischi">Rischi</a>
            <a href="#offerta">Offerta</a>
          </nav>

          <span className="header-status">
            <span aria-hidden="true" />
            {isPreLaunch ? "In preparazione" : "Attivazione sospesa"}
          </span>
        </div>
      </header>

      <main id="contenuto" tabIndex={-1}>
        <section className="hero section-dark" id="inizio">
          <div className="hero-grid" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span>01</span> Arbitraggio, senza rumore</p>
              <h1>
                Individua il <em>margine.</em>
                <br />Agisci con metodo.
              </h1>
              <p className="hero-lead">
                OmniArb analizzerà le quote e porterà su Telegram segnalazioni
                chiare di possibili arbitraggi sportivi. Tu valuti e piazzi le
                giocate: il controllo resta nelle tue mani.
              </p>

              <div className="hero-actions" aria-label="Stato del servizio">
                <button className="button button-primary" type="button" disabled>
                  Prossimamente
                </button>
                <a className="button button-secondary" href="#esempio">
                  Guarda un esempio <span aria-hidden="true">↘</span>
                </a>
              </div>

              <p className="availability-note">
                <span aria-hidden="true">●</span> Le attivazioni e la raccolta dei
                pagamenti non sono ancora aperte.
              </p>
            </div>

            <div className="signal-stage" aria-label="Mockup esplicativo di un alert OmniArb">
              <div className="orbit orbit-one" aria-hidden="true" />
              <div className="orbit orbit-two" aria-hidden="true" />
              <div className="signal-card">
                <div className="signal-topline">
                  <span className="signal-live"><i /> Alert illustrativo</span>
                  <span>12:48:06</span>
                </div>
                <div className="signal-event">
                  <span>TENNIS · MERCATO A 2 ESITI</span>
                  <strong>Giocatore A <i>contro</i> Giocatore B</strong>
                </div>
                <div className="odds-row">
                  <div>
                    <span>Esito A · Bookmaker A</span>
                    <strong>2,10</strong>
                    <small>Puntata 500 €</small>
                  </div>
                  <div>
                    <span>Esito B · Bookmaker B</span>
                    <strong>2,10</strong>
                    <small>Puntata 500 €</small>
                  </div>
                </div>
                <div className="signal-margin">
                  <span>Margine matematico illustrativo</span>
                  <strong>+5,0%</strong>
                </div>
                <p>
                  Mockup esplicativo, non risultato reale. Le quote possono
                  cambiare prima dell&apos;esecuzione.
                </p>
              </div>
              <div className="stage-caption">
                <span>Formato leggibile</span>
                <span>Decisione autonoma</span>
              </div>
            </div>
          </div>

          <div className="container proof-strip" aria-label="Principi del servizio">
            <div><strong>01</strong><span>Segnalazioni su Telegram</span></div>
            <div><strong>02</strong><span>Nessuna puntata automatica</span></div>
            <div><strong>03</strong><span>Condizioni e rischi visibili</span></div>
          </div>
        </section>

        <section className="section-light method-section" id="metodo">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow dark"><span>02</span> Il principio</p>
                <h2>Non prevedere il risultato.<br />Confrontare le quote.</h2>
              </div>
              <p>
                Una surebet nasce quando quote disponibili su esiti opposti
                permettono di distribuire un importo ottenendo lo stesso ritorno
                teorico, qualunque sia l&apos;esito rappresentato.
              </p>
            </div>

            <div className="method-grid">
              <article>
                <span className="step-number">01</span>
                <h3>Rilevazione</h3>
                <p>Il sistema individua una combinazione di quote potenzialmente compatibile con un arbitraggio.</p>
              </article>
              <article>
                <span className="step-number">02</span>
                <h3>Alert</h3>
                <p>Ricevi su Telegram esiti, quote e una ripartizione illustrativa degli importi.</p>
              </article>
              <article>
                <span className="step-number">03</span>
                <h3>Verifica</h3>
                <p>Controlli disponibilità, regole e quote aggiornate prima di decidere se procedere.</p>
              </article>
              <article className="method-accent">
                <span className="step-number">04</span>
                <h3>Esecuzione</h3>
                <p>Piazzi personalmente tutte le giocate sui tuoi conti, con i tuoi fondi.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="example-section" id="esempio">
          <div className="container example-layout">
            <div className="example-copy">
              <p className="eyebrow"><span>03</span> Esempio matematico illustrativo</p>
              <h2>Due esiti.<br />Un ritorno teorico.</h2>
              <p>
                Ipotizziamo due quote pari a 2,10 su esiti alternativi e un
                importo complessivo di 1.000 €. La ripartizione è uguale perché
                le quote sono identiche.
              </p>
              <div className="formula" aria-label="Somma delle probabilità implicite">
                <span>1 / 2,10</span><b>+</b><span>1 / 2,10</span><b>=</b><strong>95,24%</strong>
              </div>
              <p className="example-warning">
                Il 4,76% residuo segnala una condizione teorica di arbitraggio;
                con questa ripartizione il ritorno sul capitale è del 5%.
              </p>
            </div>

            <div className="calculation-card">
              <div className="calculation-head">
                <span>Scenario statico</span>
                <span>Capitale 1.000 €</span>
              </div>
              <div className="calculation-outcome">
                <div><span>Se vince A</span><strong>500 € × 2,10</strong></div>
                <b>1.050 €</b>
              </div>
              <div className="calculation-outcome">
                <div><span>Se vince B</span><strong>500 € × 2,10</strong></div>
                <b>1.050 €</b>
              </div>
              <div className="calculation-result">
                <div><span>Ritorno rappresentato</span><strong>1.050 €</strong></div>
                <div><span>Profitto teorico</span><strong>50 €</strong></div>
                <div><span>Margine sul capitale</span><strong>5,00%</strong></div>
              </div>
              <p>
                Esempio puramente illustrativo. Non rappresenta un rendimento
                atteso né un risultato ottenuto da clienti.
              </p>
            </div>
          </div>
        </section>

        <section className="telegram-section section-light" id="telegram">
          <div className="container telegram-layout">
            <div className="telegram-demo">
              <div className="telegram-window">
                <div className="telegram-bar">
                  <span className="avatar">OA</span>
                  <span><strong>OmniArb Alert</strong><small>canale dimostrativo</small></span>
                  <b>•••</b>
                </div>
                <div className="message-bubble">
                  <span className="message-label">POSSIBILE ARBITRAGGIO · ESEMPIO</span>
                  <strong>Mercato a 2 esiti</strong>
                  <div><span>Quota A</span><b>2,10</b></div>
                  <div><span>Quota B</span><b>2,10</b></div>
                  <div><span>Somma implicita</span><b>95,24%</b></div>
                  <p>Verifica sempre quote e regole prima di procedere.</p>
                  <time>12:48</time>
                </div>
              </div>
              <p className="demo-caption">Mockup esplicativo — non è uno screenshot reale né una prova di performance.</p>
            </div>

            <div className="telegram-copy">
              <p className="eyebrow dark"><span>04</span> Dentro Telegram</p>
              <h2>L&apos;informazione utile, dove serve.</h2>
              <p>
                L&apos;esperienza quotidiana avverrà su Telegram. Ogni alert sarà
                pensato per rendere immediatamente riconoscibili mercato, esiti,
                quote e condizioni da controllare.
              </p>
              <ul className="check-list">
                <li><span aria-hidden="true">✓</span> Alert leggibili anche da mobile</li>
                <li><span aria-hidden="true">✓</span> Dati essenziali organizzati con chiarezza</li>
                <li><span aria-hidden="true">✓</span> Nessuna esecuzione automatica delle puntate</li>
              </ul>
              <aside className="asset-note">
                <span aria-hidden="true">◎</span>
                <p><strong>Trasparenza prima di tutto.</strong> Gli screenshot reali del bot saranno pubblicati solo dopo anonimizzazione e approvazione, senza presentarli come prova di guadagni.</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="risks-section section-dark" id="rischi">
          <div className="container">
            <div className="section-heading split-heading inverse">
              <div>
                <p className="eyebrow"><span>05</span> Prima di agire</p>
                <h2>La matematica è precisa.<br />L&apos;esecuzione è reale.</h2>
              </div>
              <p>
                Un arbitraggio teorico non elimina i rischi operativi. Un alert
                è un punto di partenza da verificare, non la promessa di un
                profitto realizzato.
              </p>
            </div>

            <div className="risks-grid">
              {risks.map((risk) => (
                <article key={risk.number}>
                  <span>{risk.number}</span>
                  <h3>{risk.title}</h3>
                  <p>{risk.text}</p>
                </article>
              ))}
            </div>

            <div className="boundary-banner">
              <strong>OmniArb segnala. Tu decidi.</strong>
              <p>Non siamo un bookmaker, non custodiamo fondi e non piazziamo scommesse per conto degli utenti.</p>
            </div>
          </div>
        </section>

        <section className="pricing-section section-light" id="offerta">
          <div className="container pricing-layout">
            <div className="pricing-copy">
              <p className="eyebrow dark"><span>06</span> Un&apos;offerta semplice</p>
              <h2>Prima provi.<br />Poi scegli.</h2>
              <p>
                Un solo piano, senza livelli da confrontare. L&apos;offerta diventerà
                attivabile soltanto quando pagamenti, accesso Telegram e tutele
                saranno pronti e verificati.
              </p>
              <div className="eligibility">
                <span>18+</span>
                <p><strong>Lancio previsto in Italia.</strong> Offerta B2C riservata ai maggiorenni; criteri definitivi e condizioni saranno pubblicati prima dell&apos;attivazione.</p>
              </div>
            </div>

            <article className="pricing-card">
              <div className="pricing-status"><span /> Prossimamente</div>
              <p className="plan-name">Piano OmniArb</p>
              <div className="price"><strong>50 €</strong><span>/ mese</span></div>
              <p className="trial-copy">7 giorni di accesso completo a 0 €, poi rinnovo mensile salvo disdetta.</p>
              <ul>
                <li><span>01</span> Metodo di pagamento richiesto all&apos;attivazione</li>
                <li><span>02</span> Nessun addebito da 50 € all&apos;inizio della prova</li>
                <li><span>03</span> Disdetta durante la prova: nessun primo addebito</li>
                <li><span>04</span> Una sola prova gratuita per cliente</li>
                <li><span>05</span> Promemoria via email circa 24–48 ore prima del primo addebito</li>
                <li><span>06</span> Garanzia volontaria di 7 giorni sul primo pagamento</li>
              </ul>
              <button className="button button-primary full-width" type="button" disabled>
                Prossimamente
              </button>
              <p className="pricing-fineprint">
                La garanzia volontaria non limita i diritti inderogabili previsti
                dalla legge. Termini finali soggetti a revisione legale.
              </p>
            </article>
          </div>
        </section>

        <section className="faq-section" id="domande">
          <div className="container faq-layout">
            <div className="faq-intro">
              <p className="eyebrow"><span>07</span> Domande chiare</p>
              <h2>Prima di iniziare,<br />è giusto sapere.</h2>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details key={faq.question}>
                  <summary><span>{String(index + 1).padStart(2, "0")}</span>{faq.question}<i aria-hidden="true">+</i></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="closing-section section-dark">
          <div className="container closing-layout">
            <p className="eyebrow"><span>08</span> Accesso non ancora aperto</p>
            <h2>Prepariamo ogni passaggio.<br /><em>Dal segnale all&apos;accesso.</em></h2>
            <p>Nessun pagamento, nessuna lista d&apos;attesa: comunicheremo l&apos;apertura quando il servizio commerciale sarà pronto.</p>
            <button className="button button-primary" type="button" disabled>Prossimamente</button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top">
          <div>
            <a className="brand footer-brand" href="#inizio" aria-label="OmniArb, torna all'inizio">
              <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
              <span>OMNIARB</span>
            </a>
            <p>Segnalazioni di possibili arbitraggi sportivi, consegnate su Telegram.</p>
          </div>
          <div className="footer-links">
            <p><strong>Esplora</strong></p>
            <a href="#metodo">Come funziona</a>
            <a href="#rischi">Rischi</a>
            <a href="#offerta">Offerta</a>
            <a href="#domande">Domande frequenti</a>
          </div>
          <div className="footer-legal">
            <p><strong>Informazioni legali</strong></p>
            <span>Termini · in revisione</span>
            <span>Privacy · in revisione</span>
            <span>Cookie · in revisione</span>
            <small>I dati del venditore e il contatto di assistenza saranno pubblicati prima dell&apos;attivazione commerciale.</small>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} OmniArb</span>
          <span>18+ · Lancio commerciale previsto in Italia</span>
        </div>
      </footer>
    </>
  );
}
