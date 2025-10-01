import { ShopMainCategories } from "@/lib/menuData";
import { colorsData, brandData, sizesData } from "@/lib/filterData";
import { runSuiteQLQuery } from "@/services/shop/items";
import { NextRequest, NextResponse } from "next/server";

import pool from "@/lib/db";

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

  const sort = searchParams.get("sort");

  let query: string;
  let countQuery: string = "";

  let matchedCategory;

  if (itemid) {
    query = `SELECT * FROM products WHERE itemid = '${itemid}'`;
  } else {
    const whereClauses: string[] = [`i.status = 1`]; // Base condition

    // Optional filters
    if (color) {
      const keyword = color?.split(" ");

      const matchedColor = colorsData.find((col) =>
        col.name?.toLowerCase().includes(keyword[1]?.toLowerCase())
      );

      const color_id = matchedColor?.id || null;
      whereClauses.push(`i.color_id = '${color_id}'`);
    }

    if (size) {
      // whereClauses.push(`LOWER(i.custitem_size) = LOWER('${size}')`);

      const keyword = size?.toLowerCase();

      const matchedSize = sizesData.find((s) =>
        s.name?.toLowerCase().includes(keyword[1]?.toLowerCase())
      );

      const size_id = matchedSize?.id || null;
      whereClauses.push(`i.size_id = '${size_id}'`);
    }

    if (category) {
      // const keyword = category.split("-").join(" ").toLowerCase();
      const keyword = category.split("-").join("_").toLowerCase();

      matchedCategory = ShopMainCategories.find((cat) =>
        cat.alias?.toLowerCase().includes(keyword)
      );

      const category_id = matchedCategory?.id || null;
      whereClauses.push(`i.category_id = '${category_id}'`);

      // const category_name = matchedCategory?.name || null;
      // const category_desc = matchedCategory?.description || null;
    }

    if (brand) {
      // whereClauses.push(`LOWER(i.custitem_brand) = LOWER('${brand}')`);

      const keyword = brand.toLowerCase();
      // const keyword = brand.split("-").join(" ").toLowerCase();

      const matchedBrand = brandData.find((b) =>
        b.name?.toLowerCase().includes(keyword)
      );

      const brand_id = matchedBrand?.id || null;
      whereClauses.push(`i.brand_id = '${brand_id}'`);
    }

    if (instock === "true") {
      whereClauses.push(`i.stock_quantity > 0`);
    } else if (instock === "false") {
      whereClauses.push(`i.stock_quantity <= 0`);
    }

    if (search) {
      const keyword = search.toLowerCase().replace(/'/g, "''"); // Basic SQL escape

      whereClauses.push(`(
          LOWER(i.displayname) LIKE '%${keyword}%' OR
          LOWER(i.matchcode) LIKE '%${keyword}%' OR
          LOWER(i.itemid) LIKE '%${keyword}%' OR
          LOWER(i.description) LIKE '%${keyword}%')`);
      // LOWER(i.purchasedescription) LIKE '%${keyword}%')`);
    }

    const whereClause = whereClauses.length
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";

    let sortingOrder = ``;

    if (sort) {
      if (sort == "BestSelling") sortingOrder = `ORDER BY i.updated_at DESC`; //  || sort == "priceAsc" || sort == "priceDesc"
      else if (sort == "priceAsc") sortingOrder = `ORDER BY i.price ASC`;
      else if (sort == "priceDesc") sortingOrder = `ORDER BY i.price DESC`;
      else if (sort == "Matchcode") sortingOrder = `ORDER BY i.matchcode ASC`;
      else if (sort == "nameAsc") sortingOrder = `ORDER BY i.displayname ASC`;
      else if (sort == "nameDesc") sortingOrder = `ORDER BY i.displayname DESC`;
      else if (sort == "dateAsc") sortingOrder = `ORDER BY i.created_at ASC`;
      else if (sort == "dateDesc") sortingOrder = `ORDER BY i.created_at DESC`;
    }

    // limit: pageSize, offset

    query = `SELECT i.*, i.stock_quantity AS stockunit FROM products AS i ${whereClause} ${sortingOrder} LIMIT ${pageSize} OFFSET ${offset}`;
    
    // console.log('query === ',query);

    countQuery = `SELECT COUNT(i.itemid) FROM products AS i ${whereClause}`;
  }

  /* if (itemid) {
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

    let sortingOrder = `i.lastmodifieddate DESC`;

    if (sort) {
      if (
        sort == "BestSelling" ||
        sort == "priceAsc" ||
        sort == "priceDesc" ||
        sort == "Matchcode"
      )
        sortingOrder = `i.lastmodifieddate DESC`;
      else if (sort == "nameAsc") sortingOrder = `i.displayname ASC`;
      else if (sort == "nameDesc") sortingOrder = `i.displayname DESC`;
      else if (sort == "dateAsc") sortingOrder = `i.createddate ASC`;
      else if (sort == "dateDesc") sortingOrder = `i.createddate DESC`;
      else sortingOrder = `i.lastmodifieddate DESC`;
    }

    query = `
      SELECT i.id, i.displayname, i.itemid, i.stockunit,i.purchasedescription.i.itemprocessgroup,i.itemprocessfamily,
            i.custitem_shopify_img_1_url,i.custitem_shopify_img_2_url,i.custitem_shopify_img_3_url,i.custitem_shopify_img_4_url,
              i.custitem_shopify_img_5_url
      FROM item i
      ${whereClause}
      ORDER BY ${sortingOrder}
    `;
  } */

  try {
    // const data = await runSuiteQLQuery(query, { limit: pageSize, offset });

    if (itemid) {
      const result = await pool.query(query);

      const data: any = {};

      data.items = result.rows;

      if (itemid) {
        return NextResponse.json(data?.items?.[0] || null, {
          status: data?.items?.length ? 200 : 404,
        });
      }
    } else {
      const [result, countResult] = await Promise.all([
        pool.query(query),
        pool.query(countQuery),
      ]);

      // const data: any = {};
      // data.items = result.rows;

      // Prepare response
      const data: any = {};
      data.items = result.rows;
      data.totalResults = parseInt(countResult.rows[0].count, 10);
      data.pageSize = pageSize;
      data.currentPage = Math.floor(offset / pageSize) + 1;
      data.totalPages = Math.ceil(data.totalResults / pageSize);
      // data.totalPages = data.totalResults;

      if (category) data.matchedCategory = matchedCategory;

      return NextResponse.json(data);
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch items", details: error.message },
      { status: 500 }
    );
  }
}
