import { Card, CardContent } from "@/components/ui/card";
import React from "react";

type StatsCardProps = {
    icon: React.ElementType;
    label: string;
    bgColor: string;
    value: string
    iconColor: string
}

export const StatsCard = ({ bgColor, icon, value, label, iconColor }: StatsCardProps) => {

    return (
        <Card className="relative bg-zinc-800/50 hover:bg-zinc-800/80 transition-colors" >
            <CardContent className="p-4 flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${bgColor}`}>
                    {icon && React.createElement(icon, { className: `w-5 h-5 ${iconColor}` })}
                </div>
                <div>
                    <p className="text-xs font-medium text-muted-foreground">
                        {label}
                    </p>
                    <h3 className="text-xl font-bold">
                        {value}
                    </h3>
                </div>
            </CardContent>
        </Card>
    )
}
