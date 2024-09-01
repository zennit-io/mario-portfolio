import { ChevronDownIcon } from "@/icons";
import type { ClassList } from "@/types";
import { cn } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { type ChangeEvent, type ClipboardEvent, useRef, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { textBlurAnimationConfig } from "../_animations";
import {
  type ISO,
  type PhoneNumberType,
  createPhoneNumber,
  phoneNumberMap,
  refinePhoneNumber,
} from "../phone-number";
import { inputRootVariants } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  type SelectProps,
  SelectTrigger,
} from "./select";

// todo: country select classList

type PhoneInputClassListKey = "root" | "input" | "countrySelect";
export type PhoneInputProps = {
  value?: string;
  defaultValue?: string;
  defaultCountry?: ISO;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  classList?: ClassList<PhoneInputClassListKey>;
} & ControllerRenderProps;

export const PhoneInput = ({
  value,
  onChange,
  onBlur,
  defaultValue, // todo: change country based on default value (it doesn't work because value(phoneNumber is always set
  defaultCountry,
  disabled,
  className,
  classList,
  ref,
}: PhoneInputProps) => {
  const [phoneNumberComposer, setPhoneNumberComposer] =
    useState<PhoneNumberType>(createPhoneNumber(defaultCountry ?? "US"));
  const elementRef = useRef<HTMLInputElement | null>(null);

  const handleCountryChange = (iso: ISO, targetPhoneNumber?: string) => {
    const updatedPhoneNumberComposer = createPhoneNumber(iso);
    const formattedNumber = updatedPhoneNumberComposer.format(
      targetPhoneNumber ?? phoneNumber,
    );

    setPhoneNumberComposer(updatedPhoneNumberComposer);

    onChange?.(formattedNumber.fullNumber);

    return formattedNumber;
  };

  const resetPhoneNumber = (phoneNumber: string) => {
    let countryIso: ISO = phoneNumberComposer.iso;
    let countryCode = phoneNumberComposer.metadata.countryCode;
    let significantNumber = refinePhoneNumber(phoneNumber).replace(/^00/, "");

    for (const [iso, country] of Object.entries(phoneNumberMap)) {
      if (significantNumber.startsWith(country.metadata.countryCode)) {
        countryIso = iso as ISO;
        countryCode = country.metadata.countryCode;
        significantNumber = significantNumber.slice(countryCode.length);
        break;
      }
    }

    return handleCountryChange(countryIso, significantNumber);
  };

  const [phoneNumber, setPhoneNumber] = useState(() => {
    const formattedNumber = resetPhoneNumber(value ?? "");

    return formattedNumber.significantNumber;
  });

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedSignificantNumber = event.target.value;
    const formattedNumber = phoneNumberComposer.format(
      updatedSignificantNumber,
    );

    const isEditingPhoneNumber =
      (elementRef.current?.selectionStart ?? 0) <
      updatedSignificantNumber.length;

    if (isEditingPhoneNumber) {
      const previousCursorPosition = elementRef.current?.selectionStart ?? 0;

      window.requestAnimationFrame(() => {
        // this ensures that the cursor position is set after the value is updated (like useEffect) but runs even if the value doesn't change
        if (!elementRef.current) return;

        elementRef.current.setSelectionRange(
          previousCursorPosition,
          previousCursorPosition,
        );
      });
    }

    setPhoneNumber(formattedNumber.significantNumber);

    onChange?.(formattedNumber.fullNumber);
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    const value = event.clipboardData?.getData("text/plain");
    const formattedPhoneNumber = resetPhoneNumber(value);

    setPhoneNumber(formattedPhoneNumber.significantNumber);
  };

  return (
    <div
      className={cn(
        inputRootVariants({ disabled }),
        disabled && "cursor-not-allowed",
        className,
        classList?.root,
      )}
    >
      <PhoneCountrySelect
        phoneNumberComposer={phoneNumberComposer}
        disabled={disabled}
        onCountrySelect={(selectedCountry) => {
          const formattedPhoneNumber = handleCountryChange(selectedCountry);

          setPhoneNumber(formattedPhoneNumber.significantNumber);
        }}
      />
      <input
        type="tel"
        inputMode={"numeric"}
        ref={(el) => {
          elementRef.current = el;
          ref?.(el);
        }}
        value={phoneNumber}
        // defaultValue={defaultValue}
        disabled={disabled}
        className={cn(
          "w-full flex-1 bg-transparent focus:outline-none",
          disabled && "cursor-not-allowed",
          classList?.input,
        )}
        onChange={handlePhoneNumberChange}
        onBlur={onBlur}
        onPaste={handlePaste}
      />
    </div>
  );
};

type PhoneCountrySelectProps = {
  phoneNumberComposer: PhoneNumberType;
  onCountrySelect: (iso: ISO) => void;
  className?: string;
} & SelectProps;

const PhoneCountrySelect = ({
  phoneNumberComposer,
  onCountrySelect,
  className,
  ...props
}: PhoneCountrySelectProps) => {
  return (
    <AnimatePresence>
      <Select
        {...props}
        value={phoneNumberComposer.iso}
        onValueChange={(iso: ISO) => {
          onCountrySelect(iso);
        }}
      >
        <SelectTrigger
          className={cn(
            "w-fit border-0 focus:ring-0",
            props.disabled && "cursor-not-allowed",
          )}
          asChild
        >
          <button
            className={
              "group flex h-full items-center gap-2 capitalize outline-none ring-0"
            }
            type={"button"}
          >
            <span
              className={
                "flex items-center gap-1 rounded-md px-1 font-semibold text-foreground-dimmed group-focus-visible:ring-2 group-focus-visible:ring-ring"
              }
            >
              <ChevronDownIcon className={"size-4"} />
              <AnimatePresence mode="wait">
                <motion.span
                  key={phoneNumberComposer.iso}
                  {...textBlurAnimationConfig}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  {phoneNumberComposer.iso}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="h-[70%] w-px bg-border" />
            <span>+{phoneNumberComposer.metadata.countryCode}</span>
          </button>
        </SelectTrigger>
        <SelectContent sideOffset={4}>
          {Object.entries(phoneNumberMap).map(([iso, country]) => (
            <SelectItem key={iso} value={iso}>
              {country.metadata.countryName}{" "}
              <span className={"opacity-60"}>
                (+{country.metadata.countryCode})
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </AnimatePresence>
  );
};
