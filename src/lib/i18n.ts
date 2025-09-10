// Sistema de Internacionalización Simple y Seguro
import React from 'react';

export interface I18nConfig {
  currentLanguage: string;
  fallbackLanguage: string;
  translations: Record<string, any>;
  textKeys: string[];
}

export class I18nManager {
  private static instance: I18nManager;
  private config: I18nConfig;
  private listeners: Array<() => void> = [];

  constructor() {
    this.config = {
      currentLanguage: 'es',
      fallbackLanguage: 'es',
      translations: {},
      textKeys: []
    };
  }

  static getInstance(): I18nManager {
    if (!I18nManager.instance) {
      I18nManager.instance = new I18nManager();
    }
    return I18nManager.instance;
  }

  /**
   * Inicializar el sistema de i18n
   */
  async init(): Promise<void> {
    try {
      // Cargar idioma preferido o detectar del navegador
      const savedLanguage = localStorage.getItem('preferredLanguage');
      const browserLanguage = navigator.language.substring(0, 2);
      
      this.config.currentLanguage = savedLanguage || 
        (this.isLanguageSupported(browserLanguage) ? browserLanguage : 'es');

      // Cargar traducciones
      await this.loadLanguage(this.config.currentLanguage);
      
      console.log('Sistema de internacionalización inicializado:', this.config.currentLanguage);
    } catch (error) {
      console.error('Error inicializando i18n:', error);
      // Fallback a español si hay error
      this.config.currentLanguage = 'es';
      await this.loadLanguage('es');
    }
  }

  /**
   * Verificar si un idioma está soportado
   */
  private isLanguageSupported(lang: string): boolean {
    const supportedLanguages = ['es', 'en', 'pt', 'fr'];
    return supportedLanguages.includes(lang);
  }

  /**
   * Cargar un idioma específico
   */
  async loadLanguage(lang: string): Promise<boolean> {
    try {
      // Cargar traducciones desde archivo JSON
      const response = await fetch(`/i18n/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Error loading language: ${lang}`);
      }
      
      this.config.translations = await response.json();
      this.config.currentLanguage = lang;
      
      // Guardar preferencia
      localStorage.setItem('preferredLanguage', lang);
      
      // Notificar a los listeners
      this.notifyListeners();
      
      return true;
    } catch (error) {
      console.error(`Error loading language ${lang}:`, error);
      
      // Fallback al idioma por defecto
      if (lang !== this.config.fallbackLanguage) {
        return await this.loadLanguage(this.config.fallbackLanguage);
      }
      
      return false;
    }
  }

  /**
   * Traducir una clave
   */
  translate(key: string, params?: Record<string, any>): string {
    let translation = this.config.translations[key];
    
    // Si no existe la traducción, usar fallback
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      translation = `[${key}]`;
    }
    
    // Reemplazar parámetros si existen
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{{${param}}}`, params[param]);
      });
    }
    
    return translation;
  }

  /**
   * Obtener idioma actual
   */
  getCurrentLanguage(): string {
    return this.config.currentLanguage;
  }

  /**
   * Cambiar idioma
   */
  async changeLanguage(lang: string): Promise<boolean> {
    if (lang === this.config.currentLanguage) {
      return true;
    }
    
    return await this.loadLanguage(lang);
  }

  /**
   * Agregar listener para cambios de idioma
   */
  addListener(callback: () => void): void {
    this.listeners.push(callback);
  }

  /**
   * Remover listener
   */
  removeListener(callback: () => void): void {
    const index = this.listeners.indexOf(callback);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  /**
   * Notificar a todos los listeners
   */
  private notifyListeners(): void {
    this.listeners.forEach(callback => callback());
  }

  /**
   * Obtener todas las claves de texto
   */
  getTextKeys(): string[] {
    return Object.keys(this.config.translations);
  }

  /**
   * Verificar si existe una traducción
   */
  hasTranslation(key: string): boolean {
    return key in this.config.translations;
  }

  /**
   * Obtener idiomas soportados
   */
  getSupportedLanguages(): string[] {
    return ['es', 'en', 'pt', 'fr'];
  }

  /**
   * Obtener nombre del idioma
   */
  getLanguageName(lang: string): string {
    const names: Record<string, string> = {
      'es': 'Español',
      'en': 'English',
      'pt': 'Português',
      'fr': 'Français'
    };
    return names[lang] || lang;
  }
}

// Instancia singleton
export const i18n = I18nManager.getInstance();

// Hook para React
export function useI18n() {
  const [currentLang, setCurrentLang] = React.useState(i18n.getCurrentLanguage());
  
  React.useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLang(i18n.getCurrentLanguage());
    };
    
    i18n.addListener(handleLanguageChange);
    
    return () => {
      i18n.removeListener(handleLanguageChange);
    };
  }, []);
  
  return {
    t: i18n.translate.bind(i18n),
    changeLanguage: i18n.changeLanguage.bind(i18n),
    currentLanguage: currentLang,
    supportedLanguages: i18n.getSupportedLanguages(),
    getLanguageName: i18n.getLanguageName.bind(i18n)
  };
}
