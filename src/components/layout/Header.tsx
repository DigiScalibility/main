"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation'
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/Logo";
import { navLinks } from "@/lib/data";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks
        .map(link => link.href.startsWith('/#') ? document.querySelector(link.href.substring(1)) : null)
        .filter(Boolean);

      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && (section as HTMLElement).offsetTop <= scrollPosition) {
          const correspondingLink = navLinks.find(link => link.href.substring(1) === section.id);
          if (correspondingLink) {
            setActiveLink(correspondingLink.href);
            return;
          }
        }
      }
      setActiveLink("");
    };
    
    if (pathname === '/') {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Check on initial load
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      const currentLink = navLinks.find(link => link.href === pathname);
      setActiveLink(currentLink ? currentLink.href : "");
    }

  }, [pathname]);

  const renderLink = (link: { href: string; label: string }, isMobile = false) => {
    const isPageLink = link.href.startsWith('/#');
    
    const handleClick = () => {
      if (isMobile) setIsOpen(false);
      if (isPageLink && pathname === '/') {
        document.querySelector(link.href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const linkClasses = `transition-colors hover:text-primary ${
      activeLink === link.href ? "text-primary" : "text-foreground/60"
    } ${isMobile ? 'text-lg font-medium' : ''}`;

    if (isPageLink && pathname ==='/') {
      return (
        <button onClick={handleClick} className={linkClasses}>
          {link.label}
        </button>
      )
    }

    return (
       <Link
        href={isPageLink ? `/${link.href}` : link.href}
        onClick={() => isMobile && setIsOpen(false)}
        className={linkClasses}
      >
        {link.label}
      </Link>
    )
  }

  // Adjust navlinks for homepage
  const currentNavLinks = navLinks.map(link => ({
    ...link,
    href: link.href.startsWith('#') ? `/${link.href}`: link.href
  }));
  

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-auto" />
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            {currentNavLinks.map((link) => (
              <div key={link.href}>
                {renderLink(link)}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden items-center space-x-2 md:flex">
            <Button variant="ghost">Book a Call</Button>
            <Button>Get Started</Button>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <Logo className="h-6 w-auto" />
                </Link>
                 <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                   <X className="h-5 w-5" />
                   <span className="sr-only">Close Menu</span>
                 </Button>
              </div>
              <nav className="flex flex-col space-y-4">
                {currentNavLinks.map((link) => (
                   <div key={link.href}>
                    {renderLink(link, true)}
                  </div>
                ))}
              </nav>
              <div className="mt-8 flex flex-col space-y-2">
                <Button variant="outline">Book a Call</Button>
                <Button>Get Started</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
