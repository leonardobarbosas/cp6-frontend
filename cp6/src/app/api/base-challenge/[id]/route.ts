import { NextRequest, NextResponse } from "next/server";
import { TipoChallenge } from "@/types";
import { client } from "@/lib/appwrite_client";
import { Databases } from "appwrite";

const database = new Databases(client);

interface Context {
  params: { id: string };
}

export async function GET(request: NextRequest, context: Context) {
  const { id } = context.params;
  try {
    const response = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CHALLENGE_ID as string,
      id
    );
    return NextResponse.json(response);
  } catch (error) {
    console.error("Falha na obtenção da informação : ", error);
    return NextResponse.json(
      { message: "Falha na obtenção da informação: " + error },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: Context) {
  const { id } = context.params;
  try {
    const { nome, descricao, nota } = await request.json();
    const challenge = {
      nome,
      descricao,
      nota,
    } as TipoChallenge;

    await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CHALLENGE_ID as string,
      id,
      challenge
    );

    return NextResponse.json({ msg: "Atualização realizada com sucesso." });
  } catch (error) {
    console.error("Falha na atualização dos dados : ", error);
    return NextResponse.json(
      { message: "Falha na atualização dos dados: " + error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  const { id } = context.params;
  try {
    await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CHALLENGE_ID as string,
      id
    );

    return NextResponse.json({ status: 204 });
  } catch (error) {
    console.error("Falha na exclusão dos dados : ", error);
    return NextResponse.json(
      { message: "Falha na exclusão dos dados: " + error },
      { status: 500 }
    );
  }
}
