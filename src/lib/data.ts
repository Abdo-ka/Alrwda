import { readFileSync } from 'fs';
import { join } from 'path';

interface Product {
  id: string;
  slug: string;
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
  categoryId: string;
  features: string[];
  specifications: {
    dimensions: string;
    weight: string;
    display: string;
    power: string;
    languages: string[];
  };
}

interface BusinessHours {
  day: string;
  hours: string;
  isOpen: boolean;
}

interface BusinessHoursData {
  title: string;
  description: string;
  lastUpdated: string;
  regularHours: {
    [key: string]: {
      open?: string;
      close?: string;
    } | string;
  };
  holidayHours: {
    note: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
  };
  location: {
    street: string;
    district: string;
    country: string;
  };
}

interface ProductCatalog {
  title: string;
  description: string;
  lastUpdated: string;
  categories: {
    id: string;
    nameEn: string;
    nameAr: string;
    description: string;
  }[];
  products: Product[];
}

export function getProducts(): Product[] {
  try {
    const catalogPath = join(process.cwd(), 'public/content/products/catalog.json');
    const fileContent = readFileSync(catalogPath, 'utf8');
    const catalog: ProductCatalog = JSON.parse(fileContent);
    
    return catalog.products;
  } catch (error) {
    console.error('Error loading products from JSON:', error);
    return [];
  }
}

export function getBusinessHours(): BusinessHours[] {
  try {
    const hoursPath = join(process.cwd(), 'public/content/business/hours.json');
    const fileContent = readFileSync(hoursPath, 'utf8');
    const hoursData: BusinessHoursData = JSON.parse(fileContent);
    
    const hours: BusinessHours[] = [];
    const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    for (const dayKey of dayOrder) {
      const dayData = hoursData.regularHours[dayKey];
      const dayName = dayKey.charAt(0).toUpperCase() + dayKey.slice(1);
      
      if (typeof dayData === 'string') {
        // Handle "Closed" case
        hours.push({
          day: dayName,
          hours: dayData,
          isOpen: dayData.toLowerCase() !== 'closed'
        });
      } else if (dayData && typeof dayData === 'object' && dayData.open && dayData.close) {
        // Handle open/close times
        hours.push({
          day: dayName,
          hours: `${dayData.open} - ${dayData.close}`,
          isOpen: true
        });
      }
    }
    
    return hours;
  } catch (error) {
    console.error('Error loading business hours from JSON:', error);
    return [];
  }
}

export function getProductById(id: string): Product | null {
  const products = getProducts();
  return products.find(product => product.id === id || product.slug === id) || null;
}

export function getProductsByCategory(category: string): Product[] {
  const products = getProducts();
  return products.filter(product => 
    product.category.en === category || 
    product.category.ar === category ||
    product.categoryId === category
  );
}

export function getProductCategories() {
  try {
    const catalogPath = join(process.cwd(), 'public/content/products/catalog.json');
    const fileContent = readFileSync(catalogPath, 'utf8');
    const catalog: ProductCatalog = JSON.parse(fileContent);
    
    return catalog.categories;
  } catch (error) {
    console.error('Error loading categories from JSON:', error);
    return [];
  }
}

export function getBusinessContact() {
  try {
    const hoursPath = join(process.cwd(), 'public/content/business/hours.json');
    const fileContent = readFileSync(hoursPath, 'utf8');
    const hoursData: BusinessHoursData = JSON.parse(fileContent);
    
    return {
      contact: hoursData.contact,
      location: hoursData.location,
      holidayHours: hoursData.holidayHours
    };
  } catch (error) {
    console.error('Error loading contact info from JSON:', error);
    return null;
  }
}
