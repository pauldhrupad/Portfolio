"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "./Button";

export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copyEmail() {
    setStatus("idle");
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  const Icon = status === "copied" ? Check : Copy;
  return (
    <div>
      <Button onClick={copyEmail} size="sm" variant="secondary">
        <Icon aria-hidden="true" className="size-4" /> Copy email
      </Button>
      <p aria-live="polite" className="mt-2 min-h-6 text-sm leading-6 text-text-secondary" role="status">
        {status === "copied" ? "Email copied." : status === "error" ? "Copy unavailable. Use the email link." : ""}
      </p>
    </div>
  );
}
