# Verificaci?n Migrantes UK ? PWA (autom?tica)

Ruta | PASA/FALLA | Observaciones | Acci?n aplicada
--- | --- | --- | ---
/ | PASA | OK | Verificado autom?ticamente
/auth/login | PASA | offline.html no detectado | Verificado autom?ticamente
/auth/register | PASA | offline.html no detectado | Verificado autom?ticamente
/profile | FALLA | offline.html no detectado, Consola: Access to resource at 'http://localhost:3000/favicon.ico' from origin 'null' has been blocked by CORS policy: The request client is not a secure context and the resource is in more-private address space `local`. | Failed to load resource: net::ERR_FAILED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Verificado autom?ticamente
/cases | FALLA | offline.html no detectado, Consola: Failed to load resource: the server responded with a status of 400 () | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Verificado autom?ticamente
/cases/new | FALLA | offline.html no detectado, Consola: Failed to load resource: the server responded with a status of 400 () | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Verificado autom?ticamente
/cases/1 | FALLA | offline.html no detectado, Consola: Failed to load resource: the server responded with a status of 400 () | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Verificado autom?ticamente
/payments | FALLA | offline.html no detectado, Consola: Failed to load resource: the server responded with a status of 400 () | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Verificado autom?ticamente
/admin/payments | FALLA | BackNav no visible, offline.html no detectado, Consola: Failed to load resource: the server responded with a status of 400 () | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Verificado autom?ticamente
/assistant | FALLA | Consola: Failed to load resource: the server responded with a status of 400 () | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | [2025-08-25T10:01:40.793Z]  @firebase/firestore: Firestore (11.10.0): Could not reach Cloud Firestore backend. Connection failed 1 times. Most recent error: FirebaseError: [code=unavailable]: The operation could not be completed
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend. | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Verificado autom?ticamente
/directory | FALLA | Consola: Failed to load resource: the server responded with a status of 400 () | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Verificado autom?ticamente
/qna | FALLA | offline.html no detectado, Consola: Failed to load resource: the server responded with a status of 400 () | Failed to load resource: the server responded with a status of 400 () | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Verificado autom?ticamente
/upload | FALLA | BackNav no visible, Contenido insuficiente, offline.html no detectado, Consola: Failed to load resource: the server responded with a status of 500 (Internal Server Error) | ./src/app/upload/upload.metadata.ts
Error:   × You're importing a component that needs "next/headers". That only works in a Server Component but one of its parents is marked with "use client", so it's a Client Component.
  │ Learn more: https://nextjs.org/docs/app/building-your-application/rendering
  │

   ╭─[C:\Users\ALP\gana-facil\src\app\upload\upload.metadata.ts:2:1]
 1 │ import type { Metadata } from 'next';
 2 │ import { cookies } from 'next/headers';
   · ───────────────────────────────────────
 3 │ import { getDictionary } from '@/i18n/dictionaries';
 4 │ 
 4 │ export default async function metadata(): Promise<Metadata> {
   ╰──── | Failed to load resource: the server responded with a status of 500 (Internal Server Error) | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Verificado autom?ticamente
/letter | FALLA | BackNav no visible, Contenido insuficiente, offline.html no detectado, Consola: Failed to load resource: the server responded with a status of 500 (Internal Server Error) | ./src/app/letter/page.tsx
Error:   × You're importing a component that needs "next/headers". That only works in a Server Component but one of its parents is marked with "use client", so it's a Client Component.
  │ Learn more: https://nextjs.org/docs/app/building-your-application/rendering
  │

    ╭─[C:\Users\ALP\gana-facil\src\app\letter\page.tsx:8:1]
  5 │ import { AsylumFormData } from "@/types/asylum";
  6 │ import { useI18n } from "@/components/I18nProvider";
  7 │ import BackNav from '@/components/BackNav';
  8 │ import { cookies } from 'next/headers';
    · ───────────────────────────────────────
  9 │ import { getDictionary } from '@/i18n/dictionaries';
 10 │ import type { Metadata } from 'next';
 11 │ import { loadQnaDraft } from '@/lib/db';
    ╰────
  × You are attempting to export "generateMetadata" from a component marked with "use client", which is disallowed. Either remove the export, or the "use client" directive. Read more: https://nextjs.org/docs/app/api-reference/directives/use-client
  │

    ╭─[C:\Users\ALP\gana-facil\src\app\letter\page.tsx:13:1]
 10 │ import type { Metadata } from 'next';
 11 │ import { loadQnaDraft } from '@/lib/db';
 12 │ 
 13 │ export async function generateMetadata(): Promise<Metadata> {
    ·                       ────────────────
 14 │   const cookieStore = await cookies();
 15 │   const lang = (cookieStore.get('lang')?.value === 'en') ? 'en' : 'es';
 16 │   const d = getDictionary(lang as any);
    ╰──── | ./src/app/upload/upload.metadata.ts
Error:   × You're importing a component that needs "next/headers". That only works in a Server Component but one of its parents is marked with "use client", so it's a Client Component.
  │ Learn more: https://nextjs.org/docs/app/building-your-application/rendering
  │

   ╭─[C:\Users\ALP\gana-facil\src\app\upload\upload.metadata.ts:2:1]
 1 │ import type { Metadata } from 'next';
 2 │ import { cookies } from 'next/headers';
   · ───────────────────────────────────────
 3 │ import { getDictionary } from '@/i18n/dictionaries';
 4 │ 
 4 │ export default async function metadata(): Promise<Metadata> {
   ╰──── | Failed to load resource: the server responded with a status of 500 (Internal Server Error) | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Verificado autom?ticamente
/help-documents | FALLA | BackNav no visible, Contenido insuficiente, offline.html no detectado, Consola: Failed to load resource: the server responded with a status of 500 (Internal Server Error) | ./src/app/help-documents/page.tsx
Error:   × You're importing a component that needs "next/headers". That only works in a Server Component but one of its parents is marked with "use client", so it's a Client Component.
  │ Learn more: https://nextjs.org/docs/app/building-your-application/rendering
  │

   ╭─[C:\Users\ALP\gana-facil\src\app\help-documents\page.tsx:6:1]
 3 │ import Link from "next/link";
 4 │ import BackNav from '@/components/BackNav';
 5 │ import { useI18n } from "@/components/I18nProvider";
 6 │ import { cookies } from 'next/headers';
   · ───────────────────────────────────────
 7 │ import { getDictionary } from '@/i18n/dictionaries';
 8 │ import type { Metadata } from 'next';
   ╰────
  × You are attempting to export "generateMetadata" from a component marked with "use client", which is disallowed. Either remove the export, or the "use client" directive. Read more: https://nextjs.org/docs/app/api-reference/directives/use-client
  │

    ╭─[C:\Users\ALP\gana-facil\src\app\help-documents\page.tsx:10:1]
  7 │ import { getDictionary } from '@/i18n/dictionaries';
  8 │ import type { Metadata } from 'next';
  9 │ 
 10 │ export async function generateMetadata(): Promise<Metadata> {
    ·                       ────────────────
 11 │   const cookieStore = await cookies();
 12 │   const lang = (cookieStore.get('lang')?.value === 'en') ? 'en' : 'es';
 13 │   const d = getDictionary(lang as any);
    ╰──── | ./src/app/letter/page.tsx
Error:   × You're importing a component that needs "next/headers". That only works in a Server Component but one of its parents is marked with "use client", so it's a Client Component.
  │ Learn more: https://nextjs.org/docs/app/building-your-application/rendering
  │

    ╭─[C:\Users\ALP\gana-facil\src\app\letter\page.tsx:8:1]
  5 │ import { AsylumFormData } from "@/types/asylum";
  6 │ import { useI18n } from "@/components/I18nProvider";
  7 │ import BackNav from '@/components/BackNav';
  8 │ import { cookies } from 'next/headers';
    · ───────────────────────────────────────
  9 │ import { getDictionary } from '@/i18n/dictionaries';
 10 │ import type { Metadata } from 'next';
 11 │ import { loadQnaDraft } from '@/lib/db';
    ╰────
  × You are attempting to export "generateMetadata" from a component marked with "use client", which is disallowed. Either remove the export, or the "use client" directive. Read more: https://nextjs.org/docs/app/api-reference/directives/use-client
  │

    ╭─[C:\Users\ALP\gana-facil\src\app\letter\page.tsx:13:1]
 10 │ import type { Metadata } from 'next';
 11 │ import { loadQnaDraft } from '@/lib/db';
 12 │ 
 13 │ export async function generateMetadata(): Promise<Metadata> {
    ·                       ────────────────
 14 │   const cookieStore = await cookies();
 15 │   const lang = (cookieStore.get('lang')?.value === 'en') ? 'en' : 'es';
 16 │   const d = getDictionary(lang as any);
    ╰──── | ./src/app/upload/upload.metadata.ts
Error:   × You're importing a component that needs "next/headers". That only works in a Server Component but one of its parents is marked with "use client", so it's a Client Component.
  │ Learn more: https://nextjs.org/docs/app/building-your-application/rendering
  │

   ╭─[C:\Users\ALP\gana-facil\src\app\upload\upload.metadata.ts:2:1]
 1 │ import type { Metadata } from 'next';
 2 │ import { cookies } from 'next/headers';
   · ───────────────────────────────────────
 3 │ import { getDictionary } from '@/i18n/dictionaries';
 4 │ 
 4 │ export default async function metadata(): Promise<Metadata> {
   ╰──── | Failed to load resource: the server responded with a status of 500 (Internal Server Error) | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Failed to load resource: net::ERR_INTERNET_DISCONNECTED | Verificado autom?ticamente
