// For Solid
/** @jsxImportSource solid-js */

import { For, Show, createResource } from 'solid-js';
import { FeedbackCard } from './feedback-card';

async function fetchFeedback() {
  const response = await fetch('http://localhost:4321/api/feedback.json');

  return response.json();
}

export function FeedbackWrapper() {
  const [feedbacks] = createResource(fetchFeedback);


  return (
    <section class="mt-2 flex flex-col flex-wrap gap-5 h-full w-full">

      <Show when={feedbacks()} fallback={<div>🌀 Fetching information...</div>}>
        <code class='text-sm text-slate-600'>This is a SolidJS component</code>
        <For each={feedbacks().feedback}>
          {(feedback) => (
            <FeedbackCard feedback={feedback} />
          )}
        </For>
      </Show>
    </section >
  );
}