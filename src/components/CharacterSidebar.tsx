// src/components/CharacterSidebar.tsx
import { useRef, useEffect, useState } from 'react';
import { setSidebarInitialState, animateSidebarContainer } from '../utils/animations';
import images from '../constants/images';
import { charactersData } from '../constants/characterData';

interface CharacterSidebarProps {
  activeCharacter: string;
  onCharacterSelect: (characterId: string) => void;
  startAnimations?: boolean;
}

// Replace the hardcoded characters array with:
const characters = charactersData.map(char => ({
  id: char.id,
  name: char.name,
  image: char.sidebar
}));

// Update the nameplates and glowImages mappings:
const nameplates: { [key: string]: string } = {};
const glowImages: { [key: string]: string } = {};

charactersData.forEach(char => {
  nameplates[char.id] = char.nameplate;
  glowImages[char.id] = char.sidebarGlow;
});

const CharacterSidebar = ({ activeCharacter, onCharacterSelect, startAnimations = false }: CharacterSidebarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sidebarRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const containerAnimationRef = useRef<gsap.core.Timeline | null>(null);
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);

  // Maximum characters to show at once
  const maxVisibleCharacters = 3; // Change to 3 if you want to show 3 characters

  // Get current character index
  const currentIndex = characters.findIndex(char => char.id === activeCharacter);

  // Calculate which characters to show
  const visibleCharacters = characters.slice(visibleStartIndex, visibleStartIndex + maxVisibleCharacters);

  // Handle up button - select previous character (will auto-scroll to top)
  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevCharacter = characters[currentIndex - 1];
      onCharacterSelect(prevCharacter.id);
      // Auto-scroll happens in useEffect
    }
  };

  // Handle down button - select next character (will auto-scroll to top)
  const handleNext = () => {
    if (currentIndex < characters.length - 1) {
      const nextCharacter = characters[currentIndex + 1];
      onCharacterSelect(nextCharacter.id);
      // Auto-scroll happens in useEffect
    }
  };

  // Check if buttons should be disabled
  const isUpDisabled = currentIndex <= 0;
  const isDownDisabled = currentIndex >= characters.length - 1;

  const DESIGN_WIDTH = 1920;
  const DESIGN_HEIGHT = 1080;
  const BASE_LEFT = 64; // left-16 = 64px at 1920x1080

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const windowRatio = windowWidth / windowHeight;
      const designRatio = DESIGN_WIDTH / DESIGN_HEIGHT;

      let layoutWidth;

      if (windowRatio > designRatio) {
        const layoutHeight = windowHeight;
        layoutWidth = layoutHeight * designRatio;
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

  // Auto-scroll logic for 3-slot behavior
  useEffect(() => {
    if (currentIndex <= 1) {
      // Keqing (0) or Citlali (1)
      // Always show: 0,1,2
      setVisibleStartIndex(0);
    } else {
      // Chiori (2) or Skirk (3)
      // Always show: 1,2,3
      setVisibleStartIndex(1);
    }
  }, [currentIndex]);

  // Sidebar container slide-in animation - only runs once on mount
  useEffect(() => {
    if (!containerRef.current) return;

    setSidebarInitialState(containerRef.current);

    // Only animate if startAnimations is true
    if (!startAnimations) return;

    if (containerAnimationRef.current) {
      containerAnimationRef.current.kill();
    }

    containerAnimationRef.current = animateSidebarContainer(containerRef.current);

    return () => {
      if (containerAnimationRef.current) {
        containerAnimationRef.current.kill();
      }
    };
  }, [startAnimations]);

  return (
    <div
      ref={containerRef}
      className="absolute top-1/2 -translate-y-1/2 z-50 flex flex-col items-center"
      style={{
        left: `${BASE_LEFT * scale}px`,
        gap: `${4 * scale}px` // gap-1 = 4px
      }}
    >
      {/* Up Sidebar Button */}
      <button
        className="relative flex items-center justify-center transition-transform hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          width: `${58 * scale}px`,
          height: `${58 * scale}px`
        }}
        onMouseEnter={() => setHoveredButton('up')}
        onMouseLeave={() => setHoveredButton(null)}
        onClick={handlePrevious}
        disabled={isUpDisabled}
        aria-label="Previous Character"
      >
        <img
          src={isUpDisabled ? images.up_sidebar : (hoveredButton === 'up' ? images.up_sidebar_glow : images.up_sidebar)}
          alt="Previous"
          className="w-full h-full object-contain pointer-events-none"
          draggable={false}
        />
      </button>

      {/* Character Buttons - Show only visible characters */}
      <div className="flex flex-col transition-all duration-300 gap-1">
        {visibleCharacters.map((character) => (
          <button
            key={character.id}
            onClick={() => onCharacterSelect(character.id)}
            onMouseEnter={() => setHoveredCharacter(character.id)}
            onMouseLeave={() => setHoveredCharacter(null)}
            className="relative group flex items-center justify-center"
            style={{
              width: `${168 * scale}px`,
              height: `${168 * scale}px`
            }}
            aria-label={`Select ${character.name}`}
          >
            <div
              ref={(el) => { sidebarRefs.current[character.id] = el; }}
              className="flex items-center justify-center relative w-full h-full"
            >
              {/* Show base image OR glow image - instant swap, no fade */}
              {(hoveredCharacter === character.id || activeCharacter === character.id) ? (
                <img
                  src={glowImages[character.id]}
                  alt={`${character.name} glow`}
                  className="object-cover pointer-events-none transition-all duration-300"
                  style={{
                    width: `${activeCharacter === character.id ? 168 * scale : 144 * scale}px`,
                    height: `${activeCharacter === character.id ? 168 * scale : 144 * scale}px`
                  }}
                  draggable={false}
                />
              ) : (
                <img
                  src={character.image}
                  alt={character.name}
                  className="object-cover pointer-events-none transition-all duration-300"
                  style={{
                    width: `${activeCharacter === character.id ? 168 * scale : 144 * scale}px`,
                    height: `${activeCharacter === character.id ? 168 * scale : 144 * scale}px`
                  }}
                  draggable={false}
                />
              )}
            </div>

            {/* Character nameplate tooltip */}
            {nameplates[character.id] && (
              <div
                className={`
                  absolute left-full ml-4 top-1/2 -translate-y-1/2
                  pointer-events-none
                  transition-all duration-300 ease-out
                  ${hoveredCharacter === character.id
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-5'
                  }
                `}
                style={{
                  zIndex: 9999,
                }}
              >
                <img
                  src={nameplates[character.id]}
                  alt={`${character.name} nameplate`}
                  className="object-contain"
                  style={{
                    height: 'auto',
                    width: `${250 * scale}px`,
                    maxWidth: 'none',
                    marginLeft: `${16 * scale}px` // ml-4 = 16px
                  }}
                  draggable={false}
                />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Down Sidebar Button */}
      <button
        className="relative flex items-center justify-center transition-transform hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          width: `${58 * scale}px`,
          height: `${58 * scale}px`
        }}
        onMouseEnter={() => setHoveredButton('down')}
        onMouseLeave={() => setHoveredButton(null)}
        onClick={handleNext}
        disabled={isDownDisabled}
        aria-label="Next Character"
      >
        <img
          src={isDownDisabled ? images.down_sidebar : (hoveredButton === 'down' ? images.down_sidebar_glow : images.down_sidebar)}
          alt="Next"
          className="w-full h-full object-contain pointer-events-none"
          draggable={false}
        />
      </button>
    </div>
  );
};

export default CharacterSidebar;