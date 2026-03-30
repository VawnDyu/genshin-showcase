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
    images.character_details_btn,
    images.character_details_btn_hover,
    images.info_modal,
    images.up_sidebar,
    images.up_sidebar_glow,
    images.down_sidebar,
    images.down_sidebar_glow,
    images.keqing_bg,
    images.keqing_img,
    images.keqing_header,
    images.keqing_subheader,
    images.keqing_backtext1,
    images.keqing_backtext2,
    images.keqing_sidebar,
    images.keqing_sidebar_glow,
    images.keqing_nameplate,
    images.citlali_bg,
    images.citlali_img,
    images.citlali_header,
    images.citlali_subheader,
    images.citlali_backtext1,
    images.citlali_backtext2,
    images.citlali_sidebar,
    images.citlali_sidebar_glow,
    images.citlali_nameplate,
    images.chiori_bg,
    images.chiori_img,
    images.chiori_header,
    images.chiori_subheader,
    images.chiori_backtext1,
    images.chiori_backtext2,
    images.chiori_sidebar,
    images.chiori_sidebar_glow,
    images.chiori_nameplate,
    images.skirk_bg,
    images.skirk_img,
    images.skirk_header,
    images.skirk_subheader,
    // images.skirk_backtext1,
    // images.skirk_backtext2,
    images.skirk_sidebar,
    images.skirk_sidebar_glow,
    images.skirk_nameplate,
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