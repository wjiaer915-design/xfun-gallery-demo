import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Search, Sparkles, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { galleryData } from './galleryData';

const navItems = ['首页', '概念创意', '素材图片', '包装图纸'];

const sizeClassMap = {
  small: '',
  large: 'xl:col-span-2 xl:row-span-2',
  wideTall: 'xl:col-span-2 xl:row-span-2',
};

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e7e7e7] bg-white/95 backdrop-blur">
      <div className="flex h-14 items-center justify-between px-4 md:px-5">
      <a href="#" className="flex items-center">
  <img
    src="/images/xfun-logo.png"
    alt="XFUN 智能图像设计平台"
    className="h-5 w-auto object-contain"
  />
</a>

        <nav className="hidden h-full items-center gap-14 text-[13px] font-bold text-[#111827] md:flex">
          {navItems.map((item) => (
            <a key={item} href="#" className="flex h-full items-center border-b-2 border-transparent transition hover:border-[#111827]">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden items-center gap-1 text-[12px] font-bold text-[#a56cff] md:flex">
            <Sparkles size={14} />
            AI工具
          </button>
          <button className="hidden rounded bg-[#f6c999] px-3 py-2 text-[12px] font-bold text-[#6a3a10] md:inline-flex">
            升级套餐
          </button>
          <button className="rounded bg-[#7c3cff] px-4 py-2 text-[12px] font-bold text-white shadow-sm">
            登录
          </button>
        </div>
      </div>
    </header>
  );
}

function GalleryCard({ item, onClick }) {
  const hasHoverImage = Boolean(item.hoverImage);
  const imageFitClass = item.thumbnailFit === 'zoom'
    ? 'object-cover scale-[1.42]'
    : 'object-cover scale-[1.03] group-hover:scale-[1.055]';
  const hoverImageFitClass = item.hoverFit === 'contain'
    ? 'object-contain'
    : 'scale-[1.03] object-cover group-hover:scale-[1.055]';
  const hoverImageToneClass = item.hoverTone === 'soft' ? 'brightness-[0.82] contrast-[0.92] saturate-[0.92]' : '';

  return (
    <motion.button
      type="button"
      layoutId={`card-${item.id}`}
      className={`group flex h-full min-h-0 w-full flex-col self-stretch overflow-hidden border-b border-r border-[#e6e6e6] bg-white text-left outline-none transition hover:z-10 hover:shadow-[0_18px_46px_rgba(15,23,42,0.12)] focus-visible:ring-2 focus-visible:ring-[#7c3cff] ${sizeClassMap[item.size]}`}
      onClick={onClick}
      transition={{ duration: 0.2 }}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden bg-white">
        <img
          src={item.image}
          alt={item.title}
          className={`absolute inset-0 block h-full w-full ${imageFitClass} object-center transition duration-500 ${hasHoverImage ? 'group-hover:opacity-0' : ''}`}
          loading="lazy"
        />
        {hasHoverImage && (
          <img
            src={item.hoverImage}
            alt={`${item.title} 样机`}
            className={`absolute inset-0 block h-full w-full ${hoverImageFitClass} ${hoverImageToneClass} object-center opacity-0 transition duration-500 group-hover:opacity-100`}
            loading="lazy"
          />
        )}
      </div>
      <div className="h-[58px] shrink-0 bg-white px-3 py-2">
        <h3 className="truncate text-[13px] font-bold text-[#1f2937]">{item.title}</h3>
        <p className="mt-1 truncate text-[12px] leading-4 text-[#6b7280]">{item.description}</p>
      </div>
    </motion.button>
  );
}

function GallerySection({ section, onOpen }) {
  return (
    <section className="border-b border-[#e7e7e7]">
      <div className="flex h-[54px] items-center justify-between border-b border-[#e7e7e7] px-4 md:px-5">
        <h2 className="text-[18px] font-extrabold tracking-[-0.01em] text-[#202124]">{section.title}</h2>
        <a href="#" className="flex items-center gap-1 text-[13px] font-bold text-[#4b5563] transition hover:text-[#7c3cff]">
          {section.moreText}
          <ArrowRight size={13} />
        </a>
      </div>
      <div className="grid auto-rows-[360px] grid-cols-1 items-stretch border-l border-[#e7e7e7] md:grid-cols-2 xl:grid-cols-4">
        {section.items.map((item) => (
          <GalleryCard key={item.id} item={item} onClick={() => onOpen(item)} />
        ))}
      </div>
    </section>
  );
}

function DetailModal({ item, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <img src={item.image} alt="" className="absolute inset-0 h-full w-full scale-125 object-cover blur-3xl" />
      <div className="absolute inset-0 bg-black/72" />
      <button
        type="button"
        className="absolute right-5 top-5 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/12 text-white backdrop-blur transition hover:bg-white/22 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        aria-label="关闭详情"
        onClick={onClose}
      >
        <X size={24} />
      </button>

      <div className="relative z-10 flex h-full flex-col gap-5 px-5 py-16 md:px-12">
        <motion.div
          layoutId={`card-${item.id}`}
          className="mx-auto flex min-h-0 w-full max-w-[1260px] flex-1 items-center justify-center rounded-[10px] bg-white/8 p-3 shadow-modal backdrop-blur-sm md:p-5"
        >
          <img src={item.image} alt={item.title} className="h-full max-h-full w-full object-contain" />
        </motion.div>
        <motion.div
          className="mx-auto flex w-full max-w-[1260px] flex-col justify-between gap-4 rounded-[10px] border border-white/12 bg-black/48 px-5 py-4 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-md md:flex-row md:items-end md:px-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          <div>
            <h3 className="text-2xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] md:text-3xl">{item.title}</h3>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-white/88 drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]">
              {item.description}
            </p>
          </div>
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70 drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]">
            X-FUN Gallery Preview
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  const allItems = useMemo(() => galleryData.flatMap((section) => section.items), []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('item');
    if (!itemId) return;
    const item = allItems.find((entry) => entry.id === itemId);
    if (item) setSelectedItem(item);
  }, [allItems]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <div className="hidden h-16 items-center justify-end border-b border-[#ededed] px-5 text-[#9ca3af] md:flex">
          <div className="flex items-center gap-2 rounded-full border border-[#ededed] px-3 py-2 text-[12px]">
            <Search size={14} />
            设计素材 / 包装 / 字体
            <ChevronDown size={14} />
          </div>
        </div>
        {galleryData.map((section) => (
          <GallerySection key={section.id} section={section} onOpen={setSelectedItem} />
        ))}
      </main>

      <AnimatePresence>
        {selectedItem && <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>
    </div>
  );
}
