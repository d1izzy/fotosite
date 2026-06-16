import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import Aurora from './components/Aurora'
import BlurText from './components/BlurText'
import SplitText from './components/SplitText'
import FadeContent from './components/FadeContent'
import AnimatedContent from './components/AnimatedContent'
import ScrollProgress from './components/ScrollProgress'
import SpotlightCard from './components/SpotlightCard'
import TiltedCard from './components/TiltedCard'
import GlareHover from './components/GlareHover'
import MadeByClickBuild from './components/MadeByClickBuild'
import SectionDivider, { GoldenLine } from './components/SectionDivider'
import { assetPath } from './lib/assetPath'

const NAV_LINKS = [
  { href: '#advantages', label: 'Преимущества' },
  { href: '#products', label: 'Продукция' },
  { href: '#about', label: 'О нас' },
  { href: '#contact', label: 'Контакты' },
]

const ADVANTAGES = [
  {
    title: 'Профессиональная съёмка',
    description:
      'Снимаем на DSLR-камеры профессионального класса со студийным светом. Съёмка занимает 1–2 минуты — кадр с первого раза.',
    icon: '◈',
  },
  {
    title: 'Моментальная печать',
    description:
      'Печатаем фотографии прямо на месте на премиальной фотобумаге — от 5 минут. Форматы от миниатюр до коллажей.',
    icon: '◎',
  },
  {
    title: 'Фотосувениры',
    description:
      'Магниты, рамки, акриловые сувениры и другая продукция с вашим фото. Большой ассортимент — выбирайте то, что нравится.',
    icon: '✦',
  },
  {
    title: 'Удобно в ТРЦ «Фокус»',
    description:
      'Точка «В ФОКУСЕ» на 3 этаже — заходите во время шопинга, без записи. Съёмка 1–2 минуты, печать от 5 минут.',
    icon: '♡',
  },
]

const PRODUCTS = [
  {
    title: 'Печать фото',
    category: '10×15, 15×20, А4',
    image: assetPath('/products/01-print.png'),
  },
  {
    title: 'Фотомагниты',
    category: 'Винил и акрил',
    image: assetPath('/products/02-magnets.png'),
  },
  {
    title: 'Фоторамки',
    category: 'Готовое оформление',
    image: assetPath('/products/03-frames.png'),
  },
  {
    title: 'Семейные фото',
    category: 'Дети и родители',
    image: assetPath('/products/04-family.png'),
  },
  {
    title: 'Парные портреты',
    category: 'Для двоих',
    image: assetPath('/products/05-couple.png'),
  },
  {
    title: 'Кружки и стикеры',
    category: 'С вашим фото',
    image: assetPath('/products/06-stickers.png'),
  },
]

const STEPS = [
  { step: '01', title: 'Подходите к нам', text: 'Найдите «В ФОКУСЕ» на 3 этаже ТРЦ «Фокус» — запись не нужна' },
  { step: '02', title: 'Фотографируемся', text: 'Профессиональный фотограф сделает снимки за 1–2 минуты' },
  { step: '03', title: 'Забираете сувенир', text: 'Печать от 5 минут — выбираете фото, магнит или рамку' },
]

const STATS = [
  { value: '1–2', label: 'минуты съёмка' },
  { value: 'от 5', label: 'минут печать' },
  { value: '10+', label: 'видов сувениров' },
]

const SECTION_IDS = NAV_LINKS.map((link) => link.href.replace('#', ''))

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          menuOpen ? 'max-md:pointer-events-none max-md:opacity-0' : ''
        } ${
          scrolled
            ? 'bg-black/90 backdrop-blur-xl py-3'
            : 'bg-transparent py-6'
        }`}
      >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a
          href="#"
          className="font-[family-name:var(--font-display)] text-xl tracking-[0.2em] text-white uppercase"
        >
          В ФОКУСЕ
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm tracking-wide transition-colors ${
                  isActive ? 'text-[#d4af37]' : 'text-white/70 hover:text-[#d4af37]'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-1/2 h-px -translate-x-1/2 bg-[#d4af37] transition-all duration-500 ${
                    isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </a>
            )
          })}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-5 py-2 text-sm text-[#d4af37] transition-all hover:bg-[#d4af37]/20 md:inline-block"
        >
          Как нас найти
        </a>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>
      </header>

      {menuOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex flex-col bg-[#0a0a0a] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Навигация"
          >
            <div className="flex items-center justify-between px-6 pb-4 pt-[max(1.5rem,env(safe-area-inset-top))]">
              <a
                href="#"
                className="font-[family-name:var(--font-display)] text-xl tracking-[0.2em] text-white uppercase"
                onClick={() => setMenuOpen(false)}
              >
                В ФОКУСЕ
              </a>
              <button
                type="button"
                className="flex flex-col gap-1.5 p-2"
                onClick={() => setMenuOpen(false)}
                aria-label="Закрыть меню"
              >
                <span className="block h-0.5 w-6 translate-y-2 rotate-45 bg-white" />
                <span className="block h-0.5 w-6 -translate-y-2 -rotate-45 bg-white" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col px-6 pt-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '')
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`border-b border-white/5 py-4 text-lg transition-colors ${
                      isActive ? 'text-[#d4af37]' : 'text-white/90'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              })}
              <a
                href="#contact"
                className="mt-8 block rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-5 py-3.5 text-center text-[#d4af37]"
                onClick={() => setMenuOpen(false)}
              >
                Как нас найти
              </a>
            </nav>
          </div>,
          document.body,
        )}
    </>
  )
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <Aurora
          colorStops={['#1a1208', '#d4af37', '#2a1f0f']}
          amplitude={0.8}
          blend={0.6}
          speed={0.4}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0a0a0a]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-24 text-center">
        <p className="mb-4 text-xs tracking-[0.35em] text-[#d4af37] uppercase">
          ИП · «В ФОКУСЕ» · ТРЦ «Фокус», 3 этаж
        </p>

        <SplitText
          text="Сфотографируем и сразу напечатаем"
          tag="h1"
          className="font-[family-name:var(--font-display)] text-4xl leading-tight font-normal text-white sm:text-5xl md:text-7xl lg:text-8xl"
          textAlign="center"
          splitType="words"
          delay={80}
          duration={1}
          from={{ opacity: 0, y: 60 }}
          to={{ opacity: 1, y: 0 }}
        />

        <div className="mx-auto mt-8 max-w-2xl">
          <BlurText
            text="Фотоцентр «В ФОКУСЕ» в ТРЦ «Фокус», Челябинск — съёмка, печать и фотосувениры на месте. Магниты, рамки и многое другое. Приходите на 3 этаж, без записи."
            className="text-lg leading-relaxed text-white/70 md:text-xl"
            delay={120}
            animateBy="words"
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="rounded-full bg-[#d4af37] px-8 py-3.5 text-sm font-medium tracking-wide text-black transition-transform hover:scale-105"
          >
            Как нас найти
          </a>
          <a
            href="#products"
            className="rounded-full border border-white/20 px-8 py-3.5 text-sm tracking-wide text-white/90 transition-colors hover:border-white/40"
          >
            Наша продукция
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/30">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 5v14M5 12l7 7 7-7" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  )
}

function Advantages() {
  return (
    <section id="advantages" className="relative px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <AnimatedContent distance={60} duration={1.1} scale={0.96} className="mb-16 text-center">
            <p className="mb-3 text-xs tracking-[0.3em] text-[#d4af37] uppercase">
              Преимущества
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl text-white md:text-5xl">
              Почему к нам приходят
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/50">
              Фотоцентр «В ФОКУСЕ» на 3 этаже ТРЦ «Фокус» — сувениры с вашим фото за считанные минуты
            </p>
          </AnimatedContent>

        <div className="grid gap-6 sm:grid-cols-2">
          {ADVANTAGES.map((item, i) => (
            <FadeContent key={item.title} blur duration={1000} delay={i * 150}>
              <SpotlightCard
                className="h-full border-white/10 bg-white/[0.03] p-8"
                spotlightColor="rgba(212, 175, 55, 0.15)"
              >
                <span className="mb-4 block text-2xl text-[#d4af37]">{item.icon}</span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-white">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-white/55">{item.description}</p>
              </SpotlightCard>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  )
}

function Products() {
  return (
    <section id="products" className="relative px-6 py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_65%)]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <AnimatedContent distance={60} duration={1.1} scale={0.96} className="mb-16 text-center">
            <p className="mb-3 text-xs tracking-[0.3em] text-[#d4af37] uppercase">
              Продукция
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl text-white md:text-5xl">
              Счастье в каждом кадре
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/50">
              Печать фотографий, магниты, рамки и сувенирная продукция с вашим изображением
            </p>
          </AnimatedContent>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((item, i) => (
            <FadeContent key={item.title} blur duration={1000} delay={i * 100}>
              <div className="group">
                <TiltedCard
                  imageSrc={item.image}
                  altText={item.title}
                  containerHeight="280px"
                  containerWidth="100%"
                  imageHeight="260px"
                  imageWidth="100%"
                  imageFit="contain"
                  imageBackground="#ffffff"
                  scaleOnHover={1.04}
                  rotateAmplitude={12}
                  showMobileWarning={false}
                  showTooltip={false}
                  glowBorderOnHover
                />
                <div className="mt-5 text-center">
                  <p className="text-xs tracking-widest text-[#d4af37] uppercase">
                    {item.category}
                  </p>
                  <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="relative px-6 pt-20 pb-10 md:pt-24 md:pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <AnimatedContent distance={70} direction="horizontal" reverse duration={1.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
              <img
                src={assetPath('/about.png')}
                alt="Фотоцентр «В ФОКУСЕ» в ТРЦ «Фокус», Челябинск"
                className="h-full w-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </AnimatedContent>

          <AnimatedContent distance={70} direction="horizontal" duration={1.1} delay={0.12}>
            <div>
              <p className="mb-3 text-xs tracking-[0.3em] text-[#d4af37] uppercase">
                О нас
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl text-white md:text-5xl">
                «В ФОКУСЕ»
              </h2>
              <p className="mt-2 text-sm text-white/40">
                ИП · ТРЦ «Фокус», 3 этаж · Челябинск
              </p>

              <p className="mt-8 leading-relaxed text-white/60">
                «В ФОКУСЕ» — фотоцентр на 3 этаже ТРЦ «Фокус». ТРЦ «Фокус» — популярный
                торгово-развлекательный комплекс в северо-западной части Челябинска.
                Фотографируем посетителей, печатаем снимки и изготавливаем сувениры:
                магниты, рамки, кружки и многое другое — всё на месте, пока вы отдыхаете
                и делаете покупки.
              </p>
              <p className="mt-4 leading-relaxed text-white/60">
                Работаем с семьями, парами и детьми. Съёмка занимает 1–2 минуты, печать —
                от 5 минут. Профессиональные фотографы, студийный свет и современные
                принтеры — качество, которое хочется забрать с собой.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-[family-name:var(--font-display)] text-3xl text-[#d4af37]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs tracking-wide text-white/40 uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedContent>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
            {STEPS.map((item, i) => (
              <AnimatedContent key={item.step} distance={50} duration={0.9} delay={i * 0.1}>
              <GlareHover
                width="100%"
                height="100%"
                className="block h-full w-full cursor-default border-white/10"
                background="rgba(255,255,255,0.03)"
                borderColor="rgba(255,255,255,0.1)"
                borderRadius="1rem"
                glareColor="#d4af37"
                glareOpacity={0.4}
                glareSize={280}
                transitionDuration={1000}
              >
                <div className="w-full p-8 text-left">
                  <p className="font-[family-name:var(--font-display)] text-4xl text-[#d4af37]/40">
                    {item.step}
                  </p>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{item.text}</p>
                </div>
              </GlareHover>
              </AnimatedContent>
            ))}
          </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="relative px-6 pb-16 pt-8 md:pb-20 md:pt-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <AnimatedContent distance={50} duration={1} className="text-center">
          <GoldenLine className="mx-auto mb-8" />
          <p className="mb-3 text-xs tracking-[0.3em] text-[#d4af37] uppercase">
            Контакты
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl text-white md:text-5xl">
            Приходите без записи
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-white/55 leading-relaxed">
            «В ФОКУСЕ» — на 3 этаже ТРЦ «Фокус» в северо-западной части Челябинска.
            Фотографируйтесь и забирайте сувениры сразу — запись не нужна.
          </p>
        </AnimatedContent>

        <AnimatedContent distance={40} duration={0.9} delay={0.15} className="text-center">
          <GlareHover
            width="100%"
            height="auto"
            className="mx-auto mt-10 block w-full max-w-md cursor-default border-white/10"
            background="rgba(255,255,255,0.03)"
            borderColor="rgba(255,255,255,0.1)"
            borderRadius="1rem"
            glareColor="#d4af37"
            glareOpacity={0.4}
            glareSize={300}
            transitionDuration={1000}
          >
            <div className="w-full space-y-5 p-8 text-left">
              <div>
                <p className="text-xs tracking-widest text-[#d4af37] uppercase">Адрес</p>
                <p className="mt-1 text-white/80">
                  Фотоцентр «В ФОКУСЕ», 3 этаж
                  <br />
                  ТРЦ «Фокус», Молдавская ул., 16
                  <br />
                  Челябинск, Челябинская обл., 454021
                </p>
              </div>
              <div>
                <p className="text-xs tracking-widest text-[#d4af37] uppercase">Режим работы</p>
                <p className="mt-1 text-white/80">Пн–Пт: 14:00–22:00</p>
                <p className="text-white/80">Сб–Вс: 12:00–22:00</p>
              </div>
              <div>
                <p className="text-xs tracking-widest text-[#d4af37] uppercase">Телефон</p>
                <a
                  href="tel:+79000894113"
                  className="mt-1 block text-white/80 transition-colors hover:text-[#d4af37]"
                >
                  +7 (900) 089-41-13
                </a>
              </div>
              <div>
                <p className="text-xs tracking-widest text-[#d4af37] uppercase">E-mail</p>
                <a
                  href="mailto:info@v-fokuse.ru"
                  className="mt-1 block text-white/80 transition-colors hover:text-[#d4af37]"
                >
                  info@v-fokuse.ru
                </a>
              </div>
            </div>
          </GlareHover>
        </AnimatedContent>

        <AnimatedContent distance={30} duration={0.8} delay={0.35} className="mt-10">
          <div className="flex flex-col items-center gap-5">
            <a
              href="tel:+79000894113"
              className="call-pulse rounded-full bg-[#d4af37] px-10 py-3.5 text-base font-medium tracking-wide text-black transition-transform hover:scale-105"
            >
              Позвонить
            </a>

            <p className="text-xs tracking-[0.25em] text-white/30 uppercase">
              или напишите нам
            </p>

            <div className="flex gap-3">
              <a
                href="https://t.me/vfokuse74"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-7 py-2.5 text-sm text-white/70 transition-colors hover:border-[#d4af37]/40 hover:text-[#d4af37]"
              >
                Telegram
              </a>
              <a
                href="https://vk.com/fokusev"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-7 py-2.5 text-sm text-white/70 transition-colors hover:border-[#d4af37]/40 hover:text-[#d4af37]"
              >
                ВКонтакте
              </a>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative">
      <div className="border-t border-white/5 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="font-[family-name:var(--font-display)] text-base tracking-[0.15em] text-white/70 uppercase">
              В ФОКУСЕ
            </span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          <Link to="/privacy" className="transition-colors hover:text-[#d4af37]">
            Политика конфиденциальности
          </Link>

          <p className="text-center md:text-right">
            ИП Искандаров Никита Дмитриевич / ИНН 744845097829
          </p>
        </div>
      </div>

      <MadeByClickBuild />
    </footer>
  )
}

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="bg-[#0a0a0a]">
        <Hero />
        <SectionDivider />
        <Advantages />
        <SectionDivider />
        <Products />
        <SectionDivider />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
