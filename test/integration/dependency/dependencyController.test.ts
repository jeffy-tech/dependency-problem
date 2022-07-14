import axios, { AxiosError } from 'axios';
import { Server } from 'http';
import app from '../../../src/app';

describe('/package/:name/:version endpoint', () => {
  let server: Server;
  let port: number;

  beforeAll(async () => {
    port = 3000;
    server = app.listen(port);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('responds 200', async () => {
    const packageName = 'react';
    const packageVersion = '16.13.0';

    const { data } = await axios(`http://localhost:${port}/dependency/${packageName}/${packageVersion}`);

    expect(data.name).toEqual(packageName);
    expect(data.version).toEqual(packageVersion);
  });

  it('fails when key package not in registry', async () => {
    const packageName = 'react';
    const packageVersion = '16.13.79';

    try {
      const response = await axios(`http://localhost:${port}/dependency/${packageName}/${packageVersion}`);
      throw new Error("Shouldn't get here");
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toContain('500');
    }
  });
});
