import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Share2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Mock product data - in a real app, this would come from a database
const getProduct = (id: string) => {
  const products = {
    "1": {
      id: "1",
      name: {
        en: "Digital Azan Clock Pro",
        ar: "ساعة الأذان الرقمية برو"
      },
      description: {
        en: "Premium digital clock with accurate prayer times, Quran recitation, and beautiful Islamic designs. Features multiple Muezzin voices and customizable display.",
        ar: "ساعة رقمية فاخرة مع أوقات الصلاة الدقيقة وتلاوة القرآن وتصاميم إسلامية جميلة. تتميز بأصوات مؤذنين متعددة وشاشة قابلة للتخصيص."
      },
      price: "$149.99",
      rating: 4.8,
      reviews: 124,
      images: [
        "/file.svg", // Placeholder - replace with actual product images
        "/islamic-pattern.svg",
        "/window.svg"
      ],
      specifications: {
        en: {
          dimensions: "12 x 8 x 3 inches",
          weight: "2.5 lbs",
          display: "LCD Digital Display",
          power: "AC Adapter + Battery Backup",
          languages: "Arabic, English, French, Turkish",
          features: ["Prayer Times", "Azan Alerts", "Qibla Direction", "Temperature Display", "Calendar"]
        },
        ar: {
          dimensions: "12 × 8 × 3 بوصة",
          weight: "2.5 رطل",
          display: "شاشة رقمية LCD",
          power: "محول تيار + بطارية احتياطية",
          languages: "العربية، الإنجليزية، الفرنسية، التركية",
          features: ["أوقات الصلاة", "تنبيهات الأذان", "اتجاه القبلة", "عرض درجة الحرارة", "التقويم"]
        }
      },
      instructions: {
        en: [
          "Plug in the AC adapter to power the clock",
          "Set your location for accurate prayer times",
          "Choose your preferred Muezzin voice",
          "Adjust volume and display brightness",
          "Enable battery backup for power outages"
        ],
        ar: [
          "قم بتوصيل محول التيار لتشغيل الساعة",
          "حدد موقعك للحصول على أوقات الصلاة الدقيقة",
          "اختر صوت المؤذن المفضل لديك",
          "اضبط مستوى الصوت وسطوع الشاشة",
          "فعّل البطارية الاحتياطية للانقطاعات الكهربائية"
        ]
      },
      tags: {
        en: ["Islamic Clock", "Prayer Times", "Azan", "Digital Display", "Qibla"],
        ar: ["ساعة إسلامية", "أوقات الصلاة", "أذان", "شاشة رقمية", "قبلة"]
      }
    },
    "2": {
      id: "2",
      name: {
        en: "Masjid Wall Clock",
        ar: "ساعة مسجد حائطية"
      },
      description: {
        en: "Elegant wall-mounted clock designed for mosques and Islamic centers. Features large display visible from distance with prayer time announcements.",
        ar: "ساعة حائطية أنيقة مصممة للمساجد والمراكز الإسلامية. تتميز بشاشة كبيرة مرئية من مسافة بعيدة مع إعلانات أوقات الصلاة."
      },
      price: "$299.99",
      rating: 4.9,
      reviews: 89,
      images: [
        "/islamic-pattern.svg",
        "/file.svg",
        "/window.svg"
      ],
      specifications: {
        en: {
          dimensions: "24 x 16 x 4 inches",
          weight: "8 lbs",
          display: "LED Large Display",
          power: "AC Power with UPS Support",
          languages: "Arabic, English, Urdu, Turkish",
          features: ["Large Display", "Remote Control", "Multiple Time Zones", "Hijri Calendar", "Temperature"]
        },
        ar: {
          dimensions: "24 × 16 × 4 بوصة",
          weight: "8 أرطال",
          display: "شاشة LED كبيرة",
          power: "تيار متردد مع دعم UPS",
          languages: "العربية، الإنجليزية، الأردية، التركية",
          features: ["شاشة كبيرة", "جهاز تحكم عن بُعد", "مناطق زمنية متعددة", "التقويم الهجري", "درجة الحرارة"]
        }
      },
      instructions: {
        en: [
          "Mount securely on wall using provided brackets",
          "Connect to main power supply",
          "Configure location and time zone",
          "Test remote control functionality",
          "Set up backup power system if needed"
        ],
        ar: [
          "ثبّت بأمان على الحائط باستخدام الأقواس المرفقة",
          "اتصل بالمصدر الرئيسي للطاقة",
          "اضبط الموقع والمنطقة الزمنية",
          "اختبر وظيفة جهاز التحكم عن بُعد",
          "أعد إعداد نظام الطاقة الاحتياطية إذا لزم الأمر"
        ]
      },
      tags: {
        en: ["Mosque Clock", "Wall Mount", "Large Display", "Remote Control", "LED"],
        ar: ["ساعة مسجد", "تثبيت حائطي", "شاشة كبيرة", "جهاز تحكم عن بُعد", "LED"]
      }
    }
  };

  return products[id as keyof typeof products] || null;
};

type PageProps = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export default async function ProductDetails({ params }: PageProps) {
  const { locale, id } = await params;
  const t = await getTranslations("product");
  const product = getProduct(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {t("notFound")}
          </h1>
          <Link href={`/${locale}/products`}>
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backToProducts")}
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
            {t("backToProducts")}
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-brand-silver-50 dark:bg-brand-silver-900 rounded-xl overflow-hidden border border-brand-silver-200 dark:border-brand-silver-700">
              <Image
                src={product.images[0]}
                alt={product.name[currentLang]}
                width={600}
                height={600}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="aspect-square bg-brand-silver-50 dark:bg-brand-silver-900 rounded-lg overflow-hidden border border-brand-silver-200 dark:border-brand-silver-700 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <Image
                    src={image}
                    alt={`${product.name[currentLang]} view ${index + 2}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
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
                    {product.rating} ({product.reviews} {t("reviews")})
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
                {t("description")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description[currentLang]}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button className="flex-1 bg-palette-emerald-600 hover:bg-palette-emerald-700 text-white">
                {t("contactForPrice")}
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
                  {t("specifications")}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("dimensions")}:</span>
                    <span className="font-medium">{product.specifications[currentLang].dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("weight")}:</span>
                    <span className="font-medium">{product.specifications[currentLang].weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("display")}:</span>
                    <span className="font-medium">{product.specifications[currentLang].display}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("power")}:</span>
                    <span className="font-medium">{product.specifications[currentLang].power}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("languages")}:</span>
                    <span className="font-medium">{product.specifications[currentLang].languages}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="border-brand-silver-200 dark:border-brand-silver-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {t("features")}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.specifications[currentLang].features.map((feature, index) => (
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

        {/* Instructions and Tags */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Setup Instructions */}
          <Card className="border-brand-silver-200 dark:border-brand-silver-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {t("setupInstructions")}
              </h3>
              <ol className="space-y-3">
                {product.instructions[currentLang].map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-palette-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{instruction}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Product Tags */}
          <Card className="border-brand-silver-200 dark:border-brand-silver-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {t("tags")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.tags[currentLang].map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-medium bg-brand-silver-100 dark:bg-brand-silver-800 text-brand-silver-800 dark:text-brand-silver-200 rounded-full hover:bg-brand-silver-200 dark:hover:bg-brand-silver-700 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, id } = await params;
  const product = getProduct(id);
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
