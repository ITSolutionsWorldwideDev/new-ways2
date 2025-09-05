import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatusCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
}

export function StatusCard({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBgColor,
}: StatusCardProps) {
  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${iconBgColor}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </Card>
  );
}
