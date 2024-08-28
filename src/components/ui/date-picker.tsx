"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { format } from "date-fns";
import type {
  CalendarProps,
  DateRangeCalendarProps,
  SingleDateCalendarProps,
} from "./calendar";
import { Calendar } from "./calendar";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type DatePickerProps = CalendarProps;
// todo: add disabled prop
export const DatePicker = (props: DatePickerProps) => {
  return (
    <Popover>
      {props.type === "date-range" ? (
        <DateRangePicker {...props} />
      ) : (
        <SingleDatePicker {...props} />
      )}
    </Popover>
  );
};

const SingleDatePicker = (props: SingleDateCalendarProps) => {
  const [value, setValue] = useControllableState({
    prop: props.value,
    defaultProp: props.defaultValue,
    onChange: props.onChange,
  });
  return (
    <>
      <PopoverTrigger className={"flex items-center"}>
        <Input
          type={"text"}
          value={props.value ? format(props.value, "dd/MM/yyyy") : undefined}
          className={"min-w-64"}
        />
      </PopoverTrigger>
      <PopoverContent>
        <Calendar {...props} type={"date"} onChange={setValue} value={value} />
      </PopoverContent>
    </>
  );
};

const DateRangePicker = (props: DateRangeCalendarProps) => {
  const [value, setValue] = useControllableState({
    prop: props.value,
    defaultProp: props.defaultValue,
    onChange: props.onChange,
  });

  return (
    <>
      <PopoverTrigger className={"flex items-center"}>
        <Input
          type={"text"}
          value={`${value?.start ? format(value.start, "dd/MM/yyyy") : ""} ${value?.end || value?.start ? " - " : ""} ${value?.end ? format(value.end, "dd/MM/yyyy") : ""}`}
          className={"cursor- min-w-64"}
        />
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          {...props}
          type={"date-range"}
          onChange={setValue}
          value={value}
          defaultValue={value}
        />
      </PopoverContent>
    </>
  );
};
