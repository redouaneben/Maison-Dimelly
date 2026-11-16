import {
  findActiveSpecialPeriod,
  type SpecialPeriod,
} from "@/data/special-hours";

export type DaySlot = { start: number; end: number };

/**
 * Minutes depuis minuit, fuseau Europe/Paris.
 * Source unique : le texte affiché et le JSON-LD en sont déduits.
 */
export const WEEK_SLOTS: Record<number, DaySlot[]> = {
  0: [],
  1: [],
  2: [
    { start: 11 * 60, end: 13 * 60 },
    { start: 18 * 60, end: 21 * 60 },
  ],
  3: [
    { start: 11 * 60, end: 13 * 60 },
    { start: 18 * 60, end: 21 * 60 },
  ],
  4: [
    { start: 11 * 60, end: 13 * 60 },
    { start: 18 * 60, end: 21 * 60 },
  ],
  5: [
    { start: 11 * 60, end: 13 * 60 },
    { start: 18 * 60, end: 21 * 60 + 30 },
  ],
  6: [{ start: 18 * 60, end: 21 * 60 + 30 }],
};

export function getParisDate() {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" })
  );
}

function minutesFromMidnight(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

function formatMinutes(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h} h${m === 0 ? "" : ` ${m.toString().padStart(2, "0")}`}`;
}

export type OpenStatus = {
  isOpen: boolean;
  subline: string;
  headline?: string;
  banner?: string;
  source: "normal" | "special";
};

function getNormalOpenStatus(now: Date): Omit<OpenStatus, "source"> {
  const day = now.getDay();
  const nowMinutes = minutesFromMidnight(now);
  const slots = WEEK_SLOTS[day] ?? [];

  for (const slot of slots) {
    if (nowMinutes >= slot.start && nowMinutes < slot.end) {
      return {
        isOpen: true,
        subline: `Jusqu'à ${formatMinutes(slot.end)}`,
      };
    }
  }

  for (const slot of slots) {
    if (nowMinutes < slot.start) {
      return {
        isOpen: false,
        subline: `Ouvre à ${formatMinutes(slot.start)}`,
      };
    }
  }

  const next = findNextOpening(now);
  return {
    isOpen: false,
    subline: next ?? "Hors horaires d'ouverture",
  };
}

function statusFromSpecialClosed(special: SpecialPeriod): OpenStatus {
  return {
    isOpen: false,
    subline: special.badgeLine,
    headline: special.headline ?? "Congés",
    banner: special.banner,
    source: "special",
  };
}

function getOpenStatusWithOverrideSlots(
  now: Date,
  slots: DaySlot[],
  special: SpecialPeriod
): OpenStatus {
  const nowMinutes = minutesFromMidnight(now);

  for (const slot of slots) {
    if (nowMinutes >= slot.start && nowMinutes < slot.end) {
      return {
        isOpen: true,
        subline: special.badgeLine || `Jusqu'à ${formatMinutes(slot.end)}`,
        headline: special.headline,
        banner: special.banner,
        source: "special",
      };
    }
  }

  for (const slot of slots) {
    if (nowMinutes < slot.start) {
      return {
        isOpen: false,
        subline: special.badgeLine || `Ouvre à ${formatMinutes(slot.start)}`,
        headline: special.headline,
        banner: special.banner,
        source: "special",
      };
    }
  }

  return {
    isOpen: false,
    subline: special.badgeLine || "Hors horaires ce jour",
    headline: special.headline,
    banner: special.banner,
    source: "special",
  };
}

export function getOpenStatus(now: Date): OpenStatus {
  const special = findActiveSpecialPeriod(now);

  if (special) {
    if (special.kind === "closed" || special.forceClosed) {
      return statusFromSpecialClosed(special);
    }

    if (special.kind === "hours_override" && special.daySlots?.length) {
      return getOpenStatusWithOverrideSlots(now, special.daySlots, special);
    }

    if (special.kind === "info") {
      const normal = getNormalOpenStatus(now);
      return {
        ...normal,
        subline: special.badgeLine || normal.subline,
        headline: special.headline,
        banner: special.banner,
        source: "special",
      };
    }
  }

  return { ...getNormalOpenStatus(now), source: "normal" };
}

const DAY_LABELS = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
] as const;

const SCHEMA_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

function slotsSignature(slots: DaySlot[]) {
  return slots.map((slot) => `${slot.start}-${slot.end}`).join("|");
}

/** Jours consécutifs, avec fusion samedi → dimanche. */
function groupConsecutiveDays(days: number[]) {
  const sorted = [...days].sort((a, b) => a - b);
  const groups: number[][] = [];

  for (const day of sorted) {
    const prev = groups[groups.length - 1];
    if (prev && prev[prev.length - 1] === day - 1) prev.push(day);
    else groups.push([day]);
  }

  if (groups.length > 1) {
    const first = groups[0]!;
    const last = groups[groups.length - 1]!;
    if (first[0] === 0 && last[last.length - 1] === 6) {
      groups[0] = [...last, ...first];
      groups.pop();
    }
  }

  return groups;
}

function groupDaysBySchedule() {
  const groups: { days: number[]; slots: DaySlot[] }[] = [];

  for (let day = 0; day < 7; day++) {
    const slots = WEEK_SLOTS[day] ?? [];
    const prev = groups[groups.length - 1];
    if (prev && slotsSignature(prev.slots) === slotsSignature(slots)) {
      prev.days.push(day);
    } else {
      groups.push({
        days: [day],
        slots: slots.map((slot) => ({ start: slot.start, end: slot.end })),
      });
    }
  }

  if (groups.length > 1) {
    const first = groups[0]!;
    const last = groups[groups.length - 1]!;
    if (slotsSignature(first.slots) === slotsSignature(last.slots)) {
      first.days = [...last.days, ...first.days];
      groups.pop();
    }
  }

  return groups;
}

function mondayFirst(day: number) {
  return (day + 6) % 7;
}

function formatDayList(days: number[]) {
  const labels = days.map((day) => DAY_LABELS[day]!);
  if (labels.length === 1) {
    const label = labels[0]!;
    return label.charAt(0).toUpperCase() + label.slice(1);
  }
  if (labels.length === 2) {
    const first = labels[0]!;
    return `${first.charAt(0).toUpperCase()}${first.slice(1)} et ${labels[1]}`;
  }
  return `Du ${labels[0]} au ${labels[labels.length - 1]}`;
}

function formatSlotRange(slots: DaySlot[]) {
  return slots
    .map((slot) => `${formatMinutes(slot.start)} à ${formatMinutes(slot.end)}`)
    .join(" et ");
}

function schemaTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

export type OpeningHoursSpecification = {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
};

/** Schema.org, déduit de WEEK_SLOTS. */
export function buildOpeningHoursSpecification(): OpeningHoursSpecification[] {
  const bySlot = new Map<string, { start: number; end: number; days: number[] }>();

  for (let day = 0; day < 7; day++) {
    for (const slot of WEEK_SLOTS[day] ?? []) {
      const key = `${slot.start}-${slot.end}`;
      const entry = bySlot.get(key);
      if (entry) entry.days.push(day);
      else bySlot.set(key, { start: slot.start, end: slot.end, days: [day] });
    }
  }

  const specs: OpeningHoursSpecification[] = [];
  for (const entry of bySlot.values()) {
    for (const days of groupConsecutiveDays(entry.days)) {
      const names = days.map((day) => SCHEMA_DAYS[day]!);
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: names.length === 1 ? names[0]! : names,
        opens: schemaTime(entry.start),
        closes: schemaTime(entry.end),
      });
    }
  }
  return specs;
}

function findNextOpening(from: Date): string | null {
  const startDay = from.getDay();

  for (let offset = 1; offset <= 7; offset++) {
    const day = (startDay + offset) % 7;
    const slots = WEEK_SLOTS[day] ?? [];
    if (slots.length === 0) continue;
    const first = slots[0]!;
    const dayLabel =
      offset === 1 ? "demain" : `${DAY_LABELS[day]!.slice(0, 3)}.`;
    return `Ouvre ${dayLabel} à ${formatMinutes(first.start)}`;
  }
  return null;
}

/** Texte de la section « Adresse & horaires », déduit de WEEK_SLOTS. */
export const HOURS_DISPLAY: { text: string; muted?: boolean }[] = (() => {
  const groups = groupDaysBySchedule();
  const byWeek = (a: { days: number[] }, b: { days: number[] }) =>
    mondayFirst(a.days[0]!) - mondayFirst(b.days[0]!);
  const open = groups.filter((group) => group.slots.length > 0).sort(byWeek);
  const closed = groups.filter((group) => group.slots.length === 0).sort(byWeek);

  return [
    ...open.map((group) => ({
      text: `${formatDayList(group.days)} — ${formatSlotRange(group.slots)}`,
    })),
    ...closed.map((group) => ({
      text: `${formatDayList(group.days)} : fermé`,
      muted: true as const,
    })),
  ];
})();
