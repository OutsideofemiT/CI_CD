import express from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/seed', async (_req, res) => {
  try {
    console.log("🌱 Manually seeding DB...");
    await import('./seeds/seed.js');
    res.send('✅ Seeding complete');
  } catch (err) {
    console.error("❌ Seeding error:", err);
    res.status(500).send('❌ Failed to seed');
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('../client/dist'));
app.use(routes);

db.once('open', async () => {
  if (process.env.RUN_SEED === 'true') {
    console.log('🌱 Seeding database...');
    await import('./seeds/seed.js');
  }

  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
  });
});

