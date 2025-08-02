"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index: number) => {
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  };

  return (
    <>
      {/* Main Image Gallery */}
      <div className="space-y-4">
        {/* Primary Image */}
        <div 
          className="aspect-square bg-brand-silver-50 dark:bg-brand-silver-900 rounded-xl overflow-hidden border border-brand-silver-200 dark:border-brand-silver-700 cursor-pointer group relative"
          onClick={() => openModal(selectedImage)}
        >
          <Image
            src={images[selectedImage]}
            alt={`${productName} - Main view`}
            width={600}
            height={600}
            className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500 ease-in-out"
          />
          {/* Zoom indicator */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
            <div className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Click to enlarge
            </div>
          </div>
        </div>

        {/* Thumbnail Images */}
        <div className="grid grid-cols-3 gap-4">
          {/* First image thumbnail */}
          <div
            className={`aspect-square bg-brand-silver-50 dark:bg-brand-silver-900 rounded-lg overflow-hidden border cursor-pointer hover:shadow-lg transition-all duration-300 ${
              selectedImage === 0
                ? "border-palette-emerald-500 ring-2 ring-palette-emerald-200"
                : "border-brand-silver-200 dark:border-brand-silver-700 hover:border-palette-emerald-300"
            }`}
            onClick={() => setSelectedImage(0)}
          >
            <Image
              src={images[0]}
              alt={`${productName} main view`}
              width={200}
              height={200}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          
          {/* Other thumbnail images */}
          {images.slice(1).map((image, index) => (
            <div
              key={index + 1}
              className={`aspect-square bg-brand-silver-50 dark:bg-brand-silver-900 rounded-lg overflow-hidden border cursor-pointer hover:shadow-lg transition-all duration-300 ${
                selectedImage === index + 1
                  ? "border-palette-emerald-500 ring-2 ring-palette-emerald-200"
                  : "border-brand-silver-200 dark:border-brand-silver-700 hover:border-palette-emerald-300"
              }`}
              onClick={() => setSelectedImage(index + 1)}
            >
              <Image
                src={image}
                alt={`${productName} view ${index + 2}`}
                width={200}
                height={200}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white border-none shadow-lg"
              onClick={closeModal}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-none shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-none shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Main Modal Image */}
            <div
              className="relative bg-white rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedImage]}
                alt={`${productName} - View ${selectedImage + 1}`}
                width={800}
                height={800}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
