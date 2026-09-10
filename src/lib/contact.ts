export const contactLimits = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { min: 3, max: 160 },
  message: { min: 20, max: 5000 },
} as const;

export type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
};

export type ContactFieldName = keyof Omit<ContactFields, "company">;
export type ContactErrors = Partial<Record<ContactFieldName, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeContactFields(value: unknown): ContactFields | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const payload = value as Record<string, unknown>;
  const fields = ["name", "email", "subject", "message", "company"] as const;

  if (fields.some((field) => typeof payload[field] !== "string")) {
    return null;
  }

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

  if (fields.name.length < contactLimits.name.min) {
    errors.name = "Enter at least 2 characters.";
  } else if (fields.name.length > contactLimits.name.max) {
    errors.name = "Keep your name under 100 characters.";
  }

  if (!emailPattern.test(fields.email) || fields.email.length > contactLimits.email.max) {
    errors.email = "Enter a valid email address.";
  }

  if (fields.subject.length < contactLimits.subject.min) {
    errors.subject = "Enter at least 3 characters.";
  } else if (fields.subject.length > contactLimits.subject.max) {
    errors.subject = "Keep the subject under 160 characters.";
  }

  if (fields.message.length < contactLimits.message.min) {
    errors.message = "Enter at least 20 characters.";
  } else if (fields.message.length > contactLimits.message.max) {
    errors.message = "Keep the message under 5,000 characters.";
  }

  return errors;
}
