'use client';

import React from 'react';
import { getDictionary } from '@/i18n/dictionaries';

interface TranslatedTextProps {
  key: string;
  lang?: 'es' | 'en';
  params?: Record<string, any>;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function TranslatedText({ 
  key, 
  lang = 'es', 
  params, 
  className,
  as: Component = 'span'
}: TranslatedTextProps) {
  const dict = getDictionary(lang);
  let text = dict[key] || `[${key}]`;
  
  // Reemplazar parámetros si existen
  if (params) {
    Object.keys(params).forEach(param => {
      text = text.replace(`{{${param}}}`, params[param]);
    });
  }
  
  const ComponentElement = Component as React.ElementType;
  
  return (
    <ComponentElement className={className}>
      {text}
    </ComponentElement>
  );
}

// Hook para usar traducciones en componentes
export function useTranslation(lang: 'es' | 'en' = 'es') {
  const dict = getDictionary(lang);
  
  const t = (key: string, params?: Record<string, any>) => {
    let text = dict[key] || `[${key}]`;
    
    if (params) {
      Object.keys(params).forEach(param => {
        text = text.replace(`{{${param}}}`, params[param]);
      });
    }
    
    return text;
  };
  
  return { t };
}