export const SUBSCRIPTIONS_TABLE = `
CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  service_name TEXT NOT NULL,
  cost REAL NOT NULL,
  currency TEXT DEFAULT 'CAD',
  frequency TEXT NOT NULL,
  next_billing_date TEXT,
  manage_url TEXT,
  category TEXT,
  status TEXT DEFAULT 'active',
  created_at TEXT,
  updated_at TEXT,
  source TEXT,
  confidence REAL
);
`;

export const METADATA_TABLE = `
CREATE TABLE IF NOT EXISTS metadata (
  key TEXT PRIMARY KEY,
  value TEXT
);
`;
