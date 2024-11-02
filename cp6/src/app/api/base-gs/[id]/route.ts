import { TipoGs } from "@/types";
import { NextResponse } from "next/server";
import { client } from "@/lib/appwrite_client";
import { Databases } from "appwrite";

const database = new Databases(client);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_GLOBAL_SOLUTION_ID as string,
      params.id
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { nome, descricao, nota, link } =
      await request.json();
    const gs = {
      nome,
      descricao,
      nota,
      link,
    } as TipoGs;

    await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_GLOBAL_SOLUTION_ID as string,
      params.id,
      gs
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_GLOBAL_SOLUTION_ID as string,
      params.id
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
