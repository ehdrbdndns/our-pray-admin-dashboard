//app/_lib/db.tsx
import { createPool } from 'mysql2'

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3306,
})

pool.getConnection((err, conn) => {
  if (err) console.log('Error connecting to db...')
  else console.log('Connected to db...!')
  conn.release()
})

const promisePool = pool.promise();

export default promisePool;