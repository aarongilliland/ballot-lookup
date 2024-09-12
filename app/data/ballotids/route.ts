import precinctBallotIds from '@/app/data/precinct_ballotids.json';
import { db } from '@vercel/postgres';

const client = await db.connect();

async function load() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS ballotids (
      id SERIAL PRIMARY KEY,
      precinct VARCHAR(255) NOT NULL,
      precinct_split VARCHAR(255) NOT NULL UNIQUE,
      ballotid VARCHAR(255) NOT NULL,
      year VARCHAR(255) NOT NULL,
      election VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `

  console.log(`Created "ballotids" table`)

  const insertedBallotIds = await Promise.all(
    precinctBallotIds.map(
      (row) => client.sql`
        INSERT INTO ballotids (precinct, precinct_split, ballotid, year, election)
        VALUES (${row.precinct}, ${row.precinct_split}, ${row.ballot_id}, '2024', 'GENERAL')
        ON CONFLICT (precinct_split) DO NOTHING;
      `,
    ),
  );

  console.log(`Seeded ${insertedBallotIds.length} ballotids`)

  return insertedBallotIds

}

async function clear() {
  await client.sql`
    DELETE FROM ballotids
    `

  console.log(`Deleting "ballotids" records`)

}

async function drop() {
  await client.sql`
    DROP TABLE ballotids CASCADE
    `

  console.log(`Dropping "ballotids" table`)

}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await load();
    await client.sql`COMMIT`;
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
  