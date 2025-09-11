'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/components/I18nProvider';

function ActivateUserLinkPage() {
	return (
	const router = useRouter();
	const { t } = useI18n();
	const [message, setMessage] = useState<string>(t('activateUser.applying'));
	const [ok, setOk] = useState<boolean>(false);

	useEffect(() => {
		try {
			const url = new URL(window.location.href);
			const params = url.searchParams;
			const username = (params.get('u') || '').trim();
			const password = (params.get('p') || '').trim();
			const phone = (params.get('phone') || '').trim();
			const status = (params.get('status') || 'active').trim(); // active | pending
			const plan = (params.get('plan') || 'Básico').trim();
			const daysRaw = params.get('days') || '30';
			const durationDays = Math.max(1, parseInt(daysRaw, 10) || 30);

			if (!username || !password) {
				setMessage(t('activateUser.missing'));
				setOk(false);
				return;
			}

			const existingAccounts = JSON.parse(localStorage.getItem('ganaFacilAccounts') || '[]');
			const accounts = Array.isArray(existingAccounts) ? existingAccounts : [];
			const idx = accounts.findIndex((acc: any) => acc?.username === username);

			let expiresAt: string | null = null;
			if (status === 'active') {
				const exp = new Date();
				exp.setDate(exp.getDate() + durationDays);
				expiresAt = exp.toISOString();
			}

			const updatedAccount = {
				username,
				password,
				phone: phone || null,
				isActivated: true,
				status: status === 'active' ? 'active' : 'pending',
				plan: status === 'active' ? (plan || 'Básico') : null,
				expiresAt,
				activatedWith: null,
				createdAt: new Date().toISOString()
			};

			if (idx >= 0) {
				accounts[idx] = { ...accounts[idx], ...updatedAccount };
			} else {
				accounts.push(updatedAccount);
			}

			localStorage.setItem('ganaFacilAccounts', JSON.stringify(accounts));
			localStorage.setItem('ganaFacilUser', JSON.stringify(updatedAccount));

			setOk(true);
			setMessage(status === 'active' ? t('activateUser.applied') : t('activateUser.pending'));
			setTimeout(() => {
				router.push('/dashboard');
			}, 1200);
		} catch (err) {
			setOk(false);
			setMessage(t('activateUser.error'));
		}
	}, [router]);

		<div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
			<div className={`max-w-md w-full text-center p-6 rounded-xl border ${ok ? 'border-green-500 bg-green-900/30 text-green-100' : 'border-yellow-500 bg-yellow-900/30 text-yellow-100'}`}>
				<h1 className="text-2xl font-bold mb-3">Gana Fácil</h1>
				<p className="mb-4">{message}</p>
				<div className="flex gap-3 justify-center">
					<a href="/dashboard" className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg">{t('activateUser.goDashboard')}</a>
					<a href="/login" className="bg-gray-700 text-white px-4 py-2 rounded-lg">{t('activateUser.goLogin')}</a>
				</div>
			</div>
		</div>
	);
}

export default ActivateUserLinkPage;


