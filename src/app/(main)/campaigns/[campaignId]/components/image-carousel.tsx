"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Lightbox, {
  ContainerRect,
  isImageFitCover,
  isImageSlide,
  SlideImage,
  ThumbnailsRef,
  useLightboxProps,
} from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

export default function CampaignImages({ images }: { images: SlideImage[] }) {
  const thumbnailsRef = useRef<ThumbnailsRef>(null);

  // On mobile screens, hide the thumbnails
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        thumbnailsRef.current?.hide();
      } else {
        thumbnailsRef.current?.show();
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Lightbox
      plugins={[Inline, Thumbnails]}
      thumbnails={{ ref: thumbnailsRef }}
      inline={{
        style: { width: "100%", aspectRatio: "4 / 3" },
      }}
      styles={{ slide: { padding: 0, borderRadius: "0.5rem" } }}
      slides={images}
      render={{ slide: NextJsImage }}
    />
  );
}

function isNextJsImage(slide: SlideImage) {
  return isImageSlide(slide) && typeof slide.width === "number" && typeof slide.height === "number";
}

function NextJsImage({ slide, rect }: { slide: SlideImage; rect: ContainerRect }) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) return undefined;

  const width = !cover ? Math.round(Math.min(rect.width, (rect.height / slide.height) * slide.width)) : rect.width;

  return (
    <Image
      alt={slide.alt || ""}
      src={slide.src}
      width={slide.width}
      height={slide.height}
      draggable={false}
      placeholder={slide.blurDataURL ? "blur" : undefined}
      blurDataURL={slide.blurDataURL || undefined}
      style={{
        objectFit: cover ? "cover" : "contain",
        cursor: click ? "pointer" : undefined,
      }}
      sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
    />
  );
}
