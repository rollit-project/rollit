import carousel from '@/assets/images/carousel.png';
import chair from '@/assets/images/chair.png';
import coster from '@/assets/images/coster.png';
import cream from '@/assets/images/cream.png';
import racer from '@/assets/images/racer.png';
import smile from '@/assets/images/smile.png';
import stall from '@/assets/images/stall.png';
import steel from '@/assets/images/steel.png';
import stone from '@/assets/images/stone.png';
import vine from '@/assets/images/vine.png';
import windmill from '@/assets/images/windmill.png';

const costerImages = [{ src: coster, name: 'coster' }];

const trackImages = [
  { src: steel, name: 'steel' },
  { src: stone, name: 'stone' },
  { src: vine, name: 'vine' },
  { src: smile, name: 'smile' },
];

const itemImages = [
  { src: carousel, name: 'carousel' },
  { src: chair, name: 'chair' },
  { src: cream, name: 'cream' },
  { src: racer, name: 'racer' },
  { src: windmill, name: 'windmill' },
  { src: stall, name: 'stall' },
];

const imageSets = {
  coster: costerImages,
  track: trackImages,
  item: itemImages,
};

export const imageList = (track) => imageSets[track] || [];
