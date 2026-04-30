import React from "react";
import { Card } from "./Card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ title, value, description, icon, className }: StatCardProps) {
  return (
    <Card className={cn("flex flex-col gap-2", className)} hoverable={true}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted">{title}</h3>
        {icon && <div className="text-spotify-green">{icon}</div>}
      </div>
      <div className="text-3xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted">{description}</p>}
    </Card>
  );
}
