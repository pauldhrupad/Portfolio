export const contactLimits = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { min: 3, max: 160 },
  message: { min: 20, max: 5000 },
} as const;

export const contactFieldNames = ["name", "email", "subject", "message"] as const;
export type ContactFieldName = (typeof contactFieldNames)[number];
export type ContactFields = Record<ContactFieldName | "company", string>;
export type ContactErrors = Partial<Record<ContactFieldName, string>>;
export type ContactResponse =
  | { success: true; message: string }
  | { success: false; message: string; errors?: ContactErrors };

const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const singleLineControls = /\p{Cc}/u;

export function normalizeContactFields(value: unknown): ContactFields | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const payload = value as Record<string, unknown>;
  const fields = [...contactFieldNames, "company"] as const;
  if (fields.some((field) => typeof payload[field] !== "string")) return null;

  return {
    name: (payload.name as string).trim(),
    email: (payload.email as string).trim(),
    subject: (payload.subject as string).trim(),
    message: (payload.message as string).trim(),
    company: (payload.company as string).trim(),
  };
}

export function validateContactFields(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  const name = fields.name.trim();
  const email = fields.email.trim();
  const subject = fields.subject.trim();
  const message = fields.message.trim();

  if (name.length < contactLimits.name.min) {
    errors.name = "Enter your name using at least 2 characters.";
  } else if (name.length > contactLimits.name.max) {
    errors.name = "Use 100 characters or fewer for your name.";
  } else if (singleLineControls.test(name)) {
    errors.name = "Enter your name on a single line.";
  }

  if (!emailPattern.test(email) || email.length > contactLimits.email.max || singleLineControls.test(email)) {
    errors.email = "Enter a valid email address, such as you@example.com.";
  }

  if (subject.length < contactLimits.subject.min) {
    errors.subject = "Add a subject using at least 3 characters.";
  } else if (subject.length > contactLimits.subject.max) {
    errors.subject = "Use 160 characters or fewer for the subject.";
  } else if (singleLineControls.test(subject)) {
    errors.subject = "Keep the subject on a single line.";
  }

  if (message.length < contactLimits.message.min) {
    errors.message = "Add a little more detail — at least 20 characters.";
  } else if (message.length > contactLimits.message.max) {
    errors.message = "Keep your message to 5,000 characters or fewer.";
  } else if (singleLineControls.test(message.replace(/[\t\r\n]/g, ""))) {
    errors.message = "Remove unsupported control characters from your message.";
  }

  return errors;
}
