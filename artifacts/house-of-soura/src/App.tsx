import { type ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Check, Eye, Heart, Instagram, Menu as MenuIcon, Plus, Search, ShoppingBag, X } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  color: string;
  sizes: string[];
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    name: 'The Soura Tuxedo',
    category: '01 / Tailoring',
    price: '€1,280',
    image: '/soura-look-1.jpg',
    color: 'Midnight wool',
    sizes: ['34', '36', '38', '40'],
    description: 'A cut of quiet authority. Sculpted in Italian wool with an architectural shoulder and satin lapel.',
  },
  {
    id: 2,
    name: 'N° 07 Silk Column',
    category: '02 / Evening',
    price: '€1,450',
    image: '/soura-look-2.jpg',
    color: 'Rose smoke silk',
    sizes: ['34', '36', '38'],
    description: 'Liquid silk falls from a clean neckline into a long, uninterrupted line. Made for the last light.',
  },
  {
    id: 3,
    name: 'Nocturne Cape',
    category: '03 / Outerwear',
    price: '€980',
    image: '/soura-hero.jpg',
    color: 'Obsidian velvet',
    sizes: ['One size'],
    description: 'A velvet silhouette that turns the room down. Finished with a hand-rolled edge and hidden closure.',
  },
  {
    id: 4,
    name: 'Lunar Satin Slip',
    category: '04 / Essentials',
    price: '€740',
    image: '/soura-look-2.jpg',
    color: 'Antique rose',
    sizes: ['34', '36', '38', '40'],
    description: 'Bias-cut satin with a barely-there drape. A private kind of glamour for after dark.',
  },
];

const navItems = [
  { label: 'Collection', href: '#collection' },
  { label: 'The House', href: '#the-house' },
  { label: 'Journal', href: '#journal' },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#" className="group flex items-center gap-3" data-testid="link-brand">
      <img src="/house-of-soura-monogram.png" alt="House of Soura HS lotus monogram" className={`${compact ? 'h-9 w-9' : 'h-12 w-12'} object-cover object-center rounded-full border border-[#d6b35a]/40 shadow-[0_0_22px_rgba(214,179,90,.12)]`} data-testid="img-monogram" />
      <span className="hidden sm:block leading-none">
        <span className="block text-[11px] tracking-[.3em] text-[#d6b35a]">HOUSE OF</span>
        <span className="font-serif text-[17px] tracking-[.17em] text-[#e8e2d4]">SOURA</span>
      </span>
    </a>
  );
}

function PrimaryButton({ children, onClick, dark = false, testId }: { children: ReactNode; onClick?: () => void; dark?: boolean; testId: string }) {
  return (
    <button onClick={onClick} className={`magnetic relative inline-flex items-center justify-center gap-5 overflow-hidden border px-6 py-3 text-[10px] font-semibold uppercase tracking-[.22em] transition-all duration-300 ${dark ? 'border-[#171411] bg-[#171411] text-[#d6b35a] hover:bg-[#2a251e]' : 'border-[#d6b35a]/65 bg-[#d6b35a] text-[#171411] hover:bg-[#e8a0bd]'}`} data-testid={testId}>
      <span className="relative z-10">{children}</span><ArrowUpRight className="relative z-10 h-3.5 w-3.5" strokeWidth={1.5} />
      <span className="shimmer" />
    </button>
  );
}

function WardrobeCoverflow({ activeIndex, setActiveIndex, onQuickView, onAdd }: { activeIndex: number; setActiveIndex: (index: number) => void; onQuickView: (product: Product) => void; onAdd: (product: Product) => void }) {
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const count = products.length;
  const activeProduct = products[activeIndex];

  const move = (direction: number) => {
    setActiveIndex((activeIndex + direction + count) % count);
    setDragDelta(0);
  };
  const relativePosition = (index: number) => {
    let position = index - activeIndex;
    if (position > count / 2) position -= count;
    if (position < -count / 2) position += count;
    return position;
  };
  const endDrag = () => {
    if (dragStart !== null) {
      if (Math.abs(dragDelta) > 46) move(dragDelta < 0 ? 1 : -1);
      setDragStart(null);
      setDragDelta(0);
    }
  };

  return (
    <div className="mt-10">
      <div
        ref={stageRef}
        id="wardrobe-coverflow"
        className="wardrobe-stage drag-cursor relative -mx-5 overflow-hidden px-5 sm:-mx-10 sm:px-10 lg:-mx-14 lg:px-14"
        onPointerDown={(event) => { if (event.pointerType !== 'mouse' || event.button === 0) { setDragStart(event.clientX); event.currentTarget.setPointerCapture(event.pointerId); } }}
        onPointerMove={(event) => { if (dragStart !== null) setDragDelta(event.clientX - dragStart); }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={() => { if (dragStart !== null && Math.abs(dragDelta) > 46) endDrag(); }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
          if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
        }}
        tabIndex={0}
        role="region"
        aria-label="Collection lookbook"
        data-testid="region-wardrobe-coverflow"
      >
        <div className="wardrobe-track">
          <div className="wardrobe-shadow" />
          {products.map((product, index) => {
            const position = relativePosition(index);
            const isActive = position === 0;
            const distance = Math.abs(position);
            const transform = `translateX(calc(-50% + ${position * 31}vw)) translateZ(${isActive ? 80 : -distance * 85}px) rotateY(${position * -22}deg) scale(${isActive ? 1 : Math.max(.68, 1 - distance * .14)})`;
            return (
              <div
                key={product.id}
                className={`wardrobe-slide ${isActive ? 'wardrobe-slide-active' : ''}`}
                style={{ transform, opacity: distance > 2 ? 0 : isActive ? 1 : .58, filter: isActive ? 'blur(0)' : `blur(${Math.min(distance * 1.3, 2.8)}px)`, zIndex: 10 - distance }}
                aria-hidden={!isActive && distance > 1}
                data-testid={`slide-product-${product.id}`}
              >
                <div className="group relative h-full overflow-hidden border border-[#d6b35a]/25 bg-[#26221e] shadow-2xl shadow-black/50">
                  <button
                    type="button"
                    className="absolute inset-0 z-[1] h-full w-full cursor-pointer"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Select ${product.name}`}
                    tabIndex={isActive || distance === 1 ? 0 : -1}
                    data-testid={`button-select-product-${product.id}`}
                  >
                    <img src={product.image} alt={product.name} className="h-full w-full select-none object-cover object-center opacity-90 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-100" draggable="false" data-testid={`img-product-${product.id}`} />
                  </button>
                  <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#171411]/90 via-transparent to-[#171411]/5" />
                  <div className="absolute left-4 top-4 z-[3] border border-[#eadcb7]/35 bg-[#171411]/65 px-3 py-2 font-mono text-[9px] tracking-[.2em] text-[#e8a0bd] backdrop-blur-md">{String(index + 1).padStart(2, '0')} / 0{count}</div>
                  <button type="button" onClick={() => { setActiveIndex(index); onAdd(product); }} tabIndex={isActive || distance === 1 ? 0 : -1} aria-label={`Add ${product.name} to bag`} className="absolute right-4 top-4 z-[4] flex h-10 w-10 items-center justify-center rounded-full border border-[#eadcb7]/50 bg-[#171411]/75 text-[#eadcb7] backdrop-blur-md transition hover:border-[#e8a0bd] hover:text-[#e8a0bd]" data-testid={`button-add-product-${product.id}`}>
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <div className="pointer-events-none absolute bottom-5 left-5 right-5 z-[3] flex items-end justify-between gap-3">
                    <div><p className="eyebrow mb-2 !text-[#d6b35a]">{product.category}</p><h3 className="font-serif text-2xl leading-none text-[#e8e2d4]" data-testid={`text-product-name-${product.id}`}>{product.name}</h3></div>
                    <span className="shrink-0 text-sm text-[#e8a0bd]" data-testid={`text-product-price-${product.id}`}>{product.price}</span>
                  </div>
                  {isActive && <button type="button" onClick={() => onQuickView(product)} className="absolute bottom-5 right-5 z-[5] flex translate-y-1/2 items-center gap-3 border border-[#eadcb7]/50 bg-[#171411]/85 px-4 py-3 text-[10px] uppercase tracking-[.18em] text-[#eadcb7] backdrop-blur-md transition hover:border-[#e8a0bd] hover:text-[#e8a0bd] sm:bottom-20 sm:translate-y-0" data-testid={`button-quick-view-${product.id}`}>Quick view <Eye className="h-3.5 w-3.5" strokeWidth={1.5} /></button>}
                </div>
              </div>
            );
          })}
        </div>
        <button type="button" onClick={() => move(-1)} className="absolute left-7 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-[#d6b35a]/45 bg-[#171411]/80 text-[#d6b35a] backdrop-blur-md transition hover:border-[#e8a0bd] hover:text-[#e8a0bd] sm:left-12 lg:left-20" aria-label="Previous look" data-testid="button-previous-look"><ArrowLeft className="h-4 w-4" strokeWidth={1.2} /></button>
        <button type="button" onClick={() => move(1)} className="absolute right-7 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-[#d6b35a]/45 bg-[#171411]/80 text-[#d6b35a] backdrop-blur-md transition hover:border-[#e8a0bd] hover:text-[#e8a0bd] sm:right-12 lg:right-20" aria-label="Next look" data-testid="button-next-look"><ArrowRight className="h-4 w-4" strokeWidth={1.2} /></button>
      </div>
      <div className="mx-auto mt-8 flex max-w-[350px] items-center gap-4">
        <span className="font-mono text-[10px] text-[#e8a0bd]" data-testid="text-look-position">{String(activeIndex + 1).padStart(2, '0')} <span className="text-[#7d7467]">/ 0{count}</span></span>
        <div className="wardrobe-progress flex-1" aria-label={`Look ${activeIndex + 1} of ${count}`}><span style={{ width: `${((activeIndex + 1) / count) * 100}%` }} /></div>
        <span className="eyebrow !text-[#7d7467]">Drag to explore</span>
      </div>
      <div className="mx-auto mt-7 flex max-w-[490px] flex-col items-center text-center">
        <p className="eyebrow mb-3 !text-[#d6b35a]">{activeProduct.color}</p>
        <h3 className="font-serif text-3xl text-[#e8e2d4]" data-testid="text-active-look-name">{activeProduct.name}</h3>
        <p className="mt-3 max-w-[390px] text-xs leading-6 text-[#a99f8c]">{activeProduct.description}</p>
        <div className="mt-6 flex items-center gap-5">
          <button type="button" onClick={() => onQuickView(activeProduct)} className="border-b border-[#d6b35a]/70 pb-2 text-[10px] uppercase tracking-[.2em] text-[#d6b35a] transition hover:text-[#e8a0bd]" data-testid="button-active-quick-view">Open the piece <ArrowUpRight className="ml-2 inline h-3.5 w-3.5" strokeWidth={1.2} /></button>
          <button type="button" onClick={() => onAdd(activeProduct)} className="border-b border-[#e8a0bd]/70 pb-2 text-[10px] uppercase tracking-[.2em] text-[#e8a0bd] transition hover:text-[#d6b35a]" data-testid="button-active-add-to-bag">Add to bag</button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [bag, setBag] = useState<Product[]>([]);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [notice, setNotice] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => setScroll(Math.min(100, (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen || bagOpen || !!quickView ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, searchOpen, bagOpen, quickView]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (quickView) setQuickView(null);
      else if (bagOpen) setBagOpen(false);
      else if (searchOpen) setSearchOpen(false);
      else if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [quickView, bagOpen, searchOpen, menuOpen]);

  const addToBag = (product: Product, size?: string) => {
    setBag((current) => [...current, product]);
    setNotice(`${product.name} added to your bag${size ? ` · size ${size}` : ''}`);
    setQuickView(null);
    setBagOpen(true);
    window.setTimeout(() => setNotice(''), 3200);
  };

  const openQuickView = (product: Product) => {
    setSelectedSize(product.sizes[0]);
    setQuickView(product);
  };

  return (
    <div className="noise min-h-[100dvh] overflow-x-hidden bg-[#171411] text-[#e8e2d4]">
      <div className="fixed left-0 right-0 top-0 z-[60] h-px bg-[#d6b35a]/15"><div className="h-full bg-[#d6b35a] transition-all duration-500" style={{ width: `${scroll}%` }} /></div>
      <header className="absolute left-0 right-0 top-0 z-40 flex items-center justify-between px-5 py-5 sm:px-10 lg:px-14" data-testid="header-main">
        <Logo />
        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => <a href={item.href} key={item.href} className="text-[10px] uppercase tracking-[.24em] text-[#b9ae9a] transition hover:text-[#e8a0bd]" data-testid={`link-nav-${item.label.toLowerCase().replace(' ', '-')}`}>{item.label}</a>)}
        </nav>
        <div className="flex items-center gap-2 sm:gap-5">
          <button onClick={() => setSearchOpen(true)} className="flex items-center gap-2 p-2 text-[#b9ae9a] transition hover:text-[#e8a0bd]" aria-label="Open search" data-testid="button-open-search"><Search className="h-[17px] w-[17px]" strokeWidth={1.3} /><span className="hidden text-[10px] uppercase tracking-[.24em] sm:inline">Search</span></button>
          <button onClick={() => setBagOpen(true)} className="relative flex items-center gap-2 p-2 text-[#b9ae9a] transition hover:text-[#e8a0bd]" aria-label="Open bag" data-testid="button-open-bag"><ShoppingBag className="h-[17px] w-[17px]" strokeWidth={1.3} /><span className="hidden text-[10px] uppercase tracking-[.24em] sm:inline">Bag</span>{bag.length > 0 && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e8a0bd] px-1 text-[9px] text-[#171411]" data-testid="text-bag-count">{bag.length}</span>}</button>
          <button onClick={() => setMenuOpen(true)} className="p-2 text-[#d6b35a] md:hidden" aria-label="Open menu" data-testid="button-open-menu"><MenuIcon className="h-5 w-5" strokeWidth={1.2} /></button>
        </div>
      </header>

      <main>
        <section className="relative flex min-h-[720px] items-end overflow-hidden px-5 pb-16 pt-32 sm:min-h-[850px] sm:px-10 sm:pb-24 lg:min-h-[100vh] lg:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(105,83,42,.18),transparent_38%),linear-gradient(115deg,#171411_0%,#211d18_50%,#110f0d_100%)]" />
          <div className="absolute -right-24 top-20 h-[680px] w-[540px] rounded-[50%] bg-[#d6b35a]/[.045] blur-[90px]" />
          <div className="absolute bottom-0 left-0 right-0 h-[36%] bg-gradient-to-t from-[#0f0d0b] to-transparent" />
          <div className="relative z-10 grid w-full max-w-[1240px] grid-cols-1 gap-10 lg:grid-cols-[1fr_.75fr] lg:items-end">
            <div className="max-w-[760px]">
              <p className="eyebrow reveal mb-7">Collection 01 — The Entrance</p>
              <h1 className="reveal reveal-delay font-serif text-[clamp(3.65rem,9vw,8.6rem)] font-normal leading-[.88] tracking-[-.055em] text-[#d6b35a]">DESIGNED<br /><span className="ml-[10%] italic text-[#e8e2d4]">TO MAKE</span><br />AN ENTRANCE<span className="text-[#e8a0bd]">.</span></h1>
              <div className="reveal reveal-delay-2 mt-9 flex max-w-[440px] items-start gap-4 sm:ml-[10%]">
                <span className="mt-2 h-px w-10 shrink-0 bg-[#d6b35a]" />
                <p className="text-sm leading-7 text-[#b9ae9a]">A considered wardrobe for the woman who arrives before the room knows to look.</p>
              </div>
              <div className="reveal reveal-delay-2 mt-8 sm:ml-[10%]"><PrimaryButton testId="button-discover-collection" onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}>Discover the collection</PrimaryButton></div>
            </div>
            <div className="relative hidden h-[450px] lg:block">
              <div className="absolute bottom-0 right-[15%] h-[390px] w-[270px] rotate-[5deg] overflow-hidden border border-[#d6b35a]/40 bg-[#24201b] shadow-2xl shadow-black/60">
                <img src="/soura-hero.jpg" alt="Sculptural black evening silhouette" className="h-full w-full object-cover object-center opacity-75 mix-blend-luminosity" data-testid="img-hero-editorial" />
              </div>
              <div className="glass drift absolute right-0 top-10 flex w-40 flex-col gap-8 p-5">
                <span className="eyebrow !text-[#d6b35a]">Private atelier</span>
                <div className="flex items-center justify-between border-t border-[#d6b35a]/25 pt-4"><span className="font-serif text-2xl text-[#e8a0bd]">01</span><ArrowDownRight className="h-4 w-4 text-[#d6b35a]" strokeWidth={1} /></div>
              </div>
              <div className="absolute bottom-8 left-0 font-mono text-[9px] tracking-[.25em] text-[#7d7467] [writing-mode:vertical-rl]">PARIS · LONDON · EVERYWHERE</div>
            </div>
          </div>
          <a href="#collection" className="absolute bottom-8 right-6 z-10 hidden items-center gap-3 text-[9px] uppercase tracking-[.25em] text-[#8e8474] md:flex" data-testid="link-scroll-collection">Scroll to enter <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d6b35a]/40"><ArrowDownRight className="h-3.5 w-3.5 text-[#d6b35a]" strokeWidth={1} /></span></a>
        </section>

        <div className="overflow-hidden border-y border-[#d6b35a]/20 bg-[#211d18] py-4">
          <div className="flex min-w-max items-center gap-8 text-[10px] uppercase tracking-[.27em] text-[#a99f8c]"><span className="text-[#e8a0bd]">House of Soura</span><span>·</span><span>Slow fashion / strong silhouettes</span><span>·</span><span>Designed to make an entrance</span><span>·</span><span>House of Soura</span></div>
        </div>

        <section id="collection" className="section-pad relative">
          <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div><p className="eyebrow mb-4">The edit / 01</p><h2 className="font-serif text-5xl font-normal leading-none tracking-[-.04em] text-[#e8e2d4] sm:text-7xl">The <i className="text-[#d6b35a]">entrance</i><br />edit.</h2></div>
             <div className="max-w-[300px]"><p className="mb-5 text-sm leading-6 text-[#a99f8c]">Four silhouettes. One point of view. Pieces that hold their own in a room.</p><button onClick={() => { setActiveIndex(0); document.getElementById('wardrobe-coverflow')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }} className="group flex items-center gap-3 text-[10px] uppercase tracking-[.2em] text-[#d6b35a]" data-testid="button-view-all-products">View all pieces <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" strokeWidth={1.2} /></button></div>
          </div>
           <div className="mb-4 flex items-center gap-3 text-[9px] uppercase tracking-[.22em] text-[#7d7467]"><span className="h-px w-8 bg-[#e8a0bd]" /> The wardrobe transition <span className="hidden sm:inline">/ select a look to bring it forward</span></div>
           <WardrobeCoverflow activeIndex={activeIndex} setActiveIndex={setActiveIndex} onQuickView={openQuickView} onAdd={addToBag} />
        </section>

        <section id="the-house" className="relative overflow-hidden border-y border-[#d6b35a]/15 bg-[#24201b]">
          <div className="grid min-h-[670px] lg:grid-cols-[.95fr_1.05fr]">
            <div className="relative min-h-[460px] overflow-hidden">
              <img src="/soura-hero.jpg" alt="House of Soura atelier silhouette" className="h-full w-full object-cover object-center opacity-80 grayscale-[.2]" data-testid="img-house-editorial" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#24201b]" />
              <div className="absolute bottom-8 left-8 flex items-center gap-3 text-[9px] uppercase tracking-[.24em] text-[#d6b35a]"><span className="h-px w-8 bg-[#d6b35a]" /> House note 001</div>
            </div>
            <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-20">
              <p className="eyebrow mb-7">The House / Soura</p>
              <h2 className="max-w-[600px] font-serif text-5xl font-normal leading-[.98] tracking-[-.04em] text-[#e8e2d4] sm:text-7xl">Clothes with<br /><span className="italic text-[#e8a0bd]">a point of view.</span></h2>
              <p className="mt-8 max-w-[420px] text-sm leading-7 text-[#a99f8c]">Soura is a study in contrast: the precision of a tuxedo, the softness of skin, the pause before an entrance. We make fewer things, and ask more of them.</p>
              <div className="mt-10 flex items-center gap-8"><PrimaryButton testId="button-read-house" dark onClick={() => setNotice('The House journal is coming soon')}>Read the house notes</PrimaryButton><span className="font-serif text-3xl text-[#d6b35a]">S.</span></div>
            </div>
          </div>
        </section>

        <section className="section-pad bg-[#171411]">
          <div className="grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr]">
            <div><p className="eyebrow mb-5">A closer look / 02</p><h2 className="font-serif text-5xl leading-[.98] tracking-[-.045em] text-[#e8e2d4] sm:text-6xl">The art of<br /><em className="text-[#d6b35a]">the detail.</em></h2><p className="mt-7 max-w-[330px] text-sm leading-7 text-[#a99f8c]">From the first sketch to the final hand-finished seam, nothing is left to chance.</p><button onClick={() => setNotice('Appointments open by private invitation')} className="mt-8 flex items-center gap-3 border-b border-[#d6b35a]/50 pb-3 text-[10px] uppercase tracking-[.23em] text-[#d6b35a]" data-testid="button-book-appointment">Book an appointment <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.2} /></button></div>
            <div className="relative ml-auto w-full max-w-[620px]">
              <div className="absolute -left-5 -top-5 h-full w-full border border-[#d6b35a]/25" />
              <div className="relative aspect-[1.25] overflow-hidden bg-[#2b251f]"><img src="/soura-look-1.jpg" alt="Detail of House of Soura tailoring" className="h-full w-full object-cover object-center saturate-[.65] transition duration-700 hover:scale-[1.03]" data-testid="img-detail-editorial" /><div className="absolute bottom-5 right-5 glass flex items-center gap-4 px-4 py-3"><span className="font-serif text-2xl text-[#e8a0bd]">24</span><span className="eyebrow !text-[#e8e2d4]">hand finished<br />touches</span></div></div>
            </div>
          </div>
        </section>

        <section id="journal" className="border-t border-[#d6b35a]/15 bg-[#211d18]">
          <div className="section-pad">
             <div className="mb-12 flex items-end justify-between"><div><p className="eyebrow mb-4">From the journal</p><h2 className="font-serif text-5xl tracking-[-.04em] text-[#e8e2d4] sm:text-6xl">After <i className="text-[#d6b35a]">dark.</i></h2></div><button onClick={() => setNotice('The journal is opening soon')} className="hidden items-center gap-3 text-[10px] uppercase tracking-[.2em] text-[#d6b35a] sm:flex" data-testid="button-view-journal">All stories <ArrowRight className="h-4 w-4" strokeWidth={1.2} /></button></div>
            <div className="grid border-y border-[#d6b35a]/20 md:grid-cols-3">
              {[['01', 'The language of a first impression', 'On dressing for the moment before the room turns.'], ['02', 'A rose in the dark', 'Why restraint can be the most arresting thing of all.'], ['03', 'Notes on the nocturne', 'The pieces we keep reaching for, long after midnight.']].map(([number, title, text]) => <button key={number} onClick={() => setNotice(`Opening journal / ${title}`)} className="group border-b border-[#d6b35a]/20 p-6 text-left transition hover:bg-[#2a241e] md:border-b-0 md:border-r last:border-r-0" data-testid={`button-journal-${number}`}><div className="mb-16 flex items-start justify-between"><span className="font-mono text-[10px] text-[#e8a0bd]">{number}</span><ArrowUpRight className="h-4 w-4 text-[#8e8474] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#d6b35a]" strokeWidth={1.2} /></div><h3 className="max-w-[230px] font-serif text-2xl leading-tight text-[#e8e2d4]">{title}</h3><p className="mt-4 max-w-[230px] text-xs leading-5 text-[#a99f8c]">{text}</p><p className="eyebrow mt-8 !text-[#7d7467]">Read story</p></button>)}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-[#d6b35a]/15 px-5 py-24 text-center sm:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,179,90,.09),transparent_55%)]" />
          <img src="/house-of-soura-monogram.png" alt="" className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 object-cover opacity-[.045] grayscale" />
          <div className="relative"><p className="eyebrow mb-6">Private viewings / by appointment</p><h2 className="mx-auto max-w-[740px] font-serif text-5xl leading-[.95] tracking-[-.05em] text-[#e8e2d4] sm:text-7xl">Make an entrance<br /><i className="text-[#d6b35a]">of your own.</i></h2><button onClick={() => setNotice('We will be in touch shortly')} className="mt-9 border-b border-[#e8a0bd] pb-2 text-[10px] uppercase tracking-[.24em] text-[#e8a0bd] transition hover:text-[#d6b35a]" data-testid="button-request-viewing">Request a private viewing</button></div>
        </section>
      </main>

      <footer className="border-t border-[#d6b35a]/20 bg-[#100e0c] px-5 py-12 sm:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1240px] gap-12 md:grid-cols-[1.2fr_.8fr_.8fr_1.4fr]">
          <div><Logo compact /><p className="mt-6 max-w-[210px] text-xs leading-6 text-[#7d7467]">A private atelier for considered entrances.</p></div>
          <div><p className="eyebrow mb-5">Explore</p><div className="flex flex-col gap-3 text-xs text-[#b9ae9a]">{navItems.map((item) => <a href={item.href} key={item.href} className="transition hover:text-[#e8a0bd]" data-testid={`link-footer-${item.label.toLowerCase().replace(' ', '-')}`}>{item.label}</a>)}</div></div>
           <div><p className="eyebrow mb-5">Follow</p><button onClick={() => setNotice('Instagram / @houseofsoura')} className="flex items-center gap-2 text-xs text-[#b9ae9a] transition hover:text-[#e8a0bd]" data-testid="link-instagram">Instagram <Instagram className="h-3.5 w-3.5" /></button><p className="mt-3 text-xs text-[#7d7467]">Paris · London · Online</p></div>
          <div><p className="eyebrow mb-5">A note from the house</p><p className="mb-5 text-xs leading-6 text-[#b9ae9a]">Occasional notes on dressing well, sent with restraint.</p>{subscribed ? <div className="flex items-center gap-2 text-xs text-[#e8a0bd]" data-testid="status-subscribed"><Check className="h-4 w-4" /> You are on the list.</div> : <form onSubmit={(event) => { event.preventDefault(); if (email) setSubscribed(true); }} className="flex border-b border-[#d6b35a]/40 pb-2"><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Your email address" className="w-full bg-transparent text-xs text-[#e8e2d4] outline-none placeholder:text-[#6f675d]" aria-label="Email address" data-testid="input-newsletter-email" /><button type="submit" aria-label="Subscribe" className="text-[#d6b35a] transition hover:text-[#e8a0bd]" data-testid="button-subscribe"><ArrowRight className="h-4 w-4" strokeWidth={1.2} /></button></form>}</div>
        </div>
        <div className="mx-auto mt-16 flex max-w-[1240px] justify-between border-t border-[#d6b35a]/15 pt-5 text-[9px] uppercase tracking-[.2em] text-[#655e55]"><span>© 2024 House of Soura</span><span>Made for the moment</span></div>
      </footer>

      {notice && <div className="fixed bottom-5 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 border border-[#d6b35a]/50 bg-[#211d18]/95 px-5 py-3 text-xs text-[#e8e2d4] shadow-2xl backdrop-blur-xl" role="status" data-testid="status-notice"><Check className="h-4 w-4 text-[#e8a0bd]" /> {notice}</div>}

      {(menuOpen || searchOpen || bagOpen) && <div onClick={() => { setMenuOpen(false); setSearchOpen(false); setBagOpen(false); }} className="fixed inset-0 z-[65] bg-[#0d0b09]/75 backdrop-blur-sm" />}
      {menuOpen && <aside className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-[#211d18] p-7 shadow-2xl shadow-black/60 sm:p-10" data-testid="overlay-menu"><div className="flex items-center justify-between"><Logo compact /><button onClick={() => setMenuOpen(false)} className="text-[#d6b35a]" aria-label="Close menu" data-testid="button-close-menu"><X className="h-5 w-5" strokeWidth={1.2} /></button></div><nav className="mt-20 flex flex-col gap-6">{navItems.map((item, index) => <a key={item.href} onClick={() => setMenuOpen(false)} href={item.href} className="flex items-end justify-between border-b border-[#d6b35a]/20 pb-4 font-serif text-4xl text-[#e8e2d4] transition hover:text-[#e8a0bd]" data-testid={`link-menu-${index}`}>{item.label}<ArrowUpRight className="h-5 w-5 text-[#d6b35a]" strokeWidth={1.2} /></a>)}</nav><div className="mt-auto"><p className="eyebrow mb-4">Private appointments</p><p className="text-sm leading-6 text-[#a99f8c]">For the pieces that need to be seen in person.</p></div></aside>}
      {searchOpen && <div className="fixed left-0 right-0 top-0 z-[70] bg-[#211d18] px-6 pb-16 pt-7 shadow-2xl shadow-black/50 sm:px-12" data-testid="overlay-search"><div className="mx-auto max-w-[1240px]"><div className="flex items-center justify-between"><Logo compact /><button onClick={() => setSearchOpen(false)} className="text-[#d6b35a]" aria-label="Close search" data-testid="button-close-search"><X className="h-5 w-5" strokeWidth={1.2} /></button></div><div className="mt-20 flex items-center gap-4 border-b border-[#d6b35a]/50 pb-4"><Search className="h-5 w-5 text-[#d6b35a]" strokeWidth={1.2} /><input autoFocus type="search" placeholder="Search the house" className="w-full bg-transparent font-serif text-3xl text-[#e8e2d4] outline-none placeholder:text-[#6f675d] sm:text-5xl" data-testid="input-search" /></div><p className="eyebrow mt-5">Try “silk”, “evening”, or “tailoring”</p></div></div>}
      {bagOpen && <aside className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-[#211d18] p-7 shadow-2xl shadow-black/60 sm:p-10" data-testid="overlay-bag"><div className="flex items-center justify-between"><div><p className="eyebrow mb-2">Your selection</p><h2 className="font-serif text-3xl text-[#e8e2d4]">The bag <span className="text-[#e8a0bd]">({bag.length})</span></h2></div><button onClick={() => setBagOpen(false)} className="text-[#d6b35a]" aria-label="Close bag" data-testid="button-close-bag"><X className="h-5 w-5" strokeWidth={1.2} /></button></div>{bag.length === 0 ? <div className="flex flex-1 flex-col items-center justify-center text-center"><ShoppingBag className="mb-5 h-8 w-8 text-[#d6b35a]/60" strokeWidth={1} /><p className="font-serif text-2xl text-[#e8e2d4]">Nothing here yet.</p><p className="mt-3 max-w-[230px] text-xs leading-5 text-[#a99f8c]">The right piece has a way of finding you.</p><button onClick={() => { setBagOpen(false); document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }); }} className="mt-8 border-b border-[#d6b35a] pb-2 text-[10px] uppercase tracking-[.2em] text-[#d6b35a]" data-testid="button-continue-shopping">Continue shopping</button></div> : <><div className="mt-10 flex-1 space-y-5 overflow-y-auto">{bag.map((product, index) => <div className="flex gap-4 border-b border-[#d6b35a]/20 pb-5" key={`${product.id}-${index}`}><img src={product.image} alt="" className="h-24 w-20 object-cover" /><div className="flex-1"><div className="flex justify-between gap-2"><p className="font-serif text-lg text-[#e8e2d4]">{product.name}</p><p className="text-sm text-[#e8a0bd]">{product.price}</p></div><p className="eyebrow mt-2">{product.color}</p><button onClick={() => setBag((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="mt-4 text-[9px] uppercase tracking-[.2em] text-[#7d7467] hover:text-[#e8a0bd]" data-testid={`button-remove-bag-${index}`}>Remove</button></div></div>)}</div><div className="border-t border-[#d6b35a]/30 pt-6"><div className="mb-5 flex justify-between text-sm"><span className="text-[#a99f8c]">Subtotal</span><span className="text-[#e8e2d4]">€{bag.reduce((sum, product) => sum + Number(product.price.replace(/[€,.]/g, '')), 0).toLocaleString()}</span></div><PrimaryButton testId="button-checkout" onClick={() => setNotice('Checkout is reserved for private clients')}>Proceed to checkout</PrimaryButton></div></>}</aside>}

      {quickView && <div className="fixed inset-0 z-[75] flex items-center justify-center bg-[#0d0b09]/80 p-4 backdrop-blur-md sm:p-8" role="dialog" aria-modal="true" aria-labelledby="quick-view-title" data-testid="modal-quick-view"><div className="relative grid max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-[#211d18] md:grid-cols-2"><button onClick={() => setQuickView(null)} className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center border border-[#d6b35a]/30 bg-[#171411]/60 text-[#e8e2d4] transition hover:border-[#e8a0bd] hover:text-[#e8a0bd]" aria-label="Close quick view" data-testid="button-close-quick-view"><X className="h-5 w-5" strokeWidth={1.2} /></button><div className="aspect-[.85] max-h-[55vh] overflow-hidden md:max-h-none"><img src={quickView.image} alt={quickView.name} className="h-full w-full object-cover" /></div><div className="flex flex-col justify-center p-7 sm:p-12"><p className="eyebrow mb-3">{quickView.category}</p><h2 id="quick-view-title" className="font-serif text-4xl leading-none text-[#e8e2d4]">{quickView.name}</h2><p className="mt-4 text-lg text-[#e8a0bd]">{quickView.price}</p><p className="mt-8 text-sm leading-7 text-[#a99f8c]">{quickView.description}</p><div className="mt-8"><p className="eyebrow mb-3">Select size</p><div className="flex flex-wrap gap-2">{quickView.sizes.map((size) => <button onClick={() => setSelectedSize(size)} key={size} className={`flex h-10 min-w-11 items-center justify-center border px-3 text-xs transition ${selectedSize === size ? 'border-[#e8a0bd] bg-[#e8a0bd] text-[#171411]' : 'border-[#d6b35a]/35 text-[#e8e2d4] hover:border-[#d6b35a]'}`} data-testid={`button-size-${size}`}>{size}</button>)}</div></div><button onClick={() => addToBag(quickView, selectedSize)} className="mt-9 flex items-center justify-between border border-[#d6b35a] bg-[#d6b35a] px-5 py-4 text-[10px] font-semibold uppercase tracking-[.2em] text-[#171411] transition hover:bg-[#e8a0bd]" data-testid="button-add-to-bag">Add to bag <ShoppingBag className="h-4 w-4" strokeWidth={1.3} /></button><button onClick={() => setNotice('Saved to your private wishlist')} className="mt-4 flex items-center justify-center gap-2 py-2 text-[10px] uppercase tracking-[.2em] text-[#a99f8c] hover:text-[#e8a0bd]" data-testid="button-add-wishlist"><Heart className="h-3.5 w-3.5" strokeWidth={1.2} /> Save for later</button></div></div></div>}
    </div>
  );
}

export default function App() {
  return <Home />;
}