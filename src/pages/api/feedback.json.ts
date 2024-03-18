import type { APIRoute } from "astro";
import { Feedback, db } from "astro:db";
import sanitize from "sanitize-html";

export const GET: APIRoute = async (): Promise<Response> => {
  try {
    const feedback = await db.select().from(Feedback);

    if (!feedback) {
      return new Response(
        JSON.stringify({ error: "The table has no values", success: false }),
        {
          status: 204,
          headers: {
            "content-type": "application/json",
          },
        },
      );
    }

    return new Response(JSON.stringify({ feedback, success: true }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error, success: false }), {
      status: 500,
      headers: {
        "content-type": "application/json",
      },
    });
  }
};

type FeedbackRequest = {
  author: string;
  body: string;
};

export const POST: APIRoute = async ({ request }): Promise<Response> => {
  try {
    if (request.headers.get("Content-Type") === "application/json") {
      const { author, body }: FeedbackRequest = await request.json();

      if (!author || author.length === 0 || !body || body.length === 0) {
        return new Response(
          JSON.stringify({
            message: "Please provide all required fields",
            success: false,
          }),
          { status: 400 },
        );
      }

      const newFeedback = await db
        .insert(Feedback)
        .values({
          author: sanitize(author),
          body: sanitize(body),
        })
        .returning();

      return new Response(
        JSON.stringify({ feedback: newFeedback[0], success: true }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        },
      );
    }
    return new Response(JSON.stringify({ success: false }), {
      status: 400,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error, success: false }), {
      status: 500,
      headers: {
        "content-type": "application/json",
      },
    });
  }
};
