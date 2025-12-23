"use client";

import { List, X } from "lucide-react";
import { useEffect, useMemo, useState, type RefObject } from "react";
import { twMerge } from "tailwind-merge";

/** @lintignore */
export interface HeadingInfo {
  id: string;
  title: string;
  level: number;
  section: Element;
}

const isTocHeading = (title: string) =>
  /^(목차|table of contents)$/i.test(title.trim());

export function collectHeadingInfo(root: HTMLElement): HeadingInfo[] {
  const headings = Array.from(
    root.querySelectorAll<HTMLElement>("h2, h3, h4, h5, h6"),
  );

  return headings
    .map((heading) => {
      const title = heading.textContent?.trim() ?? "";
      const id = heading.id?.trim() ?? "";
      const level = Number.parseInt(heading.tagName.replace(/[^0-9]/g, ""), 10);
      const section =
        (heading.closest("section") as Element | null) ?? (heading as Element);

      return { id, title, level, section };
    })
    .filter(
      (heading) =>
        heading.id &&
        heading.title &&
        Number.isFinite(heading.level) &&
        !isTocHeading(heading.title),
    );
}

interface FloatingTocProps {
  targetRef: RefObject<HTMLElement | null>;
  refreshKey?: string | null;
}

interface TocItem {
  id: string;
  title: string;
  level: number;
}

export default function FloatingToc({
  targetRef,
  refreshKey,
}: FloatingTocProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const root = targetRef.current;
    if (!root) {
      console.log("no root found");
      return;
    }
    console.log("collecting headings");

    const headingInfo = collectHeadingInfo(root);
    setItems(headingInfo.map(({ id, title, level }) => ({ id, title, level })));
    setActiveId(headingInfo[0]?.id ?? null);

    const order = headingInfo.map((heading) => heading.id);
    const visible = new Set<string>();
    const sectionToId = new Map<Element, string>();
    headingInfo.forEach((heading) =>
      sectionToId.set(heading.section, heading.id),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = sectionToId.get(entry.target);
          if (!id) {
            return;
          }
          if (entry.isIntersecting) {
            visible.add(id);
          } else {
            visible.delete(id);
          }
        });

        if (!order.length) {
          return;
        }

        const firstVisible = order.find((id) => visible.has(id));
        if (firstVisible) {
          setActiveId(firstVisible);
          return;
        }

        const viewportHeight =
          typeof window === "undefined" ? 0 : window.innerHeight;

        const lastPassed = [...headingInfo]
          .reverse()
          .find(
            (heading) =>
              heading.section.getBoundingClientRect().top <=
              viewportHeight * 0.45,
          );

        const upcoming = headingInfo.find(
          (heading) => heading.section.getBoundingClientRect().top >= 0,
        );

        setActiveId(lastPassed?.id ?? upcoming?.id ?? order[0] ?? null);
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      },
    );

    headingInfo.forEach((heading) => observer.observe(heading.section));

    return () => observer.disconnect();
  }, [targetRef, refreshKey]);

  useEffect(() => {
    setIsOpen(false);
  }, [refreshKey]);

  const tocList = useMemo(() => {
    if (!items.length) {
      return null;
    }

    return (
      <nav aria-label="Floating table of contents" className="text-sm">
        <ul>
          {items.map((item) => {
            const depth = Math.max(0, item.level - 2);
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className={twMerge(
                    `block rounded-md border border-transparent px-2 py-1 transition-colors break-all`,
                    isActive
                      ? "font-bold text-gray-800 dark:text-gray-50"
                      : "text-gray-600  dark:text-gray-200 ",
                  )}
                  style={{ paddingLeft: `${8 + depth * 12}px` }}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }, [activeId, items]);

  if (!items.length) {
    return null;
  }

  return (
    <>
      <div className="hidden lg:block opacity-50 hover:opacity-100 transition">
        <div
          className="fixed z-20 w-64 max-h-[70vh] overflow-y-auto rounded-xl border border-gray-200 bg-white/90 p-3 shadow-md backdrop-blur dark:border-gray-700 dark:bg-gray-900/85"
          style={{
            right: "max(1rem, calc((100vw - 980px) / 2))",
            top: "9rem",
          }}
        >
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 pl-2">
            목차
          </div>
          {tocList}
        </div>
      </div>

      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="floating-toc-panel"
          className="fixed bottom-5 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold shadow-lg ring-1 ring-gray-200 backdrop-blur dark:bg-gray-800/90 dark:text-gray-50 dark:ring-gray-700"
        >
          <List className="h-4 w-4" aria-hidden />
          목차
        </button>

        {isOpen ? (
          <div className="fixed inset-0 z-40 flex items-end justify-center">
            <button
              aria-label="Close table of contents"
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/20"
              type="button"
            />
            <div
              id="floating-toc-panel"
              className="relative z-50 mb-16 w-[min(90vw,24rem)] max-h-[65vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-2xl backdrop-blur dark:border-gray-700 dark:bg-gray-900/90"
            >
              <div className="mb-3 flex items-center justify-between text-sm font-semibold">
                <span>목차</span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close table of contents"
                  className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
              {tocList}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
