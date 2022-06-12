import Image from './types/image';
import ImageResize from './image-resize';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { thumbnailDirectory, imageDirectory } from './paths';

export const getImageUrl = async (query: string): Promise<string | null> => {
  try {
    await fsPromises.access(query);
    return query;
  } catch {
    return null;
  }
};

export const setImageUrl = async (
  thumbnailName: Image
): Promise<string | null> => {
  if (
    thumbnailName.imageName || thumbnailName.height || thumbnailName.width )
   {
    console.log(thumbnailName.imageName);
    const source = path.resolve(imageDirectory, `${thumbnailName.imageName}.jpg`);
    const target = path.resolve(
      thumbnailDirectory,
      `imageName=${thumbnailName.imageName}&width=${thumbnailName.width}&height=${thumbnailName.height}.jpg`
    );

    const width = thumbnailName.width
      ? parseInt(thumbnailName.width)
      : null;
      
    const height = thumbnailName.height
      ? parseInt(thumbnailName.height)
      : null;

    const ImageObject = new ImageResize(source, width!, height!, target);

    const imageResized = await ImageObject.resizeImage();
    console.log(ImageObject.target);
    console.log(ImageObject.source);
    console.log(ImageObject.width);
    console.log(ImageObject.height);
    console.log(imageResized);
    if (imageResized) {
      return target;
    } else {
      console.log("first");
      return null;
    }
  } else {
    console.log('second');
    return null;
  }
};
