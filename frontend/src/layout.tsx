import { Toaster } from "@/components/ui/toaster"


// @ts-expect-error missing type
export default function RootLayout({ children }) {
  return (
		<div>
			<main>{children}</main>
			<Toaster />
		</div>
  )
}
