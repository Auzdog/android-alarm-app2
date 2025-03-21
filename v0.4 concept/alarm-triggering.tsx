import { Button } from "@/components/ui/button"

export default function AlarmTriggering() {
  return (
    <div className="flex flex-col h-[667px] w-[375px] bg-white items-center justify-center p-6">
      <div className="text-6xl font-light mb-2">04:00</div>
      <div className="text-xl text-gray-500 mb-12">Wake up for work</div>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button className="h-14 bg-orange-500 hover:bg-orange-600 text-lg">Dismiss</Button>
        <Button variant="outline" className="h-14 text-lg">
          Snooze (5 min)
        </Button>
      </div>
    </div>
  )
}

