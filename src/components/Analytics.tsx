'use client';

import { useEffect } from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export default function Analytics() {
  useEffect(() => {
    // Función para trackear eventos
    const trackEvent = ({ action, category, label, value }: AnalyticsEvent) => {
      // Aquí puedes integrar Google Analytics, Facebook Pixel, etc.
      console.log('Analytics Event:', { action, category, label, value });
      
      // Ejemplo para Google Analytics 4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value
        });
      }
    };

    // Trackear eventos de navegación
    const trackNavigation = (section: string) => {
      trackEvent({
        action: 'navigate',
        category: 'Navigation',
        label: section
      });
    };

    // Trackear clicks en botones
    const trackButtonClick = (buttonName: string) => {
      trackEvent({
        action: 'click',
        category: 'Button',
        label: buttonName
      });
    };

    // Agregar event listeners
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const href = link.getAttribute('href');
        if (href) {
          trackNavigation(href.substring(1));
        }
      });
    });

    const buttons = document.querySelectorAll('button, a[class*="btn"]');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const buttonText = button.textContent?.trim() || 'Unknown Button';
        trackButtonClick(buttonText);
      });
    });

    // Trackear scroll depth
    let maxScroll = 0;
    const trackScrollDepth = () => {
      const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Trackear hitos de scroll
        if (scrollPercent >= 25 && maxScroll < 50) {
          trackEvent({
            action: 'scroll',
            category: 'Engagement',
            label: '25%'
          });
        } else if (scrollPercent >= 50 && maxScroll < 75) {
          trackEvent({
            action: 'scroll',
            category: 'Engagement',
            label: '50%'
          });
        } else if (scrollPercent >= 75 && maxScroll < 90) {
          trackEvent({
            action: 'scroll',
            category: 'Engagement',
            label: '75%'
          });
        } else if (scrollPercent >= 90) {
          trackEvent({
            action: 'scroll',
            category: 'Engagement',
            label: '90%'
          });
        }
      }
    };

    window.addEventListener('scroll', trackScrollDepth);

    // Cleanup
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', () => {});
      });
      buttons.forEach(button => {
        button.removeEventListener('click', () => {});
      });
      window.removeEventListener('scroll', trackScrollDepth);
    };
  }, []);

  return null;
}
