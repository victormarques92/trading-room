'use client';

import { Sidebar } from '@/components/Sidebar/Sidebar';
import { TradingViewChart } from '@/components/TradingViewChart';

export default function Home() {
  return (
    <main className="flex flex-col items-start gap-8 px-6 lg:gap-4 xl:flex-row">
      <TradingViewChart />

      <Sidebar />
    </main>
  );
}
