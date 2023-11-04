import { component$ } from "@builder.io/qwik";
import { DateTime } from "luxon";
import { type WeekTableRow } from "../types";

const Input = component$<{ value: string }>(({ value }) => {
  return (
    <input
      type="text"
      value={value}
      class="block w-12 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
    ></input>
  );
});

export default component$<{ value: WeekTableRow }>(({ value }) => {
  return (
    <>
      <div class="grid grid-cols-7">
        {value.map((v, i) => {
          const dateISO = v.dateISO;
          return (
            <div class="px-6 py-3 font-bold	" key={i}>
              {dateISO ? DateTime.fromISO(dateISO).toFormat("dd/MM") : ""}
            </div>
          );
        })}
      </div>
      <div class="grid grid-cols-7">
        {value.map((v, i) => {
          const dateISO = v.dateISO;
          const isWeekend = v.weekday === 6 || v.weekday === 7;
          const value = isWeekend ? "" : "8";
          return (
            <div key={i} class="px-6 py-3">
              {dateISO ? <Input value={value} /> : ""}
            </div>
          );
        })}
      </div>
    </>
  );
});
