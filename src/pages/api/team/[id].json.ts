import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

export const prerender = true;

export const GET: APIRoute = async ({ params }): Promise<Response> => {
  // ! This first way works but still there is some type conflicts
  // const teamMember = await getEntry("team", params.id?.toString()!);
  // * Best way to filter a collection of type data is by filtering with the frontmatter properties
  const teamMember = await getCollection("team", ({ id }) => {
    return id === params.id;
  });

  if (!teamMember) {
    return new Response(JSON.stringify({ error: "Member not found" }), {
      status: 404,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify({ teamMember }), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
};

export async function getStaticPaths() {
  const teamMembers: CollectionEntry<"team">[] = await getCollection("team");

  return teamMembers.map((member) => ({
    params: {
      id: member.id,
    },
  }));
}
