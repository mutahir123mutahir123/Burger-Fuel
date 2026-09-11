import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/constants/menu";
import { pageMetadata } from "@/constants/site";
import { ProductCustomizer } from "@/features/product/components/ProductCustomizer";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Not found" };
  return pageMetadata({
    path: `/product/${slug}`,
    title: product.name,
    description: product.description,
    image: product.image,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="pt-24 md:pt-28">
      <ProductCustomizer product={product} />
    </div>
  );
}