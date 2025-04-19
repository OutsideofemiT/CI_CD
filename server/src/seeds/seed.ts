import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";
import fs from 'fs';

const pythonQuestions = JSON.parse(
  fs.readFileSync(new URL('./pythonQuestions.json', import.meta.url), 'utf-8')
);

db.once('open', async () => {
  await cleanDB('Question');

  await Question.insertMany(pythonQuestions);

  console.log('Questions seeded!');
  process.exit(0);
});
