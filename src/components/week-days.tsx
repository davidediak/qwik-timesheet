import { component$ } from "@builder.io/qwik";
import { Info } from "luxon";

export default component$(() => {
  const weekDays = Info.weekdays('short');
  return (
    <>
      <div class="grid grid-cols-7">
        {weekDays.map((day) => {
          return (
            <div class="px-6 font-semibold" key={day}>
              {day}
            </div>
          );
        })}
      </div>
    </>
  );
});
