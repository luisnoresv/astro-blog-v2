// For Solid
/** @jsxImportSource solid-js */

import { createResource, createSignal } from 'solid-js';

async function postFormData(formData: FormData) {
  const author = formData.get('author');
  const body = formData.get('content');

  // console.info({ author, body });

  const response = await fetch("/api/feedback.json", {
    method: "POST", headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ author, body })
  });
  const { feedback } = await response.json();
  return feedback;
}

export function FeedbackForm({ onRefetch }: { onRefetch: any; }) {
  const [formData, setFormData] = createSignal<FormData>();
  const [response] = createResource(formData, postFormData);

  const submit = (e: SubmitEvent) => {
    e.preventDefault();
    setFormData(new FormData(e.target as HTMLFormElement));
    onRefetch();
  };

  return (
    <section class="w-3/4 border-2 border-solid mt-2 rounded-md">
      <h2 class="ml-2 mt-2 text-sm text-slate-500">
        Contribute with some feedback
      </h2>
      <form onSubmit={submit} class="flex flex-col ml-1 w-1/2">
        <input
          class="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          id="author"
          placeholder="Add your name..."
          name="author"
        />
        <textarea
          class="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          id="content"
          name="content"
          placeholder="Add some content..."></textarea>

        <button
          class="w-56 justify-center mt-2 mb-2 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-600 hover:bg-indigo-900"
          type="submit">Submit</button>
      </form>
    </section>
  );
}