import Image from 'next/image';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchBallots } from '../lib/ballots-data';
import Link from 'next/link';

export default async function BallotsTable({
  query
}: {
  query: string;
}) {
  const ballots = await fetchBallots(query);
  const getMapLink = (address:string) => {
    return `https://www.google.com/maps/search/?api=1&query=${address}`
  }
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Address
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Sample Ballot
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Polling Center
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  <div className="flex flex-row">
                    <Image src="/Google_Maps_icon_(2020).svg"
                        alt="Maps"
                        height={10}
                        width={10}
                      />
                  <div>
                  {' '}Polling Location
                  </div>  
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {ballots?.map((ballot) => (
                <tr
                  key={ballot.ballotid}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {ballot.household_address}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Link href={`https://sarpygop.com/resource-center/${ballot.ballotid}`} >Sample Ballot Click Here</Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {ballot.polling_place_text_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">

                    <Link href={getMapLink(ballot.precinct_address)} target="_blank">{ballot.precinct_address}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
