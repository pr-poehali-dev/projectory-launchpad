import { useState, useEffect, useRef } from "react";
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
    desc: "Все активные, завершённые и архивные проекты в одном месте. Никаких потерянных идей.",
    color: "from-purple-500/20 to-blue-500/20",
    border: "hover:border-purple-500/40",
    glow: "hover:shadow-[0_0_30px_rgba(124,92,252,0.15)]",
  },
  {
    icon: "GitBranch",
    title: "Статусы разработки",
    desc: "Idea → In Progress → Released → Archived. Следи за прогрессом каждого проекта.",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "hover:border-blue-500/40",
    glow: "hover:shadow-[0_0_30px_rgba(79,142,247,0.15)]",
  },
  {
    icon: "Globe",
    title: "Публичные страницы",
    desc: "Делись прогрессом с миром. Красивые публичные страницы для каждого проекта.",
    color: "from-cyan-500/20 to-teal-500/20",
    border: "hover:border-cyan-500/40",
    glow: "hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]",
  },
  {
    icon: "Map",
    title: "Roadmap",
    desc: "Планируй будущее проекта. Визуальный роадмап с этапами и дедлайнами.",
    color: "from-violet-500/20 to-purple-500/20",
    border: "hover:border-violet-500/40",
    glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
  },
  {
    icon: "Cpu",
    title: "Технологический стек",
    desc: "Отмечай технологии и фреймворки. Фильтруй проекты по стеку.",
    color: "from-indigo-500/20 to-blue-500/20",
    border: "hover:border-indigo-500/40",
    glow: "hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
  },
  {
    icon: "Users",
    title: "Командный доступ",
    desc: "Приглашай коллег, распределяй задачи и работайте над проектами вместе.",
    color: "from-pink-500/20 to-rose-500/20",
    border: "hover:border-pink-500/40",
    glow: "hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]",
  },
  {
    icon: "Kanban",
    title: "Канбан-доска",
    desc: "Drag & drop задачи между статусами. Визуальное управление процессом разработки.",
    color: "from-emerald-500/20 to-green-500/20",
    border: "hover:border-emerald-500/40",
    glow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
  },
  {
    icon: "Sparkles",
    title: "AI-помощник",
    desc: "Генерация описаний, roadmap и задач с помощью ИИ. Фокус на продукте, не на рутине.",
    color: "from-amber-500/20 to-orange-500/20",
    border: "hover:border-amber-500/40",
    glow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
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
    features: ["Неограниченно проектов", "AI-помощник", "Продвинутый roadmap", "Командный доступ (до 3)", "Аналитика", "Приоритетная поддержка"],
    cta: "Попробовать Pro",
    highlight: true,
  },
  {
    name: "Team",
    price: "2490",
    period: "в месяц",
    desc: "Для небольших команд",
    features: ["Всё из Pro", "Команды до 10 человек", "Shared workspace", "Расширенная аналитика", "API доступ", "Выделенная поддержка"],
    cta: "Связаться с нами",
    highlight: false,
  },
];

const FAQS = [
  {
    q: "Для кого создан Projectory?",
    a: "Для разработчиков, солопренеров и небольших команд из СНГ. Тех, кто ведёт несколько проектов параллельно и хочет держать всё под контролем в одном месте.",
  },
  {
    q: "Чем Projectory отличается от Notion или Trello?",
    a: "Projectory создан специально для управления проектами разработчиков: портфолио, публичные страницы, технологический стек, статусы релизов — всё заточено под IT-контекст.",
  },
  {
    q: "Можно ли сделать проект публичным?",
    a: "Да. Каждый проект можно сделать публичным — он получит красивую страницу с описанием, roadmap и прогрессом. Идеально для портфолио.",
  },
  {
    q: "Поддерживается ли командная работа?",
    a: "Да, начиная с плана Pro. Вы можете пригласить до 3 участников, назначать задачи и работать над проектами вместе.",
  },
  {
    q: "Есть ли мобильная версия?",
    a: "Интерфейс полностью адаптивный. PWA-приложение в планах на ближайший квартал.",
  },
];

const AUDIENCE = [
  {
    emoji: "👨‍💻",
    title: "Разработчики",
    desc: "Веди проекты, формируй портфолио и показывай прогресс работодателям и заказчикам.",
    tags: ["GitHub", "Портфолио", "Статусы"],
  },
  {
    emoji: "🚀",
    title: "Солопренеры",
    desc: "Управляй идеями, roadmap и задачами. Превращай хаос в структуру.",
    tags: ["Идеи", "Roadmap", "Фокус"],
  },
  {
    emoji: "👥",
    title: "Команды",
    desc: "Работайте над проектами вместе, распределяйте задачи и следите за прогрессом.",
    tags: ["Совместная работа", "Задачи", "Аналитика"],
  },
];

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,92,252,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(0,229,255,0.1) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 20% 60%, rgba(79,142,247,0.1) 0%, transparent 50%)",
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute rounded-full animate-float"
        style={{
          width: 300,
          height: 300,
          top: "10%",
          left: "60%",
          background: "radial-gradient(circle, rgba(124,92,252,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          animationDelay: "0s",
        }}
      />
      <div
        className="absolute rounded-full animate-float"
        style={{
          width: 200,
          height: 200,
          top: "50%",
          left: "10%",
          background: "radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 70%)",
          filter: "blur(30px)",
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute rounded-full animate-float"
        style={{
          width: 150,
          height: 150,
          top: "70%",
          left: "75%",
          background: "radial-gradient(circle, rgba(79,142,247,0.1) 0%, transparent 70%)",
          filter: "blur(25px)",
          animationDelay: "4s",
        }}
      />

      {/* Constellation dots */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="dotGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c5cfc" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7c5cfc" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[
          [120, 150], [300, 80], [480, 200], [680, 120], [850, 280],
          [200, 320], [550, 350], [760, 400], [980, 200], [150, 500],
          [400, 450], [700, 550], [900, 480], [1050, 350],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="2" fill="url(#dotGrad)" className="animate-pulse-glow" style={{ animationDelay: `${i * 0.3}s` }} />
            {i < 13 && (
              <line
                x1={x} y1={y}
                x2={[120, 300, 480, 680, 850, 200, 550, 760, 980, 150, 400, 700, 900, 1050][i + 1]}
                y2={[150, 80, 200, 120, 280, 320, 350, 400, 200, 500, 450, 550, 480, 350][i + 1]}
                stroke="rgba(124,92,252,0.12)"
                strokeWidth="1"
              />
            )}
          </g>
        ))}
      </svg>
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
    <div className="min-h-screen bg-[#080c1a] text-white overflow-x-hidden">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass border-b border-white/5 py-3" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-lg tracking-tight">Projectory</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onEnterDashboard}
              className="text-sm text-white/70 hover:text-white transition-colors px-3 py-2"
            >
              Войти
            </button>
            <button
              onClick={onEnterDashboard}
              className="btn-primary relative px-5 py-2 rounded-lg text-sm font-medium text-white"
            >
              <span className="relative z-10">Начать бесплатно</span>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32">
        <AnimatedGrid />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/20 text-sm text-purple-300 mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse-glow" />
            Публичный бета · Присоединяйся первым
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 animate-fade-in-up delay-100">
            <span className="text-gradient">Projectory</span>
            <br />
            <span className="text-white/90">пространство</span>
            <br />
            <span className="text-white/90">твоих проектов</span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
            Храни, развивай и показывай свои проекты в одном месте.
            Для разработчиков и солопренеров из СНГ.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <button
              onClick={onEnterDashboard}
              className="btn-primary relative w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white flex items-center justify-center gap-2"
            >
              <span className="relative z-10">Начать бесплатно</span>
              <Icon name="ArrowRight" size={18} className="relative z-10" />
            </button>
            <button
              onClick={onEnterDashboard}
              className="btn-outline w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2"
            >
              <Icon name="Play" size={18} />
              Посмотреть демо
            </button>
          </div>

          {/* Hero stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto animate-fade-in-up delay-400">
            {[
              { val: "1200+", label: "проектов создано" },
              { val: "340+", label: "разработчиков" },
              { val: "98%", label: "остаются после месяца" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-gradient-subtle">{s.val}</div>
                <div className="text-xs text-white/40 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-float">
          <span className="text-xs tracking-widest uppercase">Листай</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* FOR WHOM */}
      <section className="py-24 px-6 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,92,252,0.06) 0%, transparent 70%)" }}
        />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-4 block">Для кого</span>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Инструмент для тех,
              <br />
              <span className="text-gradient">кто создаёт</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {AUDIENCE.map((a, i) => (
              <div
                key={i}
                className="glass-card p-8 rounded-2xl group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-5xl mb-5">{a.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-3">{a.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm mb-5">{a.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {a.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4 block">Возможности</span>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Всё что нужно
              <br />
              <span className="text-gradient">в одном месте</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className={`glass-card p-6 rounded-2xl transition-all duration-300 cursor-default border border-white/5 ${f.border} ${f.glow}`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4`}>
                  <Icon name={f.icon} size={18} className="text-white" fallback="Star" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{f.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(79,142,247,0.08) 0%, transparent 70%)" }}
        />
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-4 block">Интерфейс</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Попробуй в действии
          </h2>
          <p className="text-white/50 mb-12 max-w-xl mx-auto">
            Полноценный дашборд с канбан-доской, проектами и AI-помощником
          </p>
          <button
            onClick={onEnterDashboard}
            className="btn-primary relative px-10 py-5 rounded-xl text-lg font-semibold text-white inline-flex items-center gap-3"
          >
            <span className="relative z-10">Открыть демо-дашборд</span>
            <Icon name="ArrowRight" size={20} className="relative z-10" />
          </button>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-4 block">Тарифы</span>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Прозрачные
              <br />
              <span className="text-gradient">цены</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  plan.highlight
                    ? "bg-gradient-to-b from-purple-600/20 to-blue-600/10 border border-purple-500/40 shadow-[0_0_60px_rgba(124,92,252,0.2)]"
                    : "glass-card border border-white/5"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-xs font-semibold text-white">
                    Популярный
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-white/40 text-sm">{plan.desc}</p>
                </div>
                <div className="mb-8">
                  <span className="text-4xl font-black text-white">
                    {plan.price === "0" ? "Бесплатно" : `₽${plan.price}`}
                  </span>
                  {plan.price !== "0" && (
                    <span className="text-white/40 text-sm ml-2">/ {plan.period}</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                      <Icon name="Check" size={14} className="text-green-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onEnterDashboard}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    plan.highlight
                      ? "btn-primary relative text-white"
                      : "btn-outline"
                  }`}
                >
                  <span className="relative z-10">{plan.cta}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG TEASER */}
      <section id="blog" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4 block">Блог</span>
            <h2 className="text-4xl font-black text-white">
              Статьи для <span className="text-gradient">разработчиков</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tag: "Продуктивность", title: "Как вести 5 проектов параллельно и не сойти с ума", date: "25 фев 2026" },
              { tag: "Roadmap", title: "Зачем солопренеру роадмап и как его правильно составить", date: "18 фев 2026" },
              { tag: "Портфолио", title: "Портфолио разработчика в 2026: что должно быть обязательно", date: "10 фев 2026" },
            ].map((post, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl group cursor-pointer">
                <span className="text-xs font-mono text-purple-400 mb-3 block">{post.tag}</span>
                <h3 className="font-semibold text-white text-base leading-snug mb-4 group-hover:text-purple-300 transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/30">{post.date}</span>
                  <Icon name="ArrowUpRight" size={14} className="text-white/30 group-hover:text-purple-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-4 block">FAQ</span>
            <h2 className="text-4xl font-black text-white">
              Частые <span className="text-gradient">вопросы</span>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${openFaq === i ? "border-purple-500/30" : ""}`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-white text-sm pr-4">{faq.q}</span>
                  <Icon
                    name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                    size={16}
                    className="text-white/40 flex-shrink-0 transition-transform duration-200"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-sm text-white/50 leading-relaxed animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCS CTA */}
      <section id="docs" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-12 text-center glass border border-purple-500/20">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,92,252,0.12) 0%, transparent 70%)" }}
            />
            <div className="relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-4 block">Документация</span>
              <h2 className="text-4xl font-black text-white mb-4">
                Готов начать?
              </h2>
              <p className="text-white/50 mb-8 max-w-xl mx-auto">
                Полная документация, API-справочник и руководства — всё для быстрого старта.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onEnterDashboard}
                  className="btn-primary relative px-8 py-4 rounded-xl font-semibold text-white"
                >
                  <span className="relative z-10">Начать бесплатно</span>
                </button>
                <button className="btn-outline px-8 py-4 rounded-xl font-semibold flex items-center gap-2">
                  <Icon name="BookOpen" size={18} />
                  Читать документацию
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="font-bold text-white/80">Projectory</span>
          </div>
          <p className="text-white/30 text-sm">© 2026 Projectory. Сделано в СНГ с ❤️</p>
          <div className="flex items-center gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Политика</a>
            <a href="#" className="hover:text-white/60 transition-colors">Условия</a>
            <a href="#" className="hover:text-white/60 transition-colors">Контакты</a>
          </div>
        </div>
      </footer>
    </div>
  );
}