import { serve } from "bun";
import index from "./index.html";
import { supabase } from "./supabase";
import { checkLimit } from "./redis-client";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,
    "/api/support": {
      async POST(req) {
        const limited = await checkLimit(req);
        if (limited) return limited;
        const url = process.env.FORMSPARK_CONTACT_URL!;
        const body = await req.json();
        if (!body) {
          return Response.json(
            {
              message: "No Data Passed",
              success: false,
            },
            { status: 400 },
          );
        }

        const { first, last, reason, description, email } = body;
        if (!first || !last || !reason || !description || !email) {
          return Response.json(
            {
              message: "Please Provide all required fields.",
              success: false,
            },
            {
              status: 400,
            },
          );
        }
        try {
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
          return Response.json({
            message:
              "Successfuly Sent Ticket! We will get in touch with you soon!",
            success: true,
          });
        } catch (err) {
          return Response.json({
            message: "Something went wrong...",
            success: false,
          });
        }
      },
    },
    "/api/waitlist": {
      async POST(req) {
        try {
          const limited = await checkLimit(req);
          if (limited) return limited;
          const url = process.env.BUN_PUBLIC_FORMSPARK_ACTION_URL!;
          const body = await req.json();
          const { name, email, intent, referredBy } = body;

          if (!email || !name || !intent) {
            return Response.json(
              { success: false, message: "Missing required fields" },
              { status: 400 },
            );
          }

          const newReferralCode = Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();

          // 3. Insert into Supabase
          const { error } = await supabase.from("WaitlistTable").insert([
            {
              full_name: name,
              uvic_email: email,
              intent: intent,
              referral_code: newReferralCode,
              referred_by: referredBy || null,
            },
          ]);

          if (error) {
            console.error("Supabase insert error:", error);

            if (error.code === "23505") {
              return Response.json(
                {
                  success: false,
                  message: "This UVic email is already on the waitlist!",
                },
                { status: 409 },
              );
            }

            return Response.json(
              { success: false, message: "Failed to save to database" },
              { status: 500 },
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

          return Response.json({
            message: "Successfully added to waitlist",
            success: true,
            referralCode: newReferralCode,
          });
        } catch (err) {
          console.error("Waitlist API Error:", err);
          return Response.json(
            { success: false, message: "Internal server error" },
            { status: 500 },
          );
        }
      },
    },
    "/api/get_referral_code": {
      async POST(req) {
        const limited = await checkLimit(req);
        if (limited) return limited;
        const body = await req.json();
        const email = body.email as string;
        const { data, error } = await supabase
          .from("WaitlistTable")
          .select("*")
          .eq("uvic_email", email);

        if (error || !data) {
          return Response.json({
            message: "Email doesnt exist in our records, sign up first!",
            code: null,
            success: false,
          });
        }

        if (data.length > 0 && data[0]?.referral_code) {
          return Response.json({
            message: "Email has a referral code already",
            code: data[0].referral_code,
            success: true,
          });
        }

        const newReferralCode = Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase();

        const { error: updateError } = await supabase
          .from("WaitlistTable")
          .update({
            referral_code: newReferralCode,
          })
          .eq("uvic_email", email);
        if (updateError) {
          return Response.json({
            message: "Error Updating",
            success: false,
            code: null,
          });
        }

        return Response.json({
          code: newReferralCode,
          success: true,
          message: "Successfully got referral code.",
        });
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
      async GET() {
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
