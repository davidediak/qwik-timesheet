import { $, component$, useContext } from "@builder.io/qwik";
import { CTX } from "./home";

export default component$(() => {
  const ctx = useContext(CTX);
  const setYear = $((e: Event) => {
    const n = Number((e.target as HTMLInputElement).value);
    ctx.year = n;
  });

  return (
    <>
      <input
        type="number"
        id="year"
        value={ctx.year}
        onInput$={(e) => setYear(e)}
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        required
      ></input>
    </>
  );
});
