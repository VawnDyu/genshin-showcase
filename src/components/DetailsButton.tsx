import { useState, useRef, useEffect } from 'react';
import images from '../constants/images';
import { setDetailsButtonInitialState, animateDetailsButton } from '../utils/animations';

interface DetailsButtonProps {
  onClick: () => void;
  startAnimations?: boolean;
}

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;
const DESIGN_RATIO = DESIGN_WIDTH / DESIGN_HEIGHT;

const BASE_RIGHT = 80;
const BASE_TOP = 540;

const DetailsButton = ({ onClick, startAnimations = false }: DetailsButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const windowRatio = windowWidth / windowHeight;

      let layoutWidth;

      if (windowRatio > DESIGN_RATIO) {
        const layoutHeight = windowHeight;
        layoutWidth = layoutHeight * DESIGN_RATIO;
      } else {
        layoutWidth = windowWidth;
      }

      const currentScale = layoutWidth / DESIGN_WIDTH;
      setScale(currentScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  // Animation - now using centralized functions
  useEffect(() => {
    if (!buttonRef.current) return;

    // ALWAYS set initial state
    setDetailsButtonInitialState(buttonRef.current);

    // Only animate if startAnimations is true
    if (!startAnimations) return;

    const tl = animateDetailsButton(buttonRef.current);

    return () => {
      tl.kill();
    };
  }, [startAnimations]);

  const buttonStyle = {
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    transition: 'all 0.2s ease',
  };

  return (
    <div
      ref={buttonRef}
      className="absolute z-50 pointer-events-auto"
      style={{
        right: `${BASE_RIGHT * scale}px`,
        top: `${BASE_TOP * scale}px`,
      }}
    >
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="cursor-pointer bg-transparent border-none p-0"
        style={buttonStyle}
        aria-label="Character Details"
      >
        <img
          src={isHovered ? images.character_details_btn_hover : images.character_details_btn}
          alt="Details"
          className="object-contain pointer-events-none"
          style={{
            width: `${72 * scale}px`,
            height: `${72 * scale}px`,
          }}
          draggable={false}
        />
      </button>
    </div>
  );
};

export default DetailsButton;