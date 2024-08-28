import type { signUpFormConfig } from "../contact-me-form";
import type { InferredFormFields } from "../form";

export type EmailTemplateProps = InferredFormFields<typeof signUpFormConfig>;

export const EmailTemplate = ({
  fullName,
  email,
  description,
  phoneNumber,
}: EmailTemplateProps) => {
  return (
    <div className="font-sans">
      <h1 className="font-semibold text-center">You have a new inquiry!</h1>
      <h3>Name: {fullName}</h3>
      <h3>Email: {email}</h3>
      <h3>Phone Number: {phoneNumber}</h3>
      <p>Description: {description}</p>
    </div>
  );
};
