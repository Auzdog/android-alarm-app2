"use client"

import { useState } from "react"
import {
  Bell,
  Clock,
  Timer,
  Plus,
  Trash2,
  X,
  RotateCcw,
  Play,
  Pause,
  ChevronLeft,
  Moon,
  Volume2,
  Repeat,
  Edit3,
  Settings,
} from "lucide-react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

export default function AlarmApp() {
  const [activeTab, setActiveTab] = useState("alarm")
  const [showNewAlarm, setShowNewAlarm] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [showAlarmDetails, setShowAlarmDetails] = useState(false)
  const [showAlarmTriggering, setShowAlarmTriggering] = useState(false)
  const [showTimerRunning, setShowTimerRunning] = useState(false)
  const [stopwatchRunning, setStopwatchRunning] = useState(false)
  const [showLaps, setShowLaps] = useState(false)

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
    <div className="flex flex-col flex-1 bg-white">
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
                    onClick={() => setShowAlarmDetails(true)}
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
              <Button
                className="h-14 w-14 rounded-full bg-orange-500 hover:bg-orange-600"
                onClick={() => setShowNewAlarm(true)}
              >
                <Plus className="h-6 w-6 text-white" />
              </Button>
            </div>
          </TabsContent>

          {/* Stopwatch Tab */}
          <TabsContent value="stopwatch" className="flex-1 flex flex-col p-0 m-0 data-[state=active]:flex">
            <div className="flex-1 w-full flex flex-col items-center justify-between p-4">
              <div className="flex-1 flex flex-col items-center justify-center w-full">
                <div className="text-5xl font-light mb-8">{showLaps ? "00:01.45" : "00:00.39"}</div>

                {showLaps && (
                  <ScrollArea className="w-full max-h-[200px] mb-8 px-8">
                    {laps.map((lap) => (
                      <div key={lap.id} className="flex justify-between py-2 border-b border-gray-100">
                        <span>Lap {lap.id}</span>
                        <span>{lap.time}</span>
                        <span className="text-gray-400">{lap.delta}</span>
                      </div>
                    ))}
                  </ScrollArea>
                )}
              </div>

              <div className="flex items-center gap-4 mb-4 pb-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full border-orange-200"
                  onClick={() => setShowLaps(!showLaps)}
                >
                  <RotateCcw className="h-5 w-5 text-orange-500" />
                </Button>
                <Button
                  className="h-16 w-16 rounded-full bg-orange-500 hover:bg-orange-600"
                  onClick={() => setStopwatchRunning(!stopwatchRunning)}
                >
                  {stopwatchRunning ? (
                    <Pause className="h-6 w-6 text-white" />
                  ) : (
                    <Play className="h-6 w-6 text-white ml-1" />
                  )}
                </Button>
                {showLaps && (
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-orange-200">
                    <Clock className="h-5 w-5 text-orange-500" />
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Timer Tab */}
          <TabsContent value="timer" className="flex-1 flex flex-col p-0 m-0 data-[state=active]:flex">
            {!showTimerRunning ? (
              <div className="flex-1 w-full flex flex-col items-center justify-between">
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
                <div className="flex justify-center mb-4 pb-2">
                  <Button
                    className="h-14 w-14 rounded-full bg-orange-500 hover:bg-orange-600"
                    onClick={() => setShowTimerRunning(true)}
                  >
                    <Play className="h-6 w-6 text-white ml-1" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex-1 w-full flex flex-col items-center justify-between">
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
                  <Button
                    className="h-16 w-16 rounded-full bg-orange-500 hover:bg-orange-600"
                    onClick={() => setShowTimerRunning(false)}
                  >
                    <Pause className="h-6 w-6 text-white" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-orange-200">
                    <Plus className="h-5 w-5 text-orange-500" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="flex-1 flex flex-col p-0 m-0 data-[state=active]:flex">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Settings</h2>
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
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <div className="h-14 border-t flex items-center justify-around">
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

      {/* New Alarm Dialog */}
      <Dialog open={showNewAlarm} onOpenChange={setShowNewAlarm}>
        <DialogContent className="sm:max-w-[375px] p-0 gap-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="text-center">New Alarm</DialogTitle>
          </DialogHeader>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="alarm-name">Alarm Name</Label>
              <Input id="alarm-name" placeholder="Morning Alarm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => {
                  setShowNewAlarm(false)
                  setShowTimePicker(true)
                }}
              >
                Select time
                <Clock className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Repeat</Label>
              <div className="flex justify-between">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className={`h-8 w-8 p-0 rounded-full ${i > 0 && i < 6 ? "bg-orange-500 text-white border-orange-500" : ""}`}
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Sound</Label>
                <Button variant="ghost" className="h-8 text-orange-500">
                  Browse
                </Button>
              </div>
              <RadioGroup defaultValue="default" className="space-y-1">
                <div className="flex items-center justify-between space-x-2 p-2 rounded bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="default" />
                    <Label htmlFor="default" className="font-normal">
                      Default
                    </Label>
                  </div>
                  <Volume2 className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between space-x-2 p-2 rounded bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gentle" id="gentle" />
                    <Label htmlFor="gentle" className="font-normal">
                      Gentle Rise
                    </Label>
                  </div>
                  <Volume2 className="h-4 w-4 text-gray-400" />
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Vibration</Label>
                <Switch />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Snooze</Label>
                <Switch defaultChecked />
              </div>
              <div className="pl-4 space-y-1">
                <Label className="text-sm text-gray-500">Snooze duration</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">5 minutes</span>
                  <div className="w-32">
                    <Slider defaultValue={[5]} max={15} step={1} />
                  </div>
                  <span className="text-sm">15 minutes</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="p-4 border-t">
            <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={() => setShowNewAlarm(false)}>
              Create Alarm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Time Picker Dialog */}
      <Dialog open={showTimePicker} onOpenChange={setShowTimePicker}>
        <DialogContent className="sm:max-w-[375px] p-0 gap-0">
          <div className="p-4 flex justify-between items-center border-b">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowTimePicker(false)
                setShowNewAlarm(true)
              }}
            >
              <X className="h-5 w-5" />
            </Button>
            <span className="text-lg font-medium">Select Time</span>
            <div className="w-8"></div>
          </div>
          <div className="p-4 flex justify-center">
            <div className="flex text-2xl font-light">
              <div className="w-16 text-center">
                <div className="py-2 text-orange-500">01</div>
                <div className="py-2 bg-gray-50">02</div>
                <div className="py-2">03</div>
                <div className="py-2">04</div>
                <div className="py-2">05</div>
                <div className="py-2">06</div>
              </div>
              <div className="w-16 text-center">
                <div className="py-2 text-orange-500">00</div>
                <div className="py-2 bg-gray-50">01</div>
                <div className="py-2">02</div>
                <div className="py-2">03</div>
                <div className="py-2">04</div>
                <div className="py-2">05</div>
              </div>
              <div className="w-16 text-center">
                <div className="py-2 text-orange-500">AM</div>
                <div className="py-2 bg-gray-50">PM</div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600"
              onClick={() => {
                setShowTimePicker(false)
                setShowNewAlarm(true)
              }}
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Alarm Details Dialog */}
      <Dialog open={showAlarmDetails} onOpenChange={setShowAlarmDetails}>
        <DialogContent className="sm:max-w-[375px] p-0 gap-0">
          <DialogHeader className="p-4 border-b flex flex-row items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => setShowAlarmDetails(false)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <DialogTitle>Alarm Details</DialogTitle>
            <Button variant="ghost" size="icon" className="text-orange-500">
              <Edit3 className="h-5 w-5" />
            </Button>
          </DialogHeader>
          <div className="p-4 space-y-4">
            <div className="flex justify-center">
              <div className="text-5xl font-light">04:00</div>
            </div>
            <div className="text-center text-gray-500">Wake up for work</div>
            <div className="space-y-2 pt-4">
              <div className="flex justify-between items-center p-3 rounded bg-gray-50">
                <div className="flex items-center">
                  <Repeat className="h-5 w-5 text-gray-400 mr-3" />
                  <span>Repeat</span>
                </div>
                <div className="text-sm text-gray-500">Mon, Tue, Wed, Thu, Fri</div>
              </div>
              <div className="flex justify-between items-center p-3 rounded bg-gray-50">
                <div className="flex items-center">
                  <Volume2 className="h-5 w-5 text-gray-400 mr-3" />
                  <span>Sound</span>
                </div>
                <div className="text-sm text-gray-500">Default</div>
              </div>
              <div className="flex justify-between items-center p-3 rounded bg-gray-50">
                <div className="flex items-center">
                  <Moon className="h-5 w-5 text-gray-400 mr-3" />
                  <span>Snooze</span>
                </div>
                <div className="text-sm text-gray-500">5 minutes</div>
              </div>
            </div>
          </div>
          <DialogFooter className="p-4 border-t flex justify-between">
            <Button variant="outline" className="text-red-500 border-red-200">
              Delete
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Enabled</span>
              <Switch defaultChecked />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alarm Triggering Screen */}
      {showAlarmTriggering && (
        <div className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center p-6">
          <div className="text-6xl font-light mb-2">04:00</div>
          <div className="text-xl text-gray-500 mb-12">Wake up for work</div>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Button
              className="h-14 bg-orange-500 hover:bg-orange-600 text-lg"
              onClick={() => setShowAlarmTriggering(false)}
            >
              Dismiss
            </Button>
            <Button variant="outline" className="h-14 text-lg" onClick={() => setShowAlarmTriggering(false)}>
              Snooze (5 min)
            </Button>
          </div>
        </div>
      )}

      {/* Demo Controls - Not part of the actual app */}
      <div className="absolute bottom-20 right-4 z-50 flex flex-col gap-2">
        <Button
          size="sm"
          variant="outline"
          className="bg-white shadow-md border-gray-200"
          onClick={() => setShowAlarmTriggering(!showAlarmTriggering)}
        >
          Toggle Alarm
        </Button>
      </div>
    </div>
  )
}

