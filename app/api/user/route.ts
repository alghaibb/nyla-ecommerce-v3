import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod"

// Define schema for input validation
const UserSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  })

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = UserSchema.parse(body);

    // Check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email }
    })
    if (existingUserByEmail) {
      return NextResponse.json({
        user: null,
        message: "This email is already associated with an account. Please use a different email or log in to your existing account."
      }, { status: 409 });
    }

    // Check if username already exists
    const existingUserByUsername = await db.user.findUnique({
      where: { username: username }
    })
    if (existingUserByUsername) {
      return NextResponse.json({
        user: null,
        message: "This username is already associated with an account. Please use a different username or log in to your existing account."
      }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json({ user: rest, message: "Your account has been successfully created!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong. Please try again." }, { status: 500 });
  }
}