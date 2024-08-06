import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

const MOCK_DATA = [
  {
    id: 1,
    name: "Mary Smith",
    email: "msmith88@gmail.com",
    address: "Makati City",
    phoneNumber: "123-44",
    clients: [
      {
        name: "Bulalo Haws",
        privileges: ["Company Admin"],
      },
    ],
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@tonykitchen.com",
    address: "Bagiuo City",
    phoneNumber: "0965-782",
    clients: [
      {
        name: "Toni's Kitchen",
        privileges: ["Company Admin", "Agent"],
      },
    ],
  },
  {
    id: 3,
    name: "Peter Miller",
    email: "pete@gmail.com",
    address: "Maasin City",
    phoneNumber: "699707",
    clients: [
      {
        name: "Diwata Pares",
        privileges: ["Agent"],
      },
      {
        name: "Many Pacquiao Gym",
        privileges: ["Company Admin", "Agent"],
      },
    ],
  },
  {
    id: 4,
    name: "Angel Miller",
    email: "angel@toniskitchen.com",
    address: "Mindanao City",
    phoneNumber: "1223-112",
    clients: [
      {
        name: "Pizza Hut",
        privileges: ["Agent"],
      },
    ],
  },
];
export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = MOCK_DATA.find((mk) => mk.id.toString() === params.id);

  console.log({ data });
  return NextResponse.json(data);
}
