import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// export const GET: APIRoute = ({ url }): Response => {
//   const query: string | null = url.searchParams.get("query");

//   // Handle if query is not present
//   if (query === null) {
//     return new Response(JSON.stringify({ error: "Query param is missing" }), {
//       status: 400,
//       headers: {
//         "content-type": "application/json",
//       },
//     });
//   }

//   return new Response(JSON.stringify({ query }), {
//     status: 200,
//     headers: {
//       "content-type": "application/json",
//     },
//   });
// };

export const GET: APIRoute = async ({ url }): Promise<Response> => {
  const query: string | null = url.searchParams.get("query");

  if (query === null) {
    return new Response(JSON.stringify({ error: "Query param is missing" }), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  const allBlogArticles = await getCollection("blog");

  if (!allBlogArticles) {
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

  const searchResults = allBlogArticles.filter((article) => {
    if (query) {
      const isTitleMatch: boolean = article.data.title
        .toLowerCase()
        .includes(query?.toLowerCase());

      const isBodyMatch: boolean = article.body
        .toLowerCase()
        .includes(query?.toLowerCase());

      const isSlugMatch: boolean = article.slug
        .toLowerCase()
        .includes(query?.toLowerCase());

      return isTitleMatch || isBodyMatch || isSlugMatch;
    }
    return false;
  });

  return new Response(JSON.stringify({ articles: searchResults }), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
};
