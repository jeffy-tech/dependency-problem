import request from 'supertest';
import app from '../src/app';

describe('/package/:name/:version endpoint', () => {
  const packageName = 'react';
  const packageVersion = '16.13.0';

  it('responds 200 status code if found', async () => {
    const response = await request(app).get(`/dependency/${packageName}/${packageVersion}`);
    expect(response.statusCode).toBe(200);
  });

  it('responds with proper name/version/dependencies', async () => {
    const { body } = await request(app).get(`/dependency/${packageName}/${packageVersion}`);
    expect(body.name).toEqual(packageName);
    expect(body.version).toEqual(packageVersion);
    expect(body.dependencies).toBeDefined();
    expect(Object.keys(body.dependencies).length).toBe(3);
  });
});
