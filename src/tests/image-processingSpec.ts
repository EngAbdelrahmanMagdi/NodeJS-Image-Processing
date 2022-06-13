import {
  thumbnailDirectory,
  imageDirectory,
} from './../image-processing/paths/index';
import ImageResize from './../image-processing/image-resize';
import path from 'path';

const source = path.resolve(imageDirectory, 'fjord.jpg');
const target = path.resolve(
  thumbnailDirectory,
  'imageName=fjord&width=400&height=400.jpg'
);
let imageObject: ImageResize = new ImageResize(source, 400, 400, target);

describe('Image Processing using Unit Test', (): void => {
  it('Valid Image', async (): Promise<void> => {
    expect(await imageObject.resizeImage()).toBe(true);
  });

  it('Valid image with valid source and target)', async (): Promise<void> => {
    imageObject = new ImageResize(source, 400, 400, target);
    expect(await imageObject.resizeImage()).toBe(true);
  });

  it('Image Resize not throw Error', async (): Promise<void> => {
    expect(async () => {
      await imageObject.resizeImage();
    }).not.toThrowError();
  });

  it('Wrong Source for Image)', async (): Promise<void> => {
    const invalidSource = path.resolve(imageDirectory, 'abdelrahman.jpg');
    imageObject = new ImageResize(invalidSource, 400, 400, target);
    expect(await imageObject.resizeImage()).toBe(false);
  });
  it('Wrong Target for Image', async (): Promise<void> => {
    const invalidTarget = path.resolve(
      'invalid path',
      'imageName=fjord&width=400&height=400.jpg'
    );
    imageObject = new ImageResize(source, 400, 400, invalidTarget);
    expect(await imageObject.resizeImage()).toBe(false);
  });

  it('Invaild dimension', async (): Promise<void> => {
    imageObject = new ImageResize(source, -400, -400, target);
    expect(await imageObject.resizeImage()).toBe(false);
  });
});
