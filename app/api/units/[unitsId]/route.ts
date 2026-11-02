import { units } from "@/db/schema";
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { NextResponse } from "next/server";
import { getIsAdmin } from "@/lib/auth";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ unitsId: string }> },
) => {

  const isAdmin = await getIsAdmin();
  if(!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const { unitsId } = await params;
  const id = Number(unitsId);

  const data = await db.query.units.findFirst({
    where: eq(units.id, id),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ unitsId: string }>},
) => {

  const isAdmin = await getIsAdmin();
  if(!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const { unitsId } = await params;
  const id = Number(unitsId);

  const body = await req.json();

  const data = await db.update(units).set({
    ...body,
  }).where(eq(units.id, id)).returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ unitsId: string }>},
) => {

  const isAdmin = await getIsAdmin();
  if(!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const {unitsId} = await params;
  const id = Number(unitsId);

  const data = await db.delete(units)
  .where(eq(units.id, id)).returning();

  return NextResponse.json(data[0]);
};