import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, HelpCircle, Shield, Settings, Phone, Mail, Download, Video } from "lucide-react";

export default function SupportPage() {
  const t = useTranslations();

  const supportCategories = [
    {
      icon: <Book className="h-6 w-6" />,
      title: t("support.guides"),
      description: t("support.guidesDescription"),
      items: t.raw("support.items.guides") as string[]
    },
    {
      icon: <HelpCircle className="h-6 w-6" />,
      title: t("support.faq"),
      description: t("support.faqDescription"),
      items: t.raw("support.items.faq") as string[]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t("support.warranty"),
      description: t("support.warrantyDescription"),
      items: t.raw("support.items.warranty") as string[]
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: t("support.troubleshooting"),
      description: t("support.troubleshootingDescription"),
      items: t.raw("support.items.troubleshooting") as string[]
    }
  ];

  const contactMethods = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone Support",
      description: "Speak directly with our technical experts",
      details: "+966 11 123 4567",
      hours: "Sunday - Thursday: 9 AM - 6 PM"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Support",
      description: "Send us detailed questions and receive comprehensive answers",
      details: "support@alrwda-clocks.com",
      hours: "24/7 - Response within 4 hours"
    },
    {
      icon: <Video className="h-5 w-5" />,
      title: "Video Support",
      description: "Live video consultation for complex setup issues",
      details: "Schedule via phone or email",
      hours: "By appointment only"
    }
  ];

  return (
    <div className="page-transition">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-islamic-green-50 to-islamic-gold-50 dark:from-islamic-green-950 dark:to-islamic-gold-950 py-20 md:py-32">
          <div className="absolute inset-0 islamic-pattern opacity-20"></div>
          <div className="relative container px-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-islamic-green-900 dark:text-islamic-green-100 sm:text-5xl mb-6">
              {t("support.title")}
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-8 text-islamic-green-700 dark:text-islamic-green-300">
              {t("support.subtitle")}
            </p>
          </div>
        </section>

      {/* Support Categories */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {supportCategories.map((category, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-12 w-12 bg-islamic-green-100 dark:bg-islamic-green-900 rounded-lg">
                      <div className="text-islamic-green-600 dark:text-islamic-green-400">
                        {category.icon}
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-islamic-green-600 dark:bg-islamic-green-400 rounded-full"></div>
                        <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Download Resources
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("support.contactSupport")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Need personalized assistance? Our technical support team is ready to help you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex items-center justify-center h-16 w-16 bg-islamic-green-100 dark:bg-islamic-green-900 rounded-lg mx-auto mb-4">
                    <div className="text-islamic-green-600 dark:text-islamic-green-400">
                      {method.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-foreground mb-2">{method.details}</p>
                  <p className="text-sm text-muted-foreground mb-4">{method.hours}</p>
                  <Button size="sm" className="bg-islamic-green-600 hover:bg-islamic-green-700">
                    Contact Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-12">
              Popular Questions
            </h2>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do I set up prayer times for my location?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Prayer times can be configured by accessing the settings menu and entering your city name or coordinates. 
                    The clock will automatically calculate accurate prayer times based on your location&apos;s latitude and longitude.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I customize the Adhan calls?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, our clocks come with multiple Adhan options including different reciters and styles. 
                    You can also adjust the volume and set different Adhan calls for different prayer times.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What if my clock shows incorrect prayer times?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    First, verify that your location settings are correct. If the issue persists, 
                    you may need to manually adjust the calculation method or contact our support team for assistance.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How often should I update my clock&apos;s software?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We recommend checking for software updates quarterly. Updates include improved accuracy, 
                    new features, and bug fixes to ensure optimal performance of your Islamic clock.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
}
