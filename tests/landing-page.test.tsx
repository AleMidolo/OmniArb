import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Italian pre-launch landing page", () => {
  it("renders the approved offer and a non-actionable pre-launch CTA", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toContain("Prossimamente");
    expect(html).toContain("7 giorni");
    expect(html).toContain("50 €");
    expect(html).not.toContain("<form");
    expect(html).not.toContain("href=\"/api/checkout");
  });

  it("explains trial cancellation, paid cancellation and the first-payment refund", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toContain("Disdetta durante la prova: nessun primo addebito");
    expect(html).toContain("stop ai rinnovi, accesso fino alla fine del periodo già pagato");
    expect(html).toContain("Garanzia volontaria di 7 giorni sul primo pagamento");
    expect(html).toContain("la sola disdetta non comporterà automaticamente un rimborso");
  });

  it("includes the complete illustrative calculation and its limitations", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toContain("Esempio matematico illustrativo");
    expect(html).toContain("Capitale 1.000 €");
    expect(html).toContain("500 € × 2,10");
    expect(html).toContain("Profitto teorico");
    expect(html).toContain("50 €");
    expect(html).toContain("non risultato reale");
  });

  it("states the service boundary, risks and eligibility", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toContain("OmniArb segnala. Tu decidi.");
    expect(html).toContain("non piazziamo scommesse");
    expect(html).toContain("non promette un numero minimo di alert");
    expect(html).toContain("18+");
    expect(html).toContain("Italia");
  });
});
