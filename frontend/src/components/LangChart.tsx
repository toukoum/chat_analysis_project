import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart with a label"



const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export interface LangData {
	[key: string]: number
}

interface LangProps {
	langData: { [key: string]: number };
}

export default function LangChart({ langData: langData }: LangProps) {

	console.log(langData)

	const chartData = Object.keys(langData).map((language) => ({
    language: language,
    count: langData[language],
  }))

	const most_spoken = chartData.reduce((a, b) => a.count > b.count ? a : b)
	const less_spoken = chartData.reduce((a, b) => a.count < b.count ? a : b)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Languages distribution</CardTitle>
        <CardDescription>Show the distribution of languages in the dataset.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="language"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
							interval={0}
							minTickGap={300}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          The most talk language is { most_spoken.language }
        </div>
        <div className="leading-none text-muted-foreground">
          The less one is { less_spoken.language }
        </div>
      </CardFooter>
    </Card>
  )
}
