import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

interface DashboardProps {
  onBack: () => void;
}

type Status = "idea" | "progress" | "released" | "archived";
type ViewMode = "grid" | "kanban";

interface Project {
  id: string;
  name: string;
  desc: string;
  status: Status;
  tech: string[];
  progress: number;
  updated: string;
  color: string;
}

interface Task {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  project: string;
}

type KanbanColumn = "todo" | "inprogress" | "review" | "done";

interface KanbanData {
  todo: Task[];
  inprogress: Task[];
  review: Task[];
  done: Task[];
}

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; dot: string }> = {
  idea: { label: "Идея", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", dot: "bg-amber-400" },
  progress: { label: "В работе", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", dot: "bg-blue-400" },
  released: { label: "Выпущен", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20", dot: "bg-green-400" },
  archived: { label: "Архив", color: "text-white/30", bg: "bg-white/5 border-white/10", dot: "bg-white/30" },
};

const PRIORITY_CONFIG = {
  high: { label: "Высокий", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  medium: { label: "Средний", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  low: { label: "Низкий", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
};

const KANBAN_COLS: { id: KanbanColumn; label: string; color: string }[] = [
  { id: "todo", label: "К выполнению", color: "text-white/50" },
  { id: "inprogress", label: "В работе", color: "text-blue-400" },
  { id: "review", label: "Ревью", color: "text-purple-400" },
  { id: "done", label: "Готово", color: "text-green-400" },
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Projectory",
    desc: "Платформа управления проектами для разработчиков и солопренеров из СНГ",
    status: "progress",
    tech: ["React", "TypeScript", "Python"],
    progress: 65,
    updated: "2 часа назад",
    color: "from-purple-600 to-blue-600",
  },
  {
    id: "2",
    name: "DevPulse",
    desc: "Дашборд для мониторинга GitHub-активности команды в реальном времени",
    status: "idea",
    tech: ["Next.js", "GraphQL"],
    progress: 15,
    updated: "вчера",
    color: "from-cyan-600 to-teal-600",
  },
  {
    id: "3",
    name: "ShipFast CLI",
    desc: "CLI-инструмент для быстрого деплоя фулстек-приложений",
    status: "released",
    tech: ["Go", "Docker"],
    progress: 100,
    updated: "3 дня назад",
    color: "from-green-600 to-emerald-600",
  },
  {
    id: "4",
    name: "CodeReview AI",
    desc: "ИИ-агент для автоматического ревью кода и генерации PR-описаний",
    status: "progress",
    tech: ["Python", "OpenAI", "FastAPI"],
    progress: 42,
    updated: "5 дней назад",
    color: "from-orange-600 to-red-600",
  },
  {
    id: "5",
    name: "StandUp Bot",
    desc: "Telegram-бот для ежедневных стендапов в распределённых командах",
    status: "released",
    tech: ["Python", "Telegram API"],
    progress: 100,
    updated: "1 неделю назад",
    color: "from-pink-600 to-rose-600",
  },
  {
    id: "6",
    name: "Moneta",
    desc: "Личный финансовый трекер с аналитикой и бюджетами",
    status: "archived",
    tech: ["Vue", "Supabase"],
    progress: 30,
    updated: "2 месяца назад",
    color: "from-slate-600 to-gray-600",
  },
];

const INITIAL_KANBAN: KanbanData = {
  todo: [
    { id: "t1", title: "Спроектировать систему уведомлений", priority: "high", project: "Projectory" },
    { id: "t2", title: "Добавить OAuth через GitHub", priority: "medium", project: "Projectory" },
    { id: "t3", title: "Написать документацию API", priority: "low", project: "ShipFast CLI" },
    { id: "t4", title: "Настроить CI/CD pipeline", priority: "medium", project: "DevPulse" },
  ],
  inprogress: [
    { id: "t5", title: "Разработать Kanban-компонент", priority: "high", project: "Projectory" },
    { id: "t6", title: "Интегрировать AI для генерации задач", priority: "high", project: "CodeReview AI" },
    { id: "t7", title: "Оптимизировать SQL-запросы", priority: "medium", project: "Projectory" },
  ],
  review: [
    { id: "t8", title: "Публичные страницы проектов", priority: "high", project: "Projectory" },
    { id: "t9", title: "Анализ конкурентов", priority: "low", project: "DevPulse" },
  ],
  done: [
    { id: "t10", title: "Hero-блок лендинга", priority: "high", project: "Projectory" },
    { id: "t11", title: "Базовая аутентификация", priority: "high", project: "Projectory" },
    { id: "t12", title: "Деплой на production", priority: "medium", project: "ShipFast CLI" },
  ],
};

const SIDEBAR_ITEMS = [
  { icon: "LayoutDashboard", label: "Обзор", section: "overview" },
  { icon: "FolderOpen", label: "Все проекты", section: "projects" },
  { icon: "Zap", label: "Активные", section: "active" },
  { icon: "CheckCircle", label: "Завершённые", section: "completed" },
  { icon: "Archive", label: "Архив", section: "archive" },
  { icon: "Kanban", label: "Канбан", section: "kanban" },
  { icon: "Users", label: "Команды", section: "teams" },
  { icon: "Sparkles", label: "AI-помощник", section: "ai" },
];

const BOTTOM_ITEMS = [
  { icon: "User", label: "Профиль", section: "profile" },
  { icon: "Settings", label: "Настройки", section: "settings" },
];

function TechBadge({ tech }: { tech: string }) {
  return (
    <span className="px-2 py-0.5 rounded text-xs font-mono bg-white/5 text-white/50 border border-white/8">
      {tech}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const cfg = STATUS_CONFIG[project.status];
  return (
    <div className="glass-card rounded-2xl p-5 group flex flex-col gap-4 cursor-pointer">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.color} flex-shrink-0`} />
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${cfg.bg} ${cfg.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
      </div>

      <div>
        <h3 className="font-semibold text-white text-sm mb-1.5 group-hover:text-purple-300 transition-colors">
          {project.name}
        </h3>
        <p className="text-xs text-white/40 leading-relaxed line-clamp-2">{project.desc}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => <TechBadge key={t} tech={t} />)}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-white/30">
          <span>Прогресс</span>
          <span>{project.progress}%</span>
        </div>
        <div className="h-1 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-700"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-white/25">{project.updated}</span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors">
            <Icon name="Edit" size={12} />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors">
            <Icon name="ExternalLink" size={12} />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors">
            <Icon name="Archive" size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

function KanbanBoard() {
  const [columns, setColumns] = useState<KanbanData>(INITIAL_KANBAN);
  const [dragging, setDragging] = useState<{ taskId: string; fromCol: KanbanColumn } | null>(null);
  const [dragOver, setDragOver] = useState<KanbanColumn | null>(null);

  const handleDragStart = (taskId: string, fromCol: KanbanColumn) => {
    setDragging({ taskId, fromCol });
  };

  const handleDragOver = (e: React.DragEvent, col: KanbanColumn) => {
    e.preventDefault();
    setDragOver(col);
  };

  const handleDrop = (e: React.DragEvent, toCol: KanbanColumn) => {
    e.preventDefault();
    if (!dragging || dragging.fromCol === toCol) {
      setDragging(null);
      setDragOver(null);
      return;
    }

    setColumns((prev) => {
      const task = prev[dragging.fromCol].find((t) => t.id === dragging.taskId);
      if (!task) return prev;
      return {
        ...prev,
        [dragging.fromCol]: prev[dragging.fromCol].filter((t) => t.id !== dragging.taskId),
        [toCol]: [...prev[toCol], task],
      };
    });

    setDragging(null);
    setDragOver(null);
  };

  const handleDragEnd = () => {
    setDragging(null);
    setDragOver(null);
  };

  return (
    <div className="grid grid-cols-4 gap-4 h-full min-h-[500px]">
      {KANBAN_COLS.map((col) => (
        <div
          key={col.id}
          className={`kanban-col p-3 flex flex-col gap-3 transition-all duration-200 ${
            dragOver === col.id ? "drag-over" : ""
          }`}
          onDragOver={(e) => handleDragOver(e, col.id)}
          onDrop={(e) => handleDrop(e, col.id)}
        >
          <div className="flex items-center justify-between px-1 py-1">
            <span className={`text-xs font-semibold uppercase tracking-wider ${col.color}`}>
              {col.label}
            </span>
            <span className="text-xs text-white/20 font-mono">{columns[col.id].length}</span>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            {columns[col.id].map((task) => {
              const pCfg = PRIORITY_CONFIG[task.priority];
              return (
                <div
                  key={task.id}
                  className={`kanban-item p-3 ${dragging?.taskId === task.id ? "dragging" : ""}`}
                  draggable
                  onDragStart={() => handleDragStart(task.id, col.id)}
                  onDragEnd={handleDragEnd}
                >
                  <p className="text-xs text-white/80 leading-snug mb-3">{task.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/25 font-mono">{task.project}</span>
                    <span className={`px-1.5 py-0.5 rounded text-xs border ${pCfg.bg} ${pCfg.color}`}>
                      {pCfg.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="flex items-center gap-2 px-2 py-2 rounded-lg text-white/25 hover:text-white/50 hover:bg-white/3 transition-colors text-xs w-full">
            <Icon name="Plus" size={12} />
            Добавить задачу
          </button>
        </div>
      ))}
    </div>
  );
}

function AiPanel({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Привет! Я AI-помощник Projectory. Могу помочь сгенерировать roadmap, описание проекта или список задач. Что сделаем?",
    },
  ]);

  const suggestions = [
    "Сгенерировать roadmap для проекта",
    "Написать описание проекта",
    "Создать список задач",
    "Предложить технологический стек",
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
      {
        role: "ai",
        text: "Отличная идея! Генерирую варианты для тебя... (AI-интеграция в разработке 🚀)",
      },
    ]);
    setInput("");
  };

  return (
    <div className="fixed inset-y-0 right-0 w-80 glass border-l border-white/8 flex flex-col z-40 animate-slide-in-right">
      <div className="flex items-center justify-between p-5 border-b border-white/8">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <Icon name="Sparkles" size={14} className="text-white" />
          </div>
          <span className="font-semibold text-white text-sm">AI-помощник</span>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors">
          <Icon name="X" size={16} />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2.5 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-purple-600 to-blue-600 text-white"
                  : "bg-white/5 border border-white/8 text-white/70"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/8 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setInput(s)}
              className="px-2.5 py-1 rounded-full text-xs text-purple-300 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
            >
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
            className="flex-1 bg-white/5 border border-white/8 rounded-lg px-3 py-2 text-xs text-white placeholder-white/25 outline-none focus:border-purple-500/40"
          />
          <button
            onClick={handleSend}
            className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white hover:opacity-90 transition-opacity"
          >
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass border border-white/10 rounded-2xl p-6 w-full max-w-md animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-white">Новый проект</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors">
            <Icon name="X" size={16} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">Название</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Мой крутой проект"
              className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-white/40 mb-1.5 block">Описание</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="О чём этот проект?"
              rows={3}
              className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-purple-500/50 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="text-xs text-white/40 mb-2 block">Статус</label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(STATUS_CONFIG) as Status[]).map((s) => {
                const cfg = STATUS_CONFIG[s];
                return (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs transition-all ${
                      status === s
                        ? `${cfg.bg} ${cfg.color} border-current`
                        : "border-white/8 text-white/40 hover:border-white/15"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 btn-outline py-3 rounded-xl text-sm font-medium"
          >
            Отмена
          </button>
          <button
            onClick={onClose}
            className="flex-1 btn-primary relative py-3 rounded-xl text-sm font-medium text-white"
          >
            <span className="relative z-10">Создать проект</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ onBack }: DashboardProps) {
  const [activeSection, setActiveSection] = useState("projects");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showAi, setShowAi] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState("");

  const filteredProjects = INITIAL_PROJECTS.filter((p) => {
    const q = search.toLowerCase();
    if (!q) {
      if (activeSection === "active") return p.status === "progress" || p.status === "idea";
      if (activeSection === "completed") return p.status === "released";
      if (activeSection === "archive") return p.status === "archived";
    }
    return p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
  });

  const sectionLabel: Record<string, string> = {
    overview: "Обзор",
    projects: "Все проекты",
    active: "Активные",
    completed: "Завершённые",
    archive: "Архив",
    kanban: "Канбан-доска",
    teams: "Команды",
    ai: "AI-помощник",
    profile: "Профиль",
    settings: "Настройки",
  };

  return (
    <div className="flex h-screen bg-[#080c1a] text-white overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-56 flex-shrink-0 flex flex-col border-r border-white/5 bg-[#080c1a]">
        {/* Logo */}
        <div className="p-5 border-b border-white/5">
          <button onClick={onBack} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-sm text-white">Projectory</span>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto scrollbar-thin">
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.section}
              onClick={() => {
                setActiveSection(item.section);
                if (item.section === "ai") setShowAi(true);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                activeSection === item.section
                  ? "bg-purple-500/15 text-purple-300 border border-purple-500/20"
                  : "text-white/40 hover:text-white/70 hover:bg-white/4"
              }`}
            >
              <Icon name={item.icon} size={15} fallback="Circle" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/5 space-y-0.5">
          {BOTTOM_ITEMS.map((item) => (
            <button
              key={item.section}
              onClick={() => setActiveSection(item.section)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white/70 hover:bg-white/4 transition-all"
            >
              <Icon name={item.icon} size={15} fallback="Circle" />
              {item.label}
            </button>
          ))}
          {/* Avatar */}
          <div className="flex items-center gap-3 px-3 py-2.5 mt-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
              А
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white/70 truncate">Алексей К.</p>
              <p className="text-xs text-white/25 truncate">Pro</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${showAi ? "mr-80" : ""}`}>
        {/* Topbar */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-semibold text-white/80">{sectionLabel[activeSection] || "Projectory"}</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск проектов..."
                className="bg-white/4 border border-white/8 rounded-xl pl-8 pr-4 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-purple-500/40 w-52 transition-all"
              />
            </div>

            {/* View toggle */}
            {(activeSection === "projects" || activeSection === "active" || activeSection === "completed" || activeSection === "archive" || activeSection === "overview") && (
              <div className="flex items-center bg-white/4 border border-white/8 rounded-xl p-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"}`}
                >
                  <Icon name="LayoutGrid" size={14} />
                </button>
                <button
                  onClick={() => setViewMode("kanban")}
                  className={`p-1.5 rounded-lg transition-all ${viewMode === "kanban" ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"}`}
                >
                  <Icon name="Columns" size={14} fallback="LayoutGrid" />
                </button>
              </div>
            )}

            {/* AI button */}
            <button
              onClick={() => setShowAi(!showAi)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all border ${
                showAi
                  ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                  : "text-white/50 border-white/8 hover:border-purple-500/20 hover:text-purple-300"
              }`}
            >
              <Icon name="Sparkles" size={14} />
              AI
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all border border-white/8">
              <Icon name="Bell" size={15} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-purple-500" />
            </button>

            {/* Create */}
            <button
              onClick={() => setShowCreate(true)}
              className="btn-primary relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white"
            >
              <Icon name="Plus" size={14} className="relative z-10" />
              <span className="relative z-10">Создать проект</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
          {/* KANBAN section */}
          {activeSection === "kanban" ? (
            <div className="h-full flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/40">Перетаскивай задачи между колонками</p>
                <button
                  onClick={() => setShowCreate(true)}
                  className="flex items-center gap-2 text-xs text-purple-300 hover:text-purple-200 transition-colors"
                >
                  <Icon name="Plus" size={12} />
                  Добавить задачу
                </button>
              </div>
              <KanbanBoard />
            </div>
          ) : activeSection === "ai" ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Sparkles" size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">AI-помощник</h3>
                <p className="text-white/40 text-sm mb-6">Открой панель AI-помощника справа, чтобы сгенерировать roadmap, описание или задачи</p>
                <button
                  onClick={() => setShowAi(true)}
                  className="btn-primary relative px-6 py-3 rounded-xl text-sm font-medium text-white"
                >
                  <span className="relative z-10">Открыть AI-помощник</span>
                </button>
              </div>
            </div>
          ) : activeSection === "teams" ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">Команды</h3>
                <p className="text-white/40 text-sm mb-6">Пригласи коллег и работайте над проектами вместе. Доступно в тарифе Pro.</p>
                <button className="btn-primary relative px-6 py-3 rounded-xl text-sm font-medium text-white">
                  <span className="relative z-10">Пригласить участников</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Всего проектов", val: "6", icon: "FolderOpen", trend: "+2", color: "text-purple-400" },
                  { label: "В работе", val: "2", icon: "Zap", trend: "+1", color: "text-blue-400" },
                  { label: "Завершено", val: "2", icon: "CheckCircle", trend: "+1", color: "text-green-400" },
                  { label: "Задач в очереди", val: "7", icon: "ListTodo", trend: "+3", color: "text-amber-400" },
                ].map((s) => (
                  <div key={s.label} className="glass-card rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-white/40">{s.label}</span>
                      <Icon name={s.icon} size={14} className={s.color} fallback="Circle" />
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-black text-white">{s.val}</span>
                      <span className="text-xs text-green-400 mb-0.5">{s.trend} за месяц</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty state */}
              {filteredProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center mb-4">
                    <Icon name="SearchX" size={24} className="text-white/20" fallback="Search" />
                  </div>
                  <h3 className="font-semibold text-white/60 mb-2">Проекты не найдены</h3>
                  <p className="text-sm text-white/30">Попробуй другой запрос или создай новый проект</p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProjects.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                  ))}
                </div>
              ) : (
                <KanbanBoard />
              )}
            </>
          )}
        </div>
      </main>

      {/* AI Panel */}
      {showAi && <AiPanel onClose={() => setShowAi(false)} />}

      {/* Create Modal */}
      {showCreate && <CreateProjectModal onClose={() => setShowCreate(false)} />}
    </div>
  );
}
