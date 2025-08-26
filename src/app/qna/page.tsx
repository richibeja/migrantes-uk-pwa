import QnaClient from './QnaClient';
import BackNav from '@/components/BackNav';

export { default as metadata } from './qna.metadata';

export default function QnaPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <BackNav />
      <QnaClient />
    </div>
  );
}


