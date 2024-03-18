import { useRef, type FormEvent } from 'react';

type Feedbacks = {
  _id: number;
  author: string;
  body: string;
  postedDate: Date;
};

type Props = {
  onSetFeedbacks: React.Dispatch<React.SetStateAction<Feedbacks[]>>;
  feedbacks: {
    _id: number;
    author: string | '';
    body: string | '';
    postedDate: Date;
  }[];
};

export function FeedbackForm({ feedbacks, onSetFeedbacks }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const author = formData.get('author') as string;
    const body = formData.get('content') as string;

    const response = await fetch('/api/feedback.json', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ author, body })
    });

    const { feedback } = await response.json();
    console.info('FeedbackForm - feedback', feedback);
    // Optimistic Update
    // onSetFeedbacks([...feedbacks, { _id: feedbacks.length + 1, author, body, postedDate: new Date() }]);
    onSetFeedbacks([...feedbacks, feedback]);
    // console.info('formData', { author, body })
    formRef.current?.reset();
  };

  return (
    <section className="w-3/4 border-2 border-solid mt-2 rounded-md">
      <h2 className="ml-2 mt-2 text-sm text-slate-500">
        Contribute with some feedback
      </h2>
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col ml-1 w-1/2">
        <input
          className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          id="author"
          placeholder="Add your name..."
          name="author"
        />
        <textarea
          className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          id="content"
          name="content"
          placeholder="Add some content..."></textarea>

        <button
          className="w-56 justify-center mt-2 mb-2 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-600 hover:bg-indigo-900"
          type="submit">Submit</button>
      </form>
    </section>
  );
}