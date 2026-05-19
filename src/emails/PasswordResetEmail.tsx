import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface PasswordResetEmailProps {
  token: string;
}

export default function PasswordResetEmail({ token }: PasswordResetEmailProps) {
  const url = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;

  return (
    <Html>
      <Head />
      <Preview>Reset your SecureGate password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Text style={heading}>Reset your password</Text>
            <Text style={text}>
              We received a request to reset the password for your SecureGate account. 
              This link will expire in 15 minutes.
            </Text>
            <Button style={button} href={url}>
              Reset My Password
            </Button>
            <Text style={text}>
              If you did not request this, ignore this email. Your account is safe.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  border: "1px solid #e6ebf1",
  borderRadius: "8px",
};

const section = {
  padding: "0 48px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const text = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const button = {
  backgroundColor: "#2563eb",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  margin: "15px 0",
};
