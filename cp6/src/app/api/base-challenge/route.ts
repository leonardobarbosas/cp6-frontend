import { NextResponse } from "next/server";
import { TipoChallenge } from "@/types";
import { client } from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";

const database = new Databases(client);

export async function GET() {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CHALLENGE_ID as string,
      [Query.orderAsc("$createdAt")]
    );
    return NextResponse.json(response.documents);
  } catch (error: any) {
    console.error("Falha na obtenção dos dados: ", error.message);
    return NextResponse.json(
      { message: "Falha na obtenção dos dados: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { nome, descricao, nota } = await request.json();
    const challenge = {
      nome,
      descricao,
      nota,
    } as TipoChallenge;

    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CHALLENGE_ID as string,
      ID.unique(),
      challenge
    );

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Falha na criação dos dados : ", error);
    return NextResponse.json(
      { message: "Falha na criação dos dados: " + error },
      { status: 500 }
    );
  }
}