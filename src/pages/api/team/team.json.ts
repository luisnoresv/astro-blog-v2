import { mapTeamMembersResponse } from "@lib/mappings";
import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

export const prerender = true;

export const GET: APIRoute = async (): Promise<Response> => {
  const teamMembers: CollectionEntry<"team">[] = await getCollection("team");

  if (!teamMembers) {
    return new Response(
      JSON.stringify({ error: "The collection has no items" }),
      {
        status: 404,
        headers: {
          "content-type": "application/json",
        },
      },
    );
  }

  const mappedTeamMembers = teamMembers.map((author) =>
    mapTeamMembersResponse(author),
  );

  return new Response(JSON.stringify({ teamMembers: mappedTeamMembers }), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
};
