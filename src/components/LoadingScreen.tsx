import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import images from '../constants/images';

interface LoadingScreenProps {
  imagesToPreload: string[];
  onLoadComplete: () => void;
}

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;
const DESIGN_RATIO = DESIGN_WIDTH / DESIGN_HEIGHT;

const LoadingScreen = ({ imagesToPreload, onLoadComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [scale, setScale] = useState(1);
  const logoRef = useRef<HTMLImageElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressIconRef = useRef<HTMLImageElement>(null);
  const tapTextRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // Set body background to match details modal
    document.body.style.background = 'linear-gradient(to bottom right, #581c87, #7e22ce, #a855f7)';

    // Animate logo spinning
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: "linear"
      });
    }

    // Preload images
    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    const imagePromises = imagesToPreload.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          const currentProgress = Math.round((loadedCount / totalImages) * 100);
          setProgress(currentProgress);
          resolve(src);
        };
        img.onerror = reject;
        img.src = src;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        setTimeout(() => {
          setIsLoadingComplete(true);
        }, 500);
      })
      .catch((error) => {
        console.error('Error loading images:', error);
        setTimeout(() => {
          setIsLoadingComplete(true);
        }, 1000);
      });
  }, [imagesToPreload]);

  // Animate progress bar fill
  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [progress]);

  // Animate progress icon movement
  useEffect(() => {
    if (progressIconRef.current) {
      // Cap at slightly less than 100% to keep icon fully inside
      const iconPosition = Math.min(progress, 100); // Adjust 95 based on icon size

      gsap.to(progressIconRef.current, {
        left: `${iconPosition}%`,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [progress]);

  // Animate text pulsing when loading complete
  useEffect(() => {
    if (isLoadingComplete && tapTextRef.current) {
      gsap.to(tapTextRef.current, {
        opacity: 0.6,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }, [isLoadingComplete]);

  const handleClick = () => {
    if (isLoadingComplete && !isFadingOut) {
      setIsFadingOut(true);

      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            onLoadComplete();
          }
        });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 flex items-center justify-center z-50"
    >
      <div
        ref={layoutRef}
        className="absolute bg-gradient-to-br from-purple-900/95 via-purple-800/95 to-purple-700/95 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer"
        onClick={handleClick}
      >
        {/* Spinning Logo */}
        <div className="mb-8">
          <img
            ref={logoRef}
            src={images.logo}
            alt="Loading"
            style={{
              width: `${96 * scale}px`,
              height: `${96 * scale}px`,
            }}
            className="object-contain drop-shadow-2xl"
          />
        </div>

        {/* Enhanced Progress Bar Container */}
        <div
          className="relative"
          style={{
            width: `${400 * scale}px`,
            paddingTop: `${20 * scale}px`, // Add padding for icon space
            paddingBottom: `${20 * scale}px`,
          }}
        >
          {/* Moving Icon - Positioned to stay inside bar */}
          <div
            ref={progressIconRef}
            className="absolute pointer-events-none"
            style={{
              left: '0%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <img
              src={images.logo}
              alt="Progress Icon"
              className="drop-shadow-lg max-w-none"
              style={{
                width: `${32 * scale}px`,
                height: `${32 * scale}px`,
                filter: 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.8))',
              }}
            />
          </div>

          {/* Progress Bar Track */}
          <div
            className="relative rounded-full shadow-inner"
            style={{
              height: `${12 * scale}px`,
              background: 'rgba(139, 92, 246, 0.2)',
              border: `${2 * scale}px solid rgba(167, 139, 250, 0.3)`,
              zIndex: 1, // Lower z-index than icon
            }}
          >
            {/* Progress Bar Fill */}
            <div
              ref={progressBarRef}
              className="h-full rounded-full relative"
              style={{
                width: '0%',
                background: 'linear-gradient(90deg, #8B5CF6, #A78BFA, #C4B5FD)',
                boxShadow: '0 0 20px rgba(167, 139, 250, 0.6)',
                overflow: 'hidden',
              }}
            >
              {/* Animated shine effect */}
              <div
                className="absolute inset-0 animate-pulse"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                }}
              />
            </div>
          </div>

          {/* Glow effect under progress bar */}
          <div
            className="absolute -bottom-2 left-0 right-0 h-8 blur-xl opacity-50"
            style={{
              background: 'radial-gradient(ellipse, rgba(167, 139, 250, 0.6), transparent)',
            }}
          />
        </div>

        {/* Progress Text */}
        <div
          className="mt-6 text-white font-bold"
          style={{
            fontSize: `${24 * scale}px`,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          {progress}%
        </div>

        {/* Dynamic Text based on loading state */}
        {!isLoadingComplete ? (
          <div
            className="text-white font-bold mt-4"
            style={{
              fontSize: `${28 * scale}px`,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            Loading Assets...
          </div>
        ) : (
          <div
            ref={tapTextRef}
            className="text-white font-bold mt-4"
            style={{
              fontSize: `${28 * scale}px`,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            Click anywhere to enter
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;