import { NextResponse } from "next/server";
import { TipoGs } from "@/types";
import { client } from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";

const database = new Databases(client);

interface AppwriteError extends Error {
  message: string;
}

export async function GET() {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_GLOBAL_SOLUTION_ID as string,
      [Query.orderAsc("$createdAt")]
    );
    return NextResponse.json(response.documents);
  } catch (error) {
    const appwriteError = error as AppwriteError;
    console.error("Falha na obtenção dos dados: ", appwriteError.message);
    return NextResponse.json(
      { message: "Falha na obtenção dos dados: " + appwriteError.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { nome, descricao, nota, link } = await request.json();
    const gs = {
      nome,
      descricao,
      nota,
      link,
    } as TipoGs;

    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_GLOBAL_SOLUTION_ID as string,
      ID.unique(),
      gs
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
