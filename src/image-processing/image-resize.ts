import sharp from "sharp";

class ImageResize {
  source: string;
  width: number;
  height: number;
  target: string;
  
  constructor(src: string, target: string, width: number, height: number) {
    this.source = src ;
    this.width = width;
    this.height = height;
    this.target = target;

  }

   resizeImage = async():Promise<void>=>{
    await sharp(this.source).resize(this.width, this.height).toFile(this.target);
  }

}

export default ImageResize;
