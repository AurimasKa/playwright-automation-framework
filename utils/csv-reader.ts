import * as fs from 'fs';
import * as path from 'path';

export interface SearchFilterData {
  searchQuery: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  productIndex: number;
}

export function readCSV(filePath: string): SearchFilterData[] {
  const projectRoot = process.cwd();
  const fullPath = path.resolve(projectRoot, filePath);
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const lines = fileContent.trim().split('\n');
  
  const dataLines = lines.slice(1).filter(line => line.trim().length > 0);
  
  return dataLines.map(line => {
    const [searchQuery, brand, minPrice, maxPrice, productIndex] = line.split(',');
    return {
      searchQuery: searchQuery.trim(),
      brand: brand.trim(),
      minPrice: parseInt(minPrice.trim(), 10),
      maxPrice: parseInt(maxPrice.trim(), 10),
      productIndex: parseInt(productIndex.trim(), 10),
    };
  });
}

