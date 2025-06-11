import { NextResponse } from "next/server";
import connectDb from "@/lib/db/db";
import adminModel from "@/lib/Models/admin";
import { hashPassword } from "@/lib/Services/queryFn";

export async function POST() {
  try {
    await connectDb();

    const email = "brightensolution@gmail.com";
    const newPassword = "admin123";

    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    // Hash new password using your own logic
    const hashed = hashPassword(newPassword);
    admin.password = hashed;

    await admin.save();

    return NextResponse.json({ message: "Password updated to admin123" });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error resetting password", error: err.message },
      { status: 500 }
    );
  }
}

// OPTIONAL: To call in browser temporarily
export async function GET() {
  return await POST();
}
