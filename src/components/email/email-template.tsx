import type { inquiry } from "../contact-me-form";
import type { InferredFormFields } from "../form";

export type EmailTemplateProps = InferredFormFields<typeof inquiry>;

export const EmailTemplate = ({
  fullName,
  email,
  description,
  phoneNumber,
}: EmailTemplateProps) => {
  return (
    <div className="font-sans">
      <h1 className="text-center font-semibold">You have a new inquiry!</h1>
      <h3>Name: {fullName}</h3>
      <h3>Email: {email}</h3>
      <h3>
        Phone Number: <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
      </h3>
      <h3>Description: </h3>
      <p>{description}</p>
    </div>
  );
};
