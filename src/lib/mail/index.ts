import type { EmailProvider } from "./providers/provider";
import { nodemailerProvider } from "./providers/nodemailer";
import { resendProvider } from "./providers/resend";

function getProvider(): EmailProvider {
  const provider = process.env.EMAIL_PROVIDER || "nodemailer";

  switch (provider) {
    case "nodemailer":
      return nodemailerProvider;
    case "resend":
      return resendProvider;
    default:
      throw new Error(
        `Unknown EMAIL_PROVIDER "${provider}". Use "nodemailer" or "resend".`
      );
  }
}

const provider = getProvider();

type EmailJob = () => Promise<void>;

const queue: EmailJob[] = [];
let processing = false;

async function processQueue(): Promise<void> {
  if (processing) return;
  processing = true;

  while (queue.length > 0) {
    const job = queue.shift()!;
    try {
      await job();
    } catch (error) {
      console.error("Email queue: failed to send email:", error);
    }
  }

  processing = false;
}

function enqueue(fn: EmailJob): void {
  queue.push(fn);
  processQueue();
}

export async function sendVerificationEmail(email: string, token: string): Promise<void> {
  enqueue(() => provider.sendVerificationEmail(email, token));
}

export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  enqueue(() => provider.sendPasswordResetEmail(email, token));
}
