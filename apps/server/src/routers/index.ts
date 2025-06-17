import { db } from "../db";
import { productStats, products } from "../db/schema/products";
import { publicProcedure, router } from "../lib/trpc";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	getAllProducts: publicProcedure.query(async () => {
		const allProducts = await db.select().from(products);

		await new Promise((resolve) => setTimeout(resolve, 500));

		const processedProducts = allProducts.map((product) => {
			const processed = { ...product };
			if (processed.name)
				processed.name = processed.name.toUpperCase().toLowerCase();
			if (processed.description)
				processed.description = processed.description
					.toUpperCase()
					.toLowerCase();
			if (processed.brand)
				processed.brand = processed.brand.toUpperCase().toLowerCase();

			return processed;
		});

		return {
			products: processedProducts,
		};
	}),
	getLatestProductStats: publicProcedure.query(async () => {
		const latestStats = await db
			.select()
			.from(productStats)
			.orderBy(productStats.created_at)
			.limit(1);

		return {
			stats: latestStats[0] || null,
		};
	}),
});
export type AppRouter = typeof appRouter;
