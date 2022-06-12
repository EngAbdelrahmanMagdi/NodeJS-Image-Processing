import express, { Router, Request, Response } from 'express';
import { getImagePath, getThumbnailPath } from './../image-processing/paths';
import { setImageUrl } from './../image-processing/index';
import Image from './../image-processing/types/image';

const routes: Router = express.Router();

const validateImage = (width: number, height: number): boolean => {
  if (Number.isNaN(width) || Number.isNaN(height)) {
    return false;
  }
  return true;
};

const handleApi = async (
  request: Request,
  response: Response
): Promise<void> => {
  if (request.query.imageName) {
    if (request.query.height || request.query.width) {
      let valid = validateImage(
        parseInt(request.query.width as string),
        parseInt(request.query.height as string)
      );
      if (valid) {
        let thumbnail = await getThumbnailPath(request.query);
        if (thumbnail) {
          console.log(thumbnail);
          response.sendFile(thumbnail);
        } else {
          let newThumbnail = await setImageUrl(request.query);
          console.log(newThumbnail);
          if (newThumbnail) {
            response.sendFile(newThumbnail);
          } else {
            response.status(200).json({ Message: 'Thumbnail not Found' });
          }
        }
      }
    } else {
      const image = await getImagePath(request.query.imageName as Image);
      if (image) {
        response.sendFile(image);
      } else {
        response.status(200).json({ Message: 'Image is not valid' });
      }
    }
  } else {
    response.status(404).json({ Message: "Image doesn't existed" });
  }
};

routes.get('/', handleApi);

export default routes;
