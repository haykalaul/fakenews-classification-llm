"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import logoImage from "@/assets/logo.svg";

const footerLinks = {
  tentang: [
    { label: "Tentang Proyek", href: "/" },
    { label: "Tujuan", href: "/" },
    { label: "Disclaimer", href: "/" },
    { label: "Blog Pengembangan", href: "/" },
  ],
  fitur: [
    { label: "Cek Fakta", href: "/#deteksi" },
    { label: "Cara Kerja", href: "/#alur" },
    { label: "Integrasi API", href: "/huggingface.co" },
    { label: "Dokumentasi Teknis", href: "/" },
  ],
  bantuan: [
    { label: "FAQ", href: "/#panduan" },
    { label: "Hubungi Pembuat", href: "/" },
    { label: "Laporkan Berita Hoax", href: "/" },
    { label: "Status Sistem", href: "/" },
  ],
  company: [
    { label: "Tentang Proyek", href: "/" },
    { label: "Tujuan", href: "/" },
    { label: "Disclaimer", href: "/" },
    { label: "Blog Pengembangan", href: "/" },
  ],
  services: [
    { label: "Cek Fakta", href: "/#deteksi" },
    { label: "Cara Kerja", href: "/#alur" },
    { label: "Integrasi API", href: "/" },
    { label: "Dokumentasi Teknis", href: "/" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Hubungi Pembuat", href: "/" },
    { label: "Laporkan Berita Hoax", href: "/" },
    { label: "Status Sistem", href: "/" },
  ],
};

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/srlnapr/fakenews-classification",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/haykalaul_/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5ZM4.5 7.75a3.25 3.25 0 0 1 3.25-3.25h8.5a3.25 3.25 0 0 1 3.25 3.25v8.5a3.25 3.25 0 0 1-3.25 3.25h-8.5a3.25 3.25 0 0 1-3.25-3.25v-8.5ZM12 8.25a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5Zm-2.25 3.75a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0Zm6.75-3.875a.875.875 0 1 0 0-1.75a.875.875 0 0 0 0 1.75Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/haykalaulilalbab/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75s1.75.79 1.75 1.75s-.78 1.75-1.75 1.75zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07c-1.87 0-2.15 1.46-2.15 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56c3.04 0 3.6 2 3.6 4.59v5.61z"/>
      </svg>
    ),
  },
  {
    name: "Hugging Face",
    href: "https://huggingface.co/skyzen122",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
        <path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zM180 188c13.3 0 24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24zm152 0c13.3 0 24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24zM128 304c44 40 212 40 256 0c4.6-4.2 11.6-3.8 15.8.9s3.8 11.6-.9 15.8c-27 24.8-80 40.3-143.9 40.3S127 345.5 100 320.7c-4.6-4.2-5-11.2-.9-15.8s11.2-5.1 15.8-.9z"/>
      </svg>
    ),
  },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

import type { Variants } from "framer-motion";

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="relative bg-black/50 backdrop-blur-sm border-t border-white/10 "
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Gradient background */}
<div className="absolute inset-0 bg-gradient-to-br from-red-700/10 via-blue-600/20 to-red-500/10" />
      
      <div className="relative container max-w-6xl mx-auto px-4 py-12 lg:py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo and description */}
          <motion.div 
            className="lg:col-span-2 space-y-4"
            variants={itemVariants}
          >
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image
                src={logoImage}
                alt="Logo"
className="h-8 w-auto ml-[-12px]" // geser kiri sejauh 12px
              />
            </motion.div>
            <p className="text-white/70 text-sm leading-relaxed max-w-md">
              Platform deteksi modern yang menggunakan teknologi AI terdepan untuk memberikan solusi terbaik bagi kebutuhan Anda.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  {social.icon}
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Company links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-white font-semibold text-lg">Perusahaan</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <motion.li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-300 text-sm block py-1"
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-white font-semibold text-lg">Layanan</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <motion.li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-300 text-sm block py-1"
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.1 }}
                  >
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-white font-semibold text-lg">Dukungan</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <motion.li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-300 text-sm block py-1"
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

     

        {/* Bottom bar */}
        <motion.div 
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-white/60"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <p>&copy; {currentYear} Benerannih. Semua hak cipta dilindungi.</p>
            <div className="flex gap-6">
              <motion.a
                href="/privacy"
                className="hover:text-white transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                Kebijakan Privasi
              </motion.a>
              <motion.a
                href="/terms"
                className="hover:text-white transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                Syarat & Ketentuan
              </motion.a>
              <motion.a
                href="/cookies"
                className="hover:text-white transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                Cookies
              </motion.a>
            </div>
          </div>
          <motion.p
            className="text-xs opacity-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Dibuat oleh serlin aprilia
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}