import { getDependency } from '../../src/dependency/dependencyService';

describe('dependencyService', () => {
  it('should return the dependency name and version', async () => {
    const result = await getDependency('react', '16.13.0');
    const { name, version, dependencies } = result;
    expect(name).toBe('react');
    expect(version).toBe('16.13.0');
    expect(dependencies).toBeDefined();
  });
});
