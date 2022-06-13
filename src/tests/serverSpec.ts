import server from './../server';
import supertest, { SuperTest, Response, Test } from 'supertest';

const request: SuperTest<Test> = supertest(server);

describe('Endpoint tests', (): void => {
  describe('Test of Home url /', (): void => {
    it('gets /', async (): Promise<void> => {
      const response: Response = await request.get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('Test /api/image Endpoint', (): void => {
    it('404 Not Found', async (): Promise<void> => {
      const response: Response = await request.get('/api/image');
      expect(response.status).toBe(404);
    });
  });

  describe('Test /image Endpoint', (): void => {
    it('404 Not Found', async (): Promise<void> => {
      const response: Response = await request.get('/image');
      expect(response.status).toBe(404);
    });
  });

  describe('Test /api/images', (): void => {
    it('you did not enter image name', async (): Promise<void> => {
      const response: Response = await request.get('/api/images');
      expect(response.status).toBe(404);
    });
    it('Bring imageName=palmtunnel with the help of cache', async (): Promise<void> => {
      const response: Response = await request.get(
        '/api/images?imageName=palmtunnel'
      );
      expect(response.status).toBe(200);
    });
    it('Bring imageName=WronG Name', async (): Promise<void> => {
      const response: Response = await request.get(
        '/api/images?imageName=abdelrahman'
      );
      expect(response.status).toBe(200);
    });

    it('imageName=palmtunnel came back with new width and height', async (): Promise<void> => {
      const response: Response = await request.get(
        '/api/images?imageName=palmtunnel&width=500&height=500'
      );
      expect(response.status).toBe(200);
    });
  });
});
