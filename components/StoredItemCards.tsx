'use client';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { WarrantyItem } from '@/lib/types';
import { useRouter } from 'next/navigation';
import WarrantyCard from './WarrantyCard';
import axios from 'axios';
import { toast } from 'sonner';

export default function StoredItemCards() {
  const router = useRouter();
  const [warranties, setWarranties] = useState<WarrantyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      setLoading(true);
      setError('');
      const fetchData = async () => {
        const response = await axios.get('/api/GetItem');
        console.log(response.data);
        setWarranties(response.data);
      };
      fetchData();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.message);
          toast(error.message);
        } else if (error.request) {
          setError('No server response. Check your connection.');
        } else {
          setError(error.message);
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Request failed');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const activeWarranties = 0;
  const expriedWarranties = 0;
  return (
    <div>
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3 bg-blue-950/50 ">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-blue-900/50 data-[state=active]:text-white text-slate-400"
          >
            All ({warranties.length})
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="data-[state=active]:bg-blue-900/50 data-[state=active]:text-white text-slate-400"
          >
            Active ({activeWarranties})
          </TabsTrigger>
          <TabsTrigger
            value="expired"
            className="data-[state=active]:bg-blue-900/50 data-[state=active]:text-white text-slate-400"
          >
            Expired ({expriedWarranties})
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="all"
          className="mt-6"
        >
          <div className="w-full bg-blue-950/50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6 rounded-md">
            {warranties.map((item, index) => {
              return (
                <div key={index}>
                  <WarrantyCard item={item} />
                </div>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="active">
          <div></div>
        </TabsContent>
        <TabsContent value="expired">
          <div></div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
