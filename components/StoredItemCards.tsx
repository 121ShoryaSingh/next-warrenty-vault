'use client';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { WarrantyItem } from '@/lib/types';
import WarrantyCard from './WarrantyCard';
import axios from 'axios';
import { toast } from 'sonner';
import { Spinner } from './ui/spinner';

export default function StoredItemCards() {
  const [warranties, setWarranties] = useState<WarrantyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WarrantyItem | null>(null);
  const [error, setError] = useState('');

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/api/delete/${id}`);
      if (response.status === 200) {
        toast('Warranty item deleted successfully');
        setWarranties(warranties.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting warranty item:', error);
      toast.error('Failed to delete warranty item');
    }
  };

  const handleView = (item: WarrantyItem) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  useEffect(() => {
    try {
      setLoading(true);
      setError('');
      const fetchData = async () => {
        const response = await axios.get('/api/GetItem');
        const data = await response.data.items;
        console.log(response.data);
        setWarranties(data);
      };
      fetchData();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message);
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

  const activeWarranties = warranties.filter(
    (w) => new Date(w.warrantyExpiry) >= new Date()
  );
  const expiredWarranties = warranties.filter(
    (w) => new Date(w.warrantyExpiry) < new Date()
  );

  if (warranties.length === 0) {
    return (
      <div className="text-center bg-blue-950/50 py-6 rounded-lg text-slate-100">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {loading === false ? (
        <>
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
                Active ({activeWarranties.length})
              </TabsTrigger>
              <TabsTrigger
                value="expired"
                className="data-[state=active]:bg-blue-900/50 data-[state=active]:text-white text-slate-400"
              >
                Expired ({expiredWarranties.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="all"
              className="mt-6"
            >
              {warranties.length > 0 ? (
                <div className="w-full bg-blue-950/50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6 rounded-md">
                  {warranties.map((item, index) => {
                    return (
                      <div key={index}>
                        <WarrantyCard
                          item={item}
                          key={index}
                          onDelete={handleDelete}
                          onView={handleView}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-slate-100 text-center bg-blue-950/50 py-6">
                  There are no warranties.
                </p>
              )}
            </TabsContent>
            <TabsContent
              value="active"
              className="mt-6"
            >
              {activeWarranties.length > 0 ? (
                <div className="w-full bg-blue-950/50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6 rounded-md">
                  {activeWarranties.map((item, index) => {
                    return (
                      <div key={index}>
                        <WarrantyCard
                          item={item}
                          onDelete={handleDelete}
                          onView={handleView}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-slate-100 text-center bg-blue-950/50 py-6">
                  There are no active warranties.
                </p>
              )}
            </TabsContent>
            <TabsContent
              value="expired"
              className="mt-6"
            >
              {expiredWarranties.length > 0 ? (
                <div className="w-full bg-blue-950/50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6 rounded-md">
                  {expiredWarranties.map((item, index) => {
                    return (
                      <div key={index}>
                        <WarrantyCard
                          item={item}
                          onDelete={handleDelete}
                          onView={handleView}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-slate-100 text-center bg-blue-950/50 py-6">
                  There are no expired warranties.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <div className="w-full bg-blue-950/50 flex gap-6 px-4 py-6 rounded-md">
          <Spinner className="text-slate-100 mx-auto" />
        </div>
      )}
    </div>
  );
}
