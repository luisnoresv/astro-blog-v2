import { formatDate } from '@lib/utils';

type FeedbackProps = {
  feedbacks: {
    _id: number;
    author: string;
    body: string;
    postedDate: Date;
  }[];
};

export function FeedbackList({ feedbacks }: FeedbackProps) {
  return (
    <>
      {
        feedbacks.length > 0 && feedbacks.map(({ _id, author, body, postedDate }) =>
        (<article key={_id} className="border-2 border-solid rounded-lg w-3/4 h-20">
          <section className="ml-2">
            <p className="text-xs text-slate-500">
              Posted by: <strong>{author}</strong> on <strong>{formatDate(postedDate)}</strong>
            </p>
            <p className="mt-4 text-slate-700">{body}</p>
          </section>
        </article>)
        )}
    </>
  );

}

