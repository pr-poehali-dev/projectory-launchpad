import { useState } from "react";
import Icon from "@/components/ui/icon";

interface DashboardProps {
  onBack: () => void;
}

type Status = "idea" | "progress" | "released" | "archived";

interface Project {
  id: string;
  name: string;
  desc: string;
  status: Status;
  tech: string[];
  progress: number;
  updated: string;
  gradient: string;
  emoji: string;
  commits: number;
  stars: number;
}

interface ActivityItem {
  id: string;
  type: "commit" | "release" | "idea" | "task";
  text: string;
  project: string;
  time: string;
}

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; dot: string }> = {
  idea: { label: "Идея", color: "text-amber-600", bg: "bg-amber-50 border-amber-200", dot: "bg-amber-500" },
  progress: { label: "В работе", color: "text-blue-600", bg: "bg-blue-50 border-blue-200", dot: "bg-blue-500" },
  released: { label: "Выпущен", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" },
  archived: { label: "Архив", color: "text-gray-400", bg: "bg-gray-50 border-gray-200", dot: "bg-gray-400" },
};

const PROJECTS: Project[] = [
  { id: "1", name: "Projectory", desc: "Платформа управления проектами для разработчиков", status: "progress", tech: ["React", "TypeScript", "Python"], progress: 65, updated: "2 часа назад", gradient: "from-violet-500 to-indigo-600", emoji: "🚀", commits: 247, stars: 42 },
  { id: "2", name: "DevPulse", desc: "Мониторинг GitHub-активности команды в реальном времени", status: "idea", tech: ["Next.js", "GraphQL"], progress: 15, updated: "вчера", gradient: "from-blue-500 to-cyan-600", emoji: "📊", commits: 18, stars: 5 },
  { id: "3", name: "ShipFast CLI", desc: "CLI-инструмент для быстрого деплоя фулстек-приложений", status: "released", tech: ["Go", "Docker"], progress: 100, updated: "3 дня назад", gradient: "from-emerald-500 to-teal-600", emoji: "⚡", commits: 156, stars: 89 },
  { id: "4", name: "CodeReview AI", desc: "ИИ-агент для автоматического ревью кода", status: "progress", tech: ["Python", "OpenAI", "FastAPI"], progress: 42, updated: "5 дней назад", gradient: "from-orange-500 to-red-600", emoji: "🤖", commits: 93, stars: 31 },
  { id: "5", name: "StandUp Bot", desc: "Telegram-бот для ежедневных стендапов в командах", status: "released", tech: ["Python", "Telegram API"], progress: 100, updated: "1 неделю назад", gradient: "from-pink-500 to-rose-600", emoji: "🤝", commits: 87, stars: 23 },
  { id: "6", name: "Moneta", desc: "Личный финансовый трекер с аналитикой", status: "archived", tech: ["Vue", "Supabase"], progress: 30, updated: "2 месяца назад", gradient: "from-slate-400 to-gray-500", emoji: "💰", commits: 45, stars: 8 },
];

const ACTIVITY: ActivityItem[] = [
  { id: "a1", type: "commit", text: "Обновил Hero-блок лендинга", project: "Projectory", time: "2 мин назад" },
  { id: "a2", type: "task", text: "Завершил интеграцию OAuth", project: "Projectory", time: "1 час назад" },
  { id: "a3", type: "release", text: "Выпущена версия 2.1.0", project: "ShipFast CLI", time: "3 часа назад" },
  { id: "a4", type: "idea", text: "Новая идея: встроенный AI-ассистент", project: "DevPulse", time: "вчера" },
  { id: "a5", type: "commit", text: "Рефакторинг API модуля", project: "CodeReview AI", time: "вчера" },
  { id: "a6", type: "task", text: "Добавлена тёмная тема", project: "StandUp Bot", time: "2 дня назад" },
];

const ACTIVITY_ICON: Record<string, { icon: string; color: string; bg: string }> = {
  commit: { icon: "GitCommit", color: "text-violet-600", bg: "bg-violet-50" },
  release: { icon: "Rocket", color: "text-emerald-600", bg: "bg-emerald-50" },
  idea: { icon: "Lightbulb", color: "text-amber-600", bg: "bg-amber-50" },
  task: { icon: "CheckCircle", color: "text-blue-600", bg: "bg-blue-50" },
};

const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const CONTRIBUTION_DATA = Array.from({ length: 52 * 7 }, () => Math.random());

const SIDEBAR_ITEMS = [
  { icon: "LayoutDashboard", label: "Обзор", section: "overview" },
  { icon: "FolderOpen", label: "Все проекты", section: "projects" },
  { icon: "Zap", label: "Активные", section: "active" },
  { icon: "CheckCircle", label: "Завершённые", section: "completed" },
  { icon: "Archive", label: "Архив", section: "archive" },
  { icon: "Activity", label: "Активность", section: "activity" },
  { icon: "Users", label: "Команды", section: "teams" },
  { icon: "Sparkles", label: "AI-помощник", section: "ai" },
];

function ContributionGraph() {
  const weeks = 26;
  const days = 7;
  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-gray-900 text-sm">Активность за полгода</h3>
        <span className="text-xs text-gray-400">247 действий</span>
      </div>
      <div className="flex gap-[3px] overflow-hidden">
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {Array.from({ length: days }).map((_, d) => {
              const val = CONTRIBUTION_DATA[w * 7 + d];
              let bg = "bg-gray-100";
              if (val > 0.8) bg = "bg-violet-600";
              else if (val > 0.6) bg = "bg-violet-400";
              else if (val > 0.35) bg = "bg-violet-200";
              else if (val > 0.15) bg = "bg-violet-100";
              return <div key={d} className={`w-3 h-3 rounded-sm ${bg} transition-colors hover:ring-2 hover:ring-violet-300`} />;
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 justify-end">
        <span className="text-xs text-gray-400">Меньше</span>
        {["bg-gray-100", "bg-violet-100", "bg-violet-200", "bg-violet-400", "bg-violet-600"].map((c) => (
          <div key={c} className={`w-3 h-3 rounded-sm ${c}`} />
        ))}
        <span className="text-xs text-gray-400">Больше</span>
      </div>
    </div>
  );
}

function ProjectCard({ project, onSelect }: { project: Project; onSelect: (p: Project) => void }) {
  const cfg = STATUS_CONFIG[project.status];
  return (
    <div className="card-elevated p-5 group cursor-pointer flex flex-col gap-4" onClick={() => onSelect(project)}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-lg shadow-lg`}>
            {project.emoji}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm group-hover:text-violet-600 transition-colors">{project.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{project.updated}</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border font-medium ${cfg.bg} ${cfg.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">{project.desc}</p>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-mono text-gray-500 bg-gray-50 border border-gray-100">{t}</span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Icon name="GitCommit" size={12} className="text-gray-300" />
            {project.commits}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Star" size={12} className="text-gray-300" />
            {project.stars}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-24 h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-700"
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <span className="text-xs font-mono text-gray-400">{project.progress}%</span>
        </div>
      </div>
    </div>
  );
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const [tab, setTab] = useState("overview");
  const cfg = STATUS_CONFIG[project.status];

  const tabs = [
    { id: "overview", label: "Обзор", icon: "Eye" },
    { id: "roadmap", label: "Roadmap", icon: "Map" },
    { id: "tasks", label: "Задачи", icon: "ListTodo" },
    { id: "activity", label: "Активность", icon: "Activity" },
  ];

  const roadmapItems = [
    { phase: "MVP", status: "done", items: ["Авторизация", "Базовый CRUD", "Лендинг"] },
    { phase: "Beta", status: "current", items: ["AI-помощник", "Публичные страницы", "Аналитика"] },
    { phase: "v1.0", status: "planned", items: ["Команды", "API", "Мобильная версия"] },
  ];

  return (
    <div className="animate-fade-in">
      <button onClick={onClose} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 mb-6 transition-colors group">
        <Icon name="ArrowLeft" size={16} className="group-hover:-translate-x-1 transition-transform" />
        Назад к проектам
      </button>

      <div className={`relative rounded-2xl bg-gradient-to-br ${project.gradient} p-8 mb-6 overflow-hidden`}>
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="text-4xl mb-3">{project.emoji}</div>
            <h1 className="text-3xl font-black text-white mb-2">{project.name}</h1>
            <p className="text-white/70 text-sm max-w-md">{project.desc}</p>
            <div className="flex items-center gap-3 mt-5">
              <span className="px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur">{cfg.label}</span>
              <span className="text-white/60 text-xs flex items-center gap-1">
                <Icon name="GitCommit" size={12} /> {project.commits} коммитов
              </span>
              <span className="text-white/60 text-xs flex items-center gap-1">
                <Icon name="Star" size={12} /> {project.stars} звёзд
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 backdrop-blur transition-colors">
              <Icon name="ExternalLink" size={16} />
            </button>
            <button className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 backdrop-blur transition-colors">
              <Icon name="Settings" size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-1 mb-6 p-1 bg-gray-50 rounded-xl w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === t.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Icon name={t.icon} size={14} fallback="Circle" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-5">
            <div className="card-elevated p-6">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">О проекте</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{project.desc}. Проект находится в активной разработке, цель — создать лучший инструмент для управления проектами разработчиков в СНГ.</p>
            </div>
            <div className="card-elevated p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm">Технологии</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-4 py-2 rounded-xl text-sm font-mono text-gray-600 bg-gray-50 border border-gray-100 hover:border-violet-200 hover:bg-violet-50 transition-colors cursor-default">{t}</span>
                ))}
              </div>
            </div>
            <div className="card-elevated p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm">Прогресс</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-700" style={{ width: `${project.progress}%` }} />
                </div>
                <span className="text-lg font-black text-gradient-subtle">{project.progress}%</span>
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <div className="card-elevated p-6">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Ссылки</h3>
              <div className="space-y-2">
                {[{ icon: "Github", label: "GitHub Repo", url: "#" }, { icon: "Globe", label: "Сайт проекта", url: "#" }, { icon: "FileText", label: "Документация", url: "#" }].map((l) => (
                  <a key={l.label} href={l.url} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-violet-600 hover:bg-violet-50 transition-all">
                    <Icon name={l.icon} size={15} fallback="Link" />
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="card-elevated p-6">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Команда</h3>
              <div className="flex -space-x-2">
                {["А", "Д", "М"].map((name, i) => (
                  <div key={i} className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white bg-gradient-to-br ${["from-violet-500 to-purple-600", "from-blue-500 to-indigo-600", "from-cyan-500 to-teal-600"][i]}`}>
                    {name}
                  </div>
                ))}
                <button className="w-9 h-9 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center text-gray-400 hover:text-violet-500 hover:bg-violet-50 transition-colors">
                  <Icon name="Plus" size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "roadmap" && (
        <div className="space-y-0">
          {roadmapItems.map((phase, i) => (
            <div key={i} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                  phase.status === "done" ? "bg-emerald-100 text-emerald-600" :
                  phase.status === "current" ? "bg-violet-100 text-violet-600" :
                  "bg-gray-100 text-gray-400"
                }`}>
                  {phase.status === "done" ? <Icon name="Check" size={18} /> : i + 1}
                </div>
                {i < roadmapItems.length - 1 && <div className="w-0.5 flex-1 bg-gray-100 my-2" />}
              </div>
              <div className="flex-1 pb-8">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-bold text-gray-900">{phase.phase}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    phase.status === "done" ? "bg-emerald-50 text-emerald-600" :
                    phase.status === "current" ? "bg-violet-50 text-violet-600" :
                    "bg-gray-50 text-gray-400"
                  }`}>
                    {phase.status === "done" ? "Готово" : phase.status === "current" ? "Текущий" : "Запланировано"}
                  </span>
                </div>
                <div className="card-elevated p-4">
                  <div className="space-y-2">
                    {phase.items.map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm">
                        <Icon name={phase.status === "done" ? "CheckCircle" : "Circle"} size={14} className={phase.status === "done" ? "text-emerald-500" : "text-gray-300"} />
                        <span className={phase.status === "done" ? "text-gray-400 line-through" : "text-gray-600"}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "tasks" && (
        <div className="space-y-3">
          {["Спроектировать систему уведомлений", "Добавить OAuth через GitHub", "Оптимизировать SQL-запросы", "Публичные страницы проектов", "Интегрировать AI для генерации задач"].map((task, i) => (
            <div key={i} className="card-elevated p-4 flex items-center gap-4">
              <button className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${i > 2 ? "border-violet-500 bg-violet-500" : "border-gray-200 hover:border-violet-300"}`}>
                {i > 2 && <Icon name="Check" size={12} className="text-white" />}
              </button>
              <span className={`text-sm flex-1 ${i > 2 ? "text-gray-400 line-through" : "text-gray-700"}`}>{task}</span>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                i === 0 ? "bg-red-50 text-red-500" : i < 3 ? "bg-amber-50 text-amber-500" : "bg-gray-50 text-gray-400"
              }`}>
                {i === 0 ? "Высокий" : i < 3 ? "Средний" : "Готово"}
              </span>
            </div>
          ))}
          <button className="w-full py-3 rounded-xl border border-dashed border-gray-200 text-sm text-gray-400 hover:text-violet-500 hover:border-violet-300 transition-all flex items-center justify-center gap-2">
            <Icon name="Plus" size={14} />
            Добавить задачу
          </button>
        </div>
      )}

      {tab === "activity" && (
        <div className="space-y-3">
          {ACTIVITY.filter((a) => a.project === project.name).map((a) => {
            const cfg2 = ACTIVITY_ICON[a.type];
            return (
              <div key={a.id} className="card-elevated p-4 flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg ${cfg2.bg} ${cfg2.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={cfg2.icon} size={14} fallback="Circle" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{a.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AiPanel({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Привет! Я AI-помощник Projectory. Могу помочь сгенерировать roadmap, описание проекта или список задач. Что сделаем?" },
  ]);

  const suggestions = ["Сгенерировать roadmap", "Описание проекта", "Создать задачи", "Предложить стек"];

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }, { role: "ai", text: "Отличная идея! Генерирую варианты для тебя... (AI-интеграция в разработке 🚀)" }]);
    setInput("");
  };

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white border-l border-gray-100 flex flex-col z-40 shadow-2xl animate-slide-in-right">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Icon name="Sparkles" size={14} className="text-white" />
          </div>
          <span className="font-semibold text-gray-900 text-sm">AI-помощник</span>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors">
          <Icon name="X" size={16} />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${msg.role === "user" ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white" : "bg-gray-50 border border-gray-100 text-gray-600"}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button key={s} onClick={() => setInput(s)} className="px-3 py-1.5 rounded-lg text-xs text-violet-600 bg-violet-50 border border-violet-100 hover:bg-violet-100 transition-colors font-medium">
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Спроси что угодно..."
            className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-300 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100 transition-all"
          />
          <button onClick={handleSend} className="p-2.5 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20">
            <Icon name="Send" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function CreateProjectModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState<Status>("idea");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white border border-gray-100 rounded-2xl p-7 w-full max-w-md shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-gray-900 text-lg">Новый проект</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors">
            <Icon name="X" size={16} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-2 block">Название</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Мой крутой проект" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100 transition-all" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-2 block">Описание</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="О чём этот проект?" rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100 transition-all resize-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-3 block">Статус</label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(STATUS_CONFIG) as Status[]).map((s) => {
                const c = STATUS_CONFIG[s];
                return (
                  <button key={s} onClick={() => setStatus(s)} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${status === s ? `${c.bg} ${c.color}` : "border-gray-100 text-gray-400 hover:border-gray-200"}`}>
                    <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-7">
          <button onClick={onClose} className="flex-1 py-3.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">Отмена</button>
          <button onClick={onClose} className="flex-1 btn-primary relative py-3.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-violet-500/20">
            <span className="relative z-10">Создать проект</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ onBack }: DashboardProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const [showAi, setShowAi] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((p) => {
    const q = search.toLowerCase();
    if (activeSection === "active") return (p.status === "progress" || p.status === "idea") && (!q || p.name.toLowerCase().includes(q));
    if (activeSection === "completed") return p.status === "released" && (!q || p.name.toLowerCase().includes(q));
    if (activeSection === "archive") return p.status === "archived" && (!q || p.name.toLowerCase().includes(q));
    if (q) return p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    return true;
  });

  const sectionLabel: Record<string, string> = {
    overview: "Обзор", projects: "Все проекты", active: "Активные", completed: "Завершённые",
    archive: "Архив", activity: "Активность", teams: "Команды", ai: "AI-помощник",
    profile: "Профиль", settings: "Настройки",
  };

  return (
    <div className="flex h-screen bg-[#fafbfe] text-gray-900 overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-60 flex-shrink-0 flex flex-col border-r border-gray-100 bg-white">
        <div className="p-5 border-b border-gray-100">
          <button onClick={onBack} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20 flex-shrink-0">
              <span className="text-white font-black text-sm">P</span>
            </div>
            <span className="font-black text-sm text-gray-900">Projectory</span>
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto scrollbar-thin">
          {SIDEBAR_ITEMS.map((item) => (
            <button key={item.section} onClick={() => { setActiveSection(item.section); setSelectedProject(null); if (item.section === "ai") setShowAi(true); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                activeSection === item.section ? "bg-violet-50 text-violet-700 font-medium" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }`}>
              <Icon name={item.icon} size={16} fallback="Circle" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100 space-y-0.5">
          {[
            { icon: "User", label: "Профиль", section: "profile" },
            { icon: "Settings", label: "Настройки", section: "settings" },
          ].map((item) => (
            <button key={item.section} onClick={() => { setActiveSection(item.section); setSelectedProject(null); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all">
              <Icon name={item.icon} size={16} fallback="Circle" />
              {item.label}
            </button>
          ))}
          <div className="flex items-center gap-3 px-3 py-3 mt-2 rounded-xl bg-gray-50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-lg shadow-violet-500/20">А</div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-700 truncate">Алексей К.</p>
              <p className="text-xs text-gray-400 truncate">Pro план</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${showAi ? "mr-80" : ""}`}>
        <header className="h-16 flex items-center justify-between px-7 border-b border-gray-100 bg-white flex-shrink-0">
          <h1 className="text-sm font-semibold text-gray-900">{sectionLabel[activeSection]}</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск проектов..."
                className="bg-gray-50 border border-gray-100 rounded-xl pl-9 pr-4 py-2.5 text-xs text-gray-700 placeholder-gray-300 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100 w-56 transition-all" />
            </div>
            <button onClick={() => setShowAi(!showAi)} className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all border ${showAi ? "bg-violet-50 text-violet-600 border-violet-200" : "text-gray-400 border-gray-100 hover:border-violet-200 hover:text-violet-500"}`}>
              <Icon name="Sparkles" size={14} /> AI
            </button>
            <button className="relative p-2.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all border border-gray-100">
              <Icon name="Bell" size={16} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-violet-500 border-2 border-white" />
            </button>
            <button onClick={() => setShowCreate(true)} className="btn-primary relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white shadow-lg shadow-violet-500/20">
              <Icon name="Plus" size={14} className="relative z-10" />
              <span className="relative z-10">Создать проект</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scrollbar-thin p-7">
          {selectedProject ? (
            <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
          ) : activeSection === "ai" ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-violet-500/20">
                  <Icon name="Sparkles" size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">AI-помощник</h3>
                <p className="text-gray-400 text-sm mb-6">Открой панель справа, чтобы сгенерировать roadmap, описание или задачи</p>
                <button onClick={() => setShowAi(true)} className="btn-primary relative px-6 py-3 rounded-xl text-sm font-medium text-white shadow-lg shadow-violet-500/20">
                  <span className="relative z-10">Открыть AI-помощник</span>
                </button>
              </div>
            </div>
          ) : activeSection === "teams" ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/20">
                  <Icon name="Users" size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Команды</h3>
                <p className="text-gray-400 text-sm mb-6">Приглашай коллег и работайте над проектами вместе.</p>
                <button className="btn-primary relative px-6 py-3 rounded-xl text-sm font-medium text-white shadow-lg shadow-violet-500/20">
                  <span className="relative z-10">Пригласить участников</span>
                </button>
              </div>
            </div>
          ) : activeSection === "activity" ? (
            <div className="space-y-6">
              <ContributionGraph />
              <div className="card-elevated p-6">
                <h3 className="font-semibold text-gray-900 text-sm mb-5">Последние действия</h3>
                <div className="space-y-3">
                  {ACTIVITY.map((a) => {
                    const cfg2 = ACTIVITY_ICON[a.type];
                    return (
                      <div key={a.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className={`w-9 h-9 rounded-xl ${cfg2.bg} ${cfg2.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon name={cfg2.icon} size={15} fallback="Circle" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700">{a.text}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{a.project} · {a.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <>
              {(activeSection === "overview" || activeSection === "projects") && (
                <>
                  <div className="grid grid-cols-4 gap-4 mb-8">
                    {[
                      { label: "Всего проектов", val: "6", icon: "FolderOpen", color: "text-violet-600", bg: "bg-violet-50", trend: "+2" },
                      { label: "В работе", val: "2", icon: "Zap", color: "text-blue-600", bg: "bg-blue-50", trend: "+1" },
                      { label: "Завершено", val: "2", icon: "CheckCircle", color: "text-emerald-600", bg: "bg-emerald-50", trend: "+1" },
                      { label: "Всего коммитов", val: "646", icon: "GitCommit", color: "text-orange-600", bg: "bg-orange-50", trend: "+47" },
                    ].map((s) => (
                      <div key={s.label} className="card-elevated p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-gray-400 font-medium">{s.label}</span>
                          <div className={`w-8 h-8 rounded-lg ${s.bg} ${s.color} flex items-center justify-center`}>
                            <Icon name={s.icon} size={14} fallback="Circle" />
                          </div>
                        </div>
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-black text-gray-900">{s.val}</span>
                          <span className="text-xs text-emerald-500 mb-0.5 font-medium">{s.trend} за месяц</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {activeSection === "overview" && <ContributionGraph />}
                  <div className="mt-6" />
                </>
              )}

              {filteredProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                    <Icon name="Search" size={24} className="text-gray-200" />
                  </div>
                  <h3 className="font-semibold text-gray-400 mb-2">Проекты не найдены</h3>
                  <p className="text-sm text-gray-300">Попробуй другой запрос или создай новый проект</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredProjects.map((p) => (
                    <ProjectCard key={p.id} project={p} onSelect={setSelectedProject} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {showAi && <AiPanel onClose={() => setShowAi(false)} />}
      {showCreate && <CreateProjectModal onClose={() => setShowCreate(false)} />}
    </div>
  );
}
