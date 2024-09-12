import SarpyLogo from '@/app/ui/sarpy-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { belleza } from '@/app/ui/fonts';
import Image from 'next/image';
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
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-red-600 p-4 md:h-52">
        <SarpyLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-600 px-6 py-10 md:w-2/5 md:px-20">
        <p className={`${belleza.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Ballot Lookup</strong>{' '}
        </p>
        <p>
          Search by your Street Number and Street Name brought to you by{' '}
            <a href="https://sarpygop.com" className="text-blue-500">
             Sarpy County GOP.
            </a>
        </p>
        <span>Search</span> <ArrowRightIcon className="w-5 md:w-6" />
        </div>
        <div className="flex items-center justify-center p-1 ">
          <div className="flex flex-col justify-center">
            <BallotSearch placeholder="Type Your Address... " />
            <BallotsTable query={query}  />
          </div>
        </div>
      </div>
    </main>
  );
}
