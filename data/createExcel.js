const XLSX = require('xlsx');
const path = require('path');

// Sample products data
const productsData = [
  {
    id: 1,
    nombre: 'Laptop Pro',
    precio: 1299.99,
    descripcion: 'Laptop de alta performance para profesionales',
    imagen: '',
    categoria: 'Electrónica',
    stock: 5
  },
  {
    id: 2,
    nombre: 'Mouse Inalámbrico',
    precio: 29.99,
    descripcion: 'Mouse inalámbrico ergonómico',
    imagen: '',
    categoria: 'Accesorios',
    stock: 20
  },
  {
    id: 3,
    nombre: 'Teclado Mecánico',
    precio: 89.99,
    descripcion: 'Teclado mecánico RGB para gaming',
    imagen: '',
    categoria: 'Accesorios',
    stock: 10
  },
  {
    id: 4,
    nombre: 'Monitor 4K',
    precio: 599.99,
    descripcion: 'Monitor 4K 27 pulgadas',
    imagen: '',
    categoria: 'Electrónica',
    stock: 3
  },
  {
    id: 5,
    nombre: 'Auriculares Bluetooth',
    precio: 149.99,
    descripcion: 'Auriculares con cancelación de ruido',
    imagen: '',
    categoria: 'Audio',
    stock: 15
  }
];

// Create workbook
const worksheet = XLSX.utils.json_to_sheet(productsData);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos');

// Save file
const filePath = path.join(__dirname, 'products.xlsx');
XLSX.writeFile(workbook, filePath);

console.log(`✓ Excel file created at: ${filePath}`);
