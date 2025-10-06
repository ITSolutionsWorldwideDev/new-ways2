// /app/api/admin/wholesaler-action/route.ts
import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/lib/db";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, action } = body;

    // 1️⃣ Basic validation
    if (!userId || !action) {
      return NextResponse.json(
        { error: "Missing required fields: userId or action" },
        { status: 400 }
      );
    }

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be 'approve' or 'reject'." },
        { status: 400 }
      );
    }

    // 2️⃣ Perform action
    if (action === "approve") {
      await runQuery(
        `UPDATE users
         SET wholesaler_request_status = 'approved',
             role = 'b2b',
             wholesaler_approved_at = NOW()
         WHERE user_id = $1`,
        [userId]
      );
    } else if (action === "reject") {
      await runQuery(
        `UPDATE users
         SET wholesaler_request_status = 'rejected'
         WHERE user_id = $1`,
        [userId]
      );
    }

    // 3️⃣ Return success
    return NextResponse.json({
      success: true,
      message:
        action === "approve"
          ? "Wholesaler request approved successfully"
          : "Wholesaler request rejected successfully",
    });
  } catch (error: any) {
    console.error("Error in wholesaler-action API:", error);
    return NextResponse.json(
      { error: "Server error while processing wholesaler action" },
      { status: 500 }
    );
  }
}

/* 

How It Works
✅ Request Example

POST or PUT: /api/admin/wholesaler-action



{
  "userId": 123,
  "action": "approve"
}

*/
