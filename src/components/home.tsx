import {
  component$,
  createContextId,
  useComputed$,
  useContextProvider,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import { DateTime, type PossibleDaysInMonth } from "luxon";
import MonthInput from "~/components/month-input";
import { type WeekTableRow } from "../types";
import PrintButton from "./print-button";
import WeekDays from "./week-days";
import WeekTable from "./week-table";
import YearInput from "./year-input";

export type ContextData = {
  month: number;
  year: number;
  weeks: WeekTableRow[];
};

export const CTX = createContextId<ContextData>("HOME_CONTEXT");

const fillMissingWeekdays = (data: WeekTableRow) => {
  while (data.at(0)?.weekday !== 1) {
    data.unshift({
      dateISO: null,
      weekday: (data.at(0)?.weekday as number) - 1,
      value: "",
    });
  }

  while (data.at(-1)?.weekday !== 7) {
    data.push({
      dateISO: null,
      weekday: (data.at(-1)?.weekday as number) + 1,
      value: "",
    });
  }
};

const getWeekdata = (month: number, year: number) => {
  const days = DateTime.local(year, month).daysInMonth as PossibleDaysInMonth;
  const daysAsArray = Array.from({ length: days }, (_, i) => i + 1);

  const weekData = daysAsArray.map((day) => {
    const date = DateTime.local().set({ day, month, year });
    const isWeekend = date.weekday === 6 || date.weekday === 7;
    const value = isWeekend ? "" : "8";

    return {
      dateISO: date.toISODate(),
      weekday: date.weekday,
      value,
    };
  });

  fillMissingWeekdays(weekData);

  const rows = weekData.reduce((acc, curr) => {
    if (curr.weekday === 1) {
      acc.push([]);
    }
    acc[acc.length - 1].push(curr);
    return acc;
  }, [] as WeekTableRow[]);
  return rows;
};

export default component$(() => {
  const data: ContextData = useStore(
    {
      month: DateTime.local().month,
      year: DateTime.local().year,
      weeks: [],
    },
    { deep: true, reactive: true },
  );

  const isYearValid = useComputed$(() => data.year.toString().length === 4);

  useTask$(({ track }) => {
    track(() => data.year && data.month && isYearValid.value);
    data.weeks = isYearValid.value ? getWeekdata(data.month, data.year) : [];
  });

  const totalHours = useComputed$(() =>
    data.weeks.reduce((acc, curr) => {
      const total = curr.reduce((acc, curr) => (acc += Number(curr.value)), 0);
      return acc + total;
    }, 0),
  );

  useContextProvider(CTX, data);

  const a = (
    <div class="flex flex-col gap-9 px-20 py-10">
      <MonthInput />
      <YearInput />
      <WeekDays />
      {data.weeks.map((_, i) => {
        return <WeekTable rowIndex={i} key={i} />;
      })}
      {!!totalHours.value && (
        <div class="flex w-full justify-center">
          <span class="font-bold"> Total Hours: {totalHours}</span>
        </div>
      )}
      {isYearValid.value && (
        <div class="flex w-full justify-center print:hidden">
          <PrintButton />
        </div>
      )}
    </div>
  );

  return a;
});
