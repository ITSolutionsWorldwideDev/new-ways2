import { ShopMainCategories } from "@/lib/menuData";
import { colorsData } from "@/lib/filterData";
import { runSuiteQLQuery } from "@/services/shop/items";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const itemid = searchParams.get("id");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("limit") || "20", 10);
  const offset = (page - 1) * pageSize;

  const color = searchParams.get("color");
  const size = searchParams.get("size");
  const brand = searchParams.get("brand");
  const category = searchParams.get("category");
  // const size = searchParams.get("size");

  const instock = searchParams.get("instock"); // Expect "true" or "false"
  const search = searchParams.get("search");

  let query: string;

  if (itemid) {
    query = `
      SELECT i.id, i.displayname, i.description, i.itemid, i.stockunit, ip.price,i.purchasedescription, ip.pricelevel,
              i.custitem_shopify_img_1_url,i.custitem_shopify_img_2_url,i.custitem_shopify_img_3_url,i.custitem_shopify_img_4_url,
              i.custitem_shopify_img_5_url,i.custitem_shopify_invt_item_id,i.custitem_nl_wkr_category,i.custitem_wmsse_itemgroup,
              i.custitem_wms_thumbnail_image,i.custitem_shopify_title,i.custitem_shopify_upload_images 
      FROM item i 
      LEFT JOIN itemprice ip ON i.id = ip.item 
      WHERE i.isinactive = 'F' AND i.itemid = '${itemid}'
    `;
  } else {
    const whereClauses: string[] = [`i.isinactive = 'F'`]; // Base condition

    // // Item ID filter (used for single item detail)
    // if (itemid) {
    //   whereClauses.push(`i.itemid = '${itemid}'`);
    // }

    // Optional filters
    if (color) {
      // whereClauses.push(`i.custitem1= '${color}'`);
      const keyword = color?.split(" ");

      const matchedColor = colorsData.find((col) =>
        col.name?.toLowerCase().includes(keyword[1]?.toLowerCase())
      );

      const color_id = matchedColor?.id || null;
      whereClauses.push(`i.custitem1 = '${color_id}'`);
    }

    if (size) {
      whereClauses.push(`LOWER(i.custitem_size) = LOWER('${size}')`);
    }

    if (category) {
      const keyword = category.split("-").join(" ").toLowerCase();

      const matchedCategory = ShopMainCategories.find((cat) =>
        cat.name?.toLowerCase().includes(keyword)
      );

      const category_id = matchedCategory?.id || null;
      whereClauses.push(`i.itemprocessgroup = '${category_id}'`);
    }

    if (brand) {
      whereClauses.push(`LOWER(i.custitem_brand) = LOWER('${brand}')`);
    }

    if (instock === "true") {
      whereClauses.push(`i.quantityavailable > 0`);
    } else if (instock === "false") {
      whereClauses.push(`i.quantityavailable <= 0`);
    }

    if (search) {
      const keyword = search.toLowerCase().replace(/'/g, "''"); // Basic SQL escape
      whereClauses.push(`(
          LOWER(i.displayname) LIKE '%${keyword}%' OR
          LOWER(i.itemid) LIKE '%${keyword}%' OR
          LOWER(i.purchasedescription) LIKE '%${keyword}%')`);
    }

    // final query
    const whereClause = whereClauses.length
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";

    // custitem_ags_item_material

    query = `
      SELECT i.id, i.displayname, i.itemid, i.stockunit,i.purchasedescription.i.itemprocessgroup,i.itemprocessfamily,
            i.custitem_shopify_img_1_url,i.custitem_shopify_img_2_url,i.custitem_shopify_img_3_url,i.custitem_shopify_img_4_url,
              i.custitem_shopify_img_5_url,
      FROM item i
      ${whereClause}
      ORDER BY i.lastmodifieddate DESC
    `;
  }

  console.log('query ==== ',query);

  try {
    const data = await runSuiteQLQuery(query, { limit: pageSize, offset });

    if (itemid) {
      return NextResponse.json(data?.items?.[0] || null, {
        status: data?.items?.length ? 200 : 404,
      });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch items", details: error.message },
      { status: 500 }
    );
  }
}

/* import { runSuiteQLQuery } from "@/services/shop/items";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("limit") || "20", 10);

  const offset = (page - 1) * pageSize;

  const query = `
    SELECT id, displayname, itemid, stockunit
    FROM item
    WHERE isinactive = 'F'
    ORDER BY id ASC
  `;

  const data = await runSuiteQLQuery(query, { limit: pageSize, offset });

  // console.log("data ==================== ",data )
  // console.log("data.items ==================== ",data?.items )

  // return NextResponse.json(data?.items);
  return NextResponse.json(data);
} */
