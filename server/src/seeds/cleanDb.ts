import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question") => {
  try {
    const collections = await models[modelName]?.db?.db?.listCollections({
      name: modelName
    }).toArray();

    // If collections is undefined or empty array, skip drop
    if (collections?.length) {
      await db.dropCollection(modelName);
    }
  } catch (err) {
    throw err;
  }
};
