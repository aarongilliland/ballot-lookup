import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { belleza } from '@/app/ui/fonts';
import Image from 'next/image';

export default function SarpyLogo() {
  return (
    <div
      className={`${belleza.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
          src="/SCRP_white-border.png"
          className="rounded-full"
          alt="Sarpy County Republicans"
          width={64}
          height={64}
        />
      <p className="text-[44px]">Sarpy County GOP</p>
    </div>
  );
}
