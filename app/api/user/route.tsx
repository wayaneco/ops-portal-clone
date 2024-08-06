import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(_: NextApiRequest) {
  return NextResponse.json([
    {
      id: 1,
      name: "Mary Smith",
      email: "msmith88@gmail.com",
      privilege: ["Company Admin"],
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@tonykitchen.com",
      privilege: ["Company Admin", "Agent"],
    },
    {
      id: 3,
      name: "Peter Miller",
      email: "pete@gmail.com",
      privilege: ["Agent"],
    },
    {
      id: 4,
      name: "Angel Miller",
      email: "angel@toniskitchen.com",
      privilege: ["Agent"],
    },
  ]);
}
