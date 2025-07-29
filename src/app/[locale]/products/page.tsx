"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock, MapPin, Share2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  price: string;
  images: string[];
  rating: number;
  reviews: number;
  category: {
    en: string;
    ar: string;
  };
}

export default function ProductsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("products");
  const currentLang = locale as "en" | "ar";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const productData = await response.json();
          setProducts(productData);
          setError(false);
        } else {
          console.error('Failed to fetch products');
          setError(true);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Clock className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">Coming back soon</p>
          <p className="text-muted-foreground">We&apos;re working on getting our products back online.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-silver-200 via-brand-silver-100 to-brand-silver-50 dark:from-palette-black dark:via-palette-silver dark:to-palette-red py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-6">
              {t("title")}
            </h1>
            <p className="text-xl text-muted-foreground dark:text-white/90 mb-8">
              {t("subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground dark:text-white/90">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{t("accurateTiming")}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground dark:text-white/90">
                <Star className="w-5 h-5" />
                <span className="font-medium">{t("premiumQuality")}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground dark:text-white/90">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">{t("worldwideDelivery")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("featuredProducts")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("featuredDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card 
                key={product.id} 
                className={`group hover:shadow-xl transition-all duration-500 border-2 hover:scale-[1.02] ${
                  index % 3 === 0 
                    ? "border-palette-black/20 hover:border-palette-black" 
                    : index % 3 === 1 
                    ? "border-palette-silver/20 hover:border-palette-silver"
                    : "border-palette-red/20 hover:border-palette-red"
                }`}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={product.images[0]}
                    alt={product.name[currentLang]}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/90 hover:bg-white border-none shadow-md"
                      onClick={() => {
                        const url = `${window.location.origin}/${locale}/products/${product.id}`;
                        if (navigator.share) {
                          navigator.share({
                            title: product.name[currentLang],
                            url: url,
                          }).catch(() => {
                            navigator.clipboard.writeText(url);
                          });
                        } else {
                          navigator.clipboard.writeText(url);
                        }
                      }}
                    >
                      <Share2 className="h-4 w-4 text-palette-black" />
                    </Button>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      index % 3 === 0 
                        ? "bg-palette-emerald-100 text-palette-emerald-800 dark:bg-palette-emerald-900 dark:text-palette-emerald-200" 
                        : index % 3 === 1 
                        ? "bg-palette-amber-100 text-palette-amber-800 dark:bg-palette-amber-900 dark:text-palette-amber-200"
                        : "bg-palette-indigo-100 text-palette-indigo-800 dark:bg-palette-indigo-900 dark:text-palette-indigo-200"
                    }`}>
                      {product.category[currentLang]}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {product.name[currentLang]}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {product.description[currentLang]}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-palette-red">
                      {product.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-palette-amber-500 fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 space-y-3">
                  <Link href={`/${locale}/products/${product.id}`} className="w-full">
                    <Button className={`w-full ${
                      index % 3 === 0 
                        ? "bg-palette-black hover:bg-palette-black/80" 
                        : index % 3 === 1 
                        ? "bg-palette-silver hover:bg-palette-silver/80 text-palette-black"
                        : "bg-palette-red hover:bg-palette-red/80"
                    } text-white transition-all duration-300 hover:scale-105`}>
                      {t("viewDetails")}
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full border-palette-silver hover:bg-palette-silver/10 transition-all duration-300"
                  >
                    {t("contactForPrice")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-palette-silver/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("categoriesTitle")}
            </h2>
            <p className="text-muted-foreground">
              {t("categoriesDescription")}
            </p>
          </div>

          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {["Digital Clocks", "Wall Clocks", "Portable Clocks", "Smart Clocks", "Table Clocks", "Outdoor Displays"].map((category, index) => (
              <Card 
                key={category}
                className={`text-center hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 shrink-0 min-w-[160px] ${
                  index % 3 === 0 
                    ? "hover:border-palette-black" 
                    : index % 3 === 1 
                    ? "hover:border-palette-silver"
                    : "hover:border-palette-red"
                }`}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index % 3 === 0 
                      ? "bg-palette-black/10 text-palette-black group-hover:bg-palette-black/20" 
                      : index % 3 === 1 
                      ? "bg-palette-silver/10 text-palette-silver group-hover:bg-palette-silver/20"
                      : "bg-palette-red/10 text-palette-red group-hover:bg-palette-red/20"
                  }`}>
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {currentLang === "ar" ? 
                      ["ساعات رقمية", "ساعات حائطية", "ساعات محمولة", "ساعات ذكية", "ساعات طاولة", "شاشات خارجية"][index] 
                      : category
                    }
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {t("ctaTitle")}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("ctaDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`}>
                <Button size="lg" className="bg-palette-red hover:bg-palette-red/80 text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300">
                  {t("contactUs")}
                </Button>
              </Link>
              <Link href={`/${locale}/support`}>
                <Button variant="outline" size="lg" className="border-palette-silver hover:bg-palette-silver/10 px-8 py-4 text-lg hover:scale-105 transition-all duration-300">
                  {t("technicalSupport")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
