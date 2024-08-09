"use server";

export async function editPrivilege(data: {
  user_id: string;
  client_id: string;
  privileges: Array<string>;
}) {
  console.log(data, "=========");
}
