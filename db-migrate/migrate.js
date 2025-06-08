import { Pool } from 'pg';
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Database configuration
const dbConfig = {
  user: process.env.POSTGRES_USER || 'gscores',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'gscores',
  password: process.env.POSTGRES_PASSWORD || 'gscores',
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
};

// Create PostgreSQL connection pool
const pool = new Pool(dbConfig);

// CSV file path
const csvFilePath = path.join(__dirname, 'diem_thi_thpt_2024.csv');

// Function to create the students table
async function createTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS students (
      sbd VARCHAR(20) PRIMARY KEY,
      toan DECIMAL(4,2),
      ngu_van DECIMAL(4,2),
      ngoai_ngu DECIMAL(4,2),
      vat_li DECIMAL(4,2),
      hoa_hoc DECIMAL(4,2),
      sinh_hoc DECIMAL(4,2),
      lich_su DECIMAL(4,2),
      dia_li DECIMAL(4,2),
      gdcd DECIMAL(4,2),
      ma_ngoai_ngu VARCHAR(10),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  try {
    await pool.query(createTableQuery);
    console.log('Table "students" created or already exists');
  } catch (error) {
    console.error('Error creating table:', error.message);
    throw error;
  }
}

// Function to convert empty strings to null
function convertEmptyToNull(value) {
  return value === '' || value === undefined ? null : value;
}

// Function to convert score strings to numbers (handling empty values)
function convertScore(value) {
  if (value === '' || value === undefined || value === null) {
    return null;
  }
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
}

// Function to insert a single student record
async function insertStudent(student) {
  const insertQuery = `
    INSERT INTO students (
      sbd, toan, ngu_van, ngoai_ngu, vat_li, hoa_hoc, 
      sinh_hoc, lich_su, dia_li, gdcd, ma_ngoai_ngu
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
    )
    ON CONFLICT (sbd) DO UPDATE SET
      toan = EXCLUDED.toan,
      ngu_van = EXCLUDED.ngu_van,
      ngoai_ngu = EXCLUDED.ngoai_ngu,
      vat_li = EXCLUDED.vat_li,
      hoa_hoc = EXCLUDED.hoa_hoc,
      sinh_hoc = EXCLUDED.sinh_hoc,
      lich_su = EXCLUDED.lich_su,
      dia_li = EXCLUDED.dia_li,
      gdcd = EXCLUDED.gdcd,
      ma_ngoai_ngu = EXCLUDED.ma_ngoai_ngu;
  `;

  const values = [
    student.sbd,
    convertScore(student.toan),
    convertScore(student.ngu_van),
    convertScore(student.ngoai_ngu),
    convertScore(student.vat_li),
    convertScore(student.hoa_hoc),
    convertScore(student.sinh_hoc),
    convertScore(student.lich_su),
    convertScore(student.dia_li),
    convertScore(student.gdcd),
    convertEmptyToNull(student.ma_ngoai_ngu)
  ];

  try {
    await pool.query(insertQuery, values);
  } catch (error) {
    console.error(`Error inserting student ${student.sbd}:`, error.message);
    throw error;
  }
}

// Function to process CSV and insert data
async function processCSV() {
  return new Promise((resolve, reject) => {
    const students = [];
    let rowCount = 0;

    console.log('Reading CSV file...');

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        rowCount++;
        students.push(row);
        
        // Log progress every 1000 rows
        if (rowCount % 1000 === 0) {
          console.log(`Processed ${rowCount} rows...`);
        }
      })
      .on('end', async () => {
        console.log(`CSV parsing completed. Total rows: ${rowCount}`);
        
        try {
          console.log('Starting database insertion...');
          let insertedCount = 0;
          
          // Process in batches to avoid overwhelming the database
          const batchSize = 100;
          for (let i = 0; i < students.length; i += batchSize) {
            const batch = students.slice(i, i + batchSize);
            
            // Insert batch using Promise.all for better performance
            await Promise.all(batch.map(async (student) => {
              await insertStudent(student);
              insertedCount++;
            }));
            
            console.log(`Inserted batch ${Math.ceil((i + batchSize) / batchSize)} - Progress: ${insertedCount}/${students.length}`);
          }
          
          console.log(`Successfully inserted ${insertedCount} student records!`);
          resolve(insertedCount);
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error.message);
        reject(error);
      });
  });
}

// Function to verify data insertion
async function verifyData() {
  try {
    const result = await pool.query('SELECT COUNT(*) as count FROM students');
    const count = parseInt(result.rows[0].count);
    console.log(`Total records in database: ${count}`);
    
    // Show a sample of the data
    const sampleResult = await pool.query('SELECT * FROM students LIMIT 3');
    console.log('Sample data:');
    sampleResult.rows.forEach((row, index) => {
      console.log(`  ${index + 1}. SBD: ${row.sbd}, Toán: ${row.toan}, Văn: ${row.ngu_van}`);
    });
    
    return count;
  } catch (error) {
    console.error('Error verifying data:', error.message);
    throw error;
  }
}

// Main migration function
async function migrate() {
  console.log('Starting G-Scores database migration...');
  console.log('='.repeat(50));
  
  try {
    // Test database connection
    console.log('Connecting to PostgreSQL database...');
    await pool.query('SELECT NOW()');
    console.log('Database connection successful');
    
    // Check if CSV file exists
    if (!fs.existsSync(csvFilePath)) {
      throw new Error(`CSV file not found: ${csvFilePath}`);
    }
    console.log('CSV file found');
    
    // Create table
    console.log('Creating database table...');
    await createTable();
    
    // Process CSV and insert data
    const insertedCount = await processCSV();
    
    // Verify the data
    console.log('Verifying inserted data...');
    await verifyData();
    
    console.log('='.repeat(50));
    console.log('Migration completed successfully!');
    console.log(`Summary: ${insertedCount} student records processed`);
    
  } catch (error) {
    console.error('Migration failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  } finally {
    // Close database connection
    console.log('Closing database connection...');
    await pool.end();
    console.log('Database connection closed');
  }
}

// Handle process termination gracefully
process.on('SIGINT', async () => {
  console.log('\nProcess interrupted. Cleaning up...');
  await pool.end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nProcess terminated. Cleaning up...');
  await pool.end();
  process.exit(0);
});

// Run the migration
await migrate();

export { migrate, pool };