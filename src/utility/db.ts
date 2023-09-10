import { addRxPlugin, createRxDatabase } from 'rxdb';
import fetch from 'cross-fetch';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { user, wallet, transactions, tokens } from '../schema/index';
import { STORAGE } from './storage';

addRxPlugin(RxDBMigrationPlugin);
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBQueryBuilderPlugin);

const isDevelopment =
  process.env.NODE_ENV !== 'production' || process.env.DEBUG_PROD === 'true';

const initialize = async () => {
  if (isDevelopment) {
    await addRxPlugin(RxDBDevModePlugin);
  }

  let db: any;

  try {
    console.log('Initializing database...');
    db = await createRxDatabase({
      name: 'orbyt',
      storage: STORAGE,
      multiInstance: false,
      ignoreDuplicate: false,
    });
    console.log('Database initialized!');
  } catch (err) {
    console.log('ERROR CREATING DATABASE', err);
  }

  try {
    console.log('Adding orbyt collection...');
    await db.addCollections([{ name: 'user', schema: user }]);
    console.log('Collection added!');
  } catch (err) {
    console.log('ERROR CREATING COLLECTION', err);
  }

  return db;
};

export default initialize;
