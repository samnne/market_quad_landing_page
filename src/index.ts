import { serve } from "bun";
import index from "./index.html";
import { supabase } from "./supabase";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,
    "/api/formspark": {
      async POST(req) {
        const url = process.env.BUN_PUBLIC_FORMSPARK_ACTION_URL;
        if (!url) {
          return Response.json(
            { message: "Missing Formspark URL", success: false },
            { status: 500 },
          );
        }

        const body = await req.json();
        const email = body.email as string;
        const name = body.name as string;
        const intent = body.intent as string;
        const { data, error } = await supabase.from("WaitlistTable").insert([
          {
            full_name: name,
            uvic_email: email,
            intent,
          },
        ]);

        if (error) {
          console.log(error);
          return Response.json(
            {
              message: "Supabase Error",
              success: false,
            },
            {
              status: 500,
            },
          );
        }

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          return Response.json(
            { message: "Formspark error", success: false },
            { status: response.status },
          );
        }

        return Response.json({ message: "success", success: true });
      },
    },
    "/api/supabase": {
      async GET(req) {
        const { data, error } = await supabase
          .from("WaitlistTable")
          .select("*");

        if (error) {
          return Response.json(
            { message: "Error Fetching Data", success: false, error },
            { status: 500 },
          );
        }

        return Response.json({
          message: "hello",
          count: data.length,
        });
      },
      async POST(req) {
        return Response.json({
          message: "hello post",
        });
      },
    },
    "/sitemap.xml": {
      async GET(req) {
        const file = Bun.file("./public/sitemap.xml");
        return new Response(file, {
          headers: {
            "Content-Type": "application/xml",
          },
        });
      },
    },
    "/robots.txt": {
      async GET(req) {
        const file = Bun.file("./public/robots.txt");
        return new Response(file, {
          headers: {
            "Content-Type": "text/plain",
          },
        });
      },
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
