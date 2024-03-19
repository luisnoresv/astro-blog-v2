// For Solid
/** @jsxImportSource solid-js */

import { For, Show, createResource } from 'solid-js';
import { FeedbackCard } from './feedback-card';
import { FeedbackForm } from './feedback-form';

async function fetchFeedback() {
  const response = await fetch('http://localhost:4321/api/feedback.json');

  return response.json();
}

// External API
async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');

  return response.json();
}

export function FeedbackWrapper() {
  const [data, { refetch }] = createResource(fetchFeedback);
  // const [users] = createResource(fetchUsers);


  return (
    <section class="mt-2 flex flex-col flex-wrap gap-5 h-full w-full">

      <Show when={data()} fallback={<div>🌀 Fetching information...</div>}>
        <code class='text-sm text-slate-600'>This is a SolidJS component</code>
        {/* <For each={users()}>
          {(user) => (
            <>
              <p>name: {user.name}</p>
              <p>email: {user.email}</p>
            </>
          )}
        </For> */}
        <For each={data().feedbacks}>
          {(feedback) => <FeedbackCard feedback={feedback} />}
        </For>
        <FeedbackForm onRefetch={refetch} />
      </Show>
    </section >
  );
}