import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { invoices, customers, revenue, users } from '../lib/placeholder-data';
import * as fs from 'fs';
import { parse } from 'csv-parse';

const client = await db.connect();

async function dropHouseholds() {
  await client.sql`DROP TABLE IF EXISTS households;`
}

async function seedHouseholds() {
  await client.sql`DROP TABLE IF EXISTS households;`

  await client.sql`
    CREATE TABLE households (
      text_res_address_nbr VARCHAR(50),
      text_res_address_nbr_suffix VARCHAR(10),
      cde_street_dir_prefix VARCHAR(10),
      text_street_name VARCHAR(100),
      cde_street_type VARCHAR(50),
      cde_street_dir_suffix VARCHAR(50),
      cde_res_unit_type VARCHAR(50),
      text_res_unit_nbr VARCHAR(50),
      text_res_city VARCHAR(100),
      cde_res_state VARCHAR(50),
      text_res_zip5 VARCHAR(50),
      precinct_part_text_name VARCHAR(50),
      polling_place_text_name VARCHAR(50),
      polling_place_text_address1 VARCHAR(50),
      polling_place_text_address2 VARCHAR(50),
      polling_place_text_address3 VARCHAR(50),
      polling_place_text_address4 VARCHAR(50),
      polling_place_text_city VARCHAR(50),
      polling_place_cde_state	VARCHAR(50),
      polling_place_text_zip5 VARCHAR(50)
    );
  `;

  const promises: any[] = [];
  fs.createReadStream("./202404_Sarpy_Households.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      //console.log(row[0], ' ', row[8], ' ', row[12]);
      promises.push(client.sql`
        INSERT INTO households (
          text_res_address_nbr,
          text_res_address_nbr_suffix,
          cde_street_dir_prefix,
          text_street_name,
          cde_street_type,
          cde_street_dir_suffix,
          cde_res_unit_type,
          text_res_unit_nbr,
          text_res_city,
          cde_res_state,
          text_res_zip5,
          precinct_part_text_name,
          polling_place_text_name,
          polling_place_text_address1,
          polling_place_text_address2,
          polling_place_text_address3,
          polling_place_text_address4,
          polling_place_text_city,
          polling_place_cde_state,
          polling_place_text_zip5)
        VALUES (${row[0]}, ${row[1]}, ${row[2]}, ${row[3]}, ${row[4]}, ${row[5]}, ${row[6]}, ${row[7]}, ${row[8]}, ${row[9]}, ${row[10]}, ${row[12]}, ${row[13]}, ${row[14]}, ${row[15]}, ${row[16]}, ${row[17]}, ${row[18]}, ${row[19]}, ${row[20]});
      `)
    })
    .on("end", function () {
      console.log("finished");
    })
    .on("error", function (error) {
      console.log(error.message);
    });

  const insertedHouseholds = await Promise.all(promises);

  return insertedHouseholds;
}

async function seedCustomers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCustomers;
}

async function seedRevenue() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
    ),
  );

  return insertedRevenue;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    await client.sql`BEGIN`;
    // await seedUsers();
    // await seedCustomers();
    // await seedInvoices();
    // await seedRevenue();
    await dropHouseholds();
    await seedHouseholds();
    await client.sql`COMMIT`;
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
