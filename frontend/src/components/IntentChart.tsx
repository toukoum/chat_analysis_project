import * as React from "react"
import { TrendingUp } from "lucide-react"
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
	ChartLegend,
	ChartLegendContent,
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
} satisfies ChartConfig

const colorsIntent: { [key: string]: string } = {
	"Summarization": "hsl(var(--chart-1))",
	"Translation": "hsl(var(--chart-2))",
	"Paraphrasing": "hsl(var(--chart-3))",
	"Role-play": "hsl(var(--chart-4))",
	"Miscellaneous": "hsl(var(--chart-5))",
}




export default function Component({ intentData }) {
	// Créer un tableau de données pour le graphique à partir de intentData
	const chartData = Object.keys(intentData).map((intent) => ({
		intent: intent,              // Nom de l'intention
		count: intentData[intent],    // Nombre d'occurrences de l'intention
		fill: colorsIntent[intent],  // Utiliser la couleur de chartConfig ou une couleur par défaut si l'intention est manquante
	}))

	// Calculer le nb de catégories d'intentions
	const totalIntent = chartData.length

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
							dataKey="count"      // Correction : correspond à la valeur dans chartData
							nameKey="intent"     // Correction : correspond à l'intention dans chartData
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
          The average is 30% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing intent distribution for all user messages
        </div>
      </CardFooter>
		</Card>
	)
}
