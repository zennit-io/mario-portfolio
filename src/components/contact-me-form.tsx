"use client";
import { sendEmail } from "@/actions/contact";
import {
  FormSubmitButton as FormSubmitButtonPrimitive,
  InferredForm,
  type InferredFormFields,
  field,
} from "@/components/ui/form";
import { CheckIcon, LoadingIcon, SendEmailIcon } from "@/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { type UseFormReturn, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { buildDefaultValues } from "./form";

const config = {
  fullName: field({
    shape: "text",
    label: "Full Name",
    constraint: z.number(),
    type: "number",
  }),
  email: field({
    shape: "text",
    label: "Email",
    description: "I'll never share your email or spam you, promise.",
    constraint: z.string().email(),
  }),
  phoneNumber: field({
    shape: "phone",
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
  const handleSubmit = async (
    inquiry: InferredFormFields<typeof config>,
    form: UseFormReturn<InferredFormFields<typeof config>>,
  ) => {
    const result = await sendEmail(inquiry);
    if (!result.success) {
      toast.error(result.error.message);
      return;
    }
    toast.success(result.data);
    form.reset(buildDefaultValues(config));
  };
  return (
    <InferredForm onSubmit={handleSubmit} config={config}>
      <FormSubmitButton />
    </InferredForm>
  );
};

const iconVariants = {
  exit: {
    y: "100%",
    opacity: 0,
    filter: "blur(10px)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  initial: {
    y: "-100%",
    opacity: 0,
    filter: "blur(10px)",
  },
  enter: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const FormSubmitButton = () => {
  const form = useFormContext<InferredFormFields<typeof config>>();
  const { isSubmitSuccessful, isSubmitting } = form.formState;
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!isSubmitting && isSubmitSuccessful) {
      setShowSuccess(true);

      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitting, isSubmitSuccessful]);
  return (
    <FormSubmitButtonPrimitive variant={"primary"} type={"submit"}>
      <AnimatePresence mode="wait">
        {isSubmitting ? (
          <motion.div
            key="loading"
            variants={iconVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <LoadingIcon className="animate-spin" />
          </motion.div>
        ) : showSuccess ? (
          <motion.div
            key="success"
            variants={iconVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <CheckIcon />
          </motion.div>
        ) : (
          <motion.div
            key="icon"
            variants={iconVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <SendEmailIcon />
          </motion.div>
        )}
      </AnimatePresence>
      Contact Me
    </FormSubmitButtonPrimitive>
  );
};

export { config as inquiry };
