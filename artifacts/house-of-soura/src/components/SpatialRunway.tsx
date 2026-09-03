import { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, Sparkles, Heart, MessageCircle } from 'lucide-react';
import { spatialSound } from '../lib/SpatialSound';

export interface RunwayItem {
  id: number;
  title: string;
  category: string;
  season: string;
  image: string;
  materials: string;
  description: string;
}

const BROCHURE_COLLECTIONS: RunwayItem[] = [
  {
    id: 1,
    title: 'Designer Wear Lehengas & Gowns',
    category: '01 / Designer Wear',
    season: 'Bridal & Reception Edition',
    image: '/designer-wear.jpg',
    materials: 'Pure Raw Silk • Velvet Dupatta • Hand Zardozi & Sequins',
    description: 'Opulent bridal lehengas and reception gowns tailored with bespoke zardozi embroidery and timeless silhouette architecture.',
  },
  {
    id: 2,
    title: 'Handcrafted Bridal Blouses',
    category: '02 / Designer Blouses',
    season: 'Maggam & Aari Atelier',
    image: '/designer-blouses.jpg',
    materials: 'Micro Velvet • Pearls • Cutwork Sweetheart Neckline',
    description: 'Bespoke bridal blouses with deep heritage maggam work, intricate peacock motifs, and handcrafted latkan back closures.',
  },
  {
    id: 3,
    title: 'Premium Pure Silk Sarees',
    category: '03 / Premium Silk Sarees',
    season: 'Kanjivaram & Banarasi Loom',
    image: '/silk-sarees.jpg',
    materials: '3-Ply Mulberry Silk • Certified Pure Gold Zari',
    description: 'Heirloom handloom silk sarees in emerald green, ruby magenta, and mustard with traditional temple borders and grand zari pallus.',
  },
  {
    id: 4,
    title: 'Regal Ethnic Anarkalis & Ensembles',
    category: '04 / Ethnic Wear',
    season: 'Festive & Sangeet',
    image: '/ethnic-wear.jpg',
    materials: 'Chanderi Silk • Gota-Patti Lace • Organza Dupatta',
    description: 'Floor-length 36-kali flared anarkali sets with delicate metallic threadwork, mirror highlights, and coordinated embroidered dupattas.',
  },
  {
    id: 5,
    title: 'Contemporary Western Wear',
    category: '05 / Western Wear',
    season: 'Cocktail & Modern Gowns',
    image: '/western-wear.jpg',
    materials: 'Pleated Satin Lame • Structured Corset Bodice',
    description: 'Modern champagne and noir designer evening dresses featuring corset boning, asymmetric fluid drapes, and statuesque silhouettes.',
  },
  {
    id: 6,
    title: 'Daily Wear & Festive Kurtis',
    category: '06 / Daily Wear Collections',
    season: 'Comfort & Grace',
    image: '/daily-wear.jpg',
    materials: 'Chanderi Silk • Cotton Satin • Delicate Resham Embroidery',
    description: 'Elevated designer kurtis, light coords, and everyday luxury ensembles crafted with breathable premium fabrics for effortless grace.',
  },
];

export function SpatialRunway({
  onSelectProduct,
}: {
  onSelectProduct: (item: RunwayItem) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const handleNext = () => {
    spatialSound.playClick();
    setActiveIndex((prev) => (prev + 1) % BROCHURE_COLLECTIONS.length);
  };

  const handlePrev = () => {
    spatialSound.playClick();
    setActiveIndex((prev) => (prev - 1 + BROCHURE_COLLECTIONS.length) % BROCHURE_COLLECTIONS.length);
  };

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    spatialSound.playChime(784, 0.4);
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const openWhatsApp = (item: RunwayItem) => {
    spatialSound.playChime(784, 0.6);
    const text = encodeURIComponent(
      `Hello House of Soura Designer Studio, I would like to inquire about your "${item.title}" (${item.category}) for custom tailoring.`
    );
    window.open(`https://wa.me/919704665777?text=${text}`, '_blank');
  };

  const currentItem = BROCHURE_COLLECTIONS[activeIndex];

  return (
    <section id="spatial-runway" className="relative z-10 w-full overflow-hidden bg-[#120f0c] py-24 text-[#f5efe6]">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#d6b35a]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[500px] w-[500px] rounded-full bg-[#e8a0bd]/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#d6b35a]/20 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#d6b35a]">
              <Sparkles className="h-3 w-3" />
              <span>Boutique Catalog</span>
            </div>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl text-[#fbf7ee]">
              Our 6 Signature Collections
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#b8afa3] font-light">
              Explore the signature boutique categories featured in the House of Soura Designer Studio brochure.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d6b35a]/40 bg-[#1c1814] text-[#d6b35a] transition-all hover:border-[#d6b35a] hover:bg-[#d6b35a] hover:text-[#15120e]"
              aria-label="Previous Collection Look"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <span className="font-serif text-sm tracking-widest text-[#b8afa3]">
              0{activeIndex + 1} / 0{BROCHURE_COLLECTIONS.length}
            </span>
            <button
              onClick={handleNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d6b35a]/40 bg-[#1c1814] text-[#d6b35a] transition-all hover:border-[#d6b35a] hover:bg-[#d6b35a] hover:text-[#15120e]"
              aria-label="Next Collection Look"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 3D Runway Perspective Viewport */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 relative h-[480px] sm:h-[580px] w-full flex items-center justify-center perspective-[1200px]">
            {BROCHURE_COLLECTIONS.map((item, idx) => {
              const offset = idx - activeIndex;
              const isCenter = offset === 0;
              const absOffset = Math.abs(offset);

              const translateX = offset * 55;
              const translateZ = isCenter ? 60 : -140 * absOffset;
              const rotateY = offset * -24;
              const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.35;
              const zIndex = 20 - absOffset * 5;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (!isCenter) {
                      setActiveIndex(idx);
                      spatialSound.playClick();
                    }
                  }}
                  className="absolute top-0 h-full w-[280px] sm:w-[380px] cursor-pointer transition-all duration-700 ease-out"
                  style={{
                    transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                    opacity,
                    zIndex,
                    pointerEvents: absOffset > 1 ? 'none' : 'auto',
                  }}
                >
                  <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-[#d6b35a]/40 bg-[#1a1714] shadow-2xl transition-all duration-300 hover:border-[#d6b35a]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#100d0a] via-[#100d0a]/35 to-transparent" />

                    <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                      <span className="rounded-full border border-[#d6b35a]/40 bg-[#15120e]/80 px-3 py-1 text-[10px] uppercase tracking-widest text-[#d6b35a] backdrop-blur-md">
                        {item.season}
                      </span>
                      <button
                        onClick={(e) => toggleLike(item.id, e)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d6b35a]/30 bg-[#15120e]/80 text-[#f5efe6] backdrop-blur-md transition-transform hover:scale-110"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            likedIds.includes(item.id)
                              ? 'fill-[#e8a0bd] text-[#e8a0bd]'
                              : 'text-white'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="absolute bottom-4 inset-x-4 z-10">
                      <span className="text-[11px] uppercase tracking-widest text-[#d6b35a]">{item.category}</span>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#fbf7ee]">{item.title}</h3>
                      {isCenter && (
                        <span className="inline-block mt-2 text-[10px] uppercase tracking-wider text-[#b8afa3] bg-[#211d18]/80 px-2 py-1 rounded">
                          Active Perspective
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Active Piece Details Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#d6b35a]/30 bg-gradient-to-b from-[#1c1814] to-[#14110e] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            <div>
              <div className="flex items-center justify-between border-b border-[#d6b35a]/20 pb-4">
                <span className="text-xs uppercase tracking-[0.25em] text-[#d6b35a]">{currentItem.category}</span>
                <span className="font-serif text-xs text-[#b8afa3]">{currentItem.season}</span>
              </div>

              <h3 className="mt-4 font-serif text-3xl sm:text-4xl text-[#fbf7ee]">{currentItem.title}</h3>
              <p className="mt-2 text-xs font-mono uppercase tracking-wider text-[#d6b35a]">
                Bespoke Tailoring at Mayuri Nagar, Miyapur
              </p>

              <p className="mt-4 text-sm text-[#c4bbae] font-light leading-relaxed">
                {currentItem.description}
              </p>

              <div className="mt-6 rounded-xl border border-[#d6b35a]/20 bg-[#15120e]/60 p-4">
                <span className="text-[11px] uppercase tracking-wider text-[#d6b35a] font-medium block mb-1">
                  Fabric & Craftsmanship Specifications
                </span>
                <p className="text-xs text-[#d8cfc4]">{currentItem.materials}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#d6b35a]/20 space-y-3">
              <button
                onClick={() => openWhatsApp(currentItem)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#22c55e] via-[#16a34a] to-[#15803d] py-3.5 text-xs sm:text-sm font-semibold tracking-wider text-white shadow-lg hover:shadow-[0_4px_25px_rgba(34,197,94,0.4)]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp for Custom Sizing • +91 97046 65777</span>
              </button>

              <button
                onClick={() => onSelectProduct(currentItem)}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-[#d6b35a]/40 bg-[#211d18]/80 py-3 text-xs tracking-wider uppercase text-[#d6b35a] transition-all hover:bg-[#d6b35a]/15 hover:border-[#d6b35a]"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>View Full Craft Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
