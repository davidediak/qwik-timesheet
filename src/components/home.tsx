import {
  component$,
  createContextId,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { DateTime, type PossibleDaysInMonth } from "luxon";
import MonthInput from "~/components/month-input";
import { type WeekTableRow } from "../types";
import WeekTable from "./week-table";
import YearInput from "./year-input";

export const CTX = createContextId<{ month: number; year: number }>(
  "HOME_CONTEXT",
);

const fillMissingWeekdays = (data: WeekTableRow) => {
  while (data.at(0)?.weekday !== 1) {
    data.unshift({
      dateISO: null,
      weekday: (data.at(0)?.weekday as number) - 1,
    });
  }

  while (data.at(-1)?.weekday !== 7) {
    data.push({
      dateISO: null,
      weekday: (data.at(-1)?.weekday as number) + 1,
    });
  }
};

const getWeekdata = () => {
  const date = DateTime.local();
  const days = date.daysInMonth as PossibleDaysInMonth;
  const daysAsArray = Array.from({ length: days }, (_, i) => i + 1);
  const weekData = daysAsArray.map((day) => {
    const date = DateTime.local().set({ day });
    return {
      dateISO: date.toISODate(),
      weekday: date.weekday,
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
  const data = useStore({
    month: DateTime.local().month,
    year: DateTime.local().year,
  });
  useContextProvider(CTX, data);
  const weeks = useStore(getWeekdata());

  const a = (
    <>
      <MonthInput />
      <YearInput />
      {weeks.map((r, i) => {
        return <WeekTable value={r} key={i} />;
      })}
    </>
  );

  return a;
});
