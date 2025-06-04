export default {
  async fetch(request, env, ctx) {
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get("url");

    if (!targetUrl) {
      return new Response("❌ Masukkan URL sebagai parameter, contoh: ?url=https://colamanga.com", {
        status: 400,
        headers: { "Content-Type": "text/plain" }
      });
    }

    try {
      const res = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114 Safari/537.36"
        }
      });

      const contentType = res.headers.get("content-type") || "text/html";

      return new Response(await res.body, {
        status: res.status,
        headers: {
          "Content-Type": contentType,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS"
        }
      });

    } catch (err) {
      return new Response(`⚠️ Error saat mengambil: ${err.message}`, {
        status: 500,
        headers: { "Content-Type": "text/plain" }
      });
    }
  }
}