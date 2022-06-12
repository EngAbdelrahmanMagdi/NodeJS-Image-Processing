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
    thumbnailName.imageName &&
    (thumbnailName.height || thumbnailName.width || null)
  ) {
    const source = path.resolve(imageDirectory, `${thumbnailName}.jpg`);
    const target = path.resolve(
      thumbnailDirectory,
      `imageName=${thumbnailName}&width=${thumbnailName.width}&height=${thumbnailName.height}`
    );

    const width = thumbnailName.width
      ? parseInt(thumbnailName.width)
      : undefined;
    const height = thumbnailName.height
      ? parseInt(thumbnailName.height)
      : undefined;

    const ImageObject = new ImageResize(source, width!, height!, target);

    const imageResized = await ImageObject.resizeImage();

    if (imageResized) {
      return target;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
