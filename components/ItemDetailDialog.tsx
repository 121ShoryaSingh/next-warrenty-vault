import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { WarrantyItem } from '@/lib/types';
import {
  Calendar,
  FileText,
  IndianRupee,
  Package,
  StickyNote,
} from 'lucide-react';
import { getCategoryLabel } from '@/lib/GetCategoryLabel';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { formatDate } from '@/lib/Format';
import { getWarrantyStatus } from '@/lib/GetWarrantyStatus';
import { DownloadFromR2 } from '@/lib/DownloadFromR2';
import { toast } from 'sonner';
import { Button } from './ui/button';

export default function ItemDetailDialog({
  item,
  open,
  onOpenChange,
}: {
  item: WarrantyItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { status, daysRemaining } = getWarrantyStatus(item.warrantyExpiry);

  const getStatusBadge = () => {
    switch (status) {
      case 'expired':
        return (
          <Badge
            variant="destructive"
            className="font-semibold"
          >
            Expired
          </Badge>
        );
      case 'expiring':
        return (
          <Badge
            variant="outline"
            className="border-orange-500 text-orange-600 font-semibold"
          >
            Expiring in {daysRemaining} days
          </Badge>
        );
      case 'active':
        return (
          <Badge
            variant="outline"
            className="border-green-500 text-green-600 font-semibold"
          >
            Active ({daysRemaining} days remaining)
          </Badge>
        );
    }
  };

  const handleDownload = async (key: string) => {
    const result = await DownloadFromR2(key);
    if (result.success) {
      window.open(result.url, '_blank');
    } else {
      toast.error('Download failed. Try again.');
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
      >
        <DialogContent className="bg-slate-900 max-w-2xl overflow-y-auto py-10 text-slate-100">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <DialogTitle className="text-2xl text-slate-100">
                  {item.title}
                </DialogTitle>
                <DialogDescription className="mt-2 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  {getCategoryLabel(item.category)}
                </DialogDescription>
              </div>
              {getStatusBadge()}
            </div>
          </DialogHeader>
          <Separator className="my-4" />
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">Purchase Date</span>
                </div>
                <p className="text-sm font-medium">
                  {formatDate(item.purchaseDate)}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">Warranty Expires</span>
                </div>
                <p className="text-sm font-medium">
                  {formatDate(item.warrantyExpiry)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-sm font-medium">Purchase Price</span>
            </div>
            <p className="text-lg font-bold flex items-center">
              <IndianRupee className="h-4 w-4" />
              {item.price}
            </p>
          </div>

          {item.notes && (
            <>
              <Separator />
              <div className="">
                <div className="flex items-center gap-2 text-slate-600">
                  <StickyNote className="h-4 w-4" />
                  <span className="text-sm font-medium">Notes</span>
                </div>
                <p className="text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 p-4 rounded-lg ">
                  {item.notes}
                </p>
              </div>
            </>
          )}

          {item.recepts.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-600">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">Receipt Files</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {item.recepts.map((file, index) => (
                    <div
                      key={index}
                      className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-square bg-slate-100 flex flex-col items-center justify-center p-4">
                        <FileText className="h-12 w-12 text-slate-400 mb-2" />
                        <span className="text-xs text-slate-600 text-center font-medium">
                          Receipt
                        </span>
                      </div>
                      <div className="p-2 bg-white">
                        <p
                          className="text-xs text-slate-600 truncate"
                          title={file.key}
                        >
                          {file.key}
                        </p>
                        <Button
                          disabled={!file.key}
                          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 duration-300 hover:text-slate-400 text-slate-100"
                          variant="outline"
                          onClick={() => {
                            if (file.key) handleDownload(file.key);
                            else toast.error('No file key found!');
                          }}
                        >
                          Download/View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
