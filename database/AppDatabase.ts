import { SQLiteDatabase } from 'expo-sqlite'

export const DATABASE_NAME = 'app.db';
const DATABASE_VERSION = 1;
const TABLE_NAME = 'places';

const CREATE_TB_PLACES = `
    CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        cor TEXT NOT NULL
);`;

export async function migrateDb(db: SQLiteDatabase) {
    try {
        let response = await db.getFirstAsync<{ user_version: number}>('PRAGMA user_version');
        let { user_version: dbVersion } = response ?? { user_version: 0 }
        if (dbVersion >= DATABASE_VERSION) {
            return;
        }
        if(dbVersion === 0){
            await db.execAsync(`${CREATE_TB_PLACES}`);
        }
        await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    } catch(error){
        console.error('Error migrating database:', error);
        throw error;
    }

}