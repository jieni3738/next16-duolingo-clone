import { lessons } from "@/db/schema";
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { NextResponse } from "next/server";
import { getIsAdmin } from "@/lib/auth";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ lessonId: string }> },
) => {

  const isAdmin = await getIsAdmin();
  if(!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const { lessonId } = await params;
  const id = Number(lessonId);

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, id),
  });

  console.log("lesson detail:", { lessonId, id, data });


  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ lessonId: string }>},
) => {

  const isAdmin = await getIsAdmin();
  if(!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const { lessonId } = await params;
  const id = Number(lessonId);

  const body = await req.json();

  const data = await db.update(lessons).set({
    ...body,
  }).where(eq(lessons.id, id)).returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ lessonId: string }>},
) => {

  const isAdmin = await getIsAdmin();
  if(!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const {lessonId} = await params;
  const id = Number(lessonId);

  const data = await db.delete(lessons)
  .where(eq(lessons.id, id)).returning();

  return NextResponse.json(data[0]);
};