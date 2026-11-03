"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Phone } from "lucide-react";

import {
  getOpenStatus,
  getParisDate,
  HOURS_DISPLAY,
  type OpenStatus,
} from "@/data/hours";
import type { MenuItem } from "@/data/menu";
import { HERO_SLIDES } from "@/config/hero-slides";
import { restoButtonClass } from "@/lib/resto-button";
import { sans } from "@/lib/fonts";
import logoMark from "../../IMGS/logo.png";
import logoBlanc from "../../IMGS/logo_blanc.png";
import { PAGE_SHELL } from "@/lib/page-shell";
import { MenuCarte } from "@/components/home/menu-carte";
import { PizzaAllergenPanel } from "@/components/pizza-allergen-panel";
import {
  FooterPizzaBandeau,
  HeaderBotaniqueBandeau,
} from "@/components/decor-ornament";
import { getAddressLines, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const PHONE_DISPLAY = siteConfig.phone.display;
const PHONE_HREF = siteConfig.phone.href;
const FACEBOOK_HREF = siteConfig.facebook.href;
const [ADDRESS_LINE_1, ADDRESS_LINE_2] = getAddressLines();
const MAP_EMBED = siteConfig.map.embedUrl;

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function PaperTexture({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 opacity-[0.55]", className)}
      style={{
        backgroundImage: `
          linear-gradient(90deg, color-mix(in srgb, var(--resto-ink) 6%, transparent) 1px, transparent 1px),
          linear-gradient(color-mix(in srgb, var(--resto-ink) 5%, transparent) 1px, transparent 1px),
          radial-gradient(ellipse at 30% 20%, color-mix(in srgb, var(--resto-accent) 12%, transparent), transparent 50%)
        `,
        backgroundSize: "48px 48px, 48px 48px, 100% 100%",
      }}
    />
  );
}

const sectionTitleTypography =
  "text-center text-xl font-extrabold uppercase tracking-[0.12em] text-[var(--resto-brand)] sm:text-2xl lg:text-3xl xl:text-[2rem] xl:leading-tight";

/** Titre de section (texte seul, non cliquable) */
function Ribbon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex justify-center", className)}>
      <h2 className={sectionTitleTypography}>{children}</h2>
    </div>
  );
}

function LogoLockup({
  size = "lg",
  showTagline = false,
  light = false,
}: {
  size?: "lg" | "sm";
  showTagline?: boolean;
  light?: boolean;
}) {
  const frame = light
    ? { aspect: "1688 / 594", width: "105.1%", left: "-3.79%", top: "-25.93%" }
    : { aspect: "1213 / 436", width: "146.25%", left: "-24.81%", top: "-50.46%" };

  return (
    <div className="text-center">
      <h1>
        <span
          className={cn(
            "relative mx-auto block overflow-hidden",
            size === "lg"
              ? "w-[min(92vw,20rem)] drop-shadow-[0_10px_28px_rgba(0,0,0,0.55)] sm:w-[26rem] md:w-[32rem] lg:w-[38rem]"
              : "w-56 sm:w-72"
          )}
          style={{ aspectRatio: frame.aspect }}
        >
          <Image
            src={light ? logoBlanc : logoMark}
            alt={`${siteConfig.name} — ${siteConfig.pickupLabel}`}
            priority={size === "lg"}
            className="absolute h-auto max-w-none"
            style={{
              width: frame.width,
              left: frame.left,
              top: frame.top,
            }}
          />
        </span>
      </h1>
      {showTagline && (
        <p className="mx-auto mt-6 max-w-2xl text-xl font-bold leading-snug text-white drop-shadow-md sm:mt-8 sm:text-2xl md:text-[1.75rem] md:leading-snug">
          {siteConfig.heroTagline}
        </p>
      )}
    </div>
  );
}

const HERO_CROSSFADE_S = 0.68;
const HERO_HOLD_MS = 5500;
const HERO_EASE = [0.4, 0, 0.2, 1] as const;

function HeroSlider({
  slides,
}: {
  slides: { src: StaticImageData; alt: string }[];
}) {
  const slideCount = slides.length;
  const [baseIndex, setBaseIndex] = useState(0);
  const [overlayIndex, setOverlayIndex] = useState(slideCount > 1 ? 1 : 0);
  /** true uniquement pendant le fondu ; reset instantané évite un 2e fondu (flash sombre) */
  const [isCrossfading, setIsCrossfading] = useState(false);
  const baseIndexRef = useRef(0);
  const crossfadingRef = useRef(false);

  useEffect(() => {
    baseIndexRef.current = baseIndex;
  }, [baseIndex]);

  useEffect(() => {
    if (slideCount <= 1) return;

    const timer = window.setInterval(() => {
      if (crossfadingRef.current) return;
      crossfadingRef.current = true;
      const next = (baseIndexRef.current + 1) % slideCount;
      setOverlayIndex(next);
      setIsCrossfading(true);
    }, HERO_HOLD_MS);

    return () => window.clearInterval(timer);
  }, [slideCount]);

  useEffect(() => {
    if (!isCrossfading) return;
    const done = window.setTimeout(() => {
      setBaseIndex(overlayIndex);
      setIsCrossfading(false);
      crossfadingRef.current = false;
    }, HERO_CROSSFADE_S * 1000 + 50);
    return () => window.clearTimeout(done);
  }, [isCrossfading, overlayIndex]);

  const opacityTransition = {
    duration: isCrossfading ? HERO_CROSSFADE_S : 0,
    ease: HERO_EASE,
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--resto-ink)]">
      {slides.map((slide, i) => (
        <div
          key={`preload-${slide.src.src}`}
          className="pointer-events-none absolute inset-0 opacity-0"
          aria-hidden
        >
          <Image
            src={slide.src}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      <motion.div
        className="absolute inset-0 z-0"
        initial={false}
        animate={{ opacity: isCrossfading ? 0 : 1 }}
        transition={opacityTransition}
      >
        <Image
          src={slides[baseIndex].src}
          alt={slides[baseIndex].alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {slideCount > 1 && (
        <motion.div
          className="absolute inset-0 z-[1]"
          initial={false}
          animate={{ opacity: isCrossfading ? 1 : 0 }}
          transition={opacityTransition}
        >
          <Image
            src={slides[overlayIndex].src}
            alt={slides[overlayIndex].alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      )}

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[var(--resto-hero-overlay)]/65 via-[var(--resto-hero-overlay)]/35 to-[var(--resto-hero-overlay)]/55" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[var(--resto-paper)] to-transparent sm:h-36" />
    </div>
  );
}

function SpecialNoticeBanner({ message }: { message: string }) {
  return (
    <div
      role="note"
      className="relative z-30 border-b border-[var(--resto-brand)]/20 bg-[var(--resto-brand)] px-4 py-3 text-center text-sm font-semibold leading-snug text-[var(--resto-surface)] sm:text-base"
    >
      {message}
    </div>
  );
}

function HeroStatusCompact({
  mounted,
  isOpen,
  subline,
  headline,
  emphasizeSubline,
  className,
}: {
  mounted: boolean;
  isOpen: boolean;
  subline: string;
  headline?: string;
  /** Congés / travaux : sous-ligne sur 2 lignes, sans truncate */
  emphasizeSubline?: boolean;
  className?: string;
}) {
  const label = !mounted
    ? "…"
    : headline ?? (isOpen ? "Ouvert" : "Fermé");
  const ariaSummary =
    mounted && subline ? `${label}, ${subline}` : label;

  return (
    <motion.div
      layout
      role="status"
      aria-live="polite"
      aria-label={ariaSummary}
      className={cn(
        "relative flex min-w-0 max-w-full items-center gap-2 rounded-full py-1.5 pl-2.5 pr-4 shadow-md sm:gap-2.5 sm:py-2 sm:pl-3.5 sm:pr-5",
        isOpen
          ? "bg-[var(--resto-brand)] text-white"
          : "bg-[var(--resto-status-closed)] text-[var(--resto-ink)]/60 ring-1 ring-[var(--resto-ink)]/10",
        className
      )}
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3">
        {mounted && isOpen && (
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-80"
            style={{ backgroundColor: "var(--resto-accent)" }}
          />
        )}
        <span
          className={cn(
            "relative inline-flex h-full w-full rounded-full ring-2",
            !mounted && "bg-[var(--resto-ink)]/20 ring-transparent",
            mounted &&
              isOpen &&
              "ring-[var(--resto-brand)]/40 shadow-[0_0_8px_color-mix(in_srgb,var(--resto-accent)_85%,transparent)]",
            mounted &&
              !isOpen &&
              "bg-[var(--resto-ink)]/30 ring-transparent"
          )}
          style={
            mounted && isOpen
              ? { backgroundColor: "var(--resto-accent)" }
              : undefined
          }
        />
      </span>
      <div className="relative min-w-0 text-left leading-tight">
        <AnimatePresence mode="wait">
          <motion.p
            key={label}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            className="text-xs font-extrabold tracking-tight sm:text-sm"
          >
            {label}
          </motion.p>
        </AnimatePresence>
        {mounted && subline && (
          <p
            className={cn(
              "mt-0.5 text-[10px] font-semibold sm:text-xs",
              emphasizeSubline
                ? "line-clamp-2 whitespace-normal sm:max-w-[14rem]"
                : "truncate sm:max-w-none sm:whitespace-normal",
              isOpen ? "text-white/90" : "text-[var(--resto-ink)]/55"
            )}
            title={subline}
          >
            {subline}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const [allergenPizza, setAllergenPizza] = useState<MenuItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<OpenStatus>({
    isOpen: false,
    subline: "",
    source: "normal",
  });

  useEffect(() => {
    setMounted(true);
    const refresh = () => setStatus(getOpenStatus(getParisDate()));
    refresh();
    const interval = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <main
      className={cn(
        sans.variable,
        sans.className,
        "relative min-h-screen bg-[var(--resto-paper)] pb-28 text-base font-medium text-[var(--resto-ink)] sm:text-lg lg:text-xl md:pb-16"
      )}
    >
      <PaperTexture />

      {mounted && status.banner ? (
        <SpecialNoticeBanner message={status.banner} />
      ) : null}

      <PizzaAllergenPanel
        pizza={allergenPizza}
        onClose={() => setAllergenPizza(null)}
      />

      {/* ——— Hero + slider ——— */}
      <section className="relative min-h-[88vh]">
        <HeroSlider slides={HERO_SLIDES} />

        <div
          className={cn(
            PAGE_SHELL,
            "pointer-events-none absolute inset-x-0 top-0 z-20 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 pt-3 sm:gap-3 sm:pt-5"
          )}
        >
          <HeroStatusCompact
            mounted={mounted}
            isOpen={status.isOpen}
            subline={mounted ? status.subline : ""}
            headline={status.headline}
            emphasizeSubline={status.source === "special"}
            className="pointer-events-auto w-fit max-w-full justify-self-start"
          />
          <a
            href={PHONE_HREF}
            aria-label={`Appeler ${siteConfig.name} au ${PHONE_DISPLAY}`}
            className={restoButtonClass(
              "secondary",
              "heroPhone",
              "pointer-events-auto justify-self-end focus-visible:ring-white/60 focus-visible:ring-offset-transparent [&_svg]:h-4 [&_svg]:w-4 sm:[&_svg]:h-5 sm:[&_svg]:w-5"
            )}
          >
            <Phone className="shrink-0" aria-hidden />
            <span className="hidden min-[420px]:inline">{PHONE_DISPLAY}</span>
          </a>
        </div>

        <div
          className={cn(
            PAGE_SHELL,
            "relative z-10 flex min-h-[88vh] flex-col items-center justify-center px-2 pb-10 pt-14 text-center sm:pb-12 sm:pt-16"
          )}
        >
          <LogoLockup showTagline light />
          <a
            href="#menu"
            className={cn("mt-8 sm:mt-10", restoButtonClass("primary", "md"))}
          >
            Voir la carte
          </a>
          <a
            href="#infos"
            className={cn(
              "group relative mt-4 inline-block origin-center text-sm font-semibold text-white no-underline",
              "drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]",
              "transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105",
              "sm:mt-5"
            )}
          >
            Adresse & horaires
            <span
              aria-hidden
              className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-[var(--resto-brand)] transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-x-100"
            />
          </a>
        </div>
      </section>

      <HeaderBotaniqueBandeau />

      <MenuCarte onAllergenClick={setAllergenPizza} />

      {/* ——— Adresse & horaires ——— */}
      <section
        id="infos"
        className="relative bg-[var(--resto-paper)] py-16 sm:py-20 lg:py-24"
      >
        <div className={PAGE_SHELL}>
          <Ribbon className="mb-10 lg:mb-14">Adresse & horaires</Ribbon>

          <div className="grid gap-10 rounded-[2rem] border border-[var(--resto-ink)]/10 bg-[var(--resto-surface)]/95 p-8 shadow-sm sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-12">
            <div className="space-y-8">
              <LogoLockup size="sm" />
              <div className="space-y-2 text-lg sm:text-xl">
                <p className="font-bold uppercase tracking-[0.12em] text-[var(--resto-brand)]">
                  {siteConfig.name} — {siteConfig.footerLine}
                </p>
                <p>{ADDRESS_LINE_1}</p>
                <p>{ADDRESS_LINE_2}</p>
              </div>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 text-xl font-extrabold text-[var(--resto-brand)] sm:text-2xl"
              >
                <Phone className="h-5 w-5" />
                {PHONE_DISPLAY}
              </a>
              <div className="border-t border-[var(--resto-ink)]/12 pt-6 text-lg sm:text-xl">
                <p className="mb-2 font-bold text-[var(--resto-brand)]">
                  Horaires d'ouverture
                </p>
                <ul className="space-y-2 text-[var(--resto-ink)]/90">
                  {HOURS_DISPLAY.map((line) => (
                    <li
                      key={line.text}
                      className={line.muted ? "text-[var(--resto-ink)]/65" : undefined}
                    >
                      {line.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.75rem]">
              <iframe
                title={`${siteConfig.name} — ${siteConfig.address.addressLocality}`}
                src={MAP_EMBED}
                className="min-h-[16rem] h-full w-full bg-[var(--resto-paper)] sm:min-h-[20rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="relative bg-[var(--resto-paper)] pb-28 md:pb-12">
        <FooterPizzaBandeau />
        <div className={cn(PAGE_SHELL, "py-10 sm:py-12")}>
          <div className="text-center text-sm font-medium text-[var(--resto-ink)]/85 sm:text-base">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[var(--resto-brand)]">
              {siteConfig.name} — {siteConfig.footerLine}
            </p>
            <p className="mt-2">{ADDRESS_LINE_2}</p>
            <nav
              aria-label="Pied de page"
              className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
            >
              <a
                href="#menu"
                className="font-semibold text-[var(--resto-brand)] underline-offset-4 hover:underline"
              >
                Carte
              </a>
              <a
                href="#infos"
                className="font-semibold text-[var(--resto-brand)] underline-offset-4 hover:underline"
              >
                Adresse & horaires
              </a>
              <a
                href={PHONE_HREF}
                className="font-semibold text-[var(--resto-brand)] underline-offset-4 hover:underline"
              >
                {PHONE_DISPLAY}
              </a>
              {FACEBOOK_HREF ? (
                <a
                  href={FACEBOOK_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--resto-brand)] underline-offset-4 hover:underline"
                >
                  {siteConfig.facebook.label}
                </a>
              ) : null}
              <a
                href="/mentions-legales"
                className="font-semibold text-[var(--resto-brand)] underline-offset-4 hover:underline"
              >
                Mentions légales
              </a>
              <a
                href="/politique-de-confidentialite"
                className="font-semibold text-[var(--resto-brand)] underline-offset-4 hover:underline"
              >
                Confidentialité
              </a>
            </nav>
            <p className="mt-6 text-xs text-[var(--resto-ink)]/55 sm:text-sm">
              © 2026 {siteConfig.name}
            </p>
          </div>
        </div>
      </footer>

      <a
        href={PHONE_HREF}
        className={cn(
          "fixed inset-x-4 bottom-4 z-50 md:hidden",
          restoButtonClass("command", "fab", "w-auto max-w-none shrink")
        )}
      >
        <Phone className="h-5 w-5" />
        Commander — {PHONE_DISPLAY}
      </a>
    </main>
  );
}
