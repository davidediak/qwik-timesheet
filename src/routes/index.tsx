import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Home from '../components/home';

export default component$(() => {
  return (
    <>
   <Home></Home>
    </>
  );
});

export const head: DocumentHead = {
  title: "Timesheet",
  meta: [
    {
      name: "description",
      content: "Just a simple timesheet app",
    },
  ],
};
