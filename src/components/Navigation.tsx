"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Crosshair,
  Phone,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const companyLinks = [
  { name: "About Us", href: "/company" },
  { name: "Our Team", href: "/company/team" },
  { name: "Our Mission", href: "/company/mission" },
  { name: "Capabilities", href: "/company/capabilities" },
  { name: "Locations", href: "/company/locations" },
];

const serviceLinks = [
  { name: "Catalyst Services", href: "/services/catalyst-services" },
  { name: "Specialty Welding", href: "/services/specialty-welding" },
  { name: "Mechanical Services", href: "/services/mechanical-services" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setMobileCompanyOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-tactical-950/95 backdrop-blur-md shadow-lg border-b border-tactical-800"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
            <Crosshair className="h-9 w-9 text-sand-500" />
            <div>
              <span className="text-xl font-bold text-white tracking-tight">SNIPER</span>
              <span className="block text-[10px] text-sand-500 tracking-[0.25em] uppercase -mt-1">Elite Services</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCompanyOpen(true)}
              onMouseLeave={() => setCompanyOpen(false)}
            >
              <button
                className={cn(
                  "flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname.startsWith("/company")
                    ? "text-sand-400"
                    : "text-tactical-300 hover:text-white"
                )}
              >
                <span>Company</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {companyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-56 bg-tactical-900 border border-tactical-700 rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-2">
                      <p className="px-3 py-2 text-xs font-semibold text-tactical-500 uppercase tracking-wider">
                        About Sniper Elite
                      </p>
                      {companyLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "block px-3 py-2.5 text-sm rounded-lg transition-colors",
                            pathname === link.href
                              ? "text-sand-400 bg-sand-500/10"
                              : "text-tactical-300 hover:text-white hover:bg-tactical-800"
                          )}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Industrial Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={cn(
                  "flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname.startsWith("/services")
                    ? "text-sand-400"
                    : "text-tactical-300 hover:text-white"
                )}
              >
                <span>Industrial Services</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-64 bg-tactical-900 border border-tactical-700 rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-2">
                      <p className="px-3 py-2 text-xs font-semibold text-tactical-500 uppercase tracking-wider">
                        Our Services
                      </p>
                      {serviceLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "block px-3 py-2.5 text-sm rounded-lg transition-colors",
                            pathname === link.href
                              ? "text-sand-400 bg-sand-500/10"
                              : "text-tactical-300 hover:text-white hover:bg-tactical-800"
                          )}
                        >
                          {link.name}
                        </Link>
                      ))}
                      <div className="border-t border-tactical-700 mt-2 pt-2">
                        <Link
                          href="/services"
                          className="block px-3 py-2.5 text-sm text-sand-400 hover:text-sand-300 rounded-lg transition-colors"
                        >
                          View All Services
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct Links */}
            <Link
              href="/projects"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                pathname.startsWith("/projects")
                  ? "text-sand-400"
                  : "text-tactical-300 hover:text-white"
              )}
            >
              Projects
            </Link>

            <Link
              href="/markets"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                pathname.startsWith("/markets")
                  ? "text-sand-400"
                  : "text-tactical-300 hover:text-white"
              )}
            >
              Markets
            </Link>

            <Link
              href="/careers"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                pathname.startsWith("/careers")
                  ? "text-sand-400"
                  : "text-tactical-300 hover:text-white"
              )}
            >
              Careers
            </Link>

            {/* Contact CTA */}
            <Link
              href="/contact"
              className="ml-4 inline-flex items-center space-x-2 px-6 py-2.5 bg-crimson-600 hover:bg-crimson-500 text-white rounded-full font-semibold text-sm transition-all shadow-lg shadow-crimson-600/25"
            >
              <ChevronRight className="h-4 w-4" />
              <span>Contact</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-tactical-300 hover:text-white transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-tactical-900 border-t border-tactical-800"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {/* Company Mobile Dropdown */}
              <div>
                <button
                  onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-tactical-200 hover:text-white rounded-lg hover:bg-tactical-800 transition-colors"
                >
                  <span className="font-medium">Company</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      mobileCompanyOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {mobileCompanyOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-1"
                    >
                      {companyLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2.5 text-sm text-tactical-400 hover:text-white rounded-lg hover:bg-tactical-800 transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Services Mobile Dropdown */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-tactical-200 hover:text-white rounded-lg hover:bg-tactical-800 transition-colors"
                >
                  <span className="font-medium">Industrial Services</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      mobileServicesOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-1"
                    >
                      {serviceLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2.5 text-sm text-tactical-400 hover:text-white rounded-lg hover:bg-tactical-800 transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/projects"
                className="block px-4 py-3 text-tactical-200 hover:text-white font-medium rounded-lg hover:bg-tactical-800 transition-colors"
              >
                Projects
              </Link>

              <Link
                href="/markets"
                className="block px-4 py-3 text-tactical-200 hover:text-white font-medium rounded-lg hover:bg-tactical-800 transition-colors"
              >
                Markets
              </Link>

              <Link
                href="/careers"
                className="block px-4 py-3 text-tactical-200 hover:text-white font-medium rounded-lg hover:bg-tactical-800 transition-colors"
              >
                Careers
              </Link>

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-tactical-800">
                <Link
                  href="/contact"
                  className="flex items-center justify-center space-x-2 w-full px-6 py-3 bg-crimson-600 hover:bg-crimson-500 text-white rounded-lg font-semibold transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
