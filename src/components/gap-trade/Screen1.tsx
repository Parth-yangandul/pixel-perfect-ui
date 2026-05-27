import { useForm, useWatch } from "react-hook-form";
import { useState } from "react";

type Screen1Values = {
  nasi: string;
  bpnya: string;
  tickerSymbol: string;
  eventType: string;
  priorClose: string;
  preMarketPrice: string;
  positionSize: string;
  accountRiskLimit: string;
  fiveMinBarOpen: string;
  fiveMinBarLow: string;
};

const eventTypes = [
  "Earnings beat",
  "Guidance raise",
  "Analyst upgrade",
  "M&A / buyout",
  "FDA / regulatory",
  "Product launch",
  "Sector momentum",
];

const stopTabs = ["Day 1", "Day 2+", "Week 2+"] as const;

export default function Screen1() {
  const { register, control } = useForm<Screen1Values>({
    defaultValues: {
      nasi: "",
      bpnya: "",
      tickerSymbol: "",
      eventType: "",
      priorClose: "",
      preMarketPrice: "",
      positionSize: "100",
      accountRiskLimit: "500",
      fiveMinBarOpen: "",
      fiveMinBarLow: "",
    },
  });
  const [activeTab, setActiveTab] = useState<(typeof stopTabs)[number]>("Day 1");

  const values = useWatch({ control });
  const gap =
    values.priorClose && values.preMarketPrice
      ? (
          ((parseFloat(values.preMarketPrice) - parseFloat(values.priorClose)) /
            parseFloat(values.priorClose)) *
          100
        ).toFixed(2) + "%"
      : "Auto";
  const entryTrigger = values.fiveMinBarOpen ? `$${values.fiveMinBarOpen}` : "—";
  const initialStop = values.fiveMinBarLow ? `$${values.fiveMinBarLow}` : "—";
  const riskPerShare =
    values.fiveMinBarOpen && values.fiveMinBarLow
      ? `$${(parseFloat(values.fiveMinBarOpen) - parseFloat(values.fiveMinBarLow)).toFixed(2)}`
      : "—";

  const inputCls =
    "w-full h-10 px-3 rounded border border-[#d1d5db] bg-white text-[14px] text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#1d4a8c]";
  const labelCls = "block text-[12px] text-[#4b5563] mb-1.5";

  return (
    <div className="space-y-6">
      {/* Market breadth gate */}
      <section className="rounded-lg border border-[#e5e7eb] bg-white p-6">
        <h2 className="text-[16px] font-bold text-[#111827] mb-5">
          Market breadth gate
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "nasi", label: "NASI (Nasdaq A/D strength)", placeholder: "e.g. 42.5" },
            { name: "bpnya", label: "BPNYA (NYSE bullish %)", placeholder: "e.g. 58.2" },
          ].map((f) => (
            <div key={f.name} className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-4">
              <div className="text-[13px] font-semibold text-[#374151] mb-2">
                {f.label}
              </div>
              <div className="w-10 h-[2px] bg-[#111827] mb-3" />
              <span className="inline-block text-[12px] text-[#6b7280] bg-[#e5e7eb] rounded-full px-3 py-1 mb-3">
                Not entered
              </span>
              <input
                {...register(f.name as keyof Screen1Values)}
                id={f.name}
                name={f.name}
                placeholder={f.placeholder}
                className={inputCls}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 rounded-md bg-[#f3f4f6] px-4 py-2">
          <span className="text-[13px] text-[#4b5563]">Gate status</span>
          <span className="text-[13px] font-semibold text-[#374151] bg-[#e5e7eb] rounded px-3 py-1">
            Awaiting breadth data
          </span>
        </div>
        <div className="mt-3 border-l-4 border-[#1d4a8c] bg-[#f3f4f6] px-4 py-2">
          <p className="text-[13px] italic text-[#4b5563]">
            Enter both values from Stockcharts after end of prior day. Both must be
            bullish to proceed.
          </p>
        </div>
      </section>

      {/* Trade entry */}
      <section className="rounded-lg border border-[#e5e7eb] bg-white p-6">
        <h2 className="text-[16px] font-bold text-[#111827] mb-5">
          Trade entry — gap-up event
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="tickerSymbol" className={labelCls}>Ticker symbol</label>
            <input
              {...register("tickerSymbol")}
              id="tickerSymbol"
              name="tickerSymbol"
              placeholder="e.g. NVDA"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="eventType" className={labelCls}>Event type</label>
            <select
              {...register("eventType")}
              id="eventType"
              name="eventType"
              className={inputCls + " appearance-none bg-white"}
            >
              <option value="">Select catalyst...</option>
              {eventTypes.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="priorClose" className={labelCls}>Prior close ($)</label>
            <input {...register("priorClose")} id="priorClose" name="priorClose" className={inputCls} />
          </div>
          <div>
            <label htmlFor="preMarketPrice" className={labelCls}>Pre-market price ($)</label>
            <input {...register("preMarketPrice")} id="preMarketPrice" name="preMarketPrice" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Gap %</label>
            <div className={inputCls + " flex items-center text-[#6b7280]"}>{gap}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="positionSize" className={labelCls}>Position size (shares)</label>
            <input {...register("positionSize")} id="positionSize" name="positionSize" className={inputCls} />
          </div>
          <div>
            <label htmlFor="accountRiskLimit" className={labelCls}>Account risk limit ($)</label>
            <input {...register("accountRiskLimit")} id="accountRiskLimit" name="accountRiskLimit" className={inputCls} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="fiveMinBarOpen" className={labelCls}>
              5-min bar open ($) [set at 9:35 AM]
            </label>
            <input {...register("fiveMinBarOpen")} id="fiveMinBarOpen" name="fiveMinBarOpen" className={inputCls} />
          </div>
          <div>
            <label htmlFor="fiveMinBarLow" className={labelCls}>
              5-min bar low ($) → initial stop
            </label>
            <input {...register("fiveMinBarLow")} id="fiveMinBarLow" name="fiveMinBarLow" className={inputCls} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Entry trigger", value: entryTrigger },
            { label: "Initial stop", value: initialStop },
            { label: "Risk per share", value: riskPerShare },
          ].map((c) => (
            <div key={c.label} className="rounded-md bg-[#f3f4f6] px-4 py-3 text-center">
              <div className="text-[12px] text-[#6b7280] mb-1">{c.label}</div>
              <div className="text-[15px] font-semibold text-[#dc2626]">{c.value}</div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="w-full h-12 rounded-md bg-[#111827] text-white text-[14px] font-semibold hover:bg-black"
        >
          Submit trade for rules validation
        </button>
      </section>

      {/* Stop-loss progression rules */}
      <section className="rounded-lg border border-[#e5e7eb] bg-white p-6">
        <h2 className="text-[16px] font-bold text-[#111827] mb-4">
          Stop-loss progression rules
        </h2>
        <div className="flex gap-2 mb-5">
          {stopTabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTab(t)}
              className={
                "px-4 py-1.5 rounded-full text-[13px] font-semibold border transition-colors " +
                (activeTab === t
                  ? "bg-[#dbeafe] border-[#bfdbfe] text-[#1d4a8c]"
                  : "bg-white border-[#e5e7eb] text-[#6b7280]")
              }
            >
              {t}
            </button>
          ))}
        </div>

        <ul className="space-y-4">
          {[
            {
              title: "Initial — low of first 5-min bar",
              body: "Entry executes at 9:35 AM. Low of the 9:30–9:35 bar set as stop-loss immediately.",
            },
            {
              title: "End of Day 1 — low of the day",
              body: "If price closes above low-of-day, stop migrates to session low. Trade carries overnight.",
            },
            {
              title: "Day 2 through end of week — rolling low",
              body: "Each session: if close > low-of-day, update stop. Stop only moves up, never down.",
            },
            {
              title: "Week 2+ — low of prior week or entry",
              body: "Stop = higher of prior week's low or original entry price. Updated each week-end.",
            },
          ].map((r) => (
            <li key={r.title} className="flex gap-3">
              <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-[#1d4a8c] shrink-0" />
              <div>
                <div className="text-[14px] font-bold text-[#111827]">{r.title}</div>
                <div className="text-[13px] text-[#4b5563]">{r.body}</div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 border-l-4 border-[#1d4a8c] bg-[#f3f4f6] px-4 py-2">
          <p className="text-[13px] italic text-[#4b5563]">
            Stop only ratchets upward. A triggered stop exits the position at next
            open (or intraday if breached intraday)
          </p>
        </div>
      </section>
    </div>
  );
}
