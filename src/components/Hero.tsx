import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { t, language } = useLanguage();
  
  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden geometric-pattern">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-dark via-transparent to-brand-dark z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-20 flex flex-col items-center"
      >
        <div className="glitch-wrapper relative" dir="ltr">
          {/* Hero Logo Image Background */}
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 2 }}
            src="/logo.png"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-auto mix-blend-screen pointer-events-none grayscale opacity-20"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          
          <h1 
            data-text="DARK MED"
            className="glitch-text text-[15vw] md:text-[12vw] font-bold leading-none tracking-tighter flex relative z-10"
          >
            <span className="text-brand-red">DARK</span>
            <span className="text-white ml-4">MED</span>
          </h1>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex gap-4 items-center"
        >
          <div className="h-[1px] w-12 bg-brand-red" />
          <p className="font-mono text-sm md:text-base tracking-[0.3em] uppercase text-center px-4">
            {t('hero_sub')}
          </p>
          <div className="h-[1px] w-12 bg-brand-red" />
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className={`absolute bottom-12 ${language === 'ar' ? 'right-12' : 'left-12'} z-20 hidden md:block`}>
        <p className={`font-mono text-[10px] leading-relaxed text-white/30 uppercase tracking-widest ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          {language === 'en' ? (
            <>
              Scanning Infrastructure...<br />
              Identity Protocol: Active<br />
              Visual Systems: Optimized
            </>
          ) : (
            <>
              جاري فحص البنية التحتية...<br />
              بروتوكول الهوية: نشط<br />
              الأنظمة المرئية: محسنة
            </>
          )}
        </p>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-red to-transparent" />
      </motion.div>
    </section>
  );
}
