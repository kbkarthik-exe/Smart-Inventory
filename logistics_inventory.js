// Step 1: Switch to Logistics Database
use logisticsDB;

// Step 2: Insert Warehouse Inventory Data
db.inventory.insertMany([
  { sku: "SKU-901", warehouseId: "WH-BLR", item: "Pallet Jack", stockLevel: 12, reorderThreshold: 15 },
  { sku: "SKU-902", warehouseId: "WH-BLR", item: "Barcode Scanner", stockLevel: 45, reorderThreshold: 20 },
  { sku: "SKU-903", warehouseId: "WH-MUM", item: "Packaging Tape", stockLevel: 8, reorderThreshold: 25 }
]);

// Step 3: Create Unique Index on SKU and Compound Index for Low-Stock Alerts
db.inventory.createIndex({ sku: 1 }, { unique: true });
db.inventory.createIndex({ warehouseId: 1, stockLevel: 1 });

// Step 4: Query low-stock items in a specific warehouse and inspect execution plan
db.inventory.find({
  warehouseId: "WH-BLR",
  stockLevel: { $lt: 20 }
}).explain("executionStats");
