import { NextResponse } from "next/server";
import { TipoChallenge } from "@/types";
import { client } from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";

const database = new Databases(client);

export async function GET() {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_GLOBAL_SOLUTION_ID as string,
      [Query.orderAsc("$createdAt")] // Certifique-se de que o campo "id" está correto
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