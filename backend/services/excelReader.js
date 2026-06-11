const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

class ExcelReader {
  constructor(excelPath) {
    this.excelPath = excelPath;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      let fullPath = path.join(__dirname, this.excelPath);

      if (!fs.existsSync(fullPath)) {
        const fallbackPath = path.resolve(__dirname, '..', '..', 'data', 'productos.xlsx');
        console.warn(`Excel file not found at ${fullPath}, trying fallback path ${fallbackPath}`);
        fullPath = fallbackPath;
      }

      if (!fs.existsSync(fullPath)) {
        console.warn(`Excel file still not found at ${fullPath}`);
        this.products = [];
        return;
      }

      const workbook = XLSX.readFile(fullPath);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const normalizeImagePath = (imagePath) => {
        let trimmed = String(imagePath).trim();
        if (!trimmed) return '';
        if (/^https?:\/\//i.test(trimmed)) return trimmed;
        trimmed = trimmed.replace(/\\/g, '/');
        const filename = path.basename(trimmed);
        return filename ? `/images/${encodeURI(filename)}` : '';
      };

      this.products = data.map((row, index) => {
        const rawImage = row.imagen || row.image || '';
        const normalizedImage = rawImage ? normalizeImagePath(rawImage) : '';

        return {
          id: row.id || index + 1,
          nombre: row.nombre || row.name || '',
          precio: parseFloat(row.precio || row.price || 0),
          descripcion: row.descripcion || row.description || '',
          imagen: normalizedImage,
          categoria: row.categoria || row.category || '',
          stock: parseInt(row.stock || 0)
        };
      }).filter(p => p.nombre); // Filter out empty rows

      console.log(`✓ Loaded ${this.products.length} products from Excel`);
      if (this.products.length > 0) {
        console.log(`First product: ${this.products[0].nombre}, Image: ${this.products[0].imagen}`);
      }
    } catch (error) {
      console.error('Error loading Excel file:', error.message);
      this.products = [];
    }
  }

  getProducts() {
    return this.products;
  }

  reloadProducts() {
    this.loadProducts();
    return this.products;
  }
}

module.exports = ExcelReader;
