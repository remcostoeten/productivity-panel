import React from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function HomeSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">CUSTOMIZE HOME FEED</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="birthdays">Birthdays</Label>
              <p className="text-sm text-muted-foreground">Get notified when someone you know is celebrating their birthday.</p>
            </div>
            <Switch id="birthdays" />
          </div>
          <div>
            <Button variant="secondary" size="sm">Request Missing Birthdays</Button>
            <p className="text-sm text-muted-foreground mt-1">View missing birthdays for close relationships and ask some or all of those people to add their birthday in one click.</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="calendar-relationships">Calendar Relationships</Label>
              <p className="text-sm text-muted-foreground">This includes people you have calendar events with.</p>
            </div>
            <Switch id="calendar-relationships" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="recurring-events">Recurring Events</Label>
              <p className="text-sm text-muted-foreground">Includes people from recurring calendar events.</p>
            </div>
            <Switch id="recurring-events" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="recent-people">Recent People</Label>
              <p className="text-sm text-muted-foreground">Include people you've met in the past 14 days.</p>
            </div>
            <Switch id="recent-people" />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">NEWS</h3>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="news">Get notified when someone you know is mentioned in one of over 20,000 global publications.</Label>
          </div>
          <Switch id="news" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">RECONNECT</h3>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="reconnect">Reconnect</Label>
          </div>
          <Switch id="reconnect" />
        </div>
      </div>
    </div>
  )
}