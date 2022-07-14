import { getDependency, getDependencyDifferences } from '../../../src/dependency/dependencyService';
import { NPMPackageParams } from '../../../src/types';

describe('dependencyService', () => {
  describe('getDependency', () => {
    it('should return the dependency information', async () => {
      const result = await getDependency('react', '16.13.0');
      
      expect(result).toBeDefined()
      expect(result.name).toBe('react');
      expect(result.version).toBe('16.13.0');
      expect(result.dependencies).toBeDefined();
    });
  })
  
  describe('getDependencyDifferences', () => {
    it('should return the dependency information with dependencyDifferences', async () => {
      const result = await getDependencyDifferences('react', '16.13.0');
      
      expect(result).toBeDefined()
      expect(result.name).toBe('react');
      expect(result.version).toBe('16.13.0');
      expect(result.dependencies).toBeDefined();
      expect(result.dependencyDifferences).toBeDefined()
    });
  
    it('should return the dependency comparison otherPackage', async() => {
      const otherPackages: Array<NPMPackageParams> = [{name: "react", version: "17.0.0"}]
      const result = await getDependencyDifferences('react', '16.13.0', otherPackages);

      expect(result).toBeDefined()
      expect(result.name).toBe('react');
      expect(result.version).toBe('16.13.0');
      expect(result.dependencies).toBeDefined();
  
      expect(result.dependencyDifferences).toBeDefined()
    })
  })
});
