import { readFileSync } from 'fs';
import { join } from 'path';

interface Product {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  price: string;
  images: string[];
  rating: number;
  reviews: number;
  category: {
    en: string;
    ar: string;
  };
}

interface BusinessHours {
  day: string;
  hours: string;
  isOpen: boolean;
}

// Simple frontmatter parser
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content: content };
  }
  
  const frontmatterStr = match[1];
  const bodyContent = content.replace(frontmatterRegex, '').trim();
  
  // Simple YAML-like parsing
  const frontmatter: Record<string, string> = {};
  const lines = frontmatterStr.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  }
  
  return { frontmatter, content: bodyContent };
}

// Parse product data from MDX content
function parseProductsFromMDX(content: string): Product[] {
  const products: Product[] = [];
  
  // Split content by product sections (### headers)
  const productSections = content.split(/###\s+/).filter(section => section.trim());
  
  for (const section of productSections) {
    const lines = section.split('\n');
    const productName = lines[0]?.trim();
    
    if (!productName) continue;
    
    const product: Partial<Product> = {
      name: { en: productName, ar: '' },
      description: { en: '', ar: '' },
      category: { en: '', ar: '' },
      images: [],
    };
    
    // Parse product properties
    for (const line of lines) {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('- **ID**:')) {
        product.id = trimmed.replace('- **ID**:', '').trim().replace(/"/g, '');
      }
      else if (trimmed.startsWith('- **Price**:')) {
        product.price = trimmed.replace('- **Price**:', '').trim().replace(/"/g, '');
      }
      else if (trimmed.startsWith('- **Rating**:')) {
        product.rating = parseFloat(trimmed.replace('- **Rating**:', '').trim());
      }
      else if (trimmed.startsWith('- **Reviews**:')) {
        product.reviews = parseInt(trimmed.replace('- **Reviews**:', '').trim());
      }
      else if (trimmed.startsWith('- **Images**:')) {
        const imageStr = trimmed.replace('- **Images**:', '').trim();
        // Parse array format like ["/path1", "/path2", "/path3"]
        const imageMatch = imageStr.match(/\[(.*?)\]/);
        if (imageMatch) {
          product.images = imageMatch[1]
            .split(',')
            .map(img => img.trim().replace(/"/g, ''))
            .filter(img => img);
        }
      }
      else if (trimmed.startsWith('- **Description EN**:')) {
        product.description!.en = trimmed.replace('- **Description EN**:', '').trim().replace(/"/g, '');
      }
      else if (trimmed.startsWith('- **Description AR**:')) {
        product.description!.ar = trimmed.replace('- **Description AR**:', '').trim().replace(/"/g, '');
      }
      else if (trimmed.startsWith('- **Name EN**:')) {
        product.name!.en = trimmed.replace('- **Name EN**:', '').trim().replace(/"/g, '');
      }
      else if (trimmed.startsWith('- **Name AR**:')) {
        product.name!.ar = trimmed.replace('- **Name AR**:', '').trim().replace(/"/g, '');
      }
      else if (trimmed.startsWith('- **Category EN**:')) {
        product.category!.en = trimmed.replace('- **Category EN**:', '').trim().replace(/"/g, '');
      }
      else if (trimmed.startsWith('- **Category AR**:')) {
        product.category!.ar = trimmed.replace('- **Category AR**:', '').trim().replace(/"/g, '');
      }
    }
    
    // Only add if we have essential fields
    if (product.id && product.name?.en && product.price && product.images && product.images.length > 0) {
      products.push(product as Product);
    }
  }
  
  return products;
}

export function getProducts(): Product[] {
  try {
    const catalogPath = join(process.cwd(), 'public/content/products/catalog.mdx');
    const fileContent = readFileSync(catalogPath, 'utf8');
    const { content } = parseFrontmatter(fileContent);
    
    // Parse products from MDX content
    const products = parseProductsFromMDX(content);
    
    // Return only parsed products from MDX file
    return products;
  } catch (error) {
    console.error('Error loading products from MDX:', error);
    return [];
  }
}

export function getBusinessHours(): BusinessHours[] {
  try {
    const hoursPath = join(process.cwd(), 'public/content/business/hours.mdx');
    const fileContent = readFileSync(hoursPath, 'utf8');
    const { content } = parseFrontmatter(fileContent);
    
    // Parse business hours from the simple format: "Day : Hours" or "Day; Hours"
    const hours: BusinessHours[] = [];
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // Look for pattern: Day name followed by : or ; then hours
      const dayHoursMatch = trimmed.match(/^\s*(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s*[:;]\s*(.+)$/i);
      
      if (dayHoursMatch) {
        const day = dayHoursMatch[1].trim();
        const hoursStr = dayHoursMatch[2].trim();
        
        // Handle various closed indicators
        const closedIndicators = ['null', 'closed', 'close', 'n/a', 'na', '-'];
        const isOpen = !closedIndicators.includes(hoursStr.toLowerCase()) && 
                      hoursStr.trim() !== '';
        
        const displayHours = isOpen ? hoursStr : 'Closed';
        
        hours.push({ 
          day, 
          hours: displayHours, 
          isOpen 
        });
      }
    }
    
    // Sort days in proper order (Monday to Sunday)
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    hours.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));
    
    return hours;
  } catch (error) {
    console.error('Error loading business hours from MDX:', error);
    return [];
  }
}

export function getProductById(id: string): Product | null {
  const products = getProducts();
  return products.find(product => product.id === id) || null;
}

export function getProductsByCategory(category: string): Product[] {
  const products = getProducts();
  return products.filter(product => 
    product.category.en === category || product.category.ar === category
  );
}
