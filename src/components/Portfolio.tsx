import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";

const fallbackProjects = [
  {
    id: 'f1',
    title: { en: "Nike x Travis Scott", ar: "نايكي x ترافيس سكوت" },
    category: { en: "Advertising", ar: "إعلانات" },
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800",
    tags: ["Social Media", "Creative"]
  },
  {
    id: 'f2',
    title: { en: "Shadow X Fragrance", ar: "عطر شادو X" },
    category: { en: "Advertising", ar: "إعلانات" },
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
    tags: ["Product", "Visuals"]
  },
  {
    id: 'f3',
    title: { en: "Noir Elixir", ar: "نوار إليكسير" },
    category: { en: "Advertising", ar: "إعلانات" },
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
    tags: ["Minimalist", "Luxury"]
  },
  {
    id: 'f4',
    title: { en: "Remberio Showroom", ar: "معرض ريمبيريو" },
    category: { en: "Visual Identity", ar: "هوية بصرية" },
    image: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&q=80&w=800",
    tags: ["Automotive", "Branding"]
  },
  {
    id: 'f5',
    title: { en: "Manjar Abaya", ar: "متجر عباية" },
    category: { en: "Fashion Identity", ar: "هوية أزياء" },
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800",
    tags: ["Brand", "Typography"]
  },
  {
    id: 'f6',
    title: { en: "Takwen", ar: "تكوين" },
    category: { en: "Identity", ar: "هوية" },
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    tags: ["Real Estate", "Geometric"]
  }
];

export default function Portfolio() {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(data.length > 0 ? data : fallbackProjects);
      setLoading(false);
    }, (error) => {
      console.error("Firestore loading error:", error);
      setProjects(fallbackProjects);
      setLoading(false);
      handleFirestoreError(error, OperationType.LIST, 'projects');
    });

    return () => unsub();
  }, []);

  const categories = ["ALL", ...new Set(projects.map(p => p.category?.[language]?.toUpperCase() || "MISC"))];

  const filteredProjects = activeCategory === "ALL" 
    ? projects 
    : projects.filter(p => p.category[language].toUpperCase() === activeCategory);

  return (
    <section id="works" className="py-24 px-6 bg-brand-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-2">
            <span className="font-mono text-xs text-brand-red tracking-[0.4em] uppercase block">
              {t('selected_works')}
            </span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">{t('works_title')}</h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 font-mono text-[9px] tracking-widest pb-2 overflow-x-auto w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 border transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? "bg-brand-red border-brand-red text-white" 
                    : "border-white/10 text-white/40 hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-white/5 animate-pulse" />
            ))
          ) : filteredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-white/5 bg-gray-900">
                <img 
                  src={project.image} 
                  alt={project.title[language]}
                  className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                />
                <div className="absolute inset-0 border-[0.5px] border-white/10 group-hover:border-brand-red transition-colors" />
                
                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                   <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="font-mono text-[10px] px-2 py-1 bg-brand-red text-white">
                        {tag}
                      </span>
                    ))}
                   </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between items-start">
                <div>
                  <p className="font-mono text-[10px] text-white/40 mb-2 tracking-[0.2em]">
                    {language === 'en' ? `0${index + 1}` : `٠${index + 1}`}
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight">{project.title[language]}</h3>
                </div>
                <span className="font-mono text-[10px] border border-white/20 px-2 py-1 text-white/60">
                  {project.category[language]}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
