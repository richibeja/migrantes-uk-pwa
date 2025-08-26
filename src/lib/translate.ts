export async function translateText(text: string, source: 'en'|'es', target: 'en'|'es'): Promise<string> {
  if (!text || source === target) return text;
  const url = process.env.NEXT_PUBLIC_LIBRETRANSLATE_URL || 'https://libretranslate.com/translate';
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, source, target, format: 'text' })
    });
    if (!res.ok) return text;
    const data = await res.json();
    return data?.translatedText || text;
  } catch {
    return text;
  }
}



