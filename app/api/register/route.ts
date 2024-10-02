import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismabd";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, name } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword,
      name,
    },
  });

  return NextResponse.json(user);
}
