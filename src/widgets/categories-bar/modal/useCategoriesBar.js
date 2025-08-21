import { useState, useEffect, useRef } from "react";
import { categories } from "../lib/categories";
import { useIsMobile } from "@/shared/lib/hooks/useIsMobile";

export function useCategoriesBar() {
  const [isSticky, setIsSticky] = useState(false);

  const [activeCategory, setActiveCategory] = useState(null);
  const categoryRefs = useRef({});
  const sentinelRef = useRef(null);
  const isMobile = useIsMobile();

  const ignoreScroll = useRef(false);



  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (ignoreScroll.current) return;

      const scrollPosition = window.scrollY + window.innerHeight / 3;

 
      let active = null;

      for (let i = 0; i < categories.length; i++) {
        const el = document.getElementById(categories[i].targetId);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            active = categories[i].targetId;
            break;
          }
        }
      }
      setActiveCategory(active);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    if (activeCategory && categoryRefs.current[activeCategory]) {
      categoryRefs.current[activeCategory].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeCategory]);

  const handleCategoryClick = (targetId) => {
    ignoreScroll.current = true;
    setActiveCategory(targetId);

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => {
      ignoreScroll.current = false;
    }, 600);
  };

  return {
    isSticky,
    activeCategory,
    categoryRefs,
    sentinelRef,
    handleCategoryClick,
  };
}
