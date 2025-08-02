import { getTranslations } from "next-intl/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { getBusinessHours, getBusinessContact } from "@/lib/data";
import InteractiveMap from "@/components/interactive-map";

interface BusinessHour {
  day: string;
  hours: string;
  isOpen: boolean;
}

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations();
  
  const businessHours = getBusinessHours();
  const contactInfo = getBusinessContact();

  const getTranslatedDay = (day: string) => {
    const dayMap: Record<string, string> = {
      Monday: t("contact.monday"),
      Tuesday: t("contact.tuesday"),
      Wednesday: t("contact.wednesday"),
      Thursday: t("contact.thursday"),
      Friday: t("contact.friday"),
      Saturday: t("contact.saturday"),
      Sunday: t("contact.sunday"),
    };
    return dayMap[day] || day;
  };

  // Map the days with proper translations and check if open
  const translatedHours = businessHours.map((hour: BusinessHour) => ({
    day: getTranslatedDay(hour.day),
    hours: hour.hours === "Closed" ? t("contact.closed") : hour.hours,
    isOpen: hour.isOpen,
  }));

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-silver-50 via-background to-palette-emerald-50 dark:from-brand-silver-900 dark:via-background dark:to-palette-emerald-950">
        <div className="absolute inset-0 bg-[url('/islamic-pattern.svg')] opacity-10"></div>
        <div className="relative container py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {t("contact.title")}
            </h1>
            <p className="mt-6 text-xl leading-8 text-muted-foreground">
              {t("contact.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
                  {t("contact.getInTouch") || "Get in Touch"}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {t("contact.visitShowroom") ||
                    "Visit our showroom to see our collection of Islamic electric clocks in person, or contact us for expert advice and support."}
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-10 w-10 bg-palette-emerald-100 dark:bg-palette-emerald-900 rounded-lg">
                        <MapPin className="h-5 w-5 text-palette-emerald-600 dark:text-palette-emerald-400" />
                      </div>
                      <CardTitle className="text-lg">
                        {t("contact.address")}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      643R+R72, Al-Qudsy street
                      <br />
                      Aleppo, Syria
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3"
                      asChild
                    >
                      <a
                        href="https://www.google.com/maps/place/643R%2BR72,+Aleppo,+Syria/@36.204708,37.140884,17z"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        {t("contact.getDirections")}
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-10 w-10 bg-palette-emerald-100 dark:bg-palette-emerald-900 rounded-lg">
                        <Phone className="h-5 w-5 text-palette-emerald-600 dark:text-palette-emerald-400" />
                      </div>
                      <CardTitle className="text-lg">
                        {t("contact.phone")}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      +963 21 123 4567
                      <br />
                      +963 9XX XXX XXX (WhatsApp)
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-10 w-10 bg-palette-emerald-100 dark:bg-palette-emerald-900 rounded-lg">
                        <Mail className="h-5 w-5 text-palette-emerald-600 dark:text-palette-emerald-400" />
                      </div>
                      <CardTitle className="text-lg">
                        {t("contact.email")}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t("contact.mainEmail") || "info@alrwda-clocks.com"}
                      <br />
                      {t("contact.supportEmail") || "support@alrwda-clocks.com"}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Business Hours */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 bg-palette-amber-100 dark:bg-palette-amber-900 rounded-lg">
                      <Clock className="h-5 w-5 text-palette-amber-600 dark:text-palette-amber-400" />
                    </div>
                    <CardTitle className="text-xl">
                      {t("contact.hours")}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {translatedHours.length === 0 ? (
                      <div className="text-center py-6">
                        <Clock className="h-8 w-8 text-muted-foreground/50 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">
                          {t("contact.hoursUnavailable") ||
                            "Business hours temporarily unavailable"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t("contact.callForHours") ||
                            "Please call for current hours"}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {translatedHours.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center py-3 px-2 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <span className="font-medium text-foreground">
                              {item.day}
                            </span>
                            <span
                              className={`text-sm font-medium transition-colors ${
                                item.hours === t("contact.closed") ||
                                !item.isOpen
                                  ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 px-2 py-1 rounded-md"
                                  : "text-grey-600 dark:text-grey-400"
                              }`}
                            >
                              {item.hours}
                            </span>
                          </div>
                        ))}
                        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                          <p className="text-xs text-muted-foreground text-center">
                            {t("contact.holidayNote") ||
                              "Hours may vary during Islamic holidays"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">
                    {t("contact.location") || "Our Location"}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Visit our showroom in Aleppo, Syria
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InteractiveMap 
                    address="643R+R72, Al-Qudsy street, Aleppo, Syria"
                    coordinates={{
                      lat: 36.204708,
                      lng: 37.140884
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-palette-emerald-600 dark:bg-palette-emerald-800">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Visit Our Showroom
            </h2>
            <p className="mt-6 text-lg leading-8 text-palette-emerald-100">
              Experience our Islamic clocks in person and get expert
              consultation from our knowledgeable team.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" variant="secondary">
                Schedule Visit
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-palette-emerald-600"
              >
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
