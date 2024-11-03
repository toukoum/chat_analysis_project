import { Label, Pie, PieChart } from "recharts"

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

export const description = "A donut chart with text"


const chartConfig = {
	"summarization": { label: "Summarization", color: "hsl(var(--chart-1))" },
	"translation": { label: "Translation", color: "hsl(var(--chart-2))" },
	"paraphrasing": { label: "Paraphrasing", color: "hsl(var(--chart-3))" },
	"roleplay": { label: "Role-play", color: "hsl(var(--chart-4))" },
	"miscellaneous": { label: "Miscellaneous", color: "hsl(var(--chart-5))" },
	"unknown": { label: "Unknown", color: "hex(#ccc)" },
} satisfies ChartConfig

const colorsIntent: { [key: string]: string } = {
	"Summarization": "hsl(var(--chart-1))",
	"Translation": "hsl(var(--chart-2))",
	"Paraphrasing": "hsl(var(--chart-3))",
	"Role-play": "hsl(var(--chart-4))",
	"Miscellaneous": "hsl(var(--chart-5))",
	"Unknown": "hex(#ccc)",
}

interface IntentProps {
  intentData: { [key: string]: number };
}

export default function IntentChart({ intentData: intentData }: IntentProps) {
	const chartData = Object.keys(intentData).map((intent) => ({
		intent: intent,
		count: intentData[intent],
		fill: colorsIntent[intent],
	}))

	// Calculer le nb de catégories d'intentions
	const totalIntent = chartData.length

	const unknownIntents = intentData["Unknown"] || 0;
	const totalClassified = chartData.reduce((acc, { count }) => acc + count, 0) - unknownIntents;


	return (
		<Card className="flex flex-col">
			<CardHeader className="items-start pb-0">
				<CardTitle>User intents distribution</CardTitle>
				<CardDescription>Show the distribution of user intents in the dataset.</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={true}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="count"
							nameKey="intent"
							innerRadius={60}
							strokeWidth={5}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold"
												>
													{totalIntent.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													Intents
												</tspan>
											</text>
										)
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total classified intents: { totalClassified }
        </div>
        <div className="leading-none text-muted-foreground">
          with { unknownIntents } unknown intents
        </div>
      </CardFooter>
		</Card>
	)
}
