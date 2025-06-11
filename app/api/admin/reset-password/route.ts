import { NextResponse } from "next/server";
import connectDb from "@/lib/db/db";
import adminModel from "@/lib/Models/admin";
import { hashPassword } from "@/lib/Services/queryFn";

export async function POST() {
  try {
    await connectDb();

    const admin = await adminModel.findOne({
      email: "brightensolution@gmail.com",
    });
    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    const newHashedPassword = hashPassword("admin123");
    admin.password = newHashedPassword;
    await admin.save();

    return NextResponse.json(
      { message: "Password updated to 'admin123'" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Error updating password" },
      { status: 500 }
    );
  }
}
