const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const path = require('path');

class OrderService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
      }
    });
  }

  generatePDF(order) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument();
        const chunks = [];

        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        // Header
        doc.fontSize(20).font('Helvetica-Bold').text('PEDIDO', { align: 'center' });
        doc.fontSize(10).text(`ID: ${order.id}`, { align: 'center' });
        doc.text(`Fecha: ${order.date.toLocaleDateString()}`, { align: 'center' });
        doc.moveDown();

        // Customer Info
        doc.fontSize(12).font('Helvetica-Bold').text('Información del Cliente');
        doc.fontSize(10).font('Helvetica').text(`Nombre: ${order.userName}`);
        doc.text(`Correo: ${order.userEmail}`);
        doc.moveDown();

        // Items
        doc.fontSize(12).font('Helvetica-Bold').text('Productos');
        doc.moveDown(0.5);

        // Table header
        const tableTop = doc.y;
        const col1 = 50;
        const col2 = 250;
        const col3 = 350;
        const col4 = 450;

        doc.fontSize(10).font('Helvetica-Bold');
        doc.text('Producto', col1, tableTop);
        doc.text('Cantidad', col2, tableTop);
        doc.text('Precio', col3, tableTop);
        doc.text('Total', col4, tableTop);

        doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

        // Table body
        let y = tableTop + 25;
        doc.font('Helvetica');
        doc.fontSize(9);

        order.items.forEach(item => {
          const itemTotal = item.price * item.quantity;
          doc.text(item.nombre.substring(0, 30), col1, y);
          doc.text(item.quantity.toString(), col2, y);
          doc.text(`$${item.price.toFixed(2)}`, col3, y);
          doc.text(`$${itemTotal.toFixed(2)}`, col4, y);
          y += 20;
        });

        // Total
        doc.moveTo(50, y).lineTo(550, y).stroke();
        y += 15;
        doc.font('Helvetica-Bold').fontSize(12);
        doc.text(`TOTAL: $${order.total.toFixed(2)}`, col3, y);

        // Footer
        doc.moveDown(3);
        doc.fontSize(9).font('Helvetica').text('Gracias por tu compra!', { align: 'center' });

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  async sendOrderEmail(order) {
    try {
      const pdfBuffer = await this.generatePDF(order);

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        cc: order.userEmail,
        subject: `Nuevo Pedido #${order.id}`,
        html: `
          <h2>Nuevo Pedido Recibido</h2>
          <p><strong>Cliente:</strong> ${order.userName}</p>
          <p><strong>Correo:</strong> ${order.userEmail}</p>
          <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
          <p><strong>Fecha:</strong> ${order.date.toLocaleDateString()}</p>
          <hr>
          <h3>Productos:</h3>
          <ul>
            ${order.items.map(item => `
              <li>${item.nombre} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>
            `).join('')}
          </ul>
        `,
        attachments: [
          {
            filename: `pedido-${order.id}.pdf`,
            content: pdfBuffer,
            contentType: 'application/pdf'
          }
        ]
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`✓ Email sent for order ${order.id}`);
    } catch (error) {
      console.error('Error sending email:', error.message);
      throw error;
    }
  }
}

module.exports = OrderService;
