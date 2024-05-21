import { ilike, or } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Index } from "@upstash/vector";
import { type Product } from "types/globals";

import SearchResult from "~/components/search/search-result";
import { vectorize } from "~/lib/vectorize";
import { db } from "~/server/db";
import { ProductTable } from "~/server/db/schema";

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}
export type CoreProducts = Omit<Product, "categoryId" | "categoryName">;

const index = new Index<CoreProducts>();

const SearchPage = async ({ searchParams }: PageProps) => {
  const search = searchParams.search;

  if (Array.isArray(search) || !search) {
    return redirect("/");
  }

  const whereOptions = or(
    ilike(ProductTable.name, `%${search.trim()}%`),
    ilike(ProductTable.description, `%${search.trim()}%`),
  );

  const products = await db
    .select({
      id: ProductTable.id,
      name: ProductTable.name,
      description: ProductTable.description,
      images: ProductTable.images,
      price: ProductTable.price,
      stock: ProductTable.stock,
    })
    .from(ProductTable)
    .where(whereOptions)
    .limit(3);

  if (products && products.length < 3) {
    const vector = await vectorize(search);

    const res = await index.query({
      topK: 5,
      vector,
      includeMetadata: true,
    });

    const vectorProducts = res
      .filter((existing) => {
        if (
          products?.some((product) => product.id === existing.id) ||
          existing.score < 0.78
        ) {
          return false;
        } else {
          return true;
        }
      })
      .map(({ metadata }) => metadata!);

    products.push(...vectorProducts);
  }

  if (!products || products.length === 0) {
    return <div>No results found</div>;
  }

  return <SearchResult products={products} />;
};

export default SearchPage;
