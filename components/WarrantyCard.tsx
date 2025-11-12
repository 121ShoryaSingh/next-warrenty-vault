import { getWarrantyStatus } from '@/lib/GetWarrantyStatus';
import { WarrantyItem } from '@/lib/types';
import { Card, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export default function WarrantyCard({
  item,
  onDelete,
  onView,
}: {
  item: WarrantyItem;
  onDelete: (id: string) => void;
  onView: (item: WarrantyItem) => void;
}) {
  const [status, daysRemaining] = getWarrantyStatus(item.warranty_expiry_date);

  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <CardTitle>{item.title}</CardTitle>
            <Badge />
          </div>
        </CardHeader>
      </Card>
      ;
    </div>
  );
}
