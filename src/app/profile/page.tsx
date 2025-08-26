import ProfileClient from './ProfileClient';
import BackNav from '@/components/BackNav';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <BackNav />
      <ProfileClient />
    </div>
  );
}

