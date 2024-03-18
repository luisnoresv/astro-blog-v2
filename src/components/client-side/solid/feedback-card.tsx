// For Solid
/** @jsxImportSource solid-js */

import { formatDate } from '@lib/utils';

type FeedbackProps = {
  feedback: {
    _id: number;
    author: string;
    body: string;
    postedDate: Date;
  };
};

export function FeedbackCard({ feedback }: FeedbackProps) {
  return (
    <article class="border-2 border-solid rounded-lg w-3/4 h-20">
      <section class="ml-2">
        <p class="text-xs text-slate-500">
          Posted by: <strong>{feedback.author}</strong> on <strong>{formatDate(feedback.postedDate)}</strong>
        </p>
        <p class="mt-4 text-slate-700">{feedback.body}</p>
      </section>
    </article>
  );

}

