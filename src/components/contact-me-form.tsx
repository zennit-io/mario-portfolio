"use client";
import {
  field,
  FormSubmitButton,
  InferredForm,
  type InferredFormFields,
} from "@/components/ui/form";
import { z } from "zod";
import { SendEmailIcon } from "@/icons";
import { sendEmail } from "@/actions/contact";
import { toast } from "sonner";

const config = {
  fullName: field({
    shape: "text",
    label: "Full Name",
    constraint: z.string(),
  }),
  email: field({
    shape: "text",
    label: "Email",
    description: "I'll never share your email or spam you, promise.",
    constraint: z.string().email(),
  }),
  phoneNumber: field({
    shape: "phone-number",
    label: "Phone Number",
    description: "Optional.",
    constraint: z.string().optional(),
  }),
  description: field({
    shape: "textarea",
    label: "Description",
    description: "Tell me about your idea.",
    constraint: z.string(),
  }),
};

export const ContactMeForm = () => {
  const handleSubmit = async (inquiry: InferredFormFields<typeof config>) => {
    const result = await sendEmail(inquiry);
    if (!result.success) {
      toast.error(result.error.message);
      return;
    }
    toast.success(result.data);
  };
  return (
    <InferredForm onSubmit={handleSubmit} config={config}>
      <FormSubmitButton variant={"primary"}>
        <SendEmailIcon /> Contact Me{" "}
      </FormSubmitButton>
    </InferredForm>
  );
};

export { config as signUpFormConfig };
