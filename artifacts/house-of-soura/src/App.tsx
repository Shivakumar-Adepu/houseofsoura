import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { 
  ArrowDownRight, 
  ArrowRight, 
  ArrowUpRight, 
  Check, 
  Eye, 
  Heart, 
  Instagram, 
  Facebook,
  Menu as MenuIcon, 
  Search, 
  Sparkles, 
  X, 
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Tag,
  Scissors,
  Diamond,
  Shirt,
  UserCheck,
  Percent,
  Copy,
  Calendar
} from 'lucide-react';
import { ThreeDShowroom } from './components/ThreeDShowroom';
import { SpatialHero3D } from './components/SpatialHero3D';
import { SpatialRunway } from './components/SpatialRunway';
import { spatialSound } from './lib/SpatialSound';

export type Product = {
  id: number;
  name: string;
  category: string;
  image: string;
  color: string;
  description: string;
  fabricSpecs: string;
  craftsmanshipNotes: string;
};

const brochureProducts: Product[] = [
  {
    id: 1,
    name: 'Zardozi Bridal Designer Lehenga',
    category: '01 / Designer Wear',
    image: '/designer-wear.jpg',
    color: 'Royal Black & 24k Gold',
    description: 'Opulent bridal lehenga hand-embroidered with authentic zardozi needlework, antique gold sequins, and a sculpted sweetheart blouse with velvet pallu.',
    fabricSpecs: 'Pure Raw Silk • Velvet Dupatta • Micro Zari Embroidery',
    craftsmanshipNotes: 'Custom bridal drafting takes 3-4 weeks with personal fittings in our Miyapur studio.',
  },
  {
    id: 2,
    name: 'Peacock Maggam Bridal Blouse',
    category: '02 / Designer Blouses',
    image: '/designer-blouses.jpg',
    color: 'Maroon Velvet & Pearls',
    description: 'Bespoke bridal blouse featuring 180 hours of hand-guided zardozi and aari work with peacock motifs, pearl clusters, and cutwork sweetheart neckline.',
    fabricSpecs: 'Royal Micro-Velvet • Raw Silk Lining • Handcrafted Latkans',
    craftsmanshipNotes: 'Crafted to perfectly complement your heirloom bridal silk saree.',
  },
  {
    id: 3,
    name: 'Pure Kanjivaram Brocade Saree',
    category: '03 / Premium Silk Sarees',
    image: '/silk-sarees.jpg',
    color: 'Emerald & Gold Zari',
    description: 'Heirloom handloom silk saree woven with 3-ply pure mulberry silk and certified gold zari. Features authentic korvai temple borders and heavy grand pallu.',
    fabricSpecs: '100% Pure Mulberry Silk • Silk Mark Certified • Pure Gold Zari',
    craftsmanshipNotes: 'Accompanied by an unstitched designer blouse piece for custom embroidery.',
  },
  {
    id: 4,
    name: 'Sage Gota-Patti Anarkali Set',
    category: '04 / Ethnic Wear',
    image: '/ethnic-wear.jpg',
    color: 'Sage Green & Champagne',
    description: '36-kali flared floor-length anarkali ensemble with delicate gotta-patti embroidery, mirror highlights, and a scalloped pure organza dupatta.',
    fabricSpecs: 'Chanderi Silk • Cotton Voile Lining • Pure Organza Dupatta',
    craftsmanshipNotes: 'Flared 360° volume with built-in structured lining for grand celebrations.',
  },
  {
    id: 5,
    name: 'Champagne Pleated Corset Gown',
    category: '05 / Western Wear',
    image: '/western-wear.jpg',
    color: 'Liquid Champagne Gold',
    description: 'Structured evening gown with boned corset bodice, sculpted sweetheart neckline, and asymmetric pleated sunray skirt drape.',
    fabricSpecs: 'Pleated Satin Lame • Poly-Silk Crepe Lining • Boned Corsetry',
    craftsmanshipNotes: 'Made to measure for flawless body contouring and posture support.',
  },
  {
    id: 6,
    name: 'Embroidered Silk Chanderi Kurti Set',
    category: '06 / Daily Wear Collections',
    image: '/daily-wear.jpg',
    color: 'Blush Rose Silk',
    description: 'Graceful everyday luxury kurti set with resham threadwork floral yoke, fine crochet lace trims, and coordinated comfortable palazzo trousers.',
    fabricSpecs: 'Pure Chanderi Silk • Cotton Cambric Palazzo • Hand Loom Weave',
    craftsmanshipNotes: 'Breathable premium fabric designed for effortless everyday elegance.',
  },
];

const navItems = [
  { label: '3D Atelier', href: '#gallery-3d' },
  { label: 'Collections', href: '#spatial-runway' },
  { label: 'About Us', href: '#about-us' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Visit Studio', href: '#visit-us' },
];

/**
 * 3D Tilt Card with cursor-tracking specular glare
 */
function Tilt3DCard({
  product,
  index,
  total,
  onQuickView,
  onWhatsApp,
}: {
  product: Product;
  index: number;
  total: number;
  onQuickView: (product: Product) => void;
  onWhatsApp: (product: Product) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onPointerEnter={() => {
        setIsHovered(true);
        spatialSound.playChime(659.25, 0.3);
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="card-3d-wrapper relative h-full w-full cursor-pointer select-none"
    >
      <div
        className="card-3d relative flex h-full flex-col overflow-hidden border border-[#d6b35a]/30 bg-[#211d18] transition-all duration-300 rounded-2xl"
        style={{
          transform: isHovered
            ? `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025) translateZ(12px)`
            : 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)',
        }}
      >
        <div
          className="card-3d-glare pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(232,160,189,0.22) 0%, rgba(214,179,90,0.12) 30%, transparent 65%)`
              : 'none',
          }}
        />

        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1a1714]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171411] via-transparent to-transparent opacity-80" />

          <div
            className="card-3d-layer-1 absolute left-4 top-4 z-10 rounded-md border border-[#eadcb7]/30 bg-[#171411]/75 px-3 py-1 font-mono text-[9px] tracking-[.2em] text-[#d6b35a] backdrop-blur-md"
            style={{ transform: isHovered ? 'translateZ(35px)' : 'translateZ(0px)', transition: 'transform 200ms ease' }}
          >
            {product.category.split('/')[1]?.trim() || `0${index + 1}`}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onWhatsApp(product);
            }}
            aria-label={`Inquire about ${product.name} on WhatsApp`}
            className="card-3d-layer-2 absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#22c55e] text-white shadow-lg backdrop-blur-md transition-all hover:scale-110"
            style={{ transform: isHovered ? 'translateZ(45px)' : 'translateZ(0px)', transition: 'transform 200ms ease' }}
            title="Inquire on WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>

        <div
          className="relative z-10 flex flex-1 flex-col justify-between p-6"
          style={{ transform: isHovered ? 'translateZ(25px)' : 'translateZ(0px)', transition: 'transform 200ms ease' }}
        >
          <div>
            <p className="eyebrow mb-1 text-[9px] !text-[#d6b35a]">{product.category}</p>
            <h3 className="font-serif text-2xl text-[#e8e2d4]">{product.name}</h3>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#a99f8c]">{product.description}</p>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-[#d6b35a]/20 pt-4">
            <span className="text-xs font-mono text-[#d6b35a] uppercase tracking-wider">Bespoke Fitting</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  spatialSound.playClick();
                  onQuickView(product);
                }}
                className="flex items-center gap-1 rounded-md border border-[#d6b35a]/40 bg-[#171411] px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#d6b35a] hover:bg-[#d6b35a] hover:text-[#15120e] transition"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Examine</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onWhatsApp(product);
                }}
                className="flex items-center gap-1 rounded-md bg-[#22c55e] px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-white hover:bg-[#16a34a] transition"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Inquire</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Scroll3DSection({ children, id, className = '' }: { children: ReactNode; id?: string; className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={sectionRef} className={`scroll-3d-container relative ${className}`}>
      <div className={`scroll-3d-item ${inView ? 'in-view' : 'out-of-view'}`}>{children}</div>
    </section>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#" className="group flex items-center gap-3" data-testid="link-brand">
      <div className="relative">
        <img 
          src="/house-of-soura-monogram.png" 
          alt="House of Soura Designer Studio" 
          className={`${compact ? 'h-10 w-10' : 'h-12 w-12'} object-cover object-center rounded-full border border-[#d6b35a]/60 shadow-[0_0_25px_rgba(214,179,90,.3)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-6`} 
        />
        <span className="absolute -inset-1 rounded-full border border-[#e8a0bd]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="hidden sm:block leading-tight">
        <span className="block font-serif text-[17px] tracking-[0.18em] text-[#fbf7ee] font-medium">HOUSE OF SOURA</span>
        <span className="block text-[9px] tracking-[0.32em] text-[#d6b35a] uppercase font-mono">DESIGNER STUDIO</span>
      </div>
    </a>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [notice, setNotice] = useState('');
  const [couponCopied, setCouponCopied] = useState(false);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () =>
      setScroll(Math.min(100, (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen || !!quickView ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, searchOpen, quickView]);

  const openQuickView = (product: Product) => {
    setQuickView(product);
  };

  const openWhatsAppProduct = (product: Product) => {
    spatialSound.playChime(784, 0.6);
    const text = encodeURIComponent(`Hello House of Soura Designer Studio, I would like to inquire about custom styling for "${product.name}" (${product.category}).`);
    window.open(`https://wa.me/919704665777?text=${text}`, '_blank');
  };

  const copyCouponCode = () => {
    navigator.clipboard.writeText('SOURA10');
    setCouponCopied(true);
    spatialSound.playChime(880, 0.5);
    setTimeout(() => setCouponCopied(false), 3000);
  };

  return (
    <div className="noise relative min-h-[100dvh] overflow-x-hidden bg-[#171411] text-[#e8e2d4]">
      {/* Top 3D Golden Progress Bar */}
      <div className="fixed left-0 right-0 top-0 z-[60] h-0.5 bg-[#d6b35a]/15">
        <div
          className="h-full bg-gradient-to-r from-[#d6b35a] via-[#e8a0bd] to-[#d6b35a] transition-all duration-300"
          style={{ width: `${scroll}%` }}
        />
      </div>

      {/* Main Global Navigation */}
      <header className="absolute left-0 right-0 top-0 z-40 flex items-center justify-between px-5 py-5 sm:px-10 lg:px-14">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              href={item.href}
              key={item.href}
              className="text-[10px] uppercase tracking-[.24em] text-[#b9ae9a] transition hover:text-[#d6b35a]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/919704665777?text=Hello%20House%20of%20Soura%20Designer%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20your%20boutique%20collections."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-[#22c55e]/60 bg-[#22c55e]/15 px-4 py-2 text-xs text-[#22c55e] transition hover:bg-[#22c55e] hover:text-white"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">+91 97046 65777</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          <button
            onClick={() => {
              spatialSound.playClick();
              setSearchOpen(true);
            }}
            className="flex items-center gap-2 p-2 text-[#b9ae9a] transition hover:text-[#d6b35a]"
            aria-label="Open search"
          >
            <Search className="h-[17px] w-[17px]" strokeWidth={1.3} />
          </button>

          <button
            onClick={() => {
              spatialSound.playClick();
              setMenuOpen(true);
            }}
            className="p-2 text-[#d6b35a] md:hidden"
            aria-label="Open menu"
          >
            <MenuIcon className="h-5 w-5" strokeWidth={1.2} />
          </button>
        </div>
      </header>

      <main className="relative z-10">
        {/* 1. THREE-DIMENSIONAL SPATIAL HERO */}
        <SpatialHero3D
          onExplore3D={() => {
            document.getElementById('gallery-3d')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreCollection={() => {
            document.getElementById('spatial-runway')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. 10% WALK-IN STORE OFFER BANNER */}
        <div className="relative overflow-hidden border-y border-[#d6b35a]/30 bg-gradient-to-r from-[#211d18] via-[#2a241e] to-[#211d18] py-5 px-4">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d6b35a] bg-[#d6b35a]/20 text-[#d6b35a]">
                <Percent className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6b35a] font-semibold block">
                  Exclusive Boutique Promotion
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#fbf7ee]">
                  Walk-In Store Offer • Flat 10% OFF
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#b8afa3] max-w-md font-light">
              Visit our Miyapur Studio in Mayuri Nagar to avail an exclusive 10% discount on bespoke designer wear, bridal blouses, and silk sarees.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={copyCouponCode}
                className="flex items-center gap-2 rounded-xl border border-[#d6b35a] bg-[#15120e] px-4 py-2 text-xs font-mono text-[#d6b35a] transition hover:bg-[#d6b35a] hover:text-[#15120e]"
              >
                {couponCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Coupon Copied: SOURA10</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Code: SOURA10</span>
                  </>
                )}
              </button>

              <a
                href="#visit-us"
                className="rounded-xl bg-gradient-to-r from-[#d6b35a] to-[#b38a36] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#15120e] shadow-md hover:bg-[#e8a0bd]"
              >
                Studio Location
              </a>
            </div>
          </div>
        </div>

        {/* 3. INTERACTIVE 3D WEBGL SHOWROOM */}
        <ThreeDShowroom
          onRequestViewing={(name) => {
            setNotice(`Private consultation requested for ${name}. Our Miyapur team will contact you.`);
          }}
        />

        {/* 4. SPATIAL 3D RUNWAY: 6 AUTHENTIC COLLECTIONS */}
        <SpatialRunway
          onSelectProduct={(item) => {
            const matched = brochureProducts.find((p) => p.id === item.id) || brochureProducts[0];
            openQuickView(matched);
          }}
        />

        {/* 5. ABOUT US (DIRECTLY FROM THE BROCHURE) */}
        <Scroll3DSection id="about-us" className="relative overflow-hidden border-y border-[#d6b35a]/20 bg-[#1c1814] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid min-h-[550px] lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#d6b35a]/40 bg-[#24201b] shadow-2xl">
                  <img
                    src="/designer-wear.jpg"
                    alt="House of Soura Designer Studio Atelier"
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14110e] via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-[#d6b35a]/30 pt-4 backdrop-blur-sm">
                    <span className="font-serif text-lg text-[#fbf7ee]">Bespoke Studio Atelier</span>
                    <span className="font-mono text-xs text-[#d6b35a]">Miyapur, Hyderabad</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#d6b35a] mb-4">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>About Us</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf7ee] leading-tight">
                  Fashion as a reflection of <i className="text-[#d6b35a]">your personality</i> and grace.
                </h2>
                
                <div className="mt-6 rounded-xl border border-[#d6b35a]/25 bg-[#24201b]/80 p-6 backdrop-blur-md">
                  <p className="text-sm sm:text-base leading-relaxed text-[#d8cfc4] italic font-serif">
                    “At House of Soura Designer Studio, we believe fashion is more than just what you wear – it's a reflection of your personality, your grace and your story. We create exquisite designs with premium fabrics, elegant craftsmanship and a personal touch – made just for you.”
                  </p>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-[#b8afa3] font-light">
                  Whether you are envisioning a show-stopping bridal lehenga, custom maggam blouse, pure Kanjivaram silk saree, or modern western evening wear, our master craftsmen bring your sartorial dreams to life with tailored perfection.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="https://wa.me/919704665777?text=Hello%20House%20of%20Soura%2C%20I%20would%20like%20to%20book%20a%20personal%20styling%20session."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#22c55e] to-[#16a34a] px-6 py-3 text-xs sm:text-sm font-semibold tracking-wider text-white shadow-lg"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Book Personal Styling on WhatsApp</span>
                  </a>

                  <a
                    href="#visit-us"
                    className="flex items-center gap-2 rounded-xl border border-[#d6b35a]/50 bg-[#211d18] px-6 py-3 text-xs sm:text-sm font-medium tracking-wider text-[#d6b35a] hover:border-[#d6b35a]"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Visit Studio in Miyapur</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Scroll3DSection>

        {/* 6. WHY CHOOSE HOUSE OF SOURA? (5 PILLARS FROM BROCHURE) */}
        <Scroll3DSection id="why-us" className="section-pad border-t border-[#d6b35a]/20 bg-[#15120e]">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#d6b35a] mb-2">
                <Sparkles className="h-3 w-3" />
                <span>Our Hallmark Principles</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf7ee]">
                Why Choose House of Soura?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-[#b8afa3] font-light">
                Five reasons why brides and fashion connoisseurs trust House of Soura Designer Studio for their most cherished moments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  icon: <Diamond className="h-6 w-6 text-[#d6b35a]" />,
                  title: 'Premium Fabrics',
                  desc: 'Handpicked pure silks, raw silks, organzas, velvets, and certified gold zari brocades.',
                },
                {
                  icon: <Scissors className="h-6 w-6 text-[#e8a0bd]" />,
                  title: 'Customised Designs',
                  desc: 'Every piece is drafted to your exact measurements, posture, and design preferences.',
                },
                {
                  icon: <Shirt className="h-6 w-6 text-[#d6b35a]" />,
                  title: 'Elegant Finishing',
                  desc: 'Concealed seams, hand-rolled edges, reinforced boning, and immaculate stitching standards.',
                },
                {
                  icon: <UserCheck className="h-6 w-6 text-[#e8a0bd]" />,
                  title: 'Personal Styling',
                  desc: 'One-on-one consultation with expert stylists to match jewelry, draping, and occasion palette.',
                },
                {
                  icon: <Heart className="h-6 w-6 text-[#d6b35a]" />,
                  title: 'Made for Every Occasion',
                  desc: 'From grand bridal celebrations and sangeet nights to festive gatherings and everyday chic.',
                },
              ].map((pillar, pIdx) => (
                <div
                  key={pIdx}
                  className="group relative flex flex-col items-center text-center rounded-2xl border border-[#d6b35a]/25 bg-gradient-to-b from-[#1f1b16] to-[#161310] p-6 shadow-xl transition-all duration-300 hover:border-[#d6b35a] hover:-translate-y-1.5"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#d6b35a]/30 bg-[#24201b] transition-transform duration-300 group-hover:scale-110">
                    {pillar.icon}
                  </div>
                  <h3 className="font-serif text-lg text-[#fbf7ee] font-medium">{pillar.title}</h3>
                  <p className="mt-3 text-xs text-[#a99f8c] leading-relaxed font-light">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Scroll3DSection>

        {/* 7. INTERACTIVE 3D MULTI-LAYER CARD GRID */}
        <Scroll3DSection className="section-pad border-t border-[#d6b35a]/15 bg-[#14110e]">
          <div className="mb-14 text-center">
            <p className="eyebrow mb-3 !text-[#d6b35a]">Curated Showcase</p>
            <h2 className="font-serif text-4xl text-[#e8e2d4] sm:text-6xl">
              Couture in <i className="text-[#d6b35a]">3D Depth.</i>
            </h2>
            <p className="mx-auto mt-4 max-w-[480px] text-xs leading-6 text-[#a99f8c]">
              Hover to trigger 3D perspective gyroscopic tilts, examine embroidery craftsmanship, and connect directly on WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {brochureProducts.map((product, idx) => (
              <Tilt3DCard
                key={product.id}
                product={product}
                index={idx}
                total={brochureProducts.length}
                onQuickView={openQuickView}
                onWhatsApp={openWhatsAppProduct}
              />
            ))}
          </div>
        </Scroll3DSection>

        {/* 8. VISIT US & CONTACT (FROM BROCHURE) */}
        <Scroll3DSection id="visit-us" className="relative overflow-hidden border-t border-[#d6b35a]/20 bg-[#1f1b16] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Contact Details Card */}
              <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[#d6b35a]/40 bg-gradient-to-b from-[#171411] to-[#120f0c] p-8 shadow-2xl">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#d6b35a] mb-3">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Visit Our Designer Studio</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf7ee]">
                    House of Soura Designer Studio
                  </h2>
                  <p className="mt-2 font-serif italic text-lg text-[#e8a0bd]">
                    “Timeless Elegance, Designed for You.”
                  </p>

                  <div className="mt-8 space-y-6">
                    {/* Location */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d6b35a]/50 bg-[#d6b35a]/10 text-[#d6b35a]">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#d6b35a] block font-medium">
                          Studio Location
                        </span>
                        <p className="text-sm text-[#fbf7ee] mt-1 font-light leading-relaxed">
                          Beside Curry & Carry, HDFC Lane Road,<br />
                          Mayuri Nagar, Miyapur – 500049, Hyderabad, India
                        </p>
                      </div>
                    </div>

                    {/* WhatsApp & Phone */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#22c55e]/50 bg-[#22c55e]/10 text-[#22c55e]">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#22c55e] block font-medium">
                          Phone & WhatsApp for Queries
                        </span>
                        <a
                          href="tel:+919704665777"
                          className="text-base text-[#fbf7ee] font-mono hover:text-[#d6b35a] mt-1 block"
                        >
                          +91 97046 65777
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d6b35a]/50 bg-[#d6b35a]/10 text-[#d6b35a]">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#d6b35a] block font-medium">
                          Email Enquiries
                        </span>
                        <a
                          href="mailto:houseofsoura@gmail.com"
                          className="text-sm text-[#fbf7ee] hover:text-[#e8a0bd] mt-1 block font-mono"
                        >
                          houseofsoura@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-[#d6b35a]/20 flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/919704665777?text=Hello%20House%20of%20Soura%20Designer%20Studio%2C%20I%20would%20like%20to%20visit%20your%20Miyapur%20studio."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#22c55e] to-[#16a34a] py-3.5 text-xs sm:text-sm font-semibold tracking-wider text-white shadow-lg hover:shadow-[0_4px_25px_rgba(34,197,94,0.4)]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp Studio Concierge</span>
                  </a>

                  <a
                    href="https://maps.google.com/?q=Mayuri+Nagar,+Miyapur,+Hyderabad,+500049"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#d6b35a]/50 bg-[#211d18] px-6 py-3.5 text-xs sm:text-sm font-medium tracking-wider text-[#d6b35a] hover:border-[#d6b35a]"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Open in Maps</span>
                  </a>
                </div>
              </div>

              {/* Walk-in Promo Card */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#d6b35a]/50 bg-gradient-to-b from-[#241f19] to-[#161310] p-8 shadow-2xl text-center relative overflow-hidden">
                <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-[#d6b35a]/15 blur-2xl" />

                <div>
                  <span className="rounded-full border border-[#d6b35a]/60 bg-[#d6b35a]/15 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-[#d6b35a]">
                    Special Walk-In Privilege
                  </span>
                  
                  <h3 className="font-serif text-4xl sm:text-5xl text-[#fbf7ee] mt-6">
                    WALK-IN STORE<br />
                    <span className="text-[#d6b35a]">OFFER</span>
                  </h3>

                  <div className="my-6 inline-block rounded-2xl border-2 border-[#d6b35a] bg-[#1a1714] px-8 py-4 shadow-[0_0_30px_rgba(214,179,90,0.3)]">
                    <span className="font-serif text-5xl sm:text-6xl text-[#d6b35a] font-bold">
                      10% OFF
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#b8afa3] font-light leading-relaxed max-w-xs mx-auto">
                    Show this digital showcase or mention code <span className="font-mono text-[#d6b35a] font-bold">SOURA10</span> at our Miyapur studio counter to claim your discount.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#d6b35a]/20">
                  <span className="text-[11px] uppercase tracking-widest text-[#8e8579] block mb-2">
                    Follow Our Atelier
                  </span>
                  <div className="flex items-center justify-center gap-4 text-[#d6b35a]">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6b35a]/40 bg-[#15120e] hover:bg-[#d6b35a] hover:text-[#15120e] transition"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6b35a]/40 bg-[#15120e] hover:bg-[#d6b35a] hover:text-[#15120e] transition"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Scroll3DSection>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-[#d6b35a]/20 bg-[#0f0d0b] px-5 py-12 sm:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1240px] gap-12 md:grid-cols-[1.2fr_.8fr_.8fr_1.4fr]">
          <div>
            <Logo compact />
            <p className="mt-4 text-xs italic font-serif text-[#d6b35a]">“Timeless Elegance, Designed for You.”</p>
            <p className="mt-3 max-w-[240px] text-xs leading-6 text-[#7d7467]">
              Beside Curry & Carry, HDFC Lane Road, Mayuri Nagar, Miyapur – 500049.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-5">Collections</p>
            <div className="flex flex-col gap-2 text-xs text-[#b9ae9a]">
              <span>Designer Wear Lehengas</span>
              <span>Designer Blouses (Maggam)</span>
              <span>Premium Silk Sarees</span>
              <span>Ethnic Wear Anarkalis</span>
              <span>Western Wear Gowns</span>
              <span>Daily Wear Collections</span>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-5">Direct Contact</p>
            <a
              href="https://wa.me/919704665777"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-[#22c55e] transition hover:underline"
            >
              <MessageCircle className="h-3.5 w-3.5" /> +91 97046 65777
            </a>
            <a href="mailto:houseofsoura@gmail.com" className="mt-2 block text-xs text-[#b9ae9a] hover:text-[#d6b35a]">
              houseofsoura@gmail.com
            </a>
            <p className="mt-3 text-xs text-[#7d7467]">Miyapur · Hyderabad · 500049</p>
          </div>
          <div>
            <p className="eyebrow mb-4">Walk-in Studio Offer</p>
            <p className="text-xs leading-6 text-[#b9ae9a] mb-4">
              Visit our studio for custom sizing and claim 10% off your bespoke couture piece.
            </p>
            <button
              onClick={copyCouponCode}
              className="flex items-center gap-2 rounded-lg border border-[#d6b35a] bg-[#1a1714] px-4 py-2 text-xs font-mono text-[#d6b35a]"
            >
              <Tag className="h-3.5 w-3.5" />
              <span>Use Code: SOURA10</span>
            </button>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-[1240px] justify-between border-t border-[#d6b35a]/15 pt-5 text-[9px] uppercase tracking-[.2em] text-[#655e55]">
          <span>© 2026 House of Soura Designer Studio</span>
          <span>Beside Curry & Carry, Mayuri Nagar, Miyapur – 500049</span>
        </div>
      </footer>

      {/* Floating Notice Toast */}
      {notice && (
        <div
          className="fixed bottom-6 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-full border border-[#d6b35a]/50 bg-[#1c1814]/95 px-6 py-3 text-xs text-[#e8e2d4] shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3"
          role="status"
        >
          <Check className="h-4 w-4 text-[#d6b35a]" /> {notice}
        </div>
      )}

      {/* Search Drawer */}
      {searchOpen && (
        <div className="fixed left-0 right-0 top-0 z-[70] bg-[#1c1814] px-6 pb-16 pt-7 shadow-2xl shadow-black/60 sm:px-12">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex items-center justify-between">
              <Logo compact />
              <button onClick={() => setSearchOpen(false)} className="text-[#d6b35a]" aria-label="Close search">
                <X className="h-5 w-5" strokeWidth={1.2} />
              </button>
            </div>
            <div className="mt-16 flex items-center gap-4 border-b border-[#d6b35a]/50 pb-4">
              <Search className="h-5 w-5 text-[#d6b35a]" strokeWidth={1.2} />
              <input
                autoFocus
                type="search"
                placeholder="Search blouses, silk sarees, lehengas, anarkalis..."
                className="w-full bg-transparent font-serif text-2xl sm:text-4xl text-[#e8e2d4] outline-none placeholder:text-[#6f675d]"
              />
            </div>
            <p className="eyebrow mt-5">Try “maggam blouse”, “Kanjivaram”, “zardozi”, or “anarkali”</p>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <aside className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-[#1c1814] p-7 shadow-2xl shadow-black/70 sm:p-10">
          <div className="flex items-center justify-between">
            <Logo compact />
            <button onClick={() => setMenuOpen(false)} className="text-[#d6b35a]" aria-label="Close menu">
              <X className="h-5 w-5" strokeWidth={1.2} />
            </button>
          </div>
          <nav className="mt-16 flex flex-col gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                onClick={() => setMenuOpen(false)}
                href={item.href}
                className="flex items-end justify-between border-b border-[#d6b35a]/20 pb-4 font-serif text-3xl text-[#e8e2d4] transition hover:text-[#d6b35a]"
              >
                {item.label}
                <ArrowUpRight className="h-5 w-5 text-[#d6b35a]" strokeWidth={1.2} />
              </a>
            ))}
          </nav>
          <div className="mt-auto">
            <p className="eyebrow mb-2">WhatsApp Queries</p>
            <a href="https://wa.me/919704665777" className="font-mono text-sm text-[#22c55e] flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4" /> +91 97046 65777
            </a>
          </div>
        </aside>
      )}

      {/* 3D Full Inspection Modal */}
      {quickView && (
        <div
          className="fixed inset-0 z-[75] flex items-center justify-center bg-[#0d0b09]/85 p-4 backdrop-blur-md sm:p-8"
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-3d-entrance relative grid max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#d6b35a]/40 bg-[#1c1814] shadow-2xl shadow-black/90 md:grid-cols-2">
            <button
              onClick={() => setQuickView(null)}
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#d6b35a]/30 bg-[#171411]/70 text-[#e8e2d4] transition hover:border-[#d6b35a] hover:text-[#d6b35a]"
              aria-label="Close view"
            >
              <X className="h-5 w-5" strokeWidth={1.2} />
            </button>

            <div className="group relative aspect-[.85] max-h-[55vh] overflow-hidden md:max-h-none">
              <img
                src={quickView.image}
                alt={quickView.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1c1814] via-transparent to-transparent md:hidden" />
              <div className="absolute bottom-4 left-4 z-10 hidden rounded-md border border-[#d6b35a]/30 bg-[#171411]/75 px-3 py-1 font-mono text-[9px] uppercase tracking-[.2em] text-[#d6b35a] backdrop-blur-md md:block">
                Boutique Craftsmanship Inspection
              </div>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10">
              <p className="eyebrow mb-2 !text-[#d6b35a]">{quickView.category}</p>
              <h2 className="font-serif text-2xl sm:text-3xl leading-tight text-[#e8e2d4]">{quickView.name}</h2>
              <p className="mt-2 text-xs font-mono text-[#d6b35a] uppercase tracking-wider">
                Bespoke Tailoring & Custom Styling
              </p>
              <p className="mt-4 text-xs sm:text-sm leading-6 text-[#a99f8c]">{quickView.description}</p>
              
              <div className="mt-4 rounded-lg border border-[#d6b35a]/20 bg-[#15120e]/60 p-3.5 space-y-2">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#d6b35a] block font-medium">Fabric Specifications:</span>
                  <span className="text-xs text-[#d8cfc4]">{quickView.fabricSpecs}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#e8a0bd] block font-medium">Atelier Notes:</span>
                  <span className="text-xs text-[#b8afa3] font-light">{quickView.craftsmanshipNotes}</span>
                </div>
              </div>

              <div className="mt-6 space-y-2.5">
                <button
                  onClick={() => openWhatsAppProduct(quickView)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#22c55e] via-[#16a34a] to-[#15803d] py-3.5 text-xs sm:text-sm font-semibold tracking-wider text-white shadow-lg hover:shadow-[0_4px_20px_rgba(34,197,94,0.4)]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Inquire on WhatsApp • +91 97046 65777</span>
                </button>

                <a
                  href="#visit-us"
                  onClick={() => setQuickView(null)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#d6b35a]/50 bg-[#211d18] py-3 text-xs font-medium tracking-wider text-[#d6b35a] hover:bg-[#d6b35a]/10"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Visit Studio in Mayuri Nagar, Miyapur</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return <Home />;
}