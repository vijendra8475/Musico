import { Card, CardContent } from "@/components/ui/card";
import React from "react";

type StatsCardProps = {
    icon: React.ElementType;
    label: string;
    bgColor: string;
    value: string
    iconColor : string
}

export const StatsCard = ({ bgColor, icon, value, label, iconColor } : StatsCardProps) => {
    console.log(value);
    

    return (
        <Card className="relative bg-zinc-800/50 hover:bg-zinc-800/80 transition-colors" >
            <CardContent className="p-6 flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${bgColor}`}>
                {icon && React.createElement(icon, { className: `w-6 h-6 ${iconColor}` })}
            </div>
            <div>
                <p className="text-sm font-medium text-muted-foreground">
                {label}
                </p>
                <h3 className="text-2xl font-bold">
                {value}
                </h3>
            </div>
            </CardContent>
        </Card>
    )
}
