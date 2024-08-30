"use server";

import type { inquiry as inquiryFormConfig } from "@/components/contact-me-form";
import { EmailTemplate } from "@/components/email/email-template";
import type { InferredFormFields } from "@/components/form";
import type { Result } from "@/types/domain/result";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  inquiry: InferredFormFields<typeof inquiryFormConfig>,
): Promise<Result<string>> => {
  const { error } = await resend.emails.send({
    from: "mario@mariovukzaj.com",
    to: "vukzajmario5@gmail.com",
    subject: `Inquiry from ${inquiry.fullName}`,
    react: EmailTemplate(inquiry),
  });
  if (error) {
    console.error(error);
    return {
      error,
      success: false,
    };
  }
  return {
    success: true,
    data: "Email sent successfully, I'll get back to you soon!",
  };
};
