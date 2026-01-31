"use client";

import { useEffect, useState } from "react";

type ZoomableImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
};

export default function ZoomableImage({
  src,
  alt,
  className = "",
  imgClassName = "",
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden"; // 모달 열릴 때 스크롤 잠금

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Thumbnail */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`block w-full text-left ${className}`}
        aria-label="Open image"
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`block w-full h-auto cursor-zoom-in rounded-xl border border-gray-100 shadow-sm ${imgClassName}`}
        />
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)} // 배경 클릭 시 닫힘
        >
          {/* 이미지 영역(클릭 시 닫히지 않게 stopPropagation) */}
          <div
            className="max-w-[95vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="block max-w-[95vw] max-h-[90vh] w-auto h-auto rounded-xl shadow-2xl cursor-zoom-out"
            />
          </div>
        </div>
      )}
    </>
  );
}
