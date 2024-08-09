"use server";

export async function addClient(data: {
  user_id: string;
  client_ids: Array<string>;
}) {
  console.log(data, "=========");
}
