"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenuePoint } from "@/types/admin";

interface RevenueChartProps {
  data: RevenuePoint[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const formatter = new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  });

  return (
    <Card className="col-span-full lg:col-span-3">
      <CardHeader>
        <CardTitle>รายได้และคำสั่งซื้อ</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip 
              formatter={(value) => formatter.format(Number(value))}
              labelStyle={{ color: 'foreground' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              name="รายได้" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2} 
              dot={false} 
            />
            <Line 
              type="monotone" 
              dataKey="orders" 
              name="คำสั่งซื้อ" 
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth={2} 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
