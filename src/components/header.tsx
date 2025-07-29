"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Menu, X } from "lucide-react"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations("common")

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("products"), href: "/products" },
    { name: t("contact"), href: "/contact" },
    { name: t("support"), href: "/support" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <div className="container flex h-20 items-center px-6">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-8 flex items-center space-x-2 group">
            <span className="hidden font-bold sm:inline-block text-2xl text-islamic-green-600 dark:text-islamic-green-400 transition-all duration-300 group-hover:scale-105 group-hover:text-islamic-green-500">
              الروضة
            </span>
          </Link>
          <nav className="flex items-center space-x-8 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative transition-all duration-300 hover:text-islamic-green-600 dark:hover:text-islamic-green-400 text-foreground/70 hover:text-foreground group px-3 py-2"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 rounded-md bg-islamic-green/10 scale-0 transition-transform duration-300 group-hover:scale-100" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden transition-all duration-300 hover:scale-110"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="relative">
            <Menu className={`h-6 w-6 transition-all duration-300 ${isMenuOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
            <X className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
          </div>
          <span className="sr-only">Toggle Menu</span>
        </Button>

        {/* Mobile logo */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="flex items-center md:hidden group">
              <span className="font-bold text-lg text-islamic-green-600 dark:text-islamic-green-400 transition-all duration-300 group-hover:scale-105">
                الروضة
              </span>
            </Link>
          </div>

          <nav className="flex items-center space-x-3">
            <ThemeToggle />
            <LanguageSwitcher />
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`border-b bg-background md:hidden transition-all duration-300 overflow-hidden ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <nav className="container py-6 px-6">
          <div className="flex flex-col space-y-4">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/70 transition-all duration-300 hover:text-islamic-green-600 dark:hover:text-islamic-green-400 hover:translate-x-2 py-2 px-3 rounded-md hover:bg-islamic-green/5"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isMenuOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
