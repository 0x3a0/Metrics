import './config.js';
import database from './database.js';
import app from './app.js';


const port = process.env.PORT || 9280;
const server = app.listen(port, () => {
  console.log(`[backend] Server running on port ${port}`);
})

process.on("SIGINT", () => {
  server.close();
  console.log('[backend] Server closed.');

  database.close();
  console.log('[backend] Database closed.');

  process.exit(1);
})