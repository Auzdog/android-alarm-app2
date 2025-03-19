import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft } from "lucide-react"

export default function SettingsScreen() {
  return (
    <div className="flex flex-col h-[667px] w-[375px] bg-white">
      <div className="p-4 border-b flex items-center">
        <Button variant="ghost" size="icon">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-medium ml-4">Settings</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">APPEARANCE</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2">
                <span>Dark Mode</span>
                <Switch />
              </div>
              <div className="flex justify-between items-center p-2">
                <span>24-hour format</span>
                <Switch />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">ALARMS</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2">
                <span>Gradually increase volume</span>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-between items-center p-2">
                <span>Default snooze time</span>
                <span className="text-sm text-gray-500">5 minutes</span>
              </div>
              <div className="flex justify-between items-center p-2">
                <span>Default alarm sound</span>
                <span className="text-sm text-gray-500">Default</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">TIMER</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2">
                <span>Timer sound</span>
                <span className="text-sm text-gray-500">Digital</span>
              </div>
              <div className="flex justify-between items-center p-2">
                <span>Vibrate on completion</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">ADVANCED</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2">
                <span>Silence after</span>
                <span className="text-sm text-gray-500">15 minutes</span>
              </div>
              <div className="flex justify-between items-center p-2">
                <span>Volume buttons behavior</span>
                <span className="text-sm text-gray-500">Snooze</span>
              </div>
              <div className="flex justify-between items-center p-2">
                <span>Backup alarms</span>
                <Button variant="ghost" className="h-8 text-orange-500 p-0">
                  Backup
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

