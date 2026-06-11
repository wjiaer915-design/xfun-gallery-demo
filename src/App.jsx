import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Search, Sparkles, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import GooeyNav from './components/GooeyNav/GooeyNav';
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

  const detailImage = item.detailImage || item.hoverImage || item.image;
  const detailNavItems = [
  { label: '打样服务', href: '#service' },
  { label: '色彩管理', href: '#color' },
  { label: '材质工艺', href: '#material' },
];

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
{/* 顶部悬浮 Gooey 导航 */}
<div className="fixed left-1/2 top-5 z-40 flex h-14 w-[calc(100%-48px)] max-w-[1180px] -translate-x-1/2 items-center justify-between rounded-full border border-white/15 bg-black/55 px-4 text-white shadow-2xl backdrop-blur-xl">
  <div className="flex items-center gap-5">
    <div className="flex h-9 items-center rounded-full bg-white px-3">
      <img
        src="/images/xfun-logo.png"
        alt="X-FUN"
        className="h-5 w-auto object-contain"
      />
    </div>

    <div className="hidden h-10 items-center md:block">
      <GooeyNav
        items={detailNavItems}
        particleCount={8}
        particleDistances={[40, 8]}
        particleR={60}
        initialActiveIndex={0}
        animationTime={450}
        timeVariance={180}
        colors={[1, 1, 2, 3]}
      />
    </div>
  </div>

  <div className="flex items-center gap-2">
    <button className="hidden rounded-full bg-white px-4 py-1.5 text-[12px] font-medium text-black transition hover:bg-white/90 md:block">
      咨询打样详情
    </button>

    <button
      type="button"
      className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
      aria-label="关闭详情"
      onClick={onClose}
    >
      <X size={20} />
    </button>
  </div>
</div>

      {/* 右侧操作栏 */}
      <div className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex">
        <button className="grid h-10 w-10 place-items-center rounded-full bg-[#7c3cff] text-white shadow-lg">
          👍
        </button>
        <span className="-mt-3 text-[11px] text-white">点赞</span>

        <button className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#333] shadow-lg">
          ☆
        </button>
        <span className="-mt-3 text-[11px] text-white">收藏</span>

        <button className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#333] shadow-lg">
          ↗
        </button>
        <span className="-mt-3 text-[11px] text-white">分享</span>
      </div>

      {/* 详情长图区域 */}
<div className="h-screen overflow-y-auto bg-black/70 pt-24">
        <div className="mx-auto w-full max-w-[1590px] bg-[#ebe9dc]">
          <img
            src={detailImage}
            alt={item.title}
            className="mx-auto block w-full h-auto"
          />
        </div>
      </div>

      {/* 中间悬浮信息条 */}
      <div className="fixed left-1/2 top-[50%] z-30 hidden w-[520px] -translate-x-1/2 items-center justify-between rounded-xl bg-black/55 px-3 py-2 text-white shadow-2xl backdrop-blur md:flex">
        <div className="flex items-center gap-3">
          <img
            src={item.image}
            alt={item.title}
            className="h-10 w-10 rounded object-cover"
          />
          <div>
            <div className="line-clamp-1 text-[12px] font-bold">{item.title}</div>
            <div className="line-clamp-1 text-[11px] text-white/60">{item.description}</div>
          </div>
        </div>
        <button className="rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-black">
          生成同款包装
        </button>
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
