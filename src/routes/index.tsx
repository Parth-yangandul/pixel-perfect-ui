import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Screen1 from "@/components/gap-trade/Screen1";
import Screen2 from "@/components/gap-trade/Screen2";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [page, setPage] = useState<1 | 2>(1);

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#111827]" style={{ fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' }}>
      <div className="mx-auto max-w-[960px] px-8 py-10">
        {/* Header */}
        <header className="flex items-center justify-between pb-3 border-b border-[#e5e7eb]">
          <span className="text-[13px] text-[#6b7280]">
            Gap-Up Rules-Based Trading System — UI Mockups
          </span>
          <span className="text-[13px] text-[#6b7280]">Draft — May 22, 2026</span>
        </header>

        {/* Title */}
        <div className="mt-6 mb-6">
          <h1 className="text-[28px] font-bold text-[#1d4a8c]">
            {page === 1
              ? "Screen 1 — Trade Entry Interface"
              : "Screen 2 — Market Breadth Gate (refined)"}
          </h1>
          <p className="text-[14px] text-[#4b5563] mt-1">
            {page === 1
              ? "UI wireframe — gap-up rules-based trading system"
              : "UI wireframe — NASI + BPNYA configuration and live verdict"}
          </p>
        </div>

        {page === 1 ? <Screen1 /> : <Screen2 />}

        {/* Pagination */}
        <footer className="mt-10 pt-4 border-t border-[#e5e7eb] flex items-center justify-between">
          <button
            type="button"
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="text-[13px] font-semibold text-[#1d4a8c] disabled:text-[#9ca3af]"
          >
            ← Page 1
          </button>
          <span className="text-[13px] text-[#6b7280]">Page {page}</span>
          <button
            type="button"
            onClick={() => setPage(2)}
            disabled={page === 2}
            className="text-[13px] font-semibold text-[#1d4a8c] disabled:text-[#9ca3af]"
          >
            Page 2 →
          </button>
        </footer>
      </div>
    </div>
  );
}
