import { ImapFlow } from 'imapflow';

export interface ImapCredentials {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export const fetchRecentEmails = async (credentials: ImapCredentials, limit = 20) => {
  const client = new ImapFlow({
    host: credentials.host,
    port: credentials.port,
    secure: credentials.secure,
    auth: credentials.auth
  });

  await client.connect();
  try {
    const lock = await client.getMailboxLock('INBOX');
    try {
      const messages = [] as { subject?: string; text?: string; html?: string }[];
      for await (const message of client.fetch({ limit }, { source: true, envelope: true })) {
        const text = message.source?.toString('utf8');
        messages.push({
          subject: message.envelope?.subject,
          text,
          html: undefined
        });
      }
      return messages;
    } finally {
      lock.release();
    }
  } finally {
    await client.logout();
  }
};
