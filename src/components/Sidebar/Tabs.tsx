import { useUiStore } from '@/stores/useUiStore';
import clsx from 'clsx';
import { memo, useCallback } from 'react';

const tabLabels = {
  operations: 'Operações',
  orders: 'Ordens',
  history: 'Histórico',
};

type TabKey = keyof typeof tabLabels;

interface TabButtonProps {
  isActive: boolean;
  label: string;
  onClick: () => void;
}

const TabButton = memo(({ isActive, label, onClick }: TabButtonProps) => {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={clsx(
        'w-full py-3 text-sm font-medium transition-all duration-200 md:text-base',
        {
          'bg-zinc-800 font-bold text-white': isActive,
          'bg-zinc-700 text-zinc-400 hover:text-zinc-200': !isActive,
        },
      )}
    >
      {label}
    </button>
  );
});

export const Tabs = () => {
  const activeTab = useUiStore(s => s.activeTab);
  const setTab = useUiStore(s => s.setTab);

  const handleSetTab = useCallback(
    (key: TabKey) => {
      setTab(key);
    },
    [setTab],
  );

  return (
    <div className="mb-2 flex justify-between overflow-hidden rounded-t-md bg-zinc-700 text-sm font-medium">
      {Object.entries(tabLabels).map(([key, label]) => {
        const tabKey = key as TabKey;
        const isActive = activeTab === tabKey;

        return (
          <TabButton
            key={tabKey}
            isActive={isActive}
            label={label}
            onClick={() => handleSetTab(tabKey)}
          />
        );
      })}
    </div>
  );
};
