'use client';

import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type UserInfo = { email?: string; name?: string } | null;

export default function AssignedToDisplay({ assignedTo }: { assignedTo?: string }) {
  const [info, setInfo] = useState<UserInfo>(null);

  useEffect(() => {
    if (!assignedTo) return;
    const ref = doc(db!, 'users', assignedTo);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data() as any;
        setInfo({ email: String(data?.email || ''), name: String(data?.name || '') });
      } else {
        setInfo(null);
      }
    });
    return () => unsub();
  }, [assignedTo]);

  const label = info?.name
    ? `${info.name}${info.email ? ` (${info.email})` : ''}`
    : (info?.email || assignedTo || '—');

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-xs text-gray-500 cursor-help underline decoration-dotted">
            Asignado a: <span className="font-mono" title={assignedTo}>{label}</span>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>UID: {assignedTo || '—'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}






