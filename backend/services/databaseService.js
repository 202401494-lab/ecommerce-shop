const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class DatabaseService {
  constructor() {
    this.dbPath = path.join(__dirname, '../data/ecommerce.db');
    this.db = null;
  }

  init() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          console.error('Database error:', err);
          reject(err);
        } else {
          console.log('✓ Database connected');
          this.createTables().then(resolve).catch(reject);
        }
      });
    });
  }

  createTables() {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        // Orders table
        this.db.run(`
          CREATE TABLE IF NOT EXISTS orders (
            id TEXT PRIMARY KEY,
            userId TEXT NOT NULL,
            userEmail TEXT NOT NULL,
            userName TEXT NOT NULL,
            items TEXT NOT NULL,
            total REAL NOT NULL,
            date TEXT NOT NULL,
            status TEXT DEFAULT 'pending'
          )
        `, (err) => {
          if (err) reject(err);
          else {
            console.log('✓ Orders table ready');
            resolve();
          }
        });
      });
    });
  }

  saveOrder(order) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare(`
        INSERT INTO orders (id, userId, userEmail, userName, items, total, date, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      stmt.run(
        order.id,
        order.userId,
        order.userEmail,
        order.userName,
        JSON.stringify(order.items),
        order.total,
        order.date.toISOString(),
        order.status,
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );

      stmt.finalize();
    });
  }

  getAllOrders() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM orders ORDER BY date DESC', (err, rows) => {
        if (err) reject(err);
        else {
          const orders = rows.map(row => ({
            ...row,
            items: JSON.parse(row.items),
            date: new Date(row.date)
          }));
          resolve(orders);
        }
      });
    });
  }

  getOrderById(id) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM orders WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else if (row) {
          resolve({
            ...row,
            items: JSON.parse(row.items),
            date: new Date(row.date)
          });
        } else {
          resolve(null);
        }
      });
    });
  }

  updateOrderStatus(id, status) {
    return new Promise((resolve, reject) => {
      this.db.run(
        'UPDATE orders SET status = ? WHERE id = ?',
        [status, id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }
}

module.exports = DatabaseService;
