import { Button } from "@/components/ui/button"
import { Bell, Clock, Pause, Plus, Settings, Timer, X } from "lucide-react"

export default function TimerRunning() {
  return (
    <div className="flex flex-col h-[667px] w-[375px] bg-white">
      <div className="flex-1 w-full flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-between p-4">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative mb-8">
              <svg className="w-48 h-48">
                <circle cx="96" cy="96" r="88" fill="none" stroke="#f0f0f0" strokeWidth="8" />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="8"
                  strokeDasharray="553"
                  strokeDashoffset="138"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-light">12:45</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4 pb-2">
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-orange-200">
              <X className="h-5 w-5 text-orange-500" />
            </Button>
            <Button className="h-16 w-16 rounded-full bg-orange-500 hover:bg-orange-600">
              <Pause className="h-6 w-6 text-white" />
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-orange-200">
              <Plus className="h-5 w-5 text-orange-500" />
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
        <Button variant="ghost" className="flex flex-col items-center gap-1 h-12 text-gray-500">
          <Clock className="h-5 w-5" />
          <span className="text-xs">Stopwatch</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center gap-1 h-12 text-orange-500">
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

