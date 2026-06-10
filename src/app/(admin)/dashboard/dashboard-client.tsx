"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { 
  TrendingUp, 
  ShoppingBag, 
  Clock, 
  Users, 
  AlertCircle 
} from "lucide-react";
import { 
  KpiCard, 
  KpiCardSkeleton 
} from "@/components/admin/kpi-card";
import { PeriodSelector } from "@/components/admin/period-selector";
import { RecentOrdersTable } from "@/components/admin/recent-orders-table";
import { AdminStats, RevenuePoint, AdminOrderItem } from "@/types/admin";
import { Button } from "@/components/ui/button";

const RevenueChart = dynamic(() => import("@/components/admin/revenue-chart"), { 
  ssr: false,
  loading: () => <div className="h-[300px] w-full animate-pulse bg-muted rounded-xl" />
});

interface ErrorStateProps {
  title: string;
  error: string | null;
  onRetry: () => void;
}

function ErrorState({ title, error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center gap-4 rounded-xl border bg-muted/50">
      <AlertCircle className="h-8 w-8 text-destructive" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
      <Button onClick={onRetry} variant="outline" size="sm">ลองใหม่อีกครั้ง</Button>
    </div>
  );
}

export default function DashboardClient() {
  const mountedRef = useRef(true);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [revenueLoading, setRevenueLoading] = useState(true);
  const [revenueError, setRevenueError] = useState<string | null>(null);

  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  
  const [orders, setOrders] = useState<AdminOrderItem[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  const fetchStatsAndOrders = useCallback(async () => {
    if (!mountedRef.current) return;
    setStatsError(null);
    setOrdersError(null);
    
    try {
      const [statsRes, ordersRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/orders?limit=5')
      ]);

      if (!statsRes.ok || !ordersRes.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const statsData = await statsRes.json();
      const ordersData = await ordersRes.json();

      if (mountedRef.current) {
        setStats(statsData);
        setOrders(ordersData.orders || []);
      }
    } catch (err) {
      if (mountedRef.current) {
        setStatsError(err instanceof Error ? err.message : 'An error occurred');
        setOrdersError(err instanceof Error ? err.message : 'An error occurred');
      }
    } finally {
      if (mountedRef.current) {
        setStatsLoading(false);
        setOrdersLoading(false);
      }
    }
  }, []);

  const fetchRevenue = useCallback(async () => {
    if (!mountedRef.current) return;
    setRevenueError(null);
    setRevenueLoading(true);
    try {
      const res = await fetch(`/api/admin/revenue?period=${period}`);
      if (!res.ok) throw new Error('Failed to fetch revenue data');
      const data = await res.json();
      if (mountedRef.current) {
        setRevenue(data);
      }
    } catch (err) {
      if (mountedRef.current) {
        setRevenueError(err instanceof Error ? err.message : 'An error occurred');
      }
    } finally {
      if (mountedRef.current) {
        setRevenueLoading(false);
      }
    }
  }, [period]);

  useEffect(() => {
    const init = () => {
      fetchStatsAndOrders();
      fetchRevenue();
    };
    const timeoutId = setTimeout(init, 0);

    const interval = setInterval(fetchStatsAndOrders, 30000);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, [fetchStatsAndOrders, fetchRevenue]);

  const currencyFormatter = new Intl.NumberFormat('th-TH', { 
    style: 'currency', 
    currency: 'THB' 
  });

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">แผงควบคุมผู้ดูแลระบบ</h1>
        <PeriodSelector period={period} onPeriodChange={setPeriod} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsLoading ? (
          <KpiCardSkeleton />
        ) : statsError ? (
          <ErrorState 
            title="ข้อมูลสถิติ" 
            error={statsError} 
            onRetry={fetchStatsAndOrders} 
          />
        ) : (
          <>
            <KpiCard 
              title="ยอดขายวันนี้" 
              value={currencyFormatter.format(stats?.todaySales || 0)} 
              icon={TrendingUp} 
              description="รายได้รวมของวันนี้" 
            />
            <KpiCard 
              title="คำสั่งซื้อวันนี้" 
              value={stats?.todayOrders || 0} 
              icon={ShoppingBag} 
              description="จำนวนออเดอร์วันนี้" 
            />
            <KpiCard 
              title="รายการรอดำเนินการ" 
              value={stats?.pendingOrders || 0} 
              icon={Clock} 
              description="ต้องจัดการโดยด่วน" 
            />
            <KpiCard 
              title="ผู้ใช้งานทั้งหมด" 
              value={stats?.totalUsers || 0} 
              icon={Users} 
              description="จำนวนสมาชิกในระบบ" 
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {revenueLoading ? (
          <div className="h-[300px] w-full animate-pulse bg-muted rounded-xl" />
        ) : revenueError ? (
          <ErrorState 
            title="กราฟรายได้" 
            error={revenueError} 
            onRetry={fetchRevenue} 
          />
        ) : (
          <RevenueChart data={revenue} />
        )}
        
        {ordersLoading ? (
          <div className="h-[300px] w-full animate-pulse bg-muted rounded-xl" />
        ) : ordersError ? (
          <ErrorState 
            title="รายการสั่งซื้อ" 
            error={ordersError} 
            onRetry={fetchStatsAndOrders} 
          />
        ) : (
          <RecentOrdersTable orders={orders} />
        )}
      </div>
    </div>
  );
}
