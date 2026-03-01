import { useState } from "react";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

export default function Index() {
  const [view, setView] = useState<"landing" | "dashboard">("landing");

  if (view === "dashboard") {
    return <Dashboard onBack={() => setView("landing")} />;
  }

  return <Landing onEnterDashboard={() => setView("dashboard")} />;
}
