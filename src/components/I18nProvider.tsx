'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traducciones básicas
const resources = {
  es: {
    translation: {
      dashboard: {
        title: 'GanaFácil - Predicciones Inteligentes de Lotería',
        overview: 'Resumen',
        predictions: 'Predicciones',
        analysis: 'Análisis',
        settings: 'Configuración',
        welcome: 'Bienvenido al sistema de predicción de loterías más avanzado'
      },
      anbel: {
        title: 'ANBEL IA - El Agente Más Avanzado del Mundo',
        greeting: '¡Hola! Soy Anbel, tu asistente inteligente de loterías. ¿Cómo puedo ayudarte hoy?',
        ask_prediction: '¿Qué lotería te gustaría que prediga?',
        analyzing: 'Analizando datos históricos y patrones...',
        prediction_ready: 'Predicción lista con {{accuracy}}% de precisión'
      },
      common: {
        loading: 'Cargando...',
        error: 'Error',
        success: 'Éxito',
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        save: 'Guardar',
        edit: 'Editar',
        delete: 'Eliminar',
        view: 'Ver',
        close: 'Cerrar',
        back: 'Volver',
        next: 'Siguiente',
        previous: 'Anterior',
        search: 'Buscar',
        filter: 'Filtrar',
        sort: 'Ordenar',
        refresh: 'Actualizar',
        export: 'Exportar',
        import: 'Importar',
        download: 'Descargar',
        upload: 'Subir',
        submit: 'Enviar',
        reset: 'Restablecer',
        clear: 'Limpiar',
        select: 'Seleccionar',
        all: 'Todos',
        none: 'Ninguno',
        yes: 'Sí',
        no: 'No',
        ok: 'OK',
        apply: 'Aplicar',
        done: 'Hecho',
        finish: 'Finalizar',
        start: 'Iniciar',
        stop: 'Detener',
        pause: 'Pausar',
        resume: 'Reanudar',
        retry: 'Reintentar',
        continue: 'Continuar',
        skip: 'Omitir',
        help: 'Ayuda',
        info: 'Información',
        warning: 'Advertencia',
        notice: 'Aviso',
        tip: 'Consejo',
        hint: 'Pista',
        tooltip: 'Información adicional',
        placeholder: 'Escriba aquí...',
        required: 'Requerido',
        optional: 'Opcional',
        recommended: 'Recomendado'
      }
    }
  },
  en: {
    translation: {
      dashboard: {
        title: 'GanaFácil - Intelligent Lottery Predictions',
        overview: 'Overview',
        predictions: 'Predictions',
        analysis: 'Analysis',
        settings: 'Settings',
        welcome: 'Welcome to the most advanced lottery prediction system'
      },
      anbel: {
        title: 'ANBEL IA - The World\'s Most Advanced Agent',
        greeting: 'Hello! I\'m Anbel, your intelligent lottery assistant. How can I help you today?',
        ask_prediction: 'Which lottery would you like me to predict?',
        analyzing: 'Analyzing historical data and patterns...',
        prediction_ready: 'Prediction ready with {{accuracy}}% accuracy'
      },
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        cancel: 'Cancel',
        confirm: 'Confirm',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        view: 'View',
        close: 'Close',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
        refresh: 'Refresh',
        export: 'Export',
        import: 'Import',
        download: 'Download',
        upload: 'Upload',
        submit: 'Submit',
        reset: 'Reset',
        clear: 'Clear',
        select: 'Select',
        all: 'All',
        none: 'None',
        yes: 'Yes',
        no: 'No',
        ok: 'OK',
        apply: 'Apply',
        done: 'Done',
        finish: 'Finish',
        start: 'Start',
        stop: 'Stop',
        pause: 'Pause',
        resume: 'Resume',
        retry: 'Retry',
        continue: 'Continue',
        skip: 'Skip',
        help: 'Help',
        info: 'Info',
        warning: 'Warning',
        notice: 'Notice',
        tip: 'Tip',
        hint: 'Hint',
        tooltip: 'Additional information',
        placeholder: 'Type here...',
        required: 'Required',
        optional: 'Optional',
        recommended: 'Recommended'
      }
    }
  }
};

// Configuración de i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

// Contexto de i18n
interface I18nContextType {
  t: (key: string, options?: any) => string;
  i18n: typeof i18n;
  changeLanguage: (lng: string) => Promise<void>;
  currentLanguage: string;
}

const I18nContext = createContext<I18nContextType | null>(null);

// Hook para usar i18n
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

// Provider de i18n
interface I18nProviderProps {
  children: React.ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('es');

  useEffect(() => {
    const initI18n = async () => {
      await i18n.init();
      setCurrentLanguage(i18n.language);
    };

    initI18n();
  }, []);

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
  };

  const value: I18nContextType = {
    t: i18n.t,
    i18n,
    changeLanguage,
    currentLanguage,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export default I18nProvider;