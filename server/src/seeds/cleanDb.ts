import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question") => {
  try {
    const model = models[modelName];

    if (!model || !model.db?.db) {
      console.warn(`Model "${modelName}" is undefined or missing DB connection.`);
      return;
    }

    const collections = await model.db.db.listCollections({ name: modelName }).toArray();

    if (collections.length) {
      await db.dropCollection(modelName);
    }

  } catch (err) {
    throw err;
  }
<<<<<<< Updated upstream
};
=======
};
>>>>>>> Stashed changes
