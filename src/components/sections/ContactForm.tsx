"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  contactLimits,
  contactFieldNames,
  type ContactErrors,
  type ContactFieldName,
  type ContactFields,
  type ContactResponse,
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

function findFirstError(form: HTMLFormElement, errors: ContactErrors) {
  const field = contactFieldNames.find((name) => errors[name]);
  const control = field && form.elements.namedItem(field);
  return control instanceof HTMLElement ? control : null;
}

export function ContactForm({ email }: { email: string }) {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const pendingRequest = useRef(false);
  const errorControl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (status === "error") {
      errorControl.current?.focus();
      errorControl.current = null;
    }
  }, [errors, status]);

  const updateField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.target.name as keyof ContactFields;
    setFields((current) => ({ ...current, [field]: event.target.value }));

    if (field !== "company" && errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }

    if (status === "error" || status === "success") {
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
    const form = event.currentTarget;

    if (pendingRequest.current) {
      return;
    }

    const nextErrors = validateContactFields(fields);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setFeedback("Please correct the highlighted fields and try again.");
      errorControl.current = findFirstError(form, nextErrors);
      return;
    }

    pendingRequest.current = true;
    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify(fields),
        headers: { "Content-Type": "application/json" },
        method: "POST",
        signal: AbortSignal.timeout(12_000),
      });
      const result = (await response.json().catch(() => null)) as ContactResponse | null;

      if (!response.ok || result?.success !== true || typeof result.message !== "string" || !result.message.trim()) {
        const fieldErrors: ContactErrors = {};
        if (result?.success === false) {
          for (const field of contactFieldNames) {
            if (typeof result.errors?.[field] === "string") fieldErrors[field] = result.errors[field];
          }
        }
        setErrors(fieldErrors);
        setStatus("error");
        setFeedback(result?.success === false && typeof result.message === "string" && result.message.trim()
          ? result.message
          : "Sending could not be confirmed. Your draft is still here. Please try again or email me directly.");
        errorControl.current = findFirstError(form, fieldErrors);
        return;
      }

      setStatus("success");
      setFeedback(result.message);
      setFields(initialFields);
      setErrors({});
    } catch {
      setStatus("error");
      setFeedback(
        "Sending could not be confirmed. Your draft is still here. Please try again or email me directly.",
      );
    } finally {
      pendingRequest.current = false;
    }
  };

  return (
    <form action="/api/contact" aria-busy={status === "submitting"} aria-labelledby="contact-form-title" className="grid gap-5" method="post" noValidate onSubmit={handleSubmit}>
      <div>
        <h3 className="text-2xl font-semibold tracking-tight" id="contact-form-title">Send a message</h3>
        <p className="mt-2 text-sm leading-6 text-text-secondary">All fields are required. A little context helps me understand what you have in mind.</p>
      </div>
      <noscript>
        <style>{"#contact-form-fields { display: none; }"}</style>
        <p className="text-sm leading-7 text-text-secondary">The form needs JavaScript. Please use the direct email link instead.</p>
      </noscript>
      <fieldset className="grid min-w-0 gap-5" disabled={status === "submitting"} id="contact-form-fields">
        <legend className="sr-only">Message details</legend>
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
            aria-describedby={`contact-message-hint${errors.message ? " contact-message-error" : ""}`}
            aria-invalid={Boolean(errors.message)}
            className={cn(fieldClassName, "min-h-40 resize-y")}
            id="contact-message"
            maxLength={contactLimits.message.max}
            name="message"
            onBlur={() => validateField("message")}
            onChange={updateField}
            placeholder="Share a little context, the problem, or what you’re building."
            required
            value={fields.message}
          />
          <p className="mt-2 text-xs leading-6 text-text-muted" id="contact-message-hint">At least 20 characters · {fields.message.length.toLocaleString("en-US")} / 5,000</p>
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
                <LoaderCircle aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
                Sending
              </>
            ) : (
              <>
                Send Message
                <ArrowRight aria-hidden="true" className="size-4" />
              </>
            )}
          </Button>
        </div>
      </fieldset>
      {feedback ? (
        <p
          aria-live={status === "error" ? "assertive" : "polite"}
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
      <p className="border-t border-border pt-4 text-sm leading-7 text-text-secondary">
        Prefer email? <a className="inline-flex min-h-11 items-center rounded-sm font-semibold text-accent-primary hover:underline" href={`mailto:${email}`}>Email me directly</a>.
      </p>
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
        required
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
