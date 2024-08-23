import { getUniqueVisitorCount } from "@/core/server/server-actions/site-visits";

export default async function handler(req: Request) {
  if (req.method === "GET") {
    try {
      const count = await getUniqueVisitorCount(); // Call your server action
      return new Response(JSON.stringify({ uniqueVisitors: count }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching unique visitor count:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch unique visitor count" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } else {
    return new Response(null, {
      status: 405,
      headers: { Allow: "GET" },
    });
  }
}
