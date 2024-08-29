import type { signUpFormConfig } from "../contact-me-form";
import type { InferredRawShape } from "../form";

export type EmailTemplateProps = InferredRawShape<typeof signUpFormConfig>;

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
      <h3>
        Phone Number:
        <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
      </h3>
      <h3>Description: </h3>
      <p>{description}</p>
    </div>
  );
};
