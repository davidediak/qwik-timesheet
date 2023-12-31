import { $, component$, useContext } from "@builder.io/qwik";
import { DateTime } from "luxon";
import { CTX } from "./home";
const Input = component$<{ rowIndex: number; colIndex: number }>(
  ({ rowIndex, colIndex }) => {
    const ctx = useContext(CTX);
    const cellData = ctx.weeks.at(rowIndex)!.at(colIndex)!;
    const setCell = $((v: string) => {
      ctx.weeks.at(rowIndex)!.at(colIndex)!.value = v;
      ctx.weeks = [...ctx.weeks];
    });

    return (
      <input
        type="text"
        value={cellData.value}
        onChange$={(e) => setCell(e.target.value)}
        class="block w-12 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      ></input>
    );
  },
);

export default component$<{ rowIndex: number }>(({ rowIndex }) => {
  const ctx = useContext(CTX);
  const weekData = ctx.weeks.at(rowIndex);
  return (
    <div>
      {/* Header */}
      <div class="grid grid-cols-7">
        {weekData?.map((v, i) => {
          const dateISO = v.dateISO;
          if (!dateISO) {
            return (
              <div class="px-6 py-3 font-medium " key={i}>
                {""}
              </div>
            );
          } else {
            const date = DateTime.fromISO(dateISO);
            const isWeekend = date.weekday === 6 || date.weekday === 7;
            return (
              <div
                class={`px-6 py-3 font-medium ${
                  isWeekend ? "text-gray-500" : ""
                }`}
                key={dateISO}
              >
                {date.toFormat("dd/MM")}
              </div>
            );
          }
        })}
      </div>
      {/* Actual Input cells */}
      <div class="grid grid-cols-7">
        {weekData?.map((v, i) => {
          return (
            <div key={i} class="px-6 ">
              {v.dateISO ? <Input rowIndex={rowIndex} colIndex={i} /> : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
});
