import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/data";
import ContactButton from "@/components/contact-button";

interface Product {
  id: string;
  slug: string;
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
  categoryId: string;
  features: string[];
  specifications: {
    dimensions: string;
    weight: string;
    display: string;
    power: string;
    languages: string[];
  };
}

interface ProductsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  const t = await getTranslations("products");
  const currentLang = locale as "en" | "ar";
  
  const products = getProducts();

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
              <Link
                key={product.id}
                href={`/${locale}/products/${product.id}`}
                className="group block"
              >
                <Card
                  className={`h-full bg-card hover:shadow-xl transition-all duration-500 border-2 hover:scale-[1.02] cursor-pointer overflow-hidden flex flex-col ${
                    index % 3 === 0
                      ? "border-palette-emerald-200 hover:border-palette-emerald-400 dark:border-palette-emerald-800 dark:hover:border-palette-emerald-600"
                      : index % 3 === 1
                        ? "border-palette-amber-200 hover:border-palette-amber-400 dark:border-palette-amber-800 dark:hover:border-palette-amber-600"
                        : "border-palette-red-200 hover:border-palette-red-400 dark:border-palette-red-800 dark:hover:border-palette-red-600"
                  }`}
                >
                <div className="relative overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name[currentLang]}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm border ${
                        index % 3 === 0
                          ? "bg-emerald-100/90 text-emerald-800 border-emerald-200/50 dark:bg-emerald-900/90 dark:text-emerald-100 dark:border-emerald-700/50"
                          : index % 3 === 1
                            ? "bg-amber-100/90 text-amber-800 border-amber-200/50 dark:bg-amber-900/90 dark:text-amber-100 dark:border-amber-700/50"
                            : "bg-red-100/90 text-red-800 border-red-200/50 dark:bg-red-900/90 dark:text-red-100 dark:border-red-700/50"
                      }`}
                    >
                      {product.category[currentLang]}
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {product.name[currentLang]}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2 text-sm flex-1">
                    {product.description[currentLang]}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-primary">
                      {product.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-foreground">
                        {product.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <div className="flex flex-col gap-3 w-full">
                    <Button
                      className={`w-full text-white transition-all duration-300 hover:scale-105 ${
                        index % 3 === 0
                          ? "bg-palette-emerald-600 hover:bg-palette-emerald-700"
                          : index % 3 === 1
                            ? "bg-palette-amber-600 hover:bg-palette-amber-700"
                            : "bg-palette-red-600 hover:bg-palette-red-700"
                      }`}
                    >
                      {t("viewDetails")}
                    </Button>
                    <ContactButton
                      locale={locale}
                      className="w-full border-border hover:bg-muted/50 transition-all duration-300"
                    >
                      {t("contactForPrice")}
                    </ContactButton>
                  </div>
                </CardFooter>
              </Card>
              </Link>
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
            {[
              "Digital Clocks",
              "Wall Clocks",
              "Portable Clocks",
              "Smart Clocks",
              "Table Clocks",
              "Outdoor Displays",
            ].map((category, index) => (
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
                  <div
                    className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                      index % 3 === 0
                        ? "bg-palette-black/10 text-palette-black group-hover:bg-palette-black/20"
                        : index % 3 === 1
                          ? "bg-palette-silver/10 text-palette-silver group-hover:bg-palette-silver/20"
                          : "bg-palette-red/10 text-palette-red group-hover:bg-palette-red/20"
                    }`}
                  >
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {currentLang === "ar"
                      ? [
                          "ساعات رقمية",
                          "ساعات حائطية",
                          "ساعات محمولة",
                          "ساعات ذكية",
                          "ساعات طاولة",
                          "شاشات خارجية",
                        ][index]
                      : category}
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
                <Button
                  size="lg"
                  className="bg-palette-red hover:bg-palette-red/80 text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300"
                >
                  {t("contactUs")}
                </Button>
              </Link>
              <Link href={`/${locale}/support`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-palette-silver hover:bg-palette-silver/10 px-8 py-4 text-lg hover:scale-105 transition-all duration-300"
                >
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
