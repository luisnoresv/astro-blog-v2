import { Suspense, useEffect, useState } from 'react';
import { FeedbackForm } from './feedback-form';
import { FeedbackList } from './feedback-list';

type Feedbacks = {
  _id: number;
  author: string;
  body: string;
  postedDate: Date;
};

function Loading() {
  return <div>🌀 Fetching information...</div>;
}

export function FeedbackWrapper() {
  const [feedbacks, setFeedbacks] = useState<Feedbacks[]>([]);

  useEffect(() => {
    async function fetchFeedback() {
      try {
        // await new Promise(resolve => {
        //   setTimeout(resolve, 3000);
        // });
        const response = await fetch('/api/feedback.json');
        if (response.ok) {
          const data = await response.json();
          setFeedbacks(data.feedbacks);
        }

      } catch (error) {
        console.error(error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <section className="mt-2 flex flex-col flex-wrap gap-5 h-full w-full">
      <code className='text-sm text-slate-600'>This is a client-side ReactJS component</code>
      <Suspense fallback={<Loading />}>
        <FeedbackList feedbacks={feedbacks} />
      </Suspense>
      <FeedbackForm onSetFeedbacks={setFeedbacks} feedbacks={feedbacks} />
    </section >
  );
}