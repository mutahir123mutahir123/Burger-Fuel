import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/constants/categories";
import { pageMetadata } from "@/constants/site";
import { CategoryPage } from "@/features/category/components/CategoryPage";

interface CategoryRouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Not found" };
  return pageMetadata({
    path: `/category/${slug}`,
    title: category.name,
    description: `${category.blurb}. Explore the ${category.name} menu at Burger Fuel, Shad Bagh, Lahore.`,
    image: category.image,
  });
}

export default async function CategoryRoute({ params }: CategoryRouteProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  return <CategoryPage category={category} />;
}
