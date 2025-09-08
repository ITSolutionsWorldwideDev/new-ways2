import { runSuiteQLQuery } from "@/services/shop/items";
import { NextRequest, NextResponse } from "next/server";
import { getNetSuiteAxios } from "@/services/netsuiteAxios";

export async function POST(req: Request) {
  /* 
    {
        "companyName": "John Doe",
        "email": "john.doe@example.com",
        "subsidiary": {
            "id": "1"
        },
        "phone": "1234567890",
        "entityStatus": {
            "id": "13"   // e.g., "Customer - Active"
        }
    } 

    {
    "id": "1234",
    "links": [
        {
        "rel": "self",
        "href": "https://<ACCOUNT_ID>.suitetalk.api.netsuite.com/services/rest/record/v1/customer/1234"
        }
    ]
    }
  */

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

    /* const payload = {
      isPerson: true,
      companyName: `${firstName} ${lastName}`,
      email,
      phone,
      subsidiary: { id: "1" }, // adjust for your subsidiary
      entityStatus: { id: "13" }, // "Customer - Active" in your setup
      addressbook: [
        {
          addressbookAddress: {
            addr1: address,
            city,
            zip,
            country, // e.g. "US"
          },
          defaultBilling: true,
          defaultShipping: true,
          label: "Primary Address",
        },
      ],
    };
 */

    const payload = {
      isPerson: true,
      //   companyName: `${firstName} ${lastName}`, // required
      firstName: `${firstName}`, // required
      lastName: `${lastName}`, // required
      email: email, // required if unique
      //   phone: phone,
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
    console.log("payload ==== ", payload);

    const response = await axiosInstance.post("/record/v1/customer", payload, {
      headers: { "Content-Type": "application/json" },
    });

    /* const response = await axiosInstance.post("/record/v1/customer", payload, {
      headers: {
        "Content-Type": "application/json",
        Prefer: "transient",
      },
    }); */

    console.log("response ==== ", response);

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
}

/* 
Sales Order

POST /record/v1/salesOrder

{
  "entity": {
    "id": "1234"   // Customer ID from step 2
  },
  "subsidiary": {
    "id": "1"
  },
  "location": {
    "id": "2"
  },
  "item": [
    {
      "item": {
        "id": "567"   // Internal ID of the item
      },
      "quantity": 2,
      "rate": 49.99
    },
    {
      "item": {
        "id": "890"
      },
      "quantity": 1,
      "rate": 19.99
    }
  ]
}
SELECT id, email FROM customer WHERE email = 'john.doe@example.com' */
