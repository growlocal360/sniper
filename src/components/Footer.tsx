"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

const serviceLinks = [
  { name: "Catalyst Services", href: "/services/catalyst-services" },
  { name: "Specialty Welding", href: "/services/specialty-welding" },
  { name: "Mechanical Services", href: "/services/mechanical-services" },
];

const companyLinks = [
  { name: "About Us", href: "/company" },
  { name: "Our Team", href: "/company/team" },
  { name: "Capabilities", href: "/company/capabilities" },
  { name: "News & Events", href: "/news" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-tactical-950 border-t border-tactical-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center mb-6">
              <Image
                src="/sniper-elite-services-logo.svg"
                alt="Sniper Elite Services"
                width={180}
                height={40}
              />
            </Link>
            <p className="text-tactical-400 text-sm leading-relaxed mb-6">
              Precision industrial services with military-grade accuracy. Catalyst handling, specialty welding, and mechanical services for the energy industry.
            </p>
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-tactical-500 hover:text-sand-400 hover:bg-tactical-800 rounded-lg transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Industrial Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Industrial Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-tactical-400 hover:text-sand-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-tactical-400 hover:text-sand-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Sniper Elite Services</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-sand-500 mt-0.5 flex-shrink-0" />
                <span className="text-tactical-400 text-sm">
                  1396 Swisco Rd.<br />
                  Sulphur, LA 70665
                </span>
              </li>
              <li>
                <a
                  href="tel:1-855-827-4387"
                  className="flex items-center space-x-3 text-tactical-400 hover:text-sand-400 text-sm transition-colors"
                >
                  <Phone className="h-4 w-4 text-sand-500 flex-shrink-0" />
                  <span>1-855-TARGETS</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@sniper-elite.com"
                  className="flex items-center space-x-3 text-tactical-400 hover:text-sand-400 text-sm transition-colors"
                >
                  <Mail className="h-4 w-4 text-sand-500 flex-shrink-0" />
                  <span>info@sniper-elite.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-tactical-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <a
              href="tel:1-855-827-4387"
              className="text-lg font-bold text-crimson-500"
            >
              1-855-TARGETS
            </a>
            <span className="text-tactical-600">|</span>
            <a
              href="mailto:info@sniper-elite.com"
              className="text-sand-500 hover:text-sand-400 text-sm transition-colors"
            >
              info@sniper-elite.com
            </a>
          </div>
          <p className="text-tactical-500 text-sm">
            &copy; {new Date().getFullYear()} Sniper Elite Service, LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
