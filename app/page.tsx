import SarpyLogo from '@/app/ui/sarpy-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { belleza } from '@/app/ui/fonts';
import BallotSearch from './ui/ballot-search';
import BallotsTable from './ui/ballot-table';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
const query = searchParams?.query || '';
return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 justify-center rounded-sm bg-red-600 p-4 md:h-52">
        <SarpyLogo />
      </div>
      {/* <div className="mt-4 flex grow flex-col justify-center md:flex-row"> */}
        <div className="flex flex-col justify-center gap-6 rounded-sm bg-gray-600 px-6 py-10">
          <p className={`${belleza.className} text-xl text-white md:text-3xl md:leading-normal`}>
              <strong>Find the Republicans on Your Ballot</strong>{' '}
          </p>
          <p className="text-white">
            Search by your <b>Street Number</b> and <b>Street Name</b>{' '}
              <a href="https://sarpygop.com" target='_blank' className="text-blue-500">
               Help Conservatives Win!
              </a>
          </p>
          {/* <span>Search</span> <ArrowRightIcon className="w-5 md:w-6" /> */}
          <div className="flex flex-col justify-center">
            <BallotSearch placeholder="Type Your Address... " />
            <BallotsTable query={query}  />
          </div>
        </div>

      {/* </div> */}
    </main>
  );
}
