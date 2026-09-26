import { useEffect, useRef, useState, type CSSProperties } from "react";

import sourceDocument from "./sources/glass-ai-button.html?raw";

export type GlassAiButtonProps = {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

export function GlassAiButton({ className = "", style, onClick }: GlassAiButtonProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [documentVisible, setDocumentVisible] = useState(() => (
    typeof document === "undefined" || !document.hidden
  ));
  const [hostVisible, setHostVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handleMsg = (e: MessageEvent) => {
      if (e.data?.type === "GLASS_AI_BUTTON_CLICK") {
        onClick?.();
      }
    };
    window.addEventListener("message", handleMsg);
    return () => window.removeEventListener("message", handleMsg);
  }, [onClick]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setHostVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setHostVisible(entry?.isIntersecting ?? true);
    }, { rootMargin: "80px" });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const update = () => setDocumentVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const mounted = hostVisible && documentVisible;

  useEffect(() => {
    setReady(false);
  }, [mounted]);

  return (
    <div
      ref={hostRef}
      onClick={onClick}
      className={`threeui-background glass-ai-button${className ? ` ${className}` : ""}`}
      role="button"
      tabIndex={0}
      aria-label="Explore more"
      data-state={!mounted ? "paused" : ready ? "ready" : "loading"}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        pointerEvents: "auto",
        cursor: "pointer",
        ...style,
      }}
    >
      {mounted ? (
        <iframe
          title="Glass AI Button"
          srcDoc={sourceDocument}
          sandbox="allow-scripts"
          loading="eager"
          onLoad={() => setReady(true)}
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            width: "100%",
            height: "100%",
            border: 0,
            background: "transparent",
            opacity: ready ? 1 : 0,
            pointerEvents: ready ? "auto" : "none",
            transition: "opacity 240ms ease-out",
          }}
        />
      ) : null}
    </div>
  );
}
