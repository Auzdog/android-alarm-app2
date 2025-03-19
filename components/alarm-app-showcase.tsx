"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, Clock, Timer, Plus, Trash2, Settings, Play, RotateCcw } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent } from "@/components/ui/tabs"

export default function AlarmAppShowcase() {
  const [activeTab, setActiveTab] = useState("alarm")
  const [activeScreen, setActiveScreen] = useState("main")

  // For demo purposes
  const alarms = [
    { id: 1, time: "04:00", label: "Wake up for work", enabled: true },
    { id: 2, time: "07:30", label: "Gym time", enabled: false },
    { id: 3, time: "12:00", label: "Lunch break", enabled: true },
  ]

  const laps = [
    { id: 1, time: "00:45.32", delta: "+00:45.32" },
    { id: 2, time: "01:23.67", delta: "+00:38.35" },
    { id: 3, time: "01:59.21", delta: "+00:35.54" },
  ]

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <h1 className="text-2xl font-bold">Alarm App Mockups</h1>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <Button variant={activeScreen === "main" ? "default" : "outline"} onClick={() => setActiveScreen("main")}>
          Main App
        </Button>
      </div>

      <div className="border rounded-lg shadow-lg overflow-hidden">
        {/* Main App */}
        <div className="flex flex-col h-[667px] w-[375px] bg-white overflow-hidden relative">
          {/* Main App Content */}
          <div className="flex-1 flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              {/* Alarm Tab */}
              <TabsContent value="alarm" className="flex-1 flex flex-col p-0 m-0 data-[state=active]:flex">
                <div className="flex-1 p-4 pb-20">
                  <ScrollArea className="h-full">
                    {alarms.map((alarm) => (
                      <div
                        key={alarm.id}
                        className="flex items-center justify-between p-4 mb-3 rounded-xl bg-gray-50 shadow-sm"
                      >
                        <div>
                          <h3 className="text-2xl font-light">{alarm.time}</h3>
                          <p className="text-gray-500">{alarm.label}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                            <Trash2 className="h-5 w-5" />
                          </Button>
                          <Switch checked={alarm.enabled} />
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
                <div className="absolute bottom-16 left-0 right-0 flex justify-center pb-2">
                  <Button className="h-14 w-14 rounded-full bg-orange-500 hover:bg-orange-600">
                    <Plus className="h-6 w-6 text-white" />
                  </Button>
                </div>
              </TabsContent>

              {/* Stopwatch Tab */}
              <TabsContent value="stopwatch" className="flex-1 flex flex-col p-0 m-0 data-[state=active]:flex">
                <div className="flex-1 w-full flex flex-col items-center p-4 pb-20">
                  <div className="flex-1 flex flex-col items-center justify-center w-full">
                    <div className="text-5xl font-light mb-8">00:00.39</div>
                  </div>
                </div>

                {/* Action buttons positioned the same way as alarm tab */}
                <div className="absolute bottom-16 left-0 right-0 flex justify-center pb-2">
                  <div className="relative">
                    <Button className="h-14 w-14 rounded-full bg-orange-500 hover:bg-orange-600">
                      <Play className="h-6 w-6 text-white ml-1" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-full border-orange-200 absolute -left-16 top-1"
                    >
                      <RotateCcw className="h-5 w-5 text-orange-500" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Timer Tab */}
              <TabsContent value="timer" className="flex-1 flex flex-col p-0 m-0 data-[state=active]:flex">
                <div className="flex-1 w-full flex flex-col items-center p-4 pb-20">
                  <div className="flex-1 flex flex-col items-center justify-center w-full">
                    <div className="text-3xl font-light mb-8">00h 00m 00s</div>
                    <div className="grid grid-cols-3 gap-6 w-full px-12">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, "00", 0, "⌫"].map((num, index) => (
                        <Button key={index} variant="ghost" className="h-14 w-14 text-xl rounded-full mx-auto">
                          {num}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action button positioned the same way as alarm tab */}
                <div className="absolute bottom-16 left-0 right-0 flex justify-center pb-2">
                  <Button className="h-14 w-14 rounded-full bg-orange-500 hover:bg-orange-600">
                    <Play className="h-6 w-6 text-white ml-1" />
                  </Button>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="flex-1 flex flex-col p-0 m-0 data-[state=active]:flex">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-medium">Settings</h2>
                </div>
                <div className="flex-1 overflow-auto pb-14">
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
                    {/* Extra content to demonstrate scrolling */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-500">ABOUT</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2">
                          <span>Version</span>
                          <span className="text-sm text-gray-500">1.0.0</span>
                        </div>
                        <div className="flex justify-between items-center p-2">
                          <span>Privacy Policy</span>
                          <Button variant="ghost" className="h-8 text-orange-500 p-0">
                            View
                          </Button>
                        </div>
                        <div className="flex justify-between items-center p-2">
                          <span>Terms of Service</span>
                          <Button variant="ghost" className="h-8 text-orange-500 p-0">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Bottom Navigation - Always visible with high z-index */}
          <div className="h-14 border-t flex items-center justify-around bg-white z-10 absolute bottom-0 left-0 right-0">
            <Button
              variant="ghost"
              className={`flex flex-col items-center gap-1 h-12 ${activeTab === "alarm" ? "text-orange-500" : "text-gray-500"}`}
              onClick={() => setActiveTab("alarm")}
            >
              <Bell className="h-5 w-5" />
              <span className="text-xs">Alarm</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex flex-col items-center gap-1 h-12 ${activeTab === "stopwatch" ? "text-orange-500" : "text-gray-500"}`}
              onClick={() => setActiveTab("stopwatch")}
            >
              <Clock className="h-5 w-5" />
              <span className="text-xs">Stopwatch</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex flex-col items-center gap-1 h-12 ${activeTab === "timer" ? "text-orange-500" : "text-gray-500"}`}
              onClick={() => setActiveTab("timer")}
            >
              <Timer className="h-5 w-5" />
              <span className="text-xs">Timer</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex flex-col items-center gap-1 h-12 ${activeTab === "settings" ? "text-orange-500" : "text-gray-500"}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="h-5 w-5" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500 max-w-md text-center">
        <p>
          <strong>Key Changes:</strong>
        </p>
        <ul className="text-left list-disc pl-5 mt-2">
          <li>Fixed settings scrolling - now all settings are visible when scrolling</li>
          <li>Ensured navigation tabs have the highest z-index and are always visible</li>
          <li>Made the bottom navigation bar absolute positioned with background to ensure it's always visible</li>
        </ul>
      </div>
    </div>
  )
}

