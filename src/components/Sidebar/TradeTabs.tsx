'use client';

import { useUiStore } from '@/stores/useUiStore';
import { Tabs } from './Tabs';
import { HistoryTab } from './tabContent/HistoryTab';
import { OperationsTab } from './tabContent/OperationsTab';
import { OrdersTab } from './tabContent/OrdersTab';

const TAB_COMPONENTS = {
  operations: OperationsTab,
  orders: OrdersTab,
  history: HistoryTab,
};

export const TradeTabs = () => {
  const activeTab = useUiStore(state => state.activeTab);

  const ActiveComponent = TAB_COMPONENTS[activeTab];

  return (
    <div className="overflow-hidden rounded-md bg-zinc-800">
      <Tabs />

      <ActiveComponent />
    </div>
  );
};
