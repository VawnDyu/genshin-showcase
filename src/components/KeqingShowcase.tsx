// src/components/KeqingShowcase.tsx
import { useRef, useState, useMemo } from 'react';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';
import { useShowcaseAnimations } from '../hooks/useShowcaseAnimations';
import CharacterSidebar from './CharacterSidebar';
import { getCharacterData } from '../constants/characterData';
import TopBar from './TopBar';
import DetailsModal from './DetailsModal';
import DetailsButton from './DetailsButton';

interface KeqingShowcaseProps {
  startAnimations?: boolean;
}

const KeqingShowcase = ({ startAnimations = false }: KeqingShowcaseProps) => {

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const characterRef = useRef<HTMLImageElement>(null);
  const headerRef = useRef<HTMLImageElement>(null);
  const subheaderRef = useRef<HTMLImageElement>(null);
  const backtextRef1 = useRef<HTMLImageElement>(null);
  const backtextRef2 = useRef<HTMLImageElement>(null);

  // State
  const [activeCharacter, setActiveCharacter] = useState('keqing');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const currentData = getCharacterData(activeCharacter);

  // Custom hooks
  useResponsiveLayout({ containerRef, layoutRef });

  const animationRefs = useMemo(() => ({
    bgRef,
    keqingRef: characterRef,
    headerRef,
    subheaderRef,
    backtextRef1,
    backtextRef2,
    layoutRef
  }), [bgRef, characterRef, headerRef, subheaderRef, backtextRef1, backtextRef2, layoutRef]);

  useShowcaseAnimations(
    animationRefs, // Use the memoized object
    activeCharacter,
    startAnimations,
  );

  // Handle character selection
  const handleCharacterSelect = (characterId: string) => {
    setActiveCharacter(characterId);
    console.log('Switched to character:', characterId);
  };

  if (!currentData) return null;

  return (
    <div
      id="flexible-fullscreen-body"
      ref={containerRef}
      className="absolute select-none overflow-hidden"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div id="layout" ref={layoutRef} className="relative overflow-hidden">
        {/* Background Layer */}
        <div id="canvas-bg" className="absolute top-0 left-0 w-full h-full">
          <img
            ref={bgRef}
            src={currentData.bg}
            alt={`${currentData.name} Background`}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />

          <div className="effect-wrap relative w-full h-full">

            {/* Backtext Layer 1 */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center">
              <img
                ref={backtextRef1}
                src={currentData.backtext1}
                alt="Backtext 1"
                className="h-full object-contain pointer-events-none"
                draggable={false}
              />
            </div>

            {/* Backtext Layer 2 */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center">
              <img
                ref={backtextRef2}
                src={currentData.backtext2}
                alt="Backtext 2"
                className="h-full object-contain pointer-events-none"
                draggable={false}
              />
            </div>

            {/* Character Layer */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center">
              <img
                ref={characterRef}
                src={currentData.character}
                alt={currentData.name}
                className="h-full object-contain pointer-events-none"
                draggable={false}
              />
            </div>

            {/* Header Layer */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center">
              <img
                ref={headerRef}
                src={currentData.header}
                alt="Header"
                className="h-full object-contain pointer-events-none"
                draggable={false}
              />
            </div>

            {/* Subheader Layer */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center">
              <img
                ref={subheaderRef}
                src={currentData.subheader}
                alt="Subheader"
                className="h-full object-contain pointer-events-none"
                draggable={false}
              />
            </div>

            {/* Debug Info */}
            {/* <div className="fixed bottom-5 right-5 bg-black/60 text-white px-4 py-2 rounded-md z-[9999] font-mono text-sm">
              Character: {currentData.name}
              <br />
              VW: {window.innerWidth}
              <br />
              VH: {window.innerHeight}
            </div> */}
          </div>
        </div>
            {/* Character Sidebar */}
            <CharacterSidebar
              activeCharacter={activeCharacter}
              onCharacterSelect={handleCharacterSelect}
              startAnimations={startAnimations}
            />

            {/* TopBar */}
            <TopBar startAnimations={startAnimations} />

            <DetailsButton
              onClick={() => setIsDetailsModalOpen(true)}
              startAnimations={startAnimations}
            />

            <DetailsModal
              isOpen={isDetailsModalOpen}
              onClose={() => setIsDetailsModalOpen(false)}
              characterId={activeCharacter}
            />
      </div>
    </div>
  );
};

export default KeqingShowcase;