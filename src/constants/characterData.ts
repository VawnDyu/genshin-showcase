// src/constants/characterData.ts
import images from './images';

export interface CharacterData {
  id: string;
  name: string;
  bg: string;
  character: string;
  header: string;
  subheader: string;
  backtext1: string;
  backtext2: string;
  sidebar: string;
  sidebarGlow: string;
  nameplate: string;
}

export const charactersData: CharacterData[] = [
  {
    id: 'keqing',
    name: 'Keqing',
    bg: images.keqing_bg,
    character: images.keqing_img,
    header: images.keqing_header,
    subheader: images.keqing_subheader,
    backtext1: images.keqing_backtext1,
    backtext2: images.keqing_backtext2,
    sidebar: images.keqing_sidebar,
    sidebarGlow: images.keqing_sidebar_glow,
    nameplate: images.keqing_nameplate,
  },
  {
    id: 'citlali',
    name: 'Citlali',
    bg: images.citlali_bg,
    character: images.citlali_img,
    header: images.citlali_header,
    subheader: images.citlali_subheader,
    backtext1: images.citlali_backtext1,
    backtext2: images.citlali_backtext2,
    sidebar: images.citlali_sidebar,
    sidebarGlow: images.citlali_sidebar_glow,
    nameplate: images.citlali_nameplate,
  },
  {
    id: 'chiori',
    name: 'Chiori',
    bg: images.chiori_bg,
    character: images.chiori_img,
    header: images.chiori_header,
    subheader: images.chiori_subheader,
    backtext1: images.chiori_backtext1,
    backtext2: images.chiori_backtext2,
    sidebar: images.chiori_sidebar,
    sidebarGlow: images.chiori_sidebar_glow,
    nameplate: images.chiori_nameplate,
  },
  {
    id: 'skirk',
    name: 'Skirk',
    bg: images.skirk_bg,
    character: images.skirk_img,
    header: images.skirk_header,
    subheader: images.skirk_subheader,
    backtext1: images.skirk_backtext1,
    backtext2: images.skirk_backtext2,
    sidebar: images.skirk_sidebar,
    sidebarGlow: images.skirk_sidebar_glow,
    nameplate: images.skirk_nameplate,
  },
];

export const getCharacterData = (id: string): CharacterData | undefined => {
  return charactersData.find(char => char.id === id);
};