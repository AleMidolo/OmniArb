import handler from "vinext/server/fetch-handler";

type VinextFetch = typeof handler.fetch;
type VinextEnv = Parameters<VinextFetch>[1];
type VinextContext = Parameters<VinextFetch>[2];

export default {
  async fetch(
    request: Request,
    env: VinextEnv,
    ctx: VinextContext,
  ): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/__omniarb-worker-health") {
      const mode = (env as { OMNIARB_MODE?: string } | undefined)?.OMNIARB_MODE;
      return new Response(
        JSON.stringify({ status: "ok", mode: mode ?? "UNKNOWN" }),
        {
          status: 200,
          headers: {
            "content-type": "application/json; charset=utf-8",
            "cache-control": "no-store",
          },
        },
      );
    }

    return handler.fetch(request, env, ctx);
  },
};
