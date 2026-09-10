"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  contactLimits,
  type ContactErrors,
  type ContactFieldName,
  type ContactFields,
  validateContactFields,
} from "@/lib/contact";
import { cn } from "@/lib/cn";

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialFields: ContactFields = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

const fieldClassName =
  "contact-input min-h-13 w-full rounded-[var(--radius-sm)] border border-border px-4 py-3 text-base text-text-primary outline-none transition-[border-color,background-color,box-shadow] duration-[var(--duration-fast)] placeholder:text-text-muted/75 hover:border-border-strong focus:border-accent-primary";

export function ContactForm() {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const updateField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.target.name as keyof ContactFields;
    setFields((current) => ({ ...current, [field]: event.target.value }));

    if (field !== "company" && errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }

    if (status === "error") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const validateField = (field: ContactFieldName) => {
    const nextErrors = validateContactFields(fields);
    setErrors((current) => ({ ...current, [field]: nextErrors[field] }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "submitting") {
      return;
    }

    const nextErrors = validateContactFields(fields);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setFeedback("Please correct the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify(fields),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
        errors?: ContactErrors;
      };

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
        }
        throw new Error(result.message || "The message could not be sent.");
      }

      setStatus("success");
      setFeedback(result.message || "Message sent. I’ll get back to you soon.");
      setFields(initialFields);
      setErrors({});
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "The message could not be sent. Please use the direct email link instead.",
      );
    }
  };

  return (
    <form aria-busy={status === "submitting"} className="grid gap-5" noValidate onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <ContactField
          autoComplete="name"
          error={errors.name}
          label="Name"
          maxLength={contactLimits.name.max}
          name="name"
          onBlur={() => validateField("name")}
          onChange={updateField}
          placeholder="Your name"
          value={fields.name}
        />
        <ContactField
          autoComplete="email"
          error={errors.email}
          inputMode="email"
          label="Email"
          maxLength={contactLimits.email.max}
          name="email"
          onBlur={() => validateField("email")}
          onChange={updateField}
          placeholder="you@example.com"
          type="email"
          value={fields.email}
        />
      </div>

      <ContactField
        autoComplete="off"
        error={errors.subject}
        label="Subject"
        maxLength={contactLimits.subject.max}
        name="subject"
        onBlur={() => validateField("subject")}
        onChange={updateField}
        placeholder="What would you like to discuss?"
        value={fields.subject}
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary" htmlFor="contact-message">
          Message
        </label>
        <textarea
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          aria-invalid={Boolean(errors.message)}
          className={cn(fieldClassName, "min-h-40 resize-y")}
          id="contact-message"
          maxLength={contactLimits.message.max}
          name="message"
          onBlur={() => validateField("message")}
          onChange={updateField}
          placeholder="Share a little context, the problem, or what you’re building."
          value={fields.message}
        />
        {errors.message ? (
          <p className="mt-2 text-sm text-[var(--error)]" id="contact-message-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div aria-hidden="true" className="absolute -left-[10000px] top-auto size-px overflow-hidden">
        <label htmlFor="contact-company">Company website</label>
        <input
          autoComplete="off"
          id="contact-company"
          name="company"
          onChange={updateField}
          tabIndex={-1}
          value={fields.company}
        />
      </div>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <Button className="min-h-12 sm:min-w-40" disabled={status === "submitting"} type="submit">
          {status === "submitting" ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send Message
              <ArrowRight aria-hidden="true" className="size-4" />
            </>
          )}
        </Button>

        {feedback ? (
          <p
            aria-live="polite"
            className={cn(
              "max-w-md text-sm leading-6",
              status === "success" ? "text-success" : "text-[var(--error)]",
            )}
            role={status === "error" ? "alert" : "status"}
          >
            {status === "success" ? (
              <CheckCircle2 aria-hidden="true" className="mr-2 inline size-4" />
            ) : null}
            {feedback}
          </p>
        ) : null}
      </div>
    </form>
  );
}

type ContactFieldProps = {
  autoComplete: string;
  error?: string;
  inputMode?: "email";
  label: string;
  maxLength: number;
  name: ContactFieldName;
  onBlur: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: "email" | "text";
  value: string;
};

function ContactField({
  autoComplete,
  error,
  inputMode,
  label,
  maxLength,
  name,
  onBlur,
  onChange,
  placeholder,
  type = "text",
  value,
}: ContactFieldProps) {
  const id = `contact-${name}`;

  return (
    <div className="min-w-0">
      <label className="mb-2 block text-sm font-medium text-text-primary" htmlFor={id}>
        {label}
      </label>
      <input
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        className={fieldClassName}
        id={id}
        inputMode={inputMode}
        maxLength={maxLength}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error ? (
        <p className="mt-2 text-sm text-[var(--error)]" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
