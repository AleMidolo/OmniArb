import { isCommercialMode } from "@/lib/config/commercial-mode";

const noStoreHeaders = {
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
};

export async function POST(): Promise<Response> {
  if (!isCommercialMode()) {
    return Response.json(
      {
        error: {
          code: "COMMERCIAL_DISABLED",
          message: "Le attivazioni non sono ancora disponibili.",
        },
      },
      { status: 503, headers: noStoreHeaders },
    );
  }

  // OMNI-004 will replace this fail-closed response after the commercial
  // prerequisites, provider configuration and QA launch gate are complete.
  return Response.json(
    {
      error: {
        code: "COMMERCIAL_NOT_IMPLEMENTED",
        message: "Il percorso commerciale non è ancora disponibile.",
      },
    },
    { status: 501, headers: noStoreHeaders },
  );
}
