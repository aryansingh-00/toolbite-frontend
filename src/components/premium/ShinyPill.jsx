import React from "react";

const KEYFRAMES_ID = "shiny-pill-keyframes";

export default function ShinyPill(props = {}) {
    props = { ...COMPONENT_DEFAULTS, ...props };
    const {
        text,
        link,
        textColor,
        shineColor,
        speed,
        font,
        style,
        className,
        children,
    } = props;

    const isFixedWidth = style?.width === "100%";

    const shellStyle = {
        ...style,
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        boxSizing: "border-box",
        ...(isFixedWidth ? {} : { minWidth: "max-content", width: "auto" }),
        ...font,
    };

    const shineLayerStyle = {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        color: shineColor,
        pointerEvents: "none",
        WebkitMaskImage:
            "linear-gradient(to right, transparent 30%, #000 50%, transparent 70%)",
        maskImage:
            "linear-gradient(to right, transparent 30%, #000 50%, transparent 70%)",
        WebkitMaskSize: "200% auto",
        maskSize: "200% auto",
        animation: `shinyPillSweep ${speed}s ease-in-out infinite`,
    };

    const content = (
        <div style={shellStyle} className={className}>
            <style
                id={KEYFRAMES_ID}
                dangerouslySetInnerHTML={{
                    __html: `@keyframes shinyPillSweep {
                        0% { -webkit-mask-position: 200%; mask-position: 200%; }
                        100% { -webkit-mask-position: -100%; mask-position: -100%; }
                    }`,
                }}
            />
            {/* Base layer — muted baseline color */}
            <span style={{ color: textColor }}>{children || text}</span>
            {/* Shine layer — bright copy masked by the sweeping gradient */}
            <span style={shineLayerStyle} aria-hidden="true">
                {children || text}
            </span>
        </div>
    );

    if (link) {
        return (
            <a
                href={link}
                style={{ textDecoration: "none", display: "inline-flex" }}
                className={className}
            >
                {content}
            </a>
        );
    }

    return content;
}

const COMPONENT_DEFAULTS = {
    text: "SHINY PILL",
    textColor: "#94a3b8", // slate-400
    shineColor: "#ffffff",
    speed: 2.5,
    font: {},
};
