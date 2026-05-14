import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t, language, settings } = useLanguage();

  return (
    <section id="about" className="py-24 px-6 border-t border-white/10 geometric-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
        <div className={`flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-mono text-xs text-brand-red tracking-[0.4em] mb-4 uppercase block"
          >
            {t('about_badge')}
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-none">
            {t('about_title')}
          </h2>
          <div className="space-y-6 text-white/70 text-lg leading-relaxed max-w-xl">
            <p>
              {t('about_p1')}
            </p>
            <p>
              {t('about_p2')}
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-xs text-white/40 mb-2">{t('services')}</p>
              <ul className={`font-bold text-sm space-y-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <li>{language === 'en' ? 'IDENTITY DESIGN' : 'تصميم الهوية'}</li>
                <li>{language === 'en' ? 'VISUAL SYSTEMS' : 'الأنظمة البصرية'}</li>
                <li>{language === 'en' ? 'DIGITAL ART' : 'الفن الرقمي'}</li>
                <li>{language === 'en' ? 'CONCEPT ART' : 'فن المفهوم'}</li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs text-white/40 mb-2">{t('tools')}</p>
              <ul className={`font-bold text-sm space-y-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <li>ADOBE SUITE</li>
                <li>BLENDER</li>
                <li>FIGMA</li>
                <li>CUSTOM SCRIPTS</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex justify-center items-center">
           <motion.div 
            initial={{ rotate: -5 }}
            whileInView={{ rotate: 0 }}
            className="relative w-full max-w-md aspect-square bg-white/5 border border-white/10 p-4"
           >
              <div className={`absolute top-0 ${language === 'ar' ? 'left-0' : 'right-0'} p-4 font-mono text-[10px] text-brand-red z-10`}>
                PERSONAL_PROFILE_01
              </div>
              <img 
                src={settings?.profileImage || "/me.png"} 
                alt="Amouna Ahmed Lasheen"
                className="w-full h-full object-cover grayscale brightness-90 contrast-110"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800";
                }}
              />
              <div className={`absolute -bottom-10 ${language === 'ar' ? '-left-10' : '-right-10'} w-48 h-48 border border-brand-red/30 hidden lg:block`} />
           </motion.div>
        </div>
      </div>
    </section>
  );
}
