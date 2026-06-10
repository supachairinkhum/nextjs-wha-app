import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
}

export function KpiCard({ title, value, icon: Icon, description }: KpiCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  );
}

export function KpiCardSkeleton() {
  return (
    <div className="grid gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="p-6 rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex justify-between mb-2">
            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            <div className="h-4 w-4 bg-muted animate-pulse rounded" />
          </div>
          <div className="h-8 w-32 bg-muted animate-pulse rounded mb-2" />
          <div className="h-3 w-full bg-muted animate-pulse rounded" />
        </div>
      ))}
    </div>
  );
}
