"use client";

import { getURL } from "@/lib/get-urls";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Lightbox, { ContainerRect, ThumbnailsRef, useLightboxProps } from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

type Image = {
  pathname: string;
  alt: string;
  blurDataUrl: string;
};

export default function CampaignImages({ images }: { images: Image[] }) {
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
      render={{ slide: NextJsImage, thumbnail: NextJsImage }}
    />
  );
}

// function NextJsImage({ slide, rect }: { slide: Image; rect: ContainerRect }) {
function NextJsImage({ slide }: { slide: Image; rect: ContainerRect }) {
  const {
    on: { click },
    // carousel: { imageFit },
  } = useLightboxProps();

  // const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  // const width = !cover ? Math.round(Math.min(rect.width, (rect.height / slide.height) * slide.width)) : rect.width;

  return (
    <Image
      fill
      alt={slide.alt || ""}
      src={getURL("image", slide.pathname)}
      draggable={false}
      placeholder="blur"
      blurDataURL={slide.blurDataUrl}
      style={{
        objectFit: "cover",
        cursor: click ? "pointer" : undefined,
      }}
      // sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
    />
  );
}
