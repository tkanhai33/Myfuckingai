import SQLite from 'react-native-sqlcipher-storage';
import { SUBSCRIPTIONS_TABLE, METADATA_TABLE } from './schema';
import { Subscription } from '../../types/subscription';

const DB_NAME = 'subskribe.db';

export const getDatabase = async (passphrase: string) => {
  SQLite.enablePromise(true);
  const db = await SQLite.openDatabase({ name: DB_NAME, key: passphrase, location: 'default' });
  await db.executeSql('PRAGMA cipher_memory_security = ON;');
  await db.executeSql(SUBSCRIPTIONS_TABLE);
  await db.executeSql(METADATA_TABLE);
  return db;
};

export const upsertSubscription = async (db: SQLite.SQLiteDatabase, subscription: Subscription) => {
  const sql = `
    INSERT OR REPLACE INTO subscriptions (
      id,
      service_name,
      cost,
      currency,
      frequency,
      next_billing_date,
      manage_url,
      category,
      status,
      created_at,
      updated_at,
      source,
      confidence
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const values = [
    subscription.id,
    subscription.serviceName,
    subscription.cost,
    subscription.currency,
    subscription.frequency,
    subscription.nextBillingDate,
    subscription.manageUrl,
    subscription.category,
    subscription.status,
    subscription.createdAt,
    subscription.updatedAt,
    subscription.source,
    subscription.confidence
  ];

  await db.executeSql(sql, values);
};

export const listSubscriptions = async (db: SQLite.SQLiteDatabase) => {
  const [result] = await db.executeSql('SELECT * FROM subscriptions ORDER BY created_at DESC');
  const rows = result.rows;
  const items: Subscription[] = [];
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows.item(i);
    items.push({
      id: row.id,
      serviceName: row.service_name,
      cost: row.cost,
      currency: row.currency,
      frequency: row.frequency,
      nextBillingDate: row.next_billing_date,
      manageUrl: row.manage_url,
      category: row.category,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      source: row.source,
      confidence: row.confidence
    });
  }
  return items;
};

export const deleteSubscription = async (db: SQLite.SQLiteDatabase, id: string) => {
  await db.executeSql('DELETE FROM subscriptions WHERE id = ?', [id]);
};
