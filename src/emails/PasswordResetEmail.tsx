export function renderPasswordResetEmailHtml(token: string): string {
  const baseUrl = process.env.NEXTAUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const url = `${baseUrl}/reset-password/${token}`;

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset your SecureGate password</title>
  </head>
  <body style="background-color:#f6f9fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Ubuntu,sans-serif;margin:0;padding:0;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="background-color:#f6f9fc;width:100%;">
      <tr>
        <td style="padding:48px 24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="background-color:#ffffff;max-width:600px;margin:0 auto;border:1px solid #e6ebf1;border-radius:8px;">
            <tr>
              <td style="padding:32px 48px;">
                <h1 style="font-size:24px;font-weight:400;color:#484848;letter-spacing:-0.5px;margin:0 0 24px;">Reset Your Password</h1>
                <p style="margin:0 0 15px;font-size:15px;line-height:1.4;color:#3c4149;">
                  We received a request to reset the password for your SecureGate account. Click the button below to set a new one. This link will expire in 1 hour.
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                  <tr>
                    <td style="background-color:#2563eb;border-radius:4px;text-align:center;">
                      <a href="${url}" style="display:inline-block;padding:12px 24px;font-size:15px;color:#ffffff;text-decoration:none;font-weight:500;">Reset Password</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:15px 0 0;font-size:15px;line-height:1.4;color:#3c4149;">
                  If you did not request this, ignore this email. Your account is safe.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
