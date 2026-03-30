import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalImage: string;
}

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;
const DESIGN_RATIO = DESIGN_WIDTH / DESIGN_HEIGHT;

const InfoModal = ({ isOpen, onClose, modalImage }: InfoModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);

  // Calculate responsive scale (matches your showcase layout)
  useEffect(() => {
    const updateScale = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const windowRatio = windowWidth / windowHeight;

      let containerHeight;
      let top = 0;

      if (windowRatio > DESIGN_RATIO) {
        // Window is WIDER - fit to height
        containerHeight = windowHeight;
        top = 0;
      } else {
        // Window is TALLER - fit to width
        const layoutWidth = windowWidth;
        containerHeight = layoutWidth / DESIGN_RATIO;
        top = (windowHeight - containerHeight) / 2;
      }

      const currentScale = windowWidth / DESIGN_WIDTH;
      setScale(currentScale);

      // Apply layout styles
      if (layoutRef.current) {
        layoutRef.current.style.width = `${windowWidth}px`;
        layoutRef.current.style.height = `${containerHeight}px`;
        layoutRef.current.style.top = `${top}px`;
        layoutRef.current.style.left = '0px';
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  // Open/Close animations
  useEffect(() => {
    if (!overlayRef.current || !modalRef.current || !imageRef.current) return;

    if (isOpen) {
      // Opening animation
      gsap.set(overlayRef.current, { display: 'flex' });

      const tl = gsap.timeline();

      tl
        // Fade in overlay
        .to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        })
        // Scale in modal with slight bounce
        .fromTo(modalRef.current,
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.2)",
          },
          "-=0.1"
        );
    } else if (overlayRef.current) {
      // Closing animation
      const tl = gsap.timeline({
        onComplete: () => {
          if (overlayRef.current) {
            gsap.set(overlayRef.current, { display: 'none' });
          }
        }
      });

      tl
        // Scale out modal
        .to(modalRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        })
        // Fade out overlay
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        }, "-=0.15");
    }
  }, [isOpen]);

  // Close on backdrop click (outside the modal image)
  const handleBackdropClick = () => {
    onClose();
  };

  // Prevent click on modal from closing
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center opacity-0"
      style={{ display: 'none' }}
    >
      {/* Backdrop - Full screen clickable */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
        onClick={handleBackdropClick}
      />

      {/* Layout Container (matches 1920x1080 aspect ratio) */}
      <div
        ref={layoutRef}
        className="absolute flex items-center justify-center pointer-events-none"
      >
        {/* Modal Container */}
        <div
          ref={modalRef}
          className="relative z-10 pointer-events-auto"
          onClick={handleModalClick}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-20"
            style={{
              width: `${40 * scale}px`,
              height: `${40 * scale}px`,
              top: `${-20 * scale}px`,
              right: `${-20 * scale}px`,
            }}
            aria-label="Close Modal"
          >
            <svg
              className="text-gray-600"
              style={{
                width: `${24 * scale}px`,
                height: `${24 * scale}px`,
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Modal Image with Text Overlay */}
          <div className="relative">
            <img
              ref={imageRef}
              src={modalImage}
              alt="Info Modal"
              className="object-contain rounded-lg shadow-2xl"
              style={{
                maxWidth: `${1100 * scale}px`,
                maxHeight: `${600 * scale}px`,
              }}
              draggable={false}
            />

            {/* Text Overlay Container */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-[#404040]"
              style={{
                padding: '4% 7%', // Percentage: 10% top/bottom, 7% left/right
              }}
            >
              {/* Title Section */}
              <div
                style={{
                  marginTop: '-10.5%', // Percentage: move up 7.5% of image height
                  marginBottom: '6.5%', // Percentage: 6.5% spacing below
                }}
              >
                <h2
                  className="font-semibold"
                  style={{
                    fontSize: `${36 * scale}px`, // Scaled font
                    letterSpacing: '0.03em',
                  }}
                >
                  Disclaimer
                </h2>
              </div>

              {/* Body Section */}
              <div
                className="w-full leading-relaxed custom-scrollbar"
                style={{
                  fontSize: `${22 * scale}px`, // Scaled font
                  whiteSpace: 'pre-line',
                  maxHeight: '58%', // Percentage: 58% of image height
                  overflowY: 'auto',
                  paddingRight: `${8 * scale}px`,
                }}
              >
                {`All character artwork, assets, and visual elements used in this project
are the property of HoYoverse/miHoYo and are not owned by me.

This project is created solely for educational and practice purposes
to demonstrate web development techniques and is not intended for commercial use.

All rights to the original content belong to their respective owners.`}
              </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: ${4 * scale}px;
              }

              .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1);
                border-radius: ${2 * scale}px;
              }

              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: linear-gradient(to bottom, #a855f7, #7e22ce);
                border-radius: ${2 * scale}px;
              }

              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(to bottom, #c084fc, #9333ea);
              }

              /* Firefox scrollbar */
              .custom-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: #a855f7 rgba(255, 255, 255, 0.1);
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;