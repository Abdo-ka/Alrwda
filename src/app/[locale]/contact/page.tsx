"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

interface BusinessHour {
  day: string;
  hours: string;
  isOpen: boolean;
}

export default function ContactPage() {
  const t = useTranslations();
  const [businessHours, setBusinessHours] = useState<BusinessHour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getTranslatedDay = useCallback((day: string) => {
    const dayMap: Record<string, string> = {
      'Monday': t("contact.monday"),
      'Tuesday': t("contact.tuesday"), 
      'Wednesday': t("contact.wednesday"),
      'Thursday': t("contact.thursday"),
      'Friday': t("contact.friday"),
      'Saturday': t("contact.saturday"),
      'Sunday': t("contact.sunday")
    };
    return dayMap[day] || day;
  }, [t]);

  useEffect(() => {
    const fetchBusinessHours = async () => {
      try {
        const response = await fetch('/api/business-hours');
        if (response.ok) {
          const hours = await response.json();
          
          // Map the days with proper translations and check if open
          const translatedHours = hours.map((hour: BusinessHour) => ({
            day: getTranslatedDay(hour.day),
            hours: hour.hours === "Closed" ? t("contact.closed") : hour.hours,
            isOpen: hour.isOpen
          }));
          
          setBusinessHours(translatedHours);
          setError(false);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error loading business hours:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessHours();
  }, [t, getTranslatedDay]);

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
                  {t("contact.visitShowroom") || "Visit our showroom to see our collection of Islamic electric clocks in person, or contact us for expert advice and support."}
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
                      <CardTitle className="text-lg">{t("contact.address")}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t("contact.streetAddress") || "123 Islamic Market Street"}<br />
                      {t("contact.cityAddress") || "Clock District, City 12345"}<br />
                      {t("contact.countryAddress") || "Kingdom of Saudi Arabia"}
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
                      <Navigation className="h-4 w-4 mr-2" />
                      {t("contact.getDirections")}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-10 w-10 bg-palette-emerald-100 dark:bg-palette-emerald-900 rounded-lg">
                        <Phone className="h-5 w-5 text-palette-emerald-600 dark:text-palette-emerald-400" />
                      </div>
                      <CardTitle className="text-lg">{t("contact.phone")}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t("contact.mainPhone") || "+966 11 123 4567"}<br />
                      {t("contact.whatsappPhone") || "+966 50 123 4567 (WhatsApp)"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-10 w-10 bg-palette-emerald-100 dark:bg-palette-emerald-900 rounded-lg">
                        <Mail className="h-5 w-5 text-palette-emerald-600 dark:text-palette-emerald-400" />
                      </div>
                      <CardTitle className="text-lg">{t("contact.email")}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t("contact.mainEmail") || "info@alrwda-clocks.com"}<br />
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
                    <CardTitle className="text-xl">{t("contact.hours")}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {loading ? (
                      <div className="text-center py-6">
                        <div className="inline-flex items-center justify-center w-8 h-8 border-2 border-palette-emerald-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                        <p className="text-sm text-muted-foreground">{t("contact.loadingHours") || "Loading business hours..."}</p>
                      </div>
                    ) : error || businessHours.length === 0 ? (
                      <div className="text-center py-6">
                        <Clock className="h-8 w-8 text-muted-foreground/50 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">{t("contact.hoursUnavailable") || "Business hours temporarily unavailable"}</p>
                        <p className="text-xs text-muted-foreground mt-1">{t("contact.callForHours") || "Please call for current hours"}</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {businessHours.map((item, index) => {
                          const isClosed = !item.isOpen || 
                                         item.hours === t("contact.closed") || 
                                         !item.hours || 
                                         item.hours === "Closed" ||
                                         item.hours.toLowerCase() === "closed" ||
                                         item.hours === "مغلق";
                          
                          return (
                            <div key={index} className="flex justify-between items-center py-3 px-2 rounded-lg hover:bg-muted/50 transition-colors">
                              <span className="font-medium text-foreground">{item.day}</span>
                              <span 
                                className={`text-sm font-medium ${
                                  isClosed 
                                    ? "text-red-600 dark:text-red-400 font-bold bg-red-50 dark:bg-red-950/20 px-2 py-1 rounded-md border border-red-200 dark:border-red-800" 
                                    : "text-emerald-600 dark:text-emerald-400"
                                }`}
                              >
                                {item.hours}
                              </span>
                            </div>
                          );
                        })}
                        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                          <p className="text-xs text-muted-foreground text-center">
                            {t("contact.holidayNote") || "Hours may vary during Islamic holidays"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">{t("contact.location") || "Location"}</CardTitle>
                  <CardDescription className="text-muted-foreground">{t("contact.locationDesc") || "Find us in the heart of the Islamic market district"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">{t("contact.interactiveMap") || "Interactive Map"}</p>
                      <p className="text-xs text-muted-foreground">{t("contact.comingSoon") || "Coming Soon"}</p>
                    </div>
                  </div>
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
              {t("contact.visitShowroomTitle") || "Visit Our Showroom"}
            </h2>
            <p className="mt-6 text-lg leading-8 text-palette-emerald-100">
              {t("contact.visitShowroomDesc") || "Experience our Islamic clocks in person and get expert consultation from our knowledgeable team."}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" variant="secondary">
                {t("contact.scheduleVisit") || "Schedule Visit"}
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-palette-emerald-600">
                {t("contact.callNow") || "Call Now"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
