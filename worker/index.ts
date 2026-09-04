type WorkerEnv = Record<string, unknown> & {
  OMNIARB_MODE?: string;
};

type VinextFetch = (
  request: Request,
  env: WorkerEnv,
  ctx: unknown,
) => Promise<Response> | Response;

export default {
  async fetch(
    request: Request,
    env: WorkerEnv,
    ctx: unknown,
  ): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/__omniarb-worker-health") {
      return new Response(
        JSON.stringify({ status: "ok", mode: env.OMNIARB_MODE ?? "UNKNOWN" }),
        {
          status: 200,
          headers: {
            "content-type": "application/json; charset=utf-8",
            "cache-control": "no-store",
          },
        },
      );
    }

    const { default: handler } = await import("vinext/server/fetch-handler");
    return (handler.fetch as VinextFetch)(request, env, ctx);
  },
};
