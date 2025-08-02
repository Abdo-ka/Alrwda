import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Share2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProductById } from "@/lib/data";
import ProductImageGallery from "@/components/product-image-gallery";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id, locale } = await params;
  const t = await getTranslations("product");
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <Link href={`/${locale}/products`}>
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentLang = locale as "en" | "ar";

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Link href={`/${locale}/products`}>
          <Button variant="ghost" className="mb-6 hover:bg-brand-silver-100 dark:hover:bg-brand-silver-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <ProductImageGallery 
              images={product.images} 
              productName={product.name[currentLang]} 
            />
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {product.name[currentLang]}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-palette-amber-500 fill-current"
                          : "text-brand-silver-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              <p className="text-3xl font-bold text-brand-red-600 mb-6">
                {product.price}
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description[currentLang]}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button className="flex-1 bg-palette-emerald-600 hover:bg-palette-emerald-700 text-white">
                Contact for Price
              </Button>
              <Button variant="outline" size="icon" className="border-brand-silver-300 hover:bg-brand-silver-100 dark:hover:bg-brand-silver-800">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="border-brand-silver-300 hover:bg-brand-silver-100 dark:hover:bg-brand-silver-800">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Specifications */}
            <Card className="border-brand-silver-200 dark:border-brand-silver-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Specifications
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dimensions:</span>
                    <span className="font-medium">{product.specifications.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="font-medium">{product.specifications.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Display:</span>
                    <span className="font-medium">{product.specifications.display}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Power:</span>
                    <span className="font-medium">{product.specifications.power}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Languages:</span>
                    <span className="font-medium">{product.specifications.languages.join(', ')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="border-brand-silver-200 dark:border-brand-silver-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Features
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 rounded-lg bg-palette-emerald-50 dark:bg-palette-emerald-900/20"
                    >
                      <div className="w-2 h-2 bg-palette-emerald-500 rounded-full"></div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { locale, id } = await params;
  const product = getProductById(id);
  const currentLang = locale as "en" | "ar";

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name[currentLang]} - Alrwda Islamic Clocks`,
    description: product.description[currentLang],
  };
}
