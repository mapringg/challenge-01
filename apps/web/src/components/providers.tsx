"use client";

import { TRPCReactProvider } from "@/lib/trpc/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

export default function Providers({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<TRPCReactProvider>
				{children}
				<ReactQueryDevtools />
			</TRPCReactProvider>
			<Toaster richColors />
		</ThemeProvider>
	);
}
