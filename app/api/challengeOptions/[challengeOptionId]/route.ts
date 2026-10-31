import { challengeOptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { NextResponse } from "next/server";
import { getIsAdmin } from "@/lib/auth";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ challengeOptionId: string }> },
) => {

  const isAdmin = await getIsAdmin();
  if(!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const { challengeOptionId } = await params;
  const id = Number(challengeOptionId);

  const data = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, id),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ challengeOptionId: string }>},
) => {

  const isAdmin = await getIsAdmin();
  if(!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const { challengeOptionId } = await params;
  const id = Number(challengeOptionId);

  const body = await req.json();

  const data = await db.update(challengeOptions).set({
    ...body,
  }).where(eq(challengeOptions.id, id)).returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ challengeOptionId: string }>},
) => {

  const isAdmin = await getIsAdmin();
  if(!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const {challengeOptionId} = await params;
  const id = Number(challengeOptionId);

  const data = await db.delete(challengeOptions)
  .where(eq(challengeOptions.id, id)).returning();

  return NextResponse.json(data[0]);
};