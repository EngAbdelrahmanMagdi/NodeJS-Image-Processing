import path from 'path';
import Image from './../types/image';
import { getImageUrl } from './../index';

export const thumbnailDirectory = path.resolve(
  __dirname,
  './../../../assets/images/thumbnails'
);
export const imageDirectory = path.resolve(
  __dirname,
  './../../../assets/images/full'
);

export const getImagePath = async (
  imageName: Image
): Promise<string | null> => {
  try {
    const image = path.resolve(imageDirectory, `${imageName}.jpg`);
    return await getImageUrl(image);
  } catch {
    return null;
  }
};

export const getThumbnailPath = async (
  thumbnailName: Image
): Promise<string | null> => {
  try {
    const thumbnail = path.resolve(
      thumbnailDirectory,
      `imageName=${thumbnailName.imageName}&width=${thumbnailName.width}&height=${thumbnailName.height}.jpg`
    );
    const returnedResult = await getImageUrl(thumbnail);
    return returnedResult;
  } catch {
    return null;
  }
};
