"use server";

export async function revokePrivilege(data: {
  user_id: string;
  client_id: string;
}) {
  console.log(data, "=========");
}
