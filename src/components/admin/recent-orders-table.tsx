import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminOrderItem } from "@/types/admin";

interface RecentOrdersTableProps {
  orders: AdminOrderItem[];
}

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  const dateFormatter = new Intl.DateTimeFormat("th-TH", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const currencyFormatter = new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  });

  const statusColors: Record<AdminOrderItem["status"], string> = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    paid: "bg-green-100 text-green-700 border-green-200",
    shipped: "bg-blue-100 text-blue-700 border-blue-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>รายการสั่งซื้อล่าสุด</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ลูกค้า</TableHead>
              <TableHead>วันที่</TableHead>
              <TableHead className="text-right">ยอดรวม</TableHead>
              <TableHead className="text-center">สถานะ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  ไม่มีข้อมูลรายการสั่งซื้อ
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.customerName}</TableCell>
                  <TableCell>{dateFormatter.format(new Date(order.createdAt))}</TableCell>
                  <TableCell className="text-right">
                    {currencyFormatter.format(order.totalAmount)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={statusColors[order.status]}>
                      {
                        order.status === 'pending' ? 'รอดำเนินการ' :
                        order.status === 'paid' ? 'ชำระเงินแล้ว' :
                        order.status === 'shipped' ? 'ส่งสินค้าแล้ว' :
                        'ยกเลิก'
                      }
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
