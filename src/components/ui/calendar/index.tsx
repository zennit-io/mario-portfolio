"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@/icons";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { cva } from "class-variance-authority";
import {
  addMonths,
  addYears,
  eachDayOfInterval,
  getMonth,
  getYear,
  isBefore,
  isSameDay,
  isSameYear,
  subMonths,
} from "date-fns";
import { useState } from "react";
import { Button } from "../button";
import {
  CalendarBody,
  CalendarHeader,
  Calendar as CalendarPrimitive,
} from "./calendar-primitive";

export type DateRange = { start: Date; end: Date };

type GeneralCalendarProps = {
  startYear?: number;
  endYear?: number;
  className?: string;
  mode?: "start" | "end";
  disabled?: boolean;
};
export type SingleDateCalendarProps = GeneralCalendarProps & {
  value?: Date;
  defaultValue?: Date;
  onChange?: (value: Date) => void;
};

export type DateRangeCalendarProps = GeneralCalendarProps & {
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (value: DateRange) => void;
  multiplePages?: boolean;
};

export type CalendarProps =
  | ({
      type?: "date";
    } & SingleDateCalendarProps)
  | ({ type: "date-range" } & DateRangeCalendarProps);

export const Calendar = (props: CalendarProps) => {
  if (props.type === "date-range") return <DateRangeCalendar {...props} />;
  return <SingleDateCalendar {...props} />;
};

const cellVariants = cva(
  "mx-0 box-border w-[calc(100%/7)] rounded-none shadow-none",
  {
    variants: {
      variant: {
        "active-monday": "rounded-l-lg ",
        "active-sunday": "rounded-r-lg",
        "start-date": "rounded-l-lg",
        "end-date": "rounded-r-lg",
        "single-date": "rounded-lg",
      },
    },
  },
);

const DateRangeCalendar = ({
  value,
  startYear = 1960,
  endYear = getYear(addYears(new Date(), 10)),
  multiplePages = true,
  defaultValue,
  onChange,
  ...props
}: DateRangeCalendarProps) => {
  const [selectedDateRange, setSelectedDateRange] = useControllableState({
    prop: value,
    onChange: onChange,
    defaultProp: defaultValue,
  });

  const handleDateChange = (selectedDate: Date) => {
    setSelectedDateRange((previousDateRange) => {
      if (!previousDateRange)
        return {
          start: selectedDate,
          end: selectedDate,
        };
      const selectedDateRangeEdge = Object.entries(previousDateRange).find(
        ([_, edgeDate]) => isSameDay(edgeDate, selectedDate),
      )?.[0] as keyof DateRange | undefined;

      const isFirstSelectedDate = Object.entries(previousDateRange).every(
        ([_, value]) => value === undefined,
      );

      const selectedEdgeType =
        selectedDateRangeEdge ?? (isFirstSelectedDate ? "start" : undefined);

      const dateRangeExtensionType = isBefore(
        selectedDate,
        previousDateRange.start,
      )
        ? "start"
        : "end";

      if (isSameDay(previousDateRange.start, previousDateRange.end)) {
        // date range is not selected
        return {
          ...previousDateRange,
          [dateRangeExtensionType]: selectedDate,
        };
      }

      if (selectedEdgeType) {
        const invertedMode = selectedEdgeType === "start" ? "end" : "start";
        const isRangeStartDateSelected =
          selectedEdgeType === "start" && previousDateRange.start !== undefined;

        if (isRangeStartDateSelected)
          return { start: undefined, end: undefined } as unknown as DateRange;

        if (isFirstSelectedDate)
          return { start: selectedDate, end: selectedDate };

        // range end date is selected
        return {
          ...previousDateRange,
          [invertedMode]: previousDateRange[selectedEdgeType],
        };
      }

      return {
        ...previousDateRange,
        [dateRangeExtensionType]: selectedDate,
      };
    });
  };

  if (multiplePages)
    return (
      <MultiPageDateRangeCalendar
        onDateChange={handleDateChange}
        value={selectedDateRange}
        startYear={startYear}
        endYear={endYear}
        {...props}
      />
    );
  return (
    <SinglePageDateRangeCalendar
      onDateChange={handleDateChange}
      value={selectedDateRange}
      startYear={startYear}
      endYear={endYear}
      {...props}
    />
  );
};

type DateRangeImplementationProps = DateRangeCalendarProps & {
  endYear: number;
  startYear: number;
  value?: DateRange;
  onDateChange: (value: Date) => void;
};

const MultiPageDateRangeCalendar = ({
  value,
  startYear,
  endYear,
  onChange,
  onDateChange,
  ...props
}: DateRangeImplementationProps) => {
  const [firstPageDate, setFirstPageDate] = useState(
    value?.start ?? new Date(),
  );
  const [lastPageDate, setLastPageDate] = useState(
    value?.end ?? addMonths(new Date(), 1),
  );

  const firstPageMonth = getMonth(firstPageDate);
  const lastPageMonth = getMonth(lastPageDate);
  const firstPageYear = getYear(firstPageDate);
  const lastPageYear = getYear(lastPageDate);
  const arePagesOnSameYear = isSameYear(firstPageDate, lastPageDate);

  const isPreviousYearUnavailable =
    subMonths(firstPageDate, 1).getFullYear() < startYear;
  const isNextYearUnavailable =
    addMonths(lastPageDate, 1).getFullYear() > endYear;

  const handlePagesChange = (type: "forwards" | "backwards") => {
    setFirstPageDate(
      type === "forwards"
        ? addMonths(firstPageDate, 1)
        : subMonths(firstPageDate, 1),
    );
    setLastPageDate(
      type === "forwards"
        ? addMonths(lastPageDate, 1)
        : subMonths(lastPageDate, 1),
    );
  };

  return (
    <div>
      <div className={"mb-2 flex items-center gap-2"}>
        <CalendarHeader
          date={firstPageDate}
          startYear={startYear}
          endYear={lastPageYear}
          endMonth={arePagesOnSameYear ? lastPageMonth : undefined}
          showCalendarPageControls={false}
          onPageChange={setFirstPageDate}
          className={"mb-0"}
        />
        -
        <CalendarHeader
          date={lastPageDate}
          endYear={endYear}
          startYear={firstPageYear}
          startMonth={arePagesOnSameYear ? firstPageMonth + 1 : undefined}
          showCalendarPageControls={false}
          onPageChange={setLastPageDate}
          className={"mb-0 pl-2"}
        />
        <div className={"ml-auto flex items-center gap-2"}>
          <Button
            size={"icon"}
            variant={"soft"}
            className={"ml-auto size-6 disabled:opacity-40"}
            disabled={isPreviousYearUnavailable}
            onClick={() => handlePagesChange("backwards")}
          >
            <ChevronLeftIcon className={"size-4"} />
          </Button>
          <Button
            size={"icon"}
            variant={"soft"}
            className={"size-6 disabled:opacity-40"}
            disabled={isNextYearUnavailable}
            onClick={() => handlePagesChange("forwards")}
          >
            <ChevronRightIcon className={"size-4"} />
          </Button>
        </div>
      </div>

      <div className={"flex divide-x divide-border"}>
        <div className={"w-64 pr-4"}>
          <CalendarBody
            date={value?.start}
            onDateChange={onDateChange}
            activeDates={value ? eachDayOfInterval(value) : []}
            pageDate={firstPageDate}
            classList={{
              cell: {
                startDate: cellVariants({ variant: "start-date" }),
                endDate: cellVariants({ variant: "end-date" }),
                singleDate: cellVariants({ variant: "single-date" }),
                active: cellVariants(),
              },
            }}
            {...props}
          />
        </div>
        <div className={"w-64 pl-4"}>
          <CalendarBody
            date={value?.end}
            onDateChange={onDateChange}
            activeDates={value ? eachDayOfInterval(value) : []}
            pageDate={lastPageDate}
            classList={{
              cell: {
                startDate: cellVariants({ variant: "start-date" }),
                endDate: cellVariants({ variant: "end-date" }),
                singleDate: cellVariants({ variant: "single-date" }),
                active: cellVariants(),
              },
            }}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

const SinglePageDateRangeCalendar = ({
  value,
  onDateChange,
  ...props
}: DateRangeImplementationProps) => {
  const day = value?.start;
  return (
    <CalendarPrimitive
      {...props}
      value={day}
      classList={{
        cell: {
          startDate: cellVariants({ variant: "start-date" }),
          endDate: cellVariants({ variant: "end-date" }),
          singleDate: cellVariants({ variant: "single-date" }),
          active: cellVariants(),
        },
      }}
      onDatePick={onDateChange}
      activeDates={value ? eachDayOfInterval(value) : []}
    />
  );
};

const SingleDateCalendar = ({
  defaultValue,
  value,
  onChange,
  ...props
}: SingleDateCalendarProps) => {
  const [selectedDate, setSelectedDate] = useControllableState({
    prop: value,
    onChange: onChange,
    defaultProp: defaultValue,
  });

  return (
    <CalendarPrimitive
      {...props}
      value={selectedDate}
      activeDates={selectedDate ? [selectedDate] : []}
      onDatePick={setSelectedDate}
    />
  );
};

export {
  CalendarBody,
  CalendarHeader,
  Calendar as CalendarPrimitive,
} from "./calendar-primitive";
