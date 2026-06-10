export type AdminStats = {
  todaySales: number;
  todayOrders: number;
  pendingOrders: number;
  totalProducts: number;
  totalUsers: number;
};

export type RevenuePoint = {
  date: string;
  revenue: number;
  orders: number;
};

export type AdminOrderItem = {
  id: string;
  customerName: string;
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
  createdAt: string;
};
