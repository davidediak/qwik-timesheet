import {
  component$,
  createContextId,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { DateTime } from "luxon";
import MonthInput from "~/components/month-input";
import YearInput from "./year-input";

export const CTX = createContextId<{ month: number; year: number }>(
  "HOME_CONTEXT",
);

export default component$(() => {
  const data = useStore({
    month: DateTime.local().month,
    year: DateTime.local().year,
  });

  useContextProvider(CTX, data);

  return (
    <>
      <MonthInput />
      <YearInput />
    </>
  );
});
