'use client';

import { cloneElement, useState, type ReactElement, type ReactNode } from 'react';

export function TooltipProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function Tooltip({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function TooltipTrigger({ asChild, children }: { asChild?: boolean; children: ReactElement }) {
  // Este wrapper es simbólico; el control real se maneja en TooltipContent con title nativo
  return children;
}

export function TooltipContent({ children }: { children: ReactNode }) {
  // Fallback: renderizar children como texto del tooltip nativo mediante title
  // Uso típico: envolver el trigger con span y pasar title en el propio trigger cuando sea posible.
  return <>{children}</>;
}







