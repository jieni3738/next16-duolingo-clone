import { challenges } from "@/db/schema";
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { NextResponse } from "next/server";
import { getIsAdmin } from "@/lib/auth";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ challengeId: string }> },
) => {

  const isAdmin = await getIsAdmin();
  if(!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const { challengeId } = await params;
  const id = Number(challengeId);

  const data = await db.query.challenges.findFirst({
    where: eq(challenges.id, id),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ challengeId: string }>},
) => {

  const isAdmin = await getIsAdmin();
  if(!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const { challengeId } = await params;
  const id = Number(challengeId);

  const body = await req.json();

  const data = await db.update(challenges).set({
    ...body,
  }).where(eq(challenges.id, id)).returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ challengeId: string }>},
) => {

  const isAdmin = await getIsAdmin();
  if(!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const {challengeId} = await params;
  const id = Number(challengeId);

  const data = await db.delete(challenges)
  .where(eq(challenges.id, id)).returning();

  return NextResponse.json(data[0]);
};