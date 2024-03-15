import type { CollectionEntry } from "astro:content";

type MappedMember = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export function mapTeamMembersResponse(
  membersResponse: CollectionEntry<"team">,
) {
  const mappedAuthor: MappedMember = {
    id: membersResponse.id,
    name: membersResponse.data.name,
    email: membersResponse.data.email,
    role: membersResponse.data.role,
  };

  return mappedAuthor;
}
