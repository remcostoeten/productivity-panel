'use client';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Slider,
    Switch,
    Table, TableBody, TableCell, TableHead,
    TableHeader,
    TableRow,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Tooltip, TooltipContent, TooltipProvider, TooltipTrigger
} from "@/components/ui/";
import { InfoIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
const VEHICLE_PRESETS = {
  CUSTOM: { name: 'Custom', fuelEfficiency: 15, depreciation: 0, apkCost: 0 },
  SKODA_CITIGO: { name: 'Skoda Citigo', fuelEfficiency: 20, depreciation: 1000, apkCost: 50 },
  VOLKSWAGEN_GOLF: { name: 'Volkswagen Golf', fuelEfficiency: 15, depreciation: 2000, apkCost: 75 },
  TESLA_MODEL_3: { name: 'Tesla Model 3', fuelEfficiency: 100, depreciation: 3000, apkCost: 100 },
}

export default function Component() {
  const [isRoundTrip, setIsRoundTrip] = useState(true)
  const [distance, setDistance] = useState(20)
  const [daysPerWeek, setDaysPerWeek] = useState(5)
  const [reimbursementRate, setReimbursementRate] = useState(0.23)
  const [maxReimbursableDistance, setMaxReimbursableDistance] = useState(0)
  const [fuelPrice, setFuelPrice] = useState(2.1)
  const [selectedVehicle, setSelectedVehicle] = useState('CUSTOM')
  const [fuelEfficiency, setFuelEfficiency] = useState(VEHICLE_PRESETS.CUSTOM.fuelEfficiency)
  const [depreciation, setDepreciation] = useState(VEHICLE_PRESETS.CUSTOM.depreciation)
  const [apkCost, setApkCost] = useState(VEHICLE_PRESETS.CUSTOM.apkCost)
  const [results, setResults] = useState({
    weekly: { distance: 0, reimbursableDistance: 0, cost: 0, reimbursement: 0, netGain: 0 },
    monthly: { distance: 0, reimbursableDistance: 0, cost: 0, reimbursement: 0, netGain: 0 },
    yearly: { distance: 0, reimbursableDistance: 0, cost: 0, reimbursement: 0, netGain: 0 }
  })

  useEffect(() => {
    calculateResults()
  }, [isRoundTrip, distance, daysPerWeek, reimbursementRate, maxReimbursableDistance, fuelPrice, selectedVehicle, fuelEfficiency, depreciation, apkCost])

  const calculateResults = () => {
    const tripDistance = isRoundTrip ? distance * 2 : distance
    const weeklyDistance = tripDistance * daysPerWeek
    const reimbursableDistance = maxReimbursableDistance > 0 
      ? Math.min(tripDistance, maxReimbursableDistance) * daysPerWeek
      : weeklyDistance
    const weeklyCost = (weeklyDistance * fuelPrice) / fuelEfficiency + (depreciation + apkCost) / 52
    const weeklyReimbursement = reimbursableDistance * reimbursementRate
    const weeklyNetGain = weeklyReimbursement - weeklyCost

    setResults({
      weekly: {
        distance: weeklyDistance,
        reimbursableDistance: reimbursableDistance,
        cost: weeklyCost,
        reimbursement: weeklyReimbursement,
        netGain: weeklyNetGain
      },
      monthly: {
        distance: weeklyDistance * 4,
        reimbursableDistance: reimbursableDistance * 4,
        cost: weeklyCost * 4,
        reimbursement: weeklyReimbursement * 4,
        netGain: weeklyNetGain * 4
      },
      yearly: {
        distance: weeklyDistance * 52,
        reimbursableDistance: reimbursableDistance * 52,
        cost: weeklyCost * 52,
        reimbursement: weeklyReimbursement * 52,
        netGain: weeklyNetGain * 52
      }
    })
  }

  const formatNumber = (value: number, decimals: number = 2) => {
    return value.toFixed(decimals)
  }

  const handleVehicleChange = (value: string) => {
    setSelectedVehicle(value)
    const preset = VEHICLE_PRESETS[value]
    setFuelEfficiency(preset.fuelEfficiency)
    setDepreciation(preset.depreciation)
    setApkCost(preset.apkCost)
  }

  return (
    <TooltipProvider>
      <Card className="w-full max-w-4xl mx-auto bg-gray-950 text-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Woon-werkverkeer Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="trip-type" className="text-sm font-medium">
                Round Trip
              </Label>
              <Switch
                id="trip-type"
                checked={isRoundTrip}
                onCheckedChange={setIsRoundTrip}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="distance" className="text-sm font-medium">
                Distance (km) {isRoundTrip ? '(one way)' : ''}
              </Label>
              <Slider
                id="distance"
                min={1}
                max={200}
                step={1}
                value={[distance]}
                onValueChange={(value) => setDistance(value[0])}
              />
              <div className="text-right text-sm text-gray-400">{distance} km</div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="days-per-week" className="text-sm font-medium">
                Days per week
              </Label>
              <Slider
                id="days-per-week"
                min={1}
                max={7}
                step={1}
                value={[daysPerWeek]}
                onValueChange={(value) => setDaysPerWeek(value[0])}
              />
              <div className="text-right text-sm text-gray-400">{daysPerWeek} days</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reimbursement-rate" className="text-sm font-medium">
                  Reimbursement Rate (€/km)
                </Label>
                <div className="flex items-center">
                  <Input
                    id="reimbursement-rate"
                    type="number"
                    value={reimbursementRate}
                    onChange={(e) => setReimbursementRate(Number(e.target.value))}
                    step={0.01}
                    className="bg-gray-900 border-gray-800"
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="ml-2 h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Reimbursement rate per kilometer (default: €0.23)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-reimbursable-distance" className="text-sm font-medium">
                  Max Reimbursable Distance (km)
                </Label>
                <div className="flex items-center">
                  <Input
                    id="max-reimbursable-distance"
                    type="number"
                    value={maxReimbursableDistance}
                    onChange={(e) => setMaxReimbursableDistance(Number(e.target.value))}
                    step={1}
                    className="bg-gray-900 border-gray-800"
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="ml-2 h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Maximum reimbursable distance per trip (0 for no limit)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fuel-price" className="text-sm font-medium">
                Fuel Price (€/L)
              </Label>
              <div className="flex items-center">
                <Input
                  id="fuel-price"
                  type="number"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(Number(e.target.value))}
                  step={0.01}
                  className="bg-gray-900 border-gray-800"
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="ml-2 h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Current price of fuel per liter</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle-select" className="text-sm font-medium">
                Select Vehicle
              </Label>
              <Select value={selectedVehicle} onValueChange={handleVehicleChange}>
                <SelectTrigger id="vehicle-select" className="bg-gray-900 border-gray-800">
                  <SelectValue placeholder="Select a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(VEHICLE_PRESETS).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fuel-efficiency" className="text-sm font-medium">
                  Fuel Efficiency (km/L)
                </Label>
                <div className="flex items-center">
                  <Input
                    id="fuel-efficiency"
                    type="number"
                    value={fuelEfficiency}
                    onChange={(e) => setFuelEfficiency(Number(e.target.value))}
                    step={0.1}
                    className="bg-gray-900 border-gray-800"
                    disabled={selectedVehicle !== 'CUSTOM'}
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="ml-2 h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>How many kilometers your vehicle can travel per liter of fuel</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="depreciation" className="text-sm font-medium">
                  Yearly Depreciation (€)
                </Label>
                <div className="flex items-center">
                  <Input
                    id="depreciation"
                    type="number"
                    value={depreciation}
                    onChange={(e) => setDepreciation(Number(e.target.value))}
                    className="bg-gray-900 border-gray-800"
                    disabled={selectedVehicle !== 'CUSTOM'}
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="ml-2 h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Estimated yearly depreciation of your vehicle</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="apk-cost" className="text-sm font-medium">
                  Yearly APK Cost (€)
                </Label>
                <div className="flex items-center">
                  <Input
                    id="apk-cost"
                    type="number"
                    value={apkCost}
                    onChange={(e) => setApkCost(Number(e.target.value))}
                    className="bg-gray-900 border-gray-800"
                    disabled={selectedVehicle !== 'CUSTOM'}
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="ml-2 h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Annual cost for APK (Periodic Vehicle Inspection)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
            <Tabs defaultValue="weekly" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
              {Object.entries(results).map(([period, data]) => (
                <TabsContent key={period} value={period}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[180px]">Category</TableHead>
                        <TableHead>Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Total Distance</TableCell>
                        <TableCell>{formatNumber(data.distance)} km</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Reimbursable Distance</TableCell>
                        <TableCell>{formatNumber(data.reimbursableDistance)} km</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Cost</TableCell>
                        <TableCell>€{formatNumber(data.cost)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Reimbursement</TableCell>
                        <TableCell>€{formatNumber(data.reimbursement)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Net Gain/Loss</TableCell>
                        <TableCell className={data.netGain >= 0 ? 'text-green-400' : 'text-red-400'}>
                          €{formatNumber(data.netGain)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}