import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { t, language, settings } = useLanguage();

  const email = settings?.contactEmail || "HELLO@DARKMED.IO";

  return (
    <section id="contact" className="py-24 px-6 bg-brand-red text-brand-dark">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex-1">
          <h2 className="text-7xl font-bold tracking-tighter leading-none mb-6">
            {t('contact_title')}
          </h2>
          <p className="font-mono text-sm tracking-widest uppercase opacity-80">
            {t('contact_sub')}
          </p>
        </div>
        
        <div className={`flex flex-col ${language === 'ar' ? 'items-start' : 'items-end'} gap-8`}>
          <a href={`mailto:${email}`} className="text-xl md:text-4xl font-bold border-b-4 border-brand-dark hover:pb-2 transition-all cursor-pointer break-all">
            {email.toUpperCase()}
          </a>
          <div className="flex gap-8 font-mono text-sm font-bold uppercase">
            <a className="hover:opacity-50 transition-opacity cursor-pointer">{language === 'en' ? 'INSTAGRAM' : 'انستجرام'}</a>
            <a className="hover:opacity-50 transition-opacity cursor-pointer">{language === 'en' ? 'BEHANCE' : 'بيهانس'}</a>
            <a className="hover:opacity-50 transition-opacity cursor-pointer">{language === 'en' ? 'LINKEDIN' : 'لينكد إن'}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
