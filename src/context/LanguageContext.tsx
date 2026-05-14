import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

type Language = 'en' | 'ar';

interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

export const defaultTranslations: Translations = {
  nav_works: { en: 'WORKS', ar: 'أعمالنا' },
  nav_about: { en: 'ABOUT', ar: 'من نحن' },
  nav_contact: { en: 'CONTACT', ar: 'تواصل' },
  hero_sub: { en: 'Visual Identity • Graphic Design • Digital Art', ar: 'هوية بصرية • تصميم جرافيكي • فن رقمي' },
  selected_works: { en: 'Selected Works (01—06)', ar: 'أعمال مختارة (٠١—٠٦)' },
  works_title: { en: 'WORKS', ar: 'الأعمال' },
  about_badge: { en: 'AMOUNA AHMED LASHEEN', ar: 'عمونا أحمد لاشين' },
  about_title: { en: 'CRAFTING VISUAL DISRUPTION.', ar: 'صناعة الإبهار البصري.' },
  about_p1: { 
    en: 'I am Amouna Ahmed Lasheen, the creative force behind DARK MED. As a graphic designer, my mission is to transform abstract ideas into powerful visual identities that demand attention and challenge the status quo.',
    ar: 'أنا عمونا أحمد لاشين، القوة الإبداعية وراء دارك ميد. كمصمم جرافيك، مهمتي هي تحويل الأفكار المجردة إلى هويات بصرية قوية تفرض حضورها وتتحدى الواقع.'
  },
  about_p2: { 
    en: 'With a focus on brutalist aesthetics and technical precision, I build narratives that resonate. Every project is a journey into the void, bringing back something unique and unforgettable.',
    ar: 'مع التركيز على الجماليات الوحشية والدقة التقنية، أقوم ببناء قصص ترن أصداؤها. كل مشروع هو رحلة في الفراغ، نعود منها بشيء فريد ولا يُنسى.'
  },
  services: { en: 'SERVICES', ar: 'الخدمات' },
  tools: { en: 'TOOLS', ar: 'الأدوات' },
  contact_title: { en: 'READY TO DISRUPT?', ar: 'جاهز للإبهار؟' },
  contact_sub: { en: 'Currently accepting new projects for 2024.', ar: 'نقبل حالياً مشاريع جديدة لعام ٢٠٢٤.' },
  footer_copy: { en: '© 2024 DARK MED SYSTEMS • ALL RIGHTS RESERVED', ar: '© ٢٠٢٤ أنظمة دارك ميد • جميع الحقوق محفوظة' },
  footer_void: { en: 'DESIGNED FOR THE VOID', ar: 'صُمم للفراغ' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  settings: any;
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('pref-lang');
    return (saved as Language) || 'en';
  });
  const [dynamicTranslations, setDynamicTranslations] = useState<Translations>({});
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('pref-lang', language);
  }, [language]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'global'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setDynamicTranslations(data.translations || {});
        setSettings(data);
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'settings/global');
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const t = (key: string) => {
    const combined = { ...defaultTranslations, ...dynamicTranslations };
    return combined[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, settings, loading }}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
