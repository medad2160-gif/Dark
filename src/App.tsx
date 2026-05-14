/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Contact from "./components/Contact";
import { motion, useScroll, useSpring } from "motion/react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="py-12 px-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center bg-brand-dark">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em]">
          {t('footer_copy')}
        </p>
      </div>
      <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em] mt-4 md:mt-0">
        {t('footer_void')}
      </p>
    </footer>
  );
}

function MainContent() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Temporary Seeding Logic for the new designs
  useEffect(() => {
    const seedProjects = async () => {
      try {
        const { collection, getDocs, addDoc, query, setDoc, doc, getDoc, writeBatch } = await import('firebase/firestore');
        const { db } = await import('./lib/firebase');
        
        // Check if we already seeded in this session to avoid redundant calls
        if (sessionStorage.getItem('portfolio_seeded')) return;

        // Check projects count
        const projectsRef = collection(db, 'projects');
        const snapshot = await getDocs(projectsRef);
        
        if (snapshot.size < 5) {
          console.log('Populating portfolio with your new designs...');
          const newProjects = [
            {
              title: { en: 'Nike x Travis Scott', ar: 'نايكي x ترافيس سكوت' },
              category: { en: 'Advertising', ar: 'إعلانات' },
              image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1000',
              tags: ['Social Media', 'Creative Direction'],
              order: 0
            },
            {
              title: { en: 'Shadow X Fragrance', ar: 'عطر شادو X' },
              category: { en: 'Advertising', ar: 'إعلانات' },
              image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1000',
              tags: ['Product Design', 'Visuals'],
              order: 1
            },
            {
              title: { en: 'Noir Elixir', ar: 'نوار إليكسير' },
              category: { en: 'Advertising', ar: 'إعلانات' },
              image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000',
              tags: ['Minimalist', 'Luxury'],
              order: 2
            },
            {
              title: { en: 'Remberio Showroom', ar: 'معرض ريمبيريو' },
              category: { en: 'Visual Identity', ar: 'هوية بصرية' },
              image: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&q=80&w=1000',
              tags: ['Automotive', 'Branding'],
              order: 3
            },
            {
              title: { en: 'Manjar Abaya', ar: 'متجر عباية' },
              category: { en: 'Fashion Identity', ar: 'هوية أزياء' },
              image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=1000',
              tags: ['Brand Guidelines', 'Typography'],
              order: 4
            },
            {
              title: { en: 'Takwen Real Estate', ar: 'تكوين العقارية' },
              category: { en: 'Identity', ar: 'هوية' },
              image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
              tags: ['Real Estate', 'Geometric'],
              order: 5
            },
            {
              title: { en: 'Al-Omda Coffee', ar: 'قهوة العمدة' },
              category: { en: 'Identity', ar: 'هوية' },
              image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000',
              tags: ['Classic', 'Arabic Type'],
              order: 6
            },
            {
              title: { en: 'Larana Fashion', ar: 'لارانا للأزياء' },
              category: { en: 'Fashion', ar: 'أزياء' },
              image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000',
              tags: ['Elegant', 'Studio'],
              order: 7
            }
          ];

          for (const project of newProjects) {
            await addDoc(projectsRef, project);
          }
          console.log('Portfolio updated successfully.');
        }

        // Seed Settings
        const settingsDoc = doc(db, 'settings', 'global');
        const settingsSnap = await getDoc(settingsDoc);
        if (!settingsSnap.exists()) {
          console.log('Seeding global settings...');
          await setDoc(settingsDoc, {
            maintenanceMode: false,
            lastUpdated: new Date().toISOString(),
            portfolioCount: 8
          });
        }
        
        sessionStorage.setItem('portfolio_seeded', 'true');

      } catch (e) {
        console.error("Seeding failed", e);
      }
    };
    seedProjects();
  }, []);

  return (
    <main className="relative selection:bg-brand-red selection:text-white bg-brand-dark">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-red z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      <Hero />
      <Portfolio />
      <About />
      <Contact />
      
      <Footer />
    </main>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
