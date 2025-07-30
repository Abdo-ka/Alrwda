"use client"

import { Languages } from "lucide-react"
import { useLocale } from "next-intl"
import { useRouter, usePathname } from "@/i18n/routing"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en"
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="h-9 w-9 relative overflow-hidden transition-all duration-300 hover:bg-islamic-green-600/10 hover:scale-110"
      title={locale === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
    >
      <Languages className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />
      <span className="sr-only">Toggle language</span>
      <div className="absolute inset-0 rounded-full bg-islamic-green-600/20 scale-0 transition-transform duration-300 hover:scale-100" />
    </Button>
  )
}
