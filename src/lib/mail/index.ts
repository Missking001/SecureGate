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

export const sendVerificationEmail = provider.sendVerificationEmail.bind(provider);
export const sendPasswordResetEmail = provider.sendPasswordResetEmail.bind(provider);
