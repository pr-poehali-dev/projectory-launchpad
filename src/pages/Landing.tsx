import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface LandingProps {
  onEnterDashboard: () => void;
}

const NAV_LINKS = [
  { label: "Функции", href: "#features" },
  { label: "Цены", href: "#pricing" },
  { label: "Блог", href: "#blog" },
  { label: "FAQ", href: "#faq" },
  { label: "Документация", href: "#docs" },
];

const FEATURES = [
  {
    icon: "FolderOpen",
    title: "Хранение проектов",
    desc: "Все проекты в одном месте — активные, завершённые, архивные.",
    gradient: "from-violet-500 to-purple-600",
    lightBg: "bg-violet-50",
  },
  {
    icon: "GitBranch",
    title: "Статусы разработки",
    desc: "Idea → In Progress → Released → Archived. Визуальный прогресс.",
    gradient: "from-blue-500 to-indigo-600",
    lightBg: "bg-blue-50",
  },
  {
    icon: "Globe",
    title: "Публичные страницы",
    desc: "Красивые публичные страницы для портфолио и демо.",
    gradient: "from-cyan-500 to-blue-600",
    lightBg: "bg-cyan-50",
  },
  {
    icon: "Map",
    title: "Roadmap",
    desc: "Планируй этапы с дедлайнами и отслеживай прогресс.",
    gradient: "from-purple-500 to-pink-600",
    lightBg: "bg-purple-50",
  },
  {
    icon: "Cpu",
    title: "Технологический стек",
    desc: "Отмечай технологии, фильтруй проекты по стеку.",
    gradient: "from-indigo-500 to-violet-600",
    lightBg: "bg-indigo-50",
  },
  {
    icon: "Users",
    title: "Командный доступ",
    desc: "Приглашай коллег, распределяй задачи, работайте вместе.",
    gradient: "from-pink-500 to-rose-600",
    lightBg: "bg-pink-50",
  },
  {
    icon: "Activity",
    title: "Аналитика прогресса",
    desc: "Графики активности, статистика по проектам и задачам.",
    gradient: "from-emerald-500 to-teal-600",
    lightBg: "bg-emerald-50",
  },
  {
    icon: "Sparkles",
    title: "AI-помощник",
    desc: "Генерация roadmap, описаний, задач с помощью ИИ.",
    gradient: "from-amber-500 to-orange-600",
    lightBg: "bg-amber-50",
  },
];

const PLANS = [
  {
    name: "Free",
    price: "0",
    period: "навсегда",
    desc: "Для старта и экспериментов",
    features: ["До 3 проектов", "Публичные страницы", "Базовый roadmap", "Статусы задач"],
    cta: "Начать бесплатно",
    highlight: false,
  },
  {
    name: "Pro",
    price: "790",
    period: "в месяц",
    desc: "Для серьёзных солопренеров",
    features: ["Неограниченно проектов", "AI-помощник", "Продвинутый roadmap", "Команда до 3 чел.", "Аналитика", "Приоритетная поддержка"],
    cta: "Попробовать Pro",
    highlight: true,
  },
  {
    name: "Team",
    price: "2490",
    period: "в месяц",
    desc: "Для небольших команд",
    features: ["Всё из Pro", "До 10 человек", "Shared workspace", "Расширенная аналитика", "API доступ", "Выделенная поддержка"],
    cta: "Связаться с нами",
    highlight: false,
  },
];

const FAQS = [
  { q: "Для кого создан Projectory?", a: "Для разработчиков, солопренеров и небольших команд из СНГ. Тех, кто ведёт несколько проектов параллельно." },
  { q: "Чем Projectory отличается от Notion или Trello?", a: "Projectory заточен под разработчиков: портфолио, стек технологий, статусы релизов — всё в IT-контексте." },
  { q: "Можно ли сделать проект публичным?", a: "Да. Каждый проект получит красивую публичную страницу с описанием и roadmap." },
  { q: "Поддерживается ли командная работа?", a: "Да, начиная с плана Pro. До 3 участников, назначение задач, совместная работа." },
  { q: "Есть ли мобильная версия?", a: "Интерфейс полностью адаптивный. PWA-приложение — в ближайших планах." },
];

const AUDIENCE = [
  { emoji: "👨‍💻", title: "Разработчики", desc: "Веди проекты и формируй портфолио для работодателей и заказчиков.", color: "from-violet-500 to-purple-600" },
  { emoji: "🚀", title: "Солопренеры", desc: "Управляй идеями, roadmap и задачами. Превращай хаос в структуру.", color: "from-blue-500 to-indigo-600" },
  { emoji: "👥", title: "Команды", desc: "Работайте над проектами вместе, следите за прогрессом.", color: "from-cyan-500 to-teal-600" },
];

const LOGOS = ["Vercel", "Supabase", "Stripe", "GitHub", "Linear", "Figma", "Notion", "Slack"];

function OrbitalHero() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div
        className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] rounded-full animate-pulse-soft"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)" }}
      />
      <div
        className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full animate-pulse-soft"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 60%)", animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full animate-pulse-soft"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 55%)", animationDelay: "3s" }}
      />

      {/* Orbital ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[700px] md:h-[700px]">
        <div className="absolute inset-0 rounded-full border border-purple-200/30" />
        <div className="absolute inset-[60px] rounded-full border border-purple-200/20" />
        <div className="absolute inset-[120px] rounded-full border border-purple-200/10" />

        {[
          { size: 40, color: "bg-gradient-to-br from-violet-500 to-purple-600", icon: "Code", r: 300, dur: 25, delay: 0 },
          { size: 36, color: "bg-gradient-to-br from-blue-500 to-indigo-600", icon: "Rocket", r: 300, dur: 25, delay: 8 },
          { size: 32, color: "bg-gradient-to-br from-cyan-500 to-teal-600", icon: "Lightbulb", r: 300, dur: 25, delay: 16 },
          { size: 28, color: "bg-gradient-to-br from-emerald-500 to-green-600", icon: "Check", r: 240, dur: 20, delay: 0 },
          { size: 24, color: "bg-gradient-to-br from-amber-500 to-orange-600", icon: "Star", r: 240, dur: 20, delay: 10 },
          { size: 22, color: "bg-gradient-to-br from-pink-500 to-rose-600", icon: "Heart", r: 180, dur: 18, delay: 5 },
        ].map((orb, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 animate-orbit"
            style={{
              "--orbit-r": `${orb.r / 2}px`,
              "--orbit-dur": `${orb.dur}s`,
              animationDelay: `${-orb.delay}s`,
              width: 0,
              height: 0,
            } as React.CSSProperties}
          >
            <div
              className={`${orb.color} rounded-xl flex items-center justify-center shadow-lg`}
              style={{
                width: orb.size,
                height: orb.size,
                marginLeft: -orb.size / 2,
                marginTop: -orb.size / 2,
              }}
            >
              <Icon name={orb.icon} size={orb.size * 0.45} className="text-white" fallback="Star" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrustMarquee() {
  return (
    <div className="relative overflow-hidden py-6 border-y border-gray-100">
      <div className="flex animate-marquee whitespace-nowrap gap-16">
        {[...LOGOS, ...LOGOS].map((name, i) => (
          <span key={i} className="text-sm font-semibold text-gray-300 tracking-wider uppercase flex-shrink-0">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

function MockDashboard() {
  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-60" />
      <div className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 bg-gray-50/80">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 rounded-md bg-gray-100 text-xs text-gray-400 font-mono">projectory.app/dashboard</div>
          </div>
        </div>
        {/* Content */}
        <div className="p-6">
          <div className="flex gap-4 mb-5">
            {[
              { label: "Проекты", val: "6", color: "text-violet-600", bg: "bg-violet-50" },
              { label: "В работе", val: "2", color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Релизы", val: "2", color: "text-emerald-600", bg: "bg-emerald-50" },
            ].map((s) => (
              <div key={s.label} className={`flex-1 ${s.bg} rounded-xl p-4`}>
                <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: "Projectory", status: "В работе", color: "bg-blue-500", progress: 65 },
              { name: "DevPulse", status: "Идея", color: "bg-amber-500", progress: 15 },
              { name: "ShipFast CLI", status: "Выпущен", color: "bg-emerald-500", progress: 100 },
            ].map((p) => (
              <div key={p.name} className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${p.color}`} />
                  <span className="text-sm font-semibold text-gray-800">{p.name}</span>
                </div>
                <div className="text-xs text-gray-400 mb-2">{p.status}</div>
                <div className="h-1.5 rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Landing({ onEnterDashboard }: LandingProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbfe] text-gray-900 overflow-x-hidden">
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-light py-3 shadow-sm" : "py-5 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <span className="text-white font-black text-sm">P</span>
            </div>
            <span className="font-black text-lg tracking-tight text-gray-900">Projectory</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100/60 transition-all duration-200">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={onEnterDashboard} className="text-sm text-gray-500 hover:text-gray-900 transition-colors px-3 py-2">Войти</button>
            <button onClick={onEnterDashboard} className="btn-primary relative px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-violet-500/25">
              <span className="relative z-10">Начать бесплатно</span>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32">
        <OrbitalHero />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 text-sm text-violet-600 font-medium mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            Публичный бета · Присоединяйся первым
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-6 animate-fade-in-up delay-100 tracking-tight">
            <span className="text-gradient">Projectory</span>
            <br />
            <span className="text-gray-900">пространство</span>
            <br />
            <span className="text-gray-400">твоих проектов</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
            Храни, развивай и показывай свои проекты в одном месте.
            <br className="hidden sm:block" />
            Для разработчиков и солопренеров из СНГ.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <button onClick={onEnterDashboard} className="btn-primary relative w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white flex items-center justify-center gap-2 shadow-xl shadow-violet-500/20">
              <span className="relative z-10">Начать бесплатно</span>
              <Icon name="ArrowRight" size={18} className="relative z-10" />
            </button>
            <button onClick={onEnterDashboard} className="btn-outline-light w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2">
              <Icon name="Play" size={18} />
              Посмотреть демо
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto animate-fade-in-up delay-400">
            {[
              { val: "1200+", label: "проектов" },
              { val: "340+", label: "разработчиков" },
              { val: "98%", label: "retention" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-gradient-subtle">{s.val}</div>
                <div className="text-xs text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <TrustMarquee />

      {/* FOR WHOM */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-violet-500 mb-4 block">Для кого</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Инструмент для тех,
              <br />
              <span className="text-gradient">кто создаёт</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {AUDIENCE.map((a, i) => (
              <div key={i} className="card-elevated p-8 group cursor-default" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-5xl mb-5">{a.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{a.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{a.desc}</p>
                <div className={`mt-5 h-1 w-16 rounded-full bg-gradient-to-r ${a.color} opacity-60 group-hover:w-full group-hover:opacity-100 transition-all duration-500`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-500 mb-4 block">Возможности</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Всё что нужно
              <br />
              <span className="text-gradient">в одном месте</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className="card-elevated p-6 group cursor-default">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={f.icon} size={18} className="text-white" fallback="Star" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{f.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-40 bg-white" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-4 block">Интерфейс</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Попробуй в действии
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Полноценный дашборд с проектами, аналитикой и AI-помощником
            </p>
          </div>
          <MockDashboard />
          <div className="text-center mt-10">
            <button onClick={onEnterDashboard} className="btn-primary relative px-10 py-5 rounded-xl text-lg font-semibold text-white inline-flex items-center gap-3 shadow-xl shadow-violet-500/20">
              <span className="relative z-10">Открыть демо-дашборд</span>
              <Icon name="ArrowRight" size={20} className="relative z-10" />
            </button>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-violet-500 mb-4 block">Тарифы</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Прозрачные <span className="text-gradient">цены</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PLANS.map((plan, i) => (
              <div key={i} className={`relative rounded-2xl p-8 transition-all duration-300 ${plan.highlight ? "bg-gradient-to-b from-violet-50 to-indigo-50 border-2 border-violet-200 shadow-xl shadow-violet-500/10 scale-[1.03]" : "card-elevated"}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-semibold text-white shadow-lg">
                    Популярный
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-gray-400 text-sm">{plan.desc}</p>
                </div>
                <div className="mb-8">
                  <span className="text-4xl font-black text-gray-900">
                    {plan.price === "0" ? "Бесплатно" : `₽${plan.price}`}
                  </span>
                  {plan.price !== "0" && <span className="text-gray-400 text-sm ml-2">/ {plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                      <Icon name="Check" size={14} className="text-violet-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={onEnterDashboard} className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${plan.highlight ? "btn-primary relative text-white shadow-lg shadow-violet-500/25" : "btn-outline-light"}`}>
                  <span className="relative z-10">{plan.cta}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-500 mb-4 block">Блог</span>
            <h2 className="text-4xl font-black text-gray-900">
              Статьи для <span className="text-gradient">разработчиков</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tag: "Продуктивность", title: "Как вести 5 проектов и не сойти с ума", date: "25 фев 2026", color: "text-violet-500 bg-violet-50" },
              { tag: "Roadmap", title: "Зачем солопренеру роадмап и как его составить", date: "18 фев 2026", color: "text-blue-500 bg-blue-50" },
              { tag: "Портфолио", title: "Портфолио разработчика в 2026: что обязательно", date: "10 фев 2026", color: "text-cyan-500 bg-cyan-50" },
            ].map((post, i) => (
              <div key={i} className="card-elevated p-6 group cursor-pointer">
                <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md mb-4 ${post.color}`}>{post.tag}</span>
                <h3 className="font-semibold text-gray-900 text-base leading-snug mb-4 group-hover:text-violet-600 transition-colors">{post.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-300">{post.date}</span>
                  <Icon name="ArrowUpRight" size={14} className="text-gray-300 group-hover:text-violet-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-28 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-violet-500 mb-4 block">FAQ</span>
            <h2 className="text-4xl font-black text-gray-900">
              Частые <span className="text-gradient">вопросы</span>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className={`rounded-2xl border transition-all duration-300 ${openFaq === i ? "border-violet-200 bg-violet-50/30 shadow-sm" : "border-gray-100 bg-white hover:border-gray-200"}`}>
                <button className="w-full flex items-center justify-between p-6 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-medium text-gray-900 text-sm pr-4">{faq.q}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${openFaq === i ? "bg-violet-500 text-white rotate-180" : "bg-gray-100 text-gray-400"}`}>
                    <Icon name="ChevronDown" size={14} />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-sm text-gray-500 leading-relaxed animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="docs" className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-14 text-center bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 animate-gradient">
            <div className="absolute inset-0 dot-grid opacity-10" />
            <div className="relative z-10">
              <h2 className="text-4xl font-black text-white mb-4">Готов начать?</h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto">
                Полная документация, руководства и API-справочник — всё для быстрого старта.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={onEnterDashboard} className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold bg-white text-violet-700 hover:bg-violet-50 transition-all shadow-xl">
                  Начать бесплатно
                </button>
                <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white border-2 border-white/25 hover:border-white/50 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  <Icon name="BookOpen" size={18} />
                  Документация
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="font-bold text-gray-900">Projectory</span>
          </div>
          <p className="text-gray-400 text-sm">© 2026 Projectory. Сделано в СНГ с ❤️</p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600 transition-colors">Политика</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Условия</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Контакты</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
