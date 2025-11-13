import { getWarrantyStatus } from '@/lib/GetWarrantyStatus';
import { WarrantyItem } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Badge } from './ui/badge';
import { getCategoryLabel } from '@/lib/GetCategoryLabel';
import { Calendar, Eye, FileText, IndianRupee, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/Format';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

export default function WarrantyCard({
  item,
  onDelete,
  onView,
}: {
  item: WarrantyItem;
  onDelete: (id: string) => void;
  onView: (item: WarrantyItem) => void;
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
            className=" border-green-500 text-gray-600 font-semibold"
          >
            Active
          </Badge>
        );
    }
  };
  return (
    <>
      <Card className="hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-200 bg-slate-900 border-slate-800">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle>{item.title}</CardTitle>
            <p className="text-sm text-slate-400 mt-1">
              {getCategoryLabel(item.category)}
            </p>
          </div>
          {getStatusBadge()}
        </CardHeader>
        <CardContent className="space-y-3 pb-3">
          <div>
            <Calendar className="h-4 w-4 text-slate-400" />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>Purchase Date</p>
              <p>{formatDate(item.purchaseDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
            <IndianRupee className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">Price</p>
              <p className="font-semibold text-base text-slate-200">
                {item.price}
              </p>
            </div>
          </div>
          {item.recepts.length > 0 && (
            <div>
              <FileText />
              <span>{item.recepts.length} receipt file(s) attached</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-2 pt-3 border-t border-slate-800">
          <Button
            variant="outline"
            onClick={() => onView(item)}
            className="flex-1 border-slate-700 hover:bg-slate-800"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="text-red-400 hover:text-red-300 border-slate-700 hover:bg-slate-800"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Warranty Item</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete &ldquo;{item.title}&rdquo;?
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(item.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
      ;
    </>
  );
}
