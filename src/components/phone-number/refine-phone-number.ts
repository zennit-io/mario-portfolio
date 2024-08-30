export const refinePhoneNumber = (phoneNumber: string, countryCode = "") => {
  return phoneNumber.replace("(0)", "").replace(/\D/g, "");
};
