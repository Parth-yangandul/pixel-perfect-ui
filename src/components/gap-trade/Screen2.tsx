import { useForm, Controller } from "react-hook-form";

type Screen2Values = {
  nasiToday: string;
  nasiPrior: string;
  direction: "Rising" | "Flat" | "Falling";
  currentSignal: "Green" | "Red";
  bpnyaCurrent: string;
  bpnyaPrior: string;
  thrust: "Weak" | "Moderate" | "Powerful";
};

const inputCls =
  "w-full h-10 px-3 rounded border border-[#d1d5db] bg-white text-[14px] text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#1d4a8c]";

function Segmented<T extends string>({
  options,
  value,
  onChange,
  activeStyle,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  activeStyle: "green" | "blue";
}) {
  const active =
    activeStyle === "green"
      ? "bg-[#e0f0f8] border-[#bfdbfe] text-[#1d4a8c]"
      : "bg-[#e0f0f8] border-[#bfdbfe] text-[#1d4a8c]";
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0,1fr))` }}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={
            "h-11 rounded-md border text-[14px] font-semibold transition-colors " +
            (value === o ? active : "bg-white border-[#e5e7eb] text-[#4b5563]")
          }
        >
          {o === "Green" ? "Green (rising)" : o === "Red" ? "Red (falling)" : o}
        </button>
      ))}
    </div>
  );
}

export default function Screen2() {
  const { register, control } = useForm<Screen2Values>({
    defaultValues: {
      nasiToday: "",
      nasiPrior: "",
      direction: "Rising",
      currentSignal: "Green",
      bpnyaCurrent: "",
      bpnyaPrior: "",
      thrust: "Powerful",
    },
  });

  const labelCls = "block text-[12px] text-[#4b5563] mb-1.5";
  const sectionLabel = "text-[11px] font-bold tracking-wider text-[#6b7280] uppercase mb-2";

  return (
    <div className="space-y-6">
      {/* NASI */}
      <section className="rounded-lg border border-[#e5e7eb] bg-white p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[16px] font-bold text-[#111827]">
            NASI — end-of-day breadth backdrop
          </h2>
          <span className="text-[12px] font-semibold text-[#4b5563] bg-[#f3f4f6] rounded-md px-3 py-1">
            Lagging · entered after close
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="nasiToday" className={labelCls}>Today's NASI value</label>
            <input {...register("nasiToday")} id="nasiToday" name="nasiToday" placeholder="e.g. 42.5" className={inputCls} />
          </div>
          <div>
            <label htmlFor="nasiPrior" className={labelCls}>Prior reading (yesterday)</label>
            <input {...register("nasiPrior")} id="nasiPrior" name="nasiPrior" placeholder="e.g. 28.0" className={inputCls} />
          </div>
        </div>
        <div className={sectionLabel}>Direction / Trend</div>
        <Controller
          control={control}
          name="direction"
          render={({ field }) => (
            <Segmented options={["Rising", "Flat", "Falling"] as const} value={field.value} onChange={field.onChange} activeStyle="green" />
          )}
        />
        <div className="mt-4 border-l-4 border-[#1d4a8c] bg-[#f3f4f6] px-4 py-2">
          <p className="text-[13px] italic text-[#4b5563]">
            NASI sets the macro backdrop. Positive and rising = full permissions.
            Negative + falling = no new longs unless
          </p>
        </div>
      </section>

      {/* BPNYA */}
      <section className="rounded-lg border border-[#e5e7eb] bg-white p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[16px] font-bold text-[#111827]">
            BPNYA — intraday market pulse
          </h2>
          <span className="text-[12px] font-semibold text-[#4b5563] bg-[#f3f4f6] rounded-md px-3 py-1">
            Can check at open or intraday
          </span>
        </div>

        <div className={sectionLabel}>Current signal</div>
        <Controller
          control={control}
          name="currentSignal"
          render={({ field }) => (
            <Segmented options={["Green", "Red"] as const} value={field.value} onChange={field.onChange} activeStyle="green" />
          )}
        />

        <div className="grid grid-cols-2 gap-4 mt-4 mb-5">
          <div>
            <label htmlFor="bpnyaCurrent" className={labelCls}>Current BPNYA reading (%)</label>
            <input {...register("bpnyaCurrent")} id="bpnyaCurrent" name="bpnyaCurrent" placeholder="e.g. 54.2" className={inputCls} />
          </div>
          <div>
            <label htmlFor="bpnyaPrior" className={labelCls}>Prior reading (%)</label>
            <input {...register("bpnyaPrior")} id="bpnyaPrior" name="bpnyaPrior" placeholder="e.g. 48.8" className={inputCls} />
          </div>
        </div>

        <div className="border-t border-[#e5e7eb] pt-4">
          <div className={sectionLabel}>Thrust classification — flip from red → green</div>
          <Controller
            control={control}
            name="thrust"
            render={({ field }) => (
              <Segmented options={["Weak", "Moderate", "Powerful"] as const} value={field.value} onChange={field.onChange} activeStyle="blue" />
            )}
          />
          <p className="mt-3 text-[13px] italic text-[#4b5563]">
            Powerful: sharp broad surge — large number of stocks flipping to buy signals quickly.
          </p>
        </div>
      </section>

      {/* Permission tiers */}
      <section className="rounded-lg border border-[#e5e7eb] bg-white p-6">
        <h2 className="text-[16px] font-bold text-[#111827] mb-4">Permission tiers</h2>
        <ul className="space-y-3">
          {[
            { color: "#1d4a8c", title: "Full size — NASI positive + rising, BPNYA green", body: "Strongest backdrop. Full intended position size permitted." },
            { color: "#1d4a8c", title: "Full size — NASI positive (any direction), BPNYA green", body: "Normal market conditions. Full position size allowed." },
            { color: "#6b7280", title: "Half size — NASI negative, BPNYA moderate thrust", body: "Reduced position to probe the move. No pyramiding until NASI confirms." },
            { color: "#6b7280", title: "Test size — NASI negative, BPNYA powerful thrust override", body: "Small test position only. Sized to risk very little. Same stop rules apply." },
            { color: "#111827", title: "No trade — NASI negative, BPNYA red or weak thrust", body: "Both unfavorable or flip unconvincing. System rejects the trade." },
          ].map((t) => (
            <li key={t.title} className="flex gap-3 items-start rounded-md border border-[#e5e7eb] px-4 py-3">
              <div className="mt-1.5 w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
              <div>
                <div className="text-[14px] font-bold text-[#111827]">{t.title}</div>
                <div className="text-[13px] text-[#4b5563]">{t.body}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Live breadth verdict */}
      <section className="rounded-lg border border-[#e5e7eb] bg-white p-6">
        <h2 className="text-[16px] font-bold text-[#111827] mb-3">Live breadth verdict</h2>
        <div className="rounded-md border border-[#fcd34d] bg-[#fef3c7] px-4 py-3">
          <div className="text-[14px] font-bold text-[#92400e] mb-1">
            Test position allowed — powerful BPNYA thrust overrides negative NASI
          </div>
          <p className="text-[13px] text-[#78350f]">
            NASI is negative (macro backdrop unfavorable) but BPNYA has surged powerfully
            from red to green. Small test position permitted. Do not add until NASI confirms.
          </p>
        </div>
      </section>
    </div>
  );
}
