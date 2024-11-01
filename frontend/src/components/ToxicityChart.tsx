import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Toxicity Distribution Histogram"

export default function ToxicityChart({ toxicityData }) {
  // Transforme les données pour recharts
  const chartData = toxicityData.histogram.map((count, index) => ({
    range: `${toxicityData.bin_edges[index].toFixed(2)} - ${toxicityData.bin_edges[index + 1]?.toFixed(2)}`,  // Plage de chaque bin
    count: count, // Nombre de messages dans cette plage
  }))

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
	mobile: {
		label: "Mobile",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig
	

  return (
    <Card>
      <CardHeader>
        <CardTitle>Toxicity Distribution</CardTitle>
        <CardDescription>Distribution of toxicity scores across the dataset</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="range"         // Affiche la plage de chaque bin en axe X
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              label={{ value: "Message Count", angle: -90, position: "insideLeft" }}
            />
            {/*<Tooltip content={<ChartTooltipContent indicator="bar" />} />*/}
            <Bar
              dataKey="count"
              fill="hsl(var(--chart-1))"  // Couleur de remplissage des barres
              radius={[4, 4, 0, 0]}       // Coins arrondis en haut
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing toxicity distribution for all user messages
        </div>
      </CardFooter>
    </Card>
  )
}
