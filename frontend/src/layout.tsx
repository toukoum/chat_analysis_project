import { Toaster } from "@/components/ui/toaster"


// @ts-expect-error missing type
export default function RootLayout({ children }) {
  return (
		<div>
			<header className="border-b text-white bg-neutral-900	p-2 absolute w-full">
				<h1 className="font-semibold">Raphael Giraud - <span className="text-blue-500 font-normal">Lighton Internship enablement Code Project</span> </h1>
			</header>
			<main>{children}</main>
			<Toaster />
		</div>
  )
}
