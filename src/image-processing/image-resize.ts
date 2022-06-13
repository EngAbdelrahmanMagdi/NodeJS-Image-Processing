import sharp from 'sharp';
class ImageResize {
  source: string;
  width: number;
  height: number;
  target: string;

  constructor(src: string, width: number, height: number, target: string) {
    this.source = src;
    this.width = width;
    this.height = height;
    this.target = target;
  }

  resizeImage = async (): Promise<boolean> => {
    try {
      await sharp(this.source)
        .resize(this.width, this.height)
        .toFile(this.target);
      return true;
    } catch {
      return false;
    }
  };
}

export default ImageResize;
