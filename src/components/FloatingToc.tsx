"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import style from "./FloatingToc.module.css";

type Item = {
  section: HTMLElement;
  id: string;
  html: string;
  level: number;
  children?: Item[];
};

const TocLi: React.FC<{ item: Item }> = ({ item }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          setActive(true);
        } else {
          setActive(false);
        }
      });
    });

    observer.observe(item.section);
    return () => observer.disconnect();
  }, [item.section]);

  return (
    <li className={twMerge("mb-0.5")}>
      <a
        href={`#${item.id}`}
        className={twMerge(
          "leading-3 transition",
          style.link,
          active ? "text-gray-900" : "text-gray-300",
        )}
        dangerouslySetInnerHTML={{ __html: item.html }}
      />
      {item.children && (
        <ul className="ml-2">
          {item.children.map((child) => (
            <TocLi key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

function createItemsFromSections(sections: NodeListOf<HTMLElement>) {
  const items: Item[] = [];
  let stack: Item[] = [];

  sections.forEach((section) => {
    const heading = section.querySelector<HTMLHeadingElement>("h2, h3, h4, h5");

    if (!heading) {
      return;
    }
    const id = heading.getAttribute("id") ?? "";
    if (id == "목차") {
      return;
    }
    const cloned = heading.cloneNode(true) as HTMLHeadingElement;

    const anchor = cloned.querySelector("a");
    if (anchor) {
      cloned.removeChild(anchor);
    }

    cloned.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        (node as Element).className = "";
      }
    });

    const html = cloned.innerHTML ?? "";
    if (!id || !html) {
      console.warn("No id or text found for heading", heading);
      return;
    }

    const level = parseInt(heading.tagName[1]!, 10);

    const item: Item = { id, html, level, section };
    if (level === 2) {
      items.push(item);
      stack = [item];
    } else {
      const parent = stack[level - 3];
      if (!parent) {
        throw new Error("Parent not found");
      }
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(item);
      stack[level - 2] = item;
    }
  });

  return items;
}

export default function FloatingToc(props: React.ComponentProps<"nav">) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("article section");
    setItems(createItemsFromSections(sections));
  }, []);

  return (
    <nav
      {...props}
      className={twMerge(
        "rounded-lg shadow w-56 px-4 py-3 text-sm",
        props.className,
      )}
    >
      <h3 className="mb-1 text-xs font-bold text-gray-400">목차</h3>
      <ul>
        {items.map((item) => (
          <TocLi key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  );
}
