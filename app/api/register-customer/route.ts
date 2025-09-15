import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/lib/db"; // Assuming you have a helper to run parameterized queries

export async function POST(req: Request) {
  const body = await req.json();

  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    country,
    zip,
    cartItems,
  } = body;

  try {
    const checkUserQuery = `SELECT user_id FROM users WHERE email = $1 LIMIT 1`;
    const existingUser = await runQuery(checkUserQuery, [email]);

    let userId: number = 0;

    if (existingUser.rows.length > 0) {
      userId = existingUser.rows[0].id;
    } else {
      const insertUserQuery = `
            INSERT INTO users (
              username, password_hash,
              "firstName", "lastName", email, "addrPhone", addr1, city, country, zip,
              created_at, updated_at
            )
            VALUES (
              $1, $2,
              $3, $4, $5, $6, $7, $8, $9, $10,
              NOW(), NOW()
            )
            RETURNING user_id;
          `;

      const result = await runQuery(insertUserQuery, [
        email.split("@")[0], // username (basic fallback)
        "temporary", // password_hash (temporary for guest)
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        country,
        zip,
      ]);

      userId = result.rows[0].user_id;
    }

    // 3️⃣ Update cart items — optional step if needed here
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      for (const item of cartItems) {
        const { itemid, quantity, price } = item; // Adjust based on your frontend cart schema

        // Insert or update logic
        const checkCartItemQuery = `SELECT * FROM cart_items WHERE user_id = $1 AND item_id = $2`;

        const cartItemResult = await runQuery(checkCartItemQuery, [
          userId,
          itemid,
        ]);

        if (cartItemResult.rows.length > 0) {
          const updateCartItemQuery = `
            UPDATE cart_items 
            SET quantity = quantity + $1, added_at = NOW()
            WHERE user_id = $2 AND item_id = $3;
          `;
          await runQuery(updateCartItemQuery, [quantity, userId, itemid]);
        } else {
          const insertCartItemQuery = `
            INSERT INTO cart_items (user_id, item_id, quantity, price, added_at)
            VALUES ($1, $2, $3, $4, NOW());
          `;
          await runQuery(insertCartItemQuery, [
            userId,
            itemid,
            quantity,
            price ?? 0,
          ]);
        }
      }
    }

    return NextResponse.json(
      { success: true, userId },
      { status: existingUser.rows.length > 0 ? 200 : 201 }
    );
  } catch (error: any) {
    console.error("Error in register-customer:", error?.message || error);
    return NextResponse.json(
      { error: "Failed to process customer", details: error?.message },
      { status: 500 }
    );
  }
}

/* export async function POST(req: Request) {

  const body = await req.json();

  const { firstName, lastName, email, phone, address, city, country, zip } =
    body;

  try {
    // 1️⃣ Check if customer already exists by email
    const query = `
      SELECT id, entityid, email 
      FROM customer 
      WHERE email = '${email}'
    `;

    const data = await runSuiteQLQuery(query, { limit: 1, offset: 0 });

    if (data?.items?.length > 0) {
      // Customer already exists
      return NextResponse.json(
        { existing: true, customer: data.items[0] },
        { status: 200 }
      );
    }

    // 2️⃣ Create new customer if not found
    const axiosInstance = getNetSuiteAxios();

    // If you later need individual-type customers, you can revisit the isPerson: true path.

    const payload = {
      isPerson: true,
      //   companyName: `${firstName} ${lastName}`, // required
      firstName: `${firstName}`, // required
      lastName: `${lastName}`, // required
      email: email, // required if unique
      subsidiary: { id: "6" }, // required in OneWorld
      entityStatus: { id: "13" }, // active status

      addressBook: {
        items: [
          {
            defaultBilling: true,
            defaultShipping: true,
            label: "Primary Address",
            isResidential: true,
            addressBookAddress: {
              addr1: address,
              city,
              zip,
              country: { id: "NL" }, // must be an object, not a string!
              addressee: `${firstName} ${lastName}`,
              addrPhone: phone,
            },
          },
        ],
      },
    };
    // console.log("payload reg-customer==== ", payload);

    const response = await axiosInstance.post("/record/v1/customer", payload, {
      headers: { "Content-Type": "application/json" },
    });

    // Prefer: "transient",

    // console.log("response ==== ", response);

    return NextResponse.json(
      { existing: false, customer: response.data },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(
      "Error in register-customer:",
      error?.response?.data || error.message
    );

    return NextResponse.json(
      { error: "Failed to register customer", details: error?.message },
      { status: 500 }
    );
  }
} */
