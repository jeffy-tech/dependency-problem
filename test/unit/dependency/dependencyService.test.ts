import { getDependency } from '../../../src/dependency/dependencyService';

describe('dependencyService', () => {
  it('should return the dependency name and version', async () => {
    const result = await getDependency('react', '16.13.0');
    
    expect(result).toBeDefined()
    expect(result.name).toBe('react');
    expect(result.version).toBe('16.13.0');
    expect(result.dependencies).toBeDefined();
  });
});
