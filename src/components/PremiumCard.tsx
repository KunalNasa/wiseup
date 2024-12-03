'use client'
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation"

const notifications = [
  {
    title: "Unlimited transaction entries",
  },
  {
    title: "Weekly spend analysis report",
  },
  {
    title: "Daily expense tracking insights",
  },
]

type CardProps = React.ComponentProps<typeof Card>

export function PremiumCard({ className, ...props }: CardProps) {
  const router = useRouter();
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-indigo-500 text-2xl">Go Premium, Go Limitless!</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-3 w-3 translate-y-1 rounded-full bg-green-500" />
              <div className="space-y-1">
                <p className=" text-lg font-medium leading-none">
                  {notification.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => {router.replace('/subscribe')}} className="w-full bg-indigo-500 hover:bg-green-500 font-semibold">
          <Check />  Upgrade to Premium Now 
        </Button>
      </CardFooter>
    </Card>
  )
}
