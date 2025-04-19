import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const filePath = path.join(__dirname, 'pythonQuestions.json');
const pythonQuestions = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

db.once('open', async () => {
  await cleanDB('Question');
  await Question.insertMany(pythonQuestions);
  console.log('✅ Questions seeded!');
  process.exit(0);
});
