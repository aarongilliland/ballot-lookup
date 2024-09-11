import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { belleza } from '@/app/ui/fonts';

export default function SarpyLogo() {
  return (
    <div
      className={`${belleza.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Sarpy County GOP</p>
    </div>
  );
}
