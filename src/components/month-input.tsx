import { $, component$, useContext } from "@builder.io/qwik";
import { CTX } from "./home";

const months: { value: number; label: string }[] = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

export default component$(() => {
  const ctx = useContext(CTX);
  const setMonth = $((n: number) => {
    ctx.month = n;
  });

  return (
    <>
      <select
        id="months"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        onChange$={(e) => setMonth(Number(e.target.value))}
      >
        {months.map((monthOption) => (
          <option
            key={monthOption.value}
            value={monthOption.value}
            selected={monthOption.value === ctx.month}
          >
            {monthOption.label}
          </option>
        ))}
      </select>
    </>
  );
});
