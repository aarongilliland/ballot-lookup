import { sql } from '@vercel/postgres';

export type BallotsTable = {
    household_address: string;
    ballotid: string;
    precinct_part_text_name: string;
    polling_place_text_name: string;
    precinct_address: string;
  };
  

const ITEMS_PER_PAGE = 6;
export async function fetchBallots(
  query: string
) {

  try {
    const ballots = await sql<BallotsTable>`
      SELECT
        *
      FROM vw_ballotids_households
      WHERE
        household_address ILIKE ${`%${query}%`}
      ORDER BY household_address ASC
      LIMIT ${ITEMS_PER_PAGE}
    `;

    return ballots.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ballots.');
  }
}