import sharp from 'sharp';
import { thumbnailDirectory } from './paths';
import { promises as fsPromises } from 'fs';
class ImageResize {
  source: string;
  width: number;
  height: number;
  target: string;

  constructor(src: string, target: string, width: number, height: number) {
    this.source = src;
    this.width = width;
    this.height = height;
    this.target = target;
  }
  checkThumbDir = async (): Promise<void> => {
    if (!thumbnailDirectory) {
      await fsPromises.mkdir(thumbnailDirectory);
    }
  };

  resizeImage = async (): Promise<void> => {
    await this.checkThumbDir();
    await sharp(this.source)
      .resize(this.width, this.height)
      .toFile(this.target);
  };
}

export default ImageResize;
