import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/i18n/routing"
import { Clock, MapPin, Phone, Star } from "lucide-react"

export default function HomePage() {
  const t = useTranslations()

  return (
    <div className="page-transition">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-palette-emerald-900 via-palette-emerald-800 to-palette-emerald-600 py-20 md:py-32">
          <div className="absolute inset-0 bg-[url('/islamic-pattern.svg')] opacity-10" />
          <div className="container relative px-8 text-center text-white">
            <h1 className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              {t("home.hero.title")}
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-lg text-palette-emerald-100 md:text-xl">
              {t("home.hero.description")}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-palette-emerald-600 text-white hover:bg-palette-emerald-700 border-palette-emerald-600 hover:border-palette-emerald-700">
                  {t("home.hero.cta")}
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 hover:text-white">
                  {t("home.hero.contact")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 md:py-32">
          <div className="container px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-foreground">
                {t("home.featuredProducts")}
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
                Discover our premium collection of Islamic electric clocks
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
              <Card className="group cursor-pointer w-full max-w-sm">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 rounded-lg bg-palette-emerald-100 dark:bg-palette-emerald-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                    <Clock className="h-6 w-6 text-palette-emerald-600 dark:text-palette-emerald-400" />
                  </div>
                  <CardTitle className="text-xl text-center">Wall Clocks</CardTitle>
                  <CardDescription className="text-center">Premium Islamic wall clocks with prayer time displays</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 justify-center">
                    <Star className="h-4 w-4 fill-palette-amber-500 text-palette-amber-500" />
                    <span>4.9 rating</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Beautiful Arabic calligraphy and precise prayer time displays.
                  </p>
                </CardContent>
              </Card>

              <Card className="group cursor-pointer w-full max-w-sm">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 rounded-lg bg-palette-red-100 dark:bg-palette-red-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                    <Clock className="h-6 w-6 text-palette-red-600 dark:text-palette-red-400" />
                  </div>
                  <CardTitle className="text-xl text-center">Table Clocks</CardTitle>
                  <CardDescription className="text-center">Elegant table clocks for offices and homes</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 justify-center">
                    <Star className="h-4 w-4 fill-palette-amber-500 text-palette-amber-500" />
                    <span>4.8 rating</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Perfect for offices with Quranic verses and prayer reminders.
                  </p>
                </CardContent>
              </Card>

              <Card className="group cursor-pointer w-full max-w-sm">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 rounded-lg bg-brand-silver-200 dark:bg-brand-silver-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                    <Clock className="h-6 w-6 text-brand-silver-600 dark:text-brand-silver-400" />
                  </div>
                  <CardTitle className="text-xl text-center">Digital Clocks</CardTitle>
                  <CardDescription className="text-center">Modern digital clocks with LED displays</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 justify-center">
                    <Star className="h-4 w-4 fill-palette-amber-500 text-palette-amber-500" />
                    <span>4.9 rating</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatic prayer time calculation with bright LED displays.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 md:py-32 bg-islamic-green-50 dark:bg-islamic-green-950/20">
          <div className="container px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-islamic-green-800 dark:text-islamic-green-200">
                  {t("home.aboutMarket")}
                </h2>
                <p className="text-muted-foreground md:text-lg mb-6">
                  {t("home.aboutDescription")}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-islamic-green-100 dark:bg-islamic-green-900 flex items-center justify-center">
                      <Star className="h-4 w-4 text-islamic-green-600 dark:text-islamic-green-400" />
                    </div>
                    <span className="text-sm">Premium Quality Islamic Timepieces</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-islamic-green-100 dark:bg-islamic-green-900 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-islamic-green-600 dark:text-islamic-green-400" />
                    </div>
                    <span className="text-sm">Worldwide Shipping Available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-islamic-green-100 dark:bg-islamic-green-900 flex items-center justify-center">
                      <Phone className="h-4 w-4 text-islamic-green-600 dark:text-islamic-green-400" />
                    </div>
                    <span className="text-sm">24/7 Customer Support</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-islamic-green-100 to-islamic-green-200 dark:from-islamic-green-900 dark:to-islamic-green-800 p-8 flex items-center justify-center">
                  <Clock className="h-32 w-32 text-islamic-green-600 dark:text-islamic-green-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32">
          <div className="container px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-islamic-green-800 dark:text-islamic-green-200">
                Ready to Enhance Your Prayer Experience?
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg mb-8">
                Browse our collection and find the perfect Islamic clock for your home or office.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg">
                  <Link href="/products">{t("home.viewProducts")}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">{t("home.contactUs")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}