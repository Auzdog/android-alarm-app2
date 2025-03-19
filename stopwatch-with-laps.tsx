import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Clock, Pause, RotateCcw, Settings, Timer } from "lucide-react"

export default function StopwatchWithLaps() {
  const laps = [
    { id: 1, time: "00:45.32", delta: "+00:45.32" },
    { id: 2, time: "01:23.67", delta: "+00:38.35" },
    { id: 3, time: "01:59.21", delta: "+00:35.54" },
    { id: 4, time: "02:34.89", delta: "+00:35.68" },
    { id: 5, time: "03:12.45", delta: "+00:37.56" },
  ]

  return (
    <div className="flex flex-col h-[667px] w-[375px] bg-white">
      <div className="flex-1 w-full flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-between p-4">
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <div className="text-5xl font-light mb-8">03:12.45</div>

            <ScrollArea className="w-full max-h-[300px] mb-8 px-4">
              {laps.map((lap) => (
                <div key={lap.id} className="flex justify-between py-3 border-b border-gray-100">
                  <span>Lap {lap.id}</span>
                  <span>{lap.time}</span>
                  <span className="text-gray-400">{lap.delta}</span>
                </div>
              ))}
            </ScrollArea>
          </div>

          <div className="flex items-center gap-4 mb-4 pb-2">
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-orange-200">
              <RotateCcw className="h-5 w-5 text-orange-500" />
            </Button>
            <Button className="h-16 w-16 rounded-full bg-orange-500 hover:bg-orange-600">
              <Pause className="h-6 w-6 text-white" />
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-orange-200">
              <Clock className="h-5 w-5 text-orange-500" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="h-14 border-t flex items-center justify-around">
        <Button variant="ghost" className="flex flex-col items-center gap-1 h-12 text-gray-500">
          <Bell className="h-5 w-5" />
          <span className="text-xs">Alarm</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center gap-1 h-12 text-orange-500">
          <Clock className="h-5 w-5" />
          <span className="text-xs">Stopwatch</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center gap-1 h-12 text-gray-500">
          <Timer className="h-5 w-5" />
          <span className="text-xs">Timer</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center gap-1 h-12 text-gray-500">
          <Settings className="h-5 w-5" />
          <span className="text-xs">Settings</span>
        </Button>
      </div>
    </div>
  )
}

