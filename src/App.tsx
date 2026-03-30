import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import KeqingShowcase from './components/KeqingShowcase';
import images from './constants/images';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [startAnimations, setStartAnimations] = useState(false);

  const imagesToPreload = [
    images.logo,
    images.github_btn,
    images.github_btn_hover,
    images.info_btn,
    images.info_btn_hover,
    images.share_btn,
    images.share_btn_hover,
    images.up_sidebar,
    images.up_sidebar_glow,
    images.down_sidebar,
    images.down_sidebar_glow,
    images.keqing_bg,
    images.keqing_img,
    images.keqing_backtext1,
    images.keqing_backtext2,
    images.keqing_nameplate,
    images.keqing_sidebar,
    images.keqing_sidebar_glow,
    images.citlali_bg,
    images.citlali_img,
    images.citlali_backtext1,
    images.citlali_backtext2,
    images.citlali_nameplate,
    images.citlali_sidebar,
    images.citlali_sidebar_glow,
  ];

  const handleLoadComplete = () => {
    setIsLoading(false);
    // Start animations when loading screen fades
    setStartAnimations(true);
  };

  return (
    <>
      {/* Pass startAnimations prop */}
      <KeqingShowcase startAnimations={startAnimations} />

      {isLoading && (
        <LoadingScreen
          imagesToPreload={imagesToPreload}
          onLoadComplete={handleLoadComplete}
        />
      )}
    </>
  );
}

export default App;