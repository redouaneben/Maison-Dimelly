"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Info, Phone } from "lucide-react";

import { MENU_SECTIONS, type MenuItem } from "@/data/menu";
import { siteConfig } from "@/config/site";
import { PAGE_SHELL } from "@/lib/page-shell";
import {
  menuToggleActive,
  menuToggleInactive,
  menuToggleInactiveHover,
  restoButtonBase,
  restoButtonClass,
} from "@/lib/resto-button";
import { cn } from "@/lib/utils";

function formatPrice(value: number) {
  return `${value.toFixed(2).replace(".", ",")}\u00A0€`;
}

const sectionTitleTypography =
  "text-center text-xl font-extrabold uppercase tracking-[0.12em] text-[var(--resto-brand)] sm:text-2xl lg:text-3xl xl:text-[2rem] xl:leading-tight";

function sectionFromHash() {
  const id = window.location.hash.replace("#", "");
  return MENU_SECTIONS.some((section) => section.id === id)
    ? id
    : MENU_SECTIONS[0].id;
}

function MenuPrice({ item }: { item: MenuItem }) {
  const label =
    item.priceLabel ?? (item.price === null ? "—" : formatPrice(item.price));
  const isNote = item.price === null || Boolean(item.priceLabel);

  return (
    <p
      className={cn(
        "shrink-0 text-right font-extrabold text-[var(--resto-ink)]",
        isNote
          ? "max-w-[7.5rem] text-sm uppercase leading-tight tracking-wide sm:text-base"
          : "tabular-nums text-lg sm:text-xl lg:text-2xl"
      )}
    >
      {label}
    </p>
  );
}

function MenuItemRow({
  item,
  onAllergenClick,
}: {
  item: MenuItem;
  onAllergenClick: (item: MenuItem) => void;
}) {
  return (
    <article className="border-b border-[var(--resto-brand-soft)]/25 py-5 last:border-b-0 sm:py-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 text-xl font-extrabold leading-snug text-[var(--resto-ink)] sm:text-2xl">
          {item.name}
          {item.spicy ? (
            <span className="ml-2 inline-flex align-middle text-base font-bold normal-case tracking-normal">
              <span aria-hidden>🌶️</span>
              <span className="sr-only"> piquant</span>
            </span>
          ) : null}
        </h3>
        <div className="flex shrink-0 items-start gap-1 sm:gap-2">
          <MenuPrice item={item} />
          <button
            type="button"
            onClick={() => onAllergenClick(item)}
            aria-label={`Allergènes — ${item.name}`}
            className="mt-0.5 rounded-full p-1.5 text-[var(--resto-brand)] transition hover:bg-[var(--resto-brand)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--resto-brand)]/45"
          >
            <Info
              className="h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]"
              strokeWidth={2.25}
            />
          </button>
        </div>
      </div>
      {item.ingredients ? (
        <p className="mt-2 text-lg font-medium leading-relaxed text-[var(--resto-ink)]/90 sm:text-xl">
          {item.ingredients}
        </p>
      ) : null}
    </article>
  );
}

function MenuColumns({
  items,
  onAllergenClick,
}: {
  items: MenuItem[];
  onAllergenClick: (item: MenuItem) => void;
}) {
  const split = items.length >= 8;
  const mid = Math.ceil(items.length / 2);
  const columns = split ? [items.slice(0, mid), items.slice(mid)] : [items];

  return (
    <div className={cn(split && "md:grid md:grid-cols-2 md:gap-x-12 lg:gap-x-16")}>
      {columns.map((column, index) => (
        <div key={index}>
          {column.map((item) => (
            <MenuItemRow
              key={item.name}
              item={item}
              onAllergenClick={onAllergenClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function MenuRubriqueLinks({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return MENU_SECTIONS.map((section) => {
    const active = activeId === section.id;
    return (
      <a
        key={section.id}
        href={`#${section.id}`}
        data-nav={section.id}
        aria-current={active ? "true" : undefined}
        onClick={(event) => {
          event.preventDefault();
          onSelect(section.id);
        }}
        className={cn(
          restoButtonBase,
          "shrink-0 px-4 py-2.5 text-center text-sm font-extrabold uppercase tracking-[0.08em] sm:px-5 sm:text-base",
          active
            ? menuToggleActive
            : cn(menuToggleInactive, menuToggleInactiveHover.forest)
        )}
      >
        {section.nav}
      </a>
    );
  });
}

export function MenuCarte({
  onAllergenClick,
}: {
  onAllergenClick: (item: MenuItem) => void;
}) {
  const [activeId, setActiveId] = useState(MENU_SECTIONS[0].id);
  const section =
    MENU_SECTIONS.find((item) => item.id === activeId) ?? MENU_SECTIONS[0];

  useEffect(() => {
    const id = sectionFromHash();
    setActiveId(id);
    if (!window.location.hash) return;
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }, 40);
    return () => window.clearTimeout(timer);
  }, []);

  function selectSection(id: string) {
    setActiveId(id);
    const next = `${window.location.pathname}${window.location.search}#${id}`;
    window.history.replaceState(null, "", next);
  }

  return (
    <section id="menu" className="relative py-16 sm:py-20 lg:py-24">
      <div className={PAGE_SHELL}>
        <div className="mb-8 text-center lg:mb-10">
          <div className="flex justify-center">
            <h2 className={sectionTitleTypography}>Carte complète</h2>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-relaxed text-[var(--resto-ink)]/90 sm:text-xl">
            Pizzas, panuzzo, grignotages, desserts et boissons. L&apos;icône{" "}
            <Info
              className="inline h-[1.1em] w-[1.1em] align-[-0.15em] text-[var(--resto-brand)]"
              strokeWidth={2.25}
              aria-hidden
            />{" "}
            ouvre les allergènes indicatifs de la ligne.
          </p>
        </div>

        <nav
          aria-label="Rubriques de la carte"
          className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:mb-10"
        >
          <MenuRubriqueLinks activeId={activeId} onSelect={selectSection} />
        </nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="scroll-mt-8 rounded-[2rem] border border-[var(--resto-brand-soft)]/30 bg-[var(--resto-surface)]/95 p-6 shadow-sm sm:p-10 lg:rounded-[2.5rem] lg:p-12"
          >
            <h3 className={sectionTitleTypography}>{section.title}</h3>
            {section.intro ? (
              <p className="mx-auto mt-4 max-w-2xl text-center text-lg font-medium text-[var(--resto-ink)]/80 sm:text-xl">
                {section.intro}
              </p>
            ) : null}
            <div className={section.intro ? "mt-6" : "mt-8"}>
              <MenuColumns
                items={section.items}
                onAllergenClick={onAllergenClick}
              />
            </div>
            {section.footnote ? (
              <p className="mt-6 text-sm leading-relaxed text-[var(--resto-ink)]/65 sm:text-base">
                {section.footnote}
              </p>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex flex-col items-center text-center lg:mt-16">
          <a
            href={siteConfig.phone.href}
            className={restoButtonClass("command", "md")}
          >
            <Phone className="h-5 w-5" aria-hidden />
            Commander — {siteConfig.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
