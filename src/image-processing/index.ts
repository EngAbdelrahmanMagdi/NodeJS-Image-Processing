import Image from './types/image';
import ImageResize from './image-resize';
import { promises as fsPromises } from 'fs';

export const getImageUrl = async (query: string): Promise<string | null> => {
  try {
    await fsPromises.access(query);
    return query;
  } catch {
    return null;
  }
};
