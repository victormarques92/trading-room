'use client';

import { formatPrice } from '@/helpers/formatPrice';
import { useTradeStore } from '@/stores/useTradeStore';
import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';

export const Header = () => {
  const balance = useTradeStore(s => s.balance);

  return (
    <header className="mb-10 flex flex-wrap items-center justify-center gap-6 bg-zinc-800 px-6 py-4 shadow-md md:justify-between">
      <Image
        src="https://ebinex-public.s3.sa-east-1.amazonaws.com/logo-ebinex.svg"
        alt="Ebinex Logo"
        width={100}
        height={24}
        priority
      />

      <div className="mt-3 flex w-full justify-center gap-4 md:mt-0 md:w-auto">
        <div className="flex items-center gap-2 rounded-md bg-zinc-700 px-2 py-1 text-sm font-medium text-white md:text-base">
          <span className="opacity-70">Saldo:</span>
          <span className="font-bold text-green-400">
            {formatPrice(balance)}
          </span>
        </div>

        <button className="flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-black shadow transition duration-150 hover:bg-green-600 md:text-base">
          <MdAttachMoney className="text-xl" />
          Depositar
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700 p-1 text-3xl text-gray-300 transition duration-150">
          <FaUserCircle />
        </div>
      </div>
    </header>
  );
};
