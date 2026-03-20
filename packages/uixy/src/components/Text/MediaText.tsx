"use client";

import React, { useEffect } from "react";
import { cn } from "../../utils/cn";

let mediaTextStyleInjected = false;

export interface MediaTextProps {
  /** Text content */
  children: string;
  /** Image URL to fill the text */
  src?: string;
  /** Video URL to fill the text */
  videoSrc?: string;
  /** Background size for image mode */
  backgroundSize?: string;
  /** Background position for image mode */
  backgroundPosition?: string;
  /** Whether video should loop */
  loop?: boolean;
  /** Whether video should be muted */
  muted?: boolean;
  /** HTML tag for text */
  as?: React.ElementType;
  className?: string;
}

export const MediaText: React.FC<MediaTextProps> = ({
  children,
  src,
  videoSrc,
  backgroundSize = "cover",
  backgroundPosition = "center",
  loop = true,
  muted = true,
  as: Tag = "h1",
  className,
}) => {
  useEffect(() => {
    if (mediaTextStyleInjected) return;
    mediaTextStyleInjected = true;
    const style = document.createElement("style");
    style.textContent = `
      .uixy-media-text-clip {
        -webkit-background-clip: text !important;
        background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        color: transparent !important;
      }
      .uixy-media-text-video-container {
        position: relative;
        display: inline-block;
        overflow: hidden;
      }
      .uixy-media-text-video-container video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .uixy-media-text-video-overlay {
        position: relative;
        z-index: 1;
        mix-blend-mode: screen;
        background: #000;
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Image mode — use background-clip: text
  if (src && !videoSrc) {
    return (
      <Tag
        className={cn("uixy-media-text-clip inline-block", className)}
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize,
          backgroundPosition,
          backgroundRepeat: "no-repeat",
        }}
      >
        {children}
      </Tag>
    );
  }

  // Video mode — use mix-blend-mode trick
  if (videoSrc) {
    return (
      <span className="uixy-media-text-video-container">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          src={videoSrc}
          autoPlay
          loop={loop}
          muted={muted}
          playsInline
          preload="auto"
        />
        <Tag
          className={cn("uixy-media-text-video-overlay whitespace-nowrap", className)}
        >
          {children}
        </Tag>
      </span>
    );
  }

  // Fallback — no media
  return (
    <Tag className={cn("inline-block", className)}>
      {children}
    </Tag>
  );
};

MediaText.displayName = "MediaText";
