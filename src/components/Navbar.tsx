import { motion } from "motion/react";
import { Link } from "react-scroll";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t('nav_works'), to: "works" },
    { name: t('nav_about'), to: "about" },
    { name: t('nav_contact'), to: "contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 mix-blend-difference"
    >
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col items-center gap-6" dir="ltr">
        {/* Real Logo Image - Centered at Top */}
        <motion.img 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          src="/logo.png" 
          alt="DARK MED Logo"
          className="h-16 w-auto mix-blend-screen brightness-125 grayscale contrast-125"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />

        {/* Centered Navigation Items */}
        <div className="flex items-center gap-8 md:gap-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="flex gap-4 md:gap-12">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                smooth={true}
                duration={500}
                className="font-mono text-[10px] md:text-xs tracking-[0.3em] cursor-pointer hover:text-brand-red transition-all hover:tracking-[0.4em] uppercase"
              >
                [{item.name}]
              </Link>
            ))}
          </div>

          {/* Language Toggle */}
          <button 
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="font-mono text-[10px] md:text-xs border border-white/20 px-3 py-1 hover:bg-white/10 transition-colors uppercase tracking-widest"
          >
            {language === 'en' ? 'AR' : 'EN'}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
