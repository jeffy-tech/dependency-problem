import axios from 'axios';
import { Server } from 'http';
import app from '../../../src/app';

describe('/package/:name/:version endpoint', () => {
  let server: Server;
  let port: number;

  beforeAll(async () => {
    port = 3000
    server = app.listen(port);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('responds', async () => {
    const packageName = 'react';
    const packageVersion = '16.13.0';

    const res: any = (await axios(
      `http://localhost:${port}/dependency/${packageName}/${packageVersion}`,
    )).data;

    expect(res.name).toEqual(packageName);
    expect(res.version).toEqual(packageVersion);
  });
});