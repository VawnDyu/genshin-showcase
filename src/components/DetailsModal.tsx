import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  characterId: string;
}

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;
const DESIGN_RATIO = DESIGN_WIDTH / DESIGN_HEIGHT;

// Mock character details data (you can replace with actual data)
const characterDetails: Record<string, any> = {
  keqing: {
    name: 'Keqing',
    title: 'Driving Thunder',
    element: 'Electro',
    weapon: 'Sword',
    stats: {
      hp: '13103',
      atk: '323',
      def: '799',
      critRate: '0%',
      critDmg: '38.4%',
      elementalMastery: '0',
      energyRecharge: '0%',
    },
    artifacts: {
      set1: {
        piece: '4-Piece Set',
        artifact: 'Thundering Fury',
      },
      set2: {
        piece: '4-Piece Set',
        artifact: 'Gladiator\'s Finale',
      },
    },
  },
  citlali: {
    name: 'Citlali',
    title: 'Obsidian Opalstar',
    element: 'Cryo',
    weapon: 'Catalyst',
    stats: {
      hp: '11,634',
      atk: '127',
      def: '763',
      critRate: '0%',
      critDmg: '0%',
      elementalMastery: '115',
      energyRecharge: '0%',
    },
    artifacts: {
      set1: {
        piece: '4-Piece Set',
        artifact: 'Scroll of the Hero of Cinder City',
      },
      set2: {
        piece: '4-Piece Set',
        artifact: 'Tenacity of the Millelith',
      },
    },
  },
  chiori: {
    name: 'Chiori',
    title: 'The Thundering Seamstress',
    element: 'Geo',
    weapon: 'Sword',
    stats: {
      hp: '11,438',
      atk: '323',
      def: '953',
      critRate: '19.2%',
      critDmg: '0%',
      elementalMastery: '0',
      energyRecharge: '0%',
    },
    artifacts: {
      set1: {
        piece: '4-Piece Set',
        artifact: 'Golden Troupe',
      },
      set2: {
        piece: '4-Piece Set',
        artifact: 'Husk of Opulent Dreams',
      },
    },
  },
  skirk: {
    name: 'Skirk',
    title: 'Void Star',
    element: 'Cryo',
    weapon: 'Sword',
    stats: {
      hp: '12,417',
      atk: '359',
      def: '806',
      critRate: '0%',
      critDmg: '38.4%',
      elementalMastery: '0',
      energyRecharge: '0%',
    },
    artifacts: {
      set1: {
        piece: '4-Piece Set',
        artifact: 'Finale of the Deep Galleries',
      },
      set2: {
        piece: '4-Piece Set',
        artifact: 'Marechaussee Hunter',
      },
    },
  },
};

const DetailsModal = ({ isOpen, onClose, characterId }: DetailsModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const details = characterDetails[characterId] || characterDetails.keqing;

  // Calculate responsive scale
  useEffect(() => {
    const updateScale = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const windowRatio = windowWidth / windowHeight;

      let containerHeight;
      let top = 0;

      if (windowRatio > DESIGN_RATIO) {
        containerHeight = windowHeight;
        top = 0;
      } else {
        const layoutWidth = windowWidth;
        containerHeight = layoutWidth / DESIGN_RATIO;
        top = (windowHeight - containerHeight) / 2;
      }

      const currentScale = windowWidth / DESIGN_WIDTH;
      setScale(currentScale);

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

  // Open/Close animations - Slide from right
  useEffect(() => {
    if (!overlayRef.current || !modalRef.current) return;

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
        // Slide in from right
        .fromTo(modalRef.current,
          {
            x: '100%',
            opacity: 0,
          },
          {
            x: '0%',
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
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
        // Slide out to right
        .to(modalRef.current, {
          x: '100%',
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        })
        // Fade out overlay
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        }, "-=0.2");
    }
  }, [isOpen]);

  // Close on backdrop click
  const handleBackdropClick = () => {
    onClose();
  };

  // Prevent modal click from closing
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
      className="fixed inset-0 z-[100] flex items-center justify-end opacity-0"
      style={{ display: 'none' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
        onClick={handleBackdropClick}
      />

      {/* Layout Container */}
      <div
        ref={layoutRef}
        className="absolute flex items-center justify-end pointer-events-none"
      >
        {/* Modal Panel */}
        <div
          ref={modalRef}
          className="relative pointer-events-auto bg-gradient-to-br from-purple-900/95 via-purple-800/95 to-purple-700/95 backdrop-blur-md shadow-2xl overflow-y-auto custom-scrollbar"
          onClick={handleModalClick}
          style={{
            width: `${700 * scale}px`,
            maxHeight: `95%`, // Percentage of layout height
            padding: '5% 4%', // Percentage padding
            borderRadius: `${20 * scale}px 0 0 ${20 * scale}px`,
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            style={{
              width: `${32 * scale}px`,
              height: `${32 * scale}px`,
              top: '3%', // Percentage positioning
              right: '3%', // Percentage positioning
            }}
            aria-label="Close"
          >
            <svg
              className="text-white"
              style={{
                width: `${20 * scale}px`,
                height: `${20 * scale}px`,
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="text-white">
            {/* Character Name */}
            <h2
              className="font-bold text-white"
              style={{
                fontSize: `${32 * scale}px`,
                marginBottom: '2%', // Percentage spacing
              }}
            >
              {details.name}
            </h2>
            <p
              className="text-purple-200"
              style={{
                fontSize: `${16 * scale}px`,
                marginBottom: '6%', // Percentage spacing
              }}
            >
              {details.title}
            </p>

            {/* Element & Weapon */}
            <div
              className="flex"
              style={{
                fontSize: `${14 * scale}px`,
                gap: `${16 * scale}px`,
                marginBottom: '6%', // Percentage spacing
              }}
            >
              <div className="bg-white/10 rounded-lg px-3 py-2">
                <span className="text-purple-200">Element: </span>
                <span className="ml-2 font-semibold">{details.element}</span>
              </div>
              <div className="bg-white/10 rounded-lg px-3 py-2">
                <span className="text-purple-200">Weapon: </span>
                <span className="ml-2 font-semibold">{details.weapon}</span>
              </div>
            </div>

            {/* Stats Section */}
            <div style={{ marginBottom: '6%' }}>
              <h3
                className="font-semibold text-purple-100"
                style={{
                  fontSize: `${20 * scale}px`,
                  marginBottom: '3%', // Percentage spacing
                }}
              >
                Base Stats - (Level 90)
              </h3>
              <div
                className="grid grid-cols-2"
                style={{ gap: `${12 * scale}px` }}
              >
                {Object.entries(details.stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-white/5 rounded-lg"
                    style={{
                      padding: `${12 * scale}px`,
                      fontSize: `${14 * scale}px`,
                    }}
                  >
                    <div className="text-purple-200 text-xs uppercase">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="font-bold mt-1">{String(value)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Artifacts Section */}
            <div>
              <h3
                className="font-semibold text-purple-100"
                style={{
                  fontSize: `${20 * scale}px`,
                  marginBottom: '3%', // Percentage spacing
                }}
              >
                Artifacts
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${8 * scale}px` }}>
                <div
                  className="bg-white/5 rounded-lg"
                  style={{
                    padding: `${12 * scale}px`,
                    fontSize: `${14 * scale}px`,
                  }}
                >
                  <div className="text-purple-200 text-xs">{details.artifacts.set1.piece}</div>
                  <div className="font-semibold mt-1">{details.artifacts.set1.artifact}</div>
                </div>
                <div
                  className="bg-white/5 rounded-lg"
                  style={{
                    padding: `${12 * scale}px`,
                    fontSize: `${14 * scale}px`,
                  }}
                >
                  <div className="text-purple-200 text-xs">{details.artifacts.set2.piece}</div>
                  <div className="font-semibold mt-1">{details.artifacts.set2.artifact}</div>
                </div>
              </div>
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

            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #a855f7 rgba(255, 255, 255, 0.1);
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;