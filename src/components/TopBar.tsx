import { useState, useRef, useEffect } from 'react';
import images from '../constants/images';
import { setTopBarInitialState, animateTopBarContainer } from '../utils/animations';
import InfoModal from './InfoModal';

interface TopBarProps {
  onGitHubClick?: () => void;
  onInfoClick?: () => void;
  onShareClick?: () => void;
  startAnimations?: boolean;
}

// Base design resolution (match your useResponsiveLayout)
const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

// Base position values at 1920x1080
const BASE_RIGHT = 270; // Your desired position at design resolution
const BASE_TOP = 75;    // Your desired position at design resolution

const TopBar = ({
  onGitHubClick,
  onInfoClick,
  onShareClick,
  startAnimations = false,
}: TopBarProps) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const topBarRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Calculate scale based on layout (matches useResponsiveLayout logic)
  useEffect(() => {
    const updateScale = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const windowRatio = windowWidth / windowHeight;
      const designRatio = DESIGN_WIDTH / DESIGN_HEIGHT;

      let layoutWidth;

      if (windowRatio > designRatio) {
        // Window is WIDER - fit to height
        const layoutHeight = windowHeight;
        layoutWidth = layoutHeight * designRatio;
      } else {
        // Window is TALLER - fit to width
        layoutWidth = windowWidth;
      }

      const currentScale = layoutWidth / DESIGN_WIDTH;
      setScale(currentScale);

      console.log('TopBar Debug:', {
        windowSize: `${windowWidth}x${windowHeight}`,
        layoutWidth,
        scale: currentScale,
        buttonSize: `${72 * currentScale}px`,
        position: `right: ${BASE_RIGHT * currentScale}px, top: ${BASE_TOP * currentScale}px`
      });
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  useEffect(() => {
    if (!topBarRef.current) return;

    // ALWAYS set initial state immediately
    setTopBarInitialState(topBarRef.current);

    // Only animate if startAnimations is true
    if (!startAnimations) return;

    const tl = animateTopBarContainer(topBarRef.current);

    // Force remove any GSAP transforms that might interfere
    return () => {
      if (topBarRef.current) {
        topBarRef.current.style.transform = '';
      }
      tl.kill();
    };
  }, [startAnimations]);

  useEffect(() => {
    // Apply scale transform after GSAP animation
    if (topBarRef.current) {
      const currentTransform = topBarRef.current.style.transform;
      // Preserve GSAP's translate but add our scale
      if (currentTransform && currentTransform.includes('translate')) {
        topBarRef.current.style.transform = `${currentTransform} scale(${scale})`;
      } else {
        topBarRef.current.style.transform = `scale(${scale})`;
      }
      topBarRef.current.style.transformOrigin = 'top right';

      console.log('TopBar scale applied:', scale);
    }
  }, [scale]);

  const handleGitHubClick = () => {
    if (onGitHubClick) {
      onGitHubClick();
    } else {
      // Default action: open GitHub repo
      window.open('https://github.com/yourusername/your-repo', '_blank');
    }
  };

  const handleInfoClick = () => {
    if (onInfoClick) {
      onInfoClick();
    } else {
      // Default action: show info modal or alert
      setIsModalOpen(true);
    }
  };

  const handleShareClick = () => {
    if (onShareClick) {
      onShareClick();
    } else {
      // Default action: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const buttonStyle = (isHovered: boolean) => ({
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    transition: 'all 0.2s ease',
  });

  const buttonSize = 72 * scale; // Calculate once
  const gapSize = 20 * scale;

  return (
    <>
      <div
        ref={topBarRef}
        className="absolute z-50 pointer-events-none"
        style={{
          right: `${BASE_RIGHT * scale}px`,
          top: `${BASE_TOP * scale}px`,
        }}
      >
        <div className="flex items-center pointer-events-auto" style={{ gap: `${gapSize}px` }}>
          {/* GitHub Button */}
          <button
            onClick={handleGitHubClick}
            onMouseEnter={() => setHoveredButton('github')}
            onMouseLeave={() => setHoveredButton(null)}
            className="cursor-pointer bg-transparent border-none p-0"
            style={buttonStyle(hoveredButton === 'github')}
            aria-label="GitHub"
          >
            <img
              src={hoveredButton === 'github' ? images.github_btn_hover : images.github_btn}
              alt="GitHub"
              className="object-contain pointer-events-none"
              style={{ width: `${buttonSize}px`, height: `${buttonSize}px` }}
              draggable={false}
            />
          </button>

          {/* Info Button */}
          <button
            onClick={handleInfoClick}
            onMouseEnter={() => setHoveredButton('info')}
            onMouseLeave={() => setHoveredButton(null)}
            className="cursor-pointer bg-transparent border-none p-0"
            style={buttonStyle(hoveredButton === 'info')}
            aria-label="Info"
          >
            <img
              src={hoveredButton === 'info' ? images.info_btn_hover : images.info_btn}
              alt="Info"
              className="object-contain pointer-events-none"
              style={{ width: `${buttonSize}px`, height: `${buttonSize}px` }}
              draggable={false}
            />
          </button>

          {/* Share Button */}
          <button
            onClick={handleShareClick}
            onMouseEnter={() => setHoveredButton('share')}
            onMouseLeave={() => setHoveredButton(null)}
            className="cursor-pointer bg-transparent border-none p-0"
            style={buttonStyle(hoveredButton === 'share')}
            aria-label="Share"
          >
            <img
              src={hoveredButton === 'share' ? images.share_btn_hover : images.share_btn}
              alt="Share"
              className="object-contain pointer-events-none"
              style={{ width: `${buttonSize}px`, height: `${buttonSize}px` }}
              draggable={false}
            />
          </button>
        </div>
      </div>

      {/* Info Modal */}
      <InfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalImage={images.info_modal}
      />
    </>
  );
};

export default TopBar;