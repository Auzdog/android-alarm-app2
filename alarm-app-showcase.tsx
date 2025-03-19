"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import AlarmApp from "./alarm-app"
import AlarmTriggering from "./alarm-triggering"
import StopwatchWithLaps from "./stopwatch-with-laps"
import TimerRunning from "./timer-running"

export default function AlarmAppShowcase() {
  const [activeScreen, setActiveScreen] = useState("main")

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <h1 className="text-2xl font-bold">Alarm App Mockups</h1>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <Button variant={activeScreen === "main" ? "default" : "outline"} onClick={() => setActiveScreen("main")}>
          Main App
        </Button>
        <Button
          variant={activeScreen === "alarm-triggering" ? "default" : "outline"}
          onClick={() => setActiveScreen("alarm-triggering")}
        >
          Alarm Triggering
        </Button>
        <Button
          variant={activeScreen === "stopwatch-laps" ? "default" : "outline"}
          onClick={() => setActiveScreen("stopwatch-laps")}
        >
          Stopwatch with Laps
        </Button>
        <Button
          variant={activeScreen === "timer-running" ? "default" : "outline"}
          onClick={() => setActiveScreen("timer-running")}
        >
          Timer Running
        </Button>
      </div>

      <div className="border rounded-lg shadow-lg overflow-hidden">
        {activeScreen === "main" && <AlarmApp />}
        {activeScreen === "alarm-triggering" && <AlarmTriggering />}
        {activeScreen === "stopwatch-laps" && <StopwatchWithLaps />}
        {activeScreen === "timer-running" && <TimerRunning />}
      </div>

      <div className="mt-4 text-sm text-gray-500 max-w-md text-center">
        <p>
          Note: The main app has interactive elements. Click the "+" button to see the New Alarm dialog, click on an
          alarm to see details, or switch between tabs using the bottom navigation.
        </p>
      </div>
    </div>
  )
}

