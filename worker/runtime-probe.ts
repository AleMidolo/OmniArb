type ProbeEnv = {
  OMNIARB_MODE?: string;
};

export default {
  fetch(_request: Request, env: ProbeEnv): Response {
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
  },
};
