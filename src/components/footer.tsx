"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  const t = useTranslations()

  const quickLinks = [
    { name: t("common.home"), href: "/" },
    { name: t("common.products"), href: "/products" },
    { name: t("common.contact"), href: "/contact" },
    { name: t("common.support"), href: "/support" },
  ]

  const socialLinks = [
    { 
      name: "Facebook", 
      href: "https://facebook.com/alrwda", 
      icon: Facebook,
      color: "hover:text-islamic-blue-600 dark:hover:text-islamic-blue-400"
    },
    { 
      name: "Instagram", 
      href: "https://instagram.com/alrwda", 
      icon: Instagram,
      color: "hover:text-islamic-red-600 dark:hover:text-islamic-red-400"
    },
    { 
      name: "Twitter", 
      href: "https://twitter.com/alrwda", 
      icon: Twitter,
      color: "hover:text-islamic-blue-600 dark:hover:text-islamic-blue-400"
    },
    { 
      name: "Youtube", 
      href: "https://youtube.com/@alrwda", 
      icon: Youtube,
      color: "hover:text-islamic-red-600 dark:hover:text-islamic-red-400"
    },
  ]

  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-islamic-green-600 dark:text-islamic-green-400">
                الروضة
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              {t("footer.description")}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-islamic-green-600 dark:text-islamic-green-400" />
                <span>+966 123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-islamic-green-600 dark:text-islamic-green-400" />
                <span>info@alrwda.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-islamic-green-600 dark:text-islamic-green-400" />
                <span>Riyadh, Saudi Arabia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-islamic-green-600 dark:hover:text-islamic-green-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.followUs")}</h3>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110`}
                    title={social.name}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
            
            <div className="text-sm">
              <h4 className="font-medium mb-2 text-islamic-green-600 dark:text-islamic-green-400">
                {t("footer.getInTouch")}
              </h4>
              <p className="text-muted-foreground">
                {t("footer.contactDescription")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
