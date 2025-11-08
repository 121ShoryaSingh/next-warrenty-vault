import { TabsTrigger } from '@radix-ui/react-tabs';
import { Button } from './ui/button';
import { Tabs, TabsList } from './ui/tabs';

export default function StoredItemCards() {
  return (
    <div>
      <Tabs>
        <TabsList>
          <div className="flex gap-2 bg-slate-950/30 border border-slate-900 max-w-80 md:max-w-sm py-2 pl-3 rounded-md">
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Active">Active</TabsTrigger>
            <TabsTrigger value="Expired">Expired</TabsTrigger>
          </div>
        </TabsList>
      </Tabs>
    </div>
  );
}
