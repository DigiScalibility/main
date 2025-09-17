import Link from "next/link";
import { Logo } from "@/components/Logo";
import { footerLinks } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="mb-4 inline-block">
              <Logo className="h-7 w-auto" />
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Performance-focused design, development, and growth marketing.
            </p>
             <div className="mt-8">
                <h4 className="font-headline font-medium tracking-wide">Stay Updated</h4>
                <p className="mt-2 text-sm text-muted-foreground">Join our newsletter for insights and updates.</p>
                <form className="mt-4 flex gap-2">
                    <Input type="email" placeholder="Enter your email" className="max-w-xs" />
                    <Button type="submit">Subscribe</Button>
                </form>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
            <div>
              <h4 className="font-headline font-medium tracking-wide">Company</h4>
              <ul className="mt-4 space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-medium tracking-wide">Resources</h4>
              <ul className="mt-4 space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
             <div>
              <h4 className="font-headline font-medium tracking-wide">Connect</h4>
                <ul className="mt-4 space-y-2">
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">LinkedIn</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Twitter</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Instagram</a></li>
                </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between border-t pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DigiScalibity. All rights reserved.
          </p>
          <div className="mt-4 flex items-center space-x-4 sm:mt-0">
             <p className="text-sm text-muted-foreground">
                <a href="mailto:contact@digiscalibity.com" className="hover:text-foreground">contact@digiscalibity.com</a>
                <span className="mx-2">|</span>
                <span>+61 400 000 000</span>
            </p>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-muted-foreground/50">
            Hosted on Firebase.
        </div>
      </div>
    </footer>
  );
}
