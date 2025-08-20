# 🚗 Sistema de Rifa - Chevrolet Silverado 2025 4x4

## 📋 Descripción del Proyecto

Sistema completo de rifa digital para una **Chevrolet Silverado 2025 4x4** blanca, 0 millas, totalmente nueva de concesionario. El sorteo se realizará automáticamente el **15 de enero de 2026**.

## 🎯 Características Principales

- ✅ **Tickets Digitales**: 1 ticket por cada 5 compartidas de la app
- ✅ **Sistema de Referidos**: Links únicos para cada usuario
- ✅ **Sorteo Automático**: Cloud Function programada para enero 2026
- ✅ **Notificaciones**: Push + Email al ganador
- ✅ **Términos Legales**: Cumple requisitos de sweepstakes en EE.UU.
- ✅ **Responsive**: Optimizado para móviles y desktop

## 🏗️ Arquitectura Técnica

### Frontend (Next.js + TypeScript)
- **Pantalla Principal**: `/rifa` - Sistema completo de tickets
- **Dashboard**: Integración con pestaña "🚗 Mi Rifa"
- **Responsive Design**: Tailwind CSS + Mobile First

### Backend (Firebase)
- **Firestore**: Base de datos de tickets y compartidas
- **Cloud Functions**: Sorteo automático programado
- **Dynamic Links**: Links únicos de invitación
- **Cloud Messaging**: Notificaciones push

## 📱 Pantallas Implementadas

### 1. Pantalla "Mi Rifa" (`/rifa`)
- **Hero Section**: Chevrolet Silverado 2025 4x4
- **Estadísticas**: Tickets, compartidas, progreso
- **Barra de Progreso**: Visual hacia el siguiente ticket
- **Botón de Compartir**: Genera links únicos
- **Historial**: Todas las compartidas realizadas
- **Términos**: Legales en inglés y español

### 2. Dashboard Integration
- **Nueva Pestaña**: "🚗 Mi Rifa" en el dashboard
- **Navegación**: Acceso directo desde el menú principal

## 🔧 Funcionalidades Implementadas

### Sistema de Tickets
```typescript
// Cada 5 compartidas = 1 ticket
const calcularProgreso = () => {
  const compartidasRestantes = 5 - (totalCompartidas % 5);
  const progreso = ((totalCompartidas % 5) / 5) * 100;
  return { compartidasRestantes, progreso };
};
```

### Links de Invitación Únicos
```typescript
// Genera link único para cada usuario
const generarLinkInvitacion = () => {
  const linkUnico = `${baseUrl}/?ref=${userCode}&rifa=true`;
  return linkUnico;
};
```

### Compartir en Redes Sociales
- 📱 WhatsApp
- 📘 Facebook  
- 🐦 Twitter
- 📨 Telegram
- 📋 Copiar Link

## 🚀 Implementación Firebase

### 1. Configuración Firestore

#### Colección: `rifa_tickets`
```typescript
interface RifaTicket {
  userId: string;
  userCode: string;
  totalCompartidas: number;
  totalTickets: number;
  historialCompartidas: Array<{
    fecha: string;
    persona: string;
    plataforma: string;
    referidoId?: string;
  }>;
  createdAt: string;
  lastUpdated: string;
}
```

#### Colección: `rifa_compartidas`
```typescript
interface RifaCompartida {
  id: string;
  userId: string;
  userCode: string;
  plataforma: string;
  fecha: string;
  referidoId?: string;
  referidoCode?: string;
}
```

#### Colección: `rifa_ganadores`
```typescript
interface RifaGanador {
  userId: string;
  userCode: string;
  ticketGanador: string;
  fechaSorteo: string;
  premio: string;
  notificado: boolean;
  fechaNotificacion?: string;
}
```

### 2. Cloud Function - Sorteo Automático

```typescript
// Se ejecuta automáticamente el 15 de enero 2026 a las 8:00 PM UTC
exports.sorteoRifaCamioneta = functions.pubsub.schedule('0 20 15 1 *').onRun(async (context) => {
  // 1. Obtener todos los tickets válidos
  // 2. Selección aleatoria justa
  // 3. Guardar ganador
  // 4. Enviar notificación
});
```

### 3. Firebase Dynamic Links

```typescript
const DYNAMIC_LINKS_CONFIG = {
  DOMAIN: 'ganafacil.page.link',
  ANDROID_PACKAGE: 'com.ganafacil.app',
  IOS_BUNDLE_ID: 'com.ganafacil.app',
  FALLBACK_URL: 'https://ganafacil.com/rifa'
};
```

## 📊 Flujo de Usuario

### 1. Acceso a la Rifa
- Usuario accede a `/rifa` desde el dashboard
- Sistema verifica autenticación
- Carga datos de tickets del usuario

### 2. Compartir App
- Usuario presiona "COMPARTIR APP Y GANAR TICKETS"
- Sistema genera link único de invitación
- Modal con opciones de compartir

### 3. Ganar Tickets
- Cada 5 personas que se registren = 1 ticket
- Sistema actualiza contadores en tiempo real
- Barra de progreso muestra avance

### 4. Sorteo Automático
- Cloud Function se ejecuta el 15/01/2026
- Selección aleatoria entre todos los tickets
- Notificación automática al ganador

## 🎨 Diseño y UX

### Paleta de Colores
- **Primario**: Azul (#3B82F6) - Chevrolet
- **Secundario**: Dorado (#F59E0B) - Premio
- **Fondo**: Gradiente gris oscuro
- **Texto**: Blanco y gris claro

### Elementos Visuales
- **Iconos**: Emojis para mejor engagement
- **Gradientes**: Efectos modernos y atractivos
- **Animaciones**: Hover effects y transiciones
- **Responsive**: Adaptable a todos los dispositivos

## 📋 Términos Legales

### Requisitos Cumplidos
- ✅ **No Purchase Necessary**: Participación gratuita
- ✅ **Eligibility**: Abierto a todos los usuarios
- ✅ **Prize Description**: Chevrolet Silverado específica
- ✅ **Drawing Date**: 15 de enero 2026
- ✅ **Entry Method**: Compartir app 5 veces
- ✅ **Notification**: Push + Email al ganador

### Idiomas
- 🇺🇸 **English**: Términos completos en inglés
- 🇪🇸 **Español**: Términos completos en español

## 🚀 Pasos para Producción

### 1. Configurar Firebase
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Inicializar proyecto
firebase init

# Configurar Firestore, Functions y Hosting
```

### 2. Desplegar Cloud Functions
```bash
# Desplegar función de sorteo
firebase deploy --only functions:sorteoRifaCamioneta
```

### 3. Configurar Dynamic Links
```bash
# Crear dominio personalizado
firebase dynamiclinks:domains:add ganafacil.page.link
```

### 4. Configurar Cloud Messaging
```bash
# Configurar FCM para notificaciones
firebase init messaging
```

## 📱 Testing

### Funcionalidades a Verificar
- ✅ Generación de links únicos
- ✅ Cálculo correcto de tickets
- ✅ Compartir en redes sociales
- ✅ Responsive design
- ✅ Autenticación requerida
- ✅ Términos legales accesibles

### Casos de Uso
1. **Usuario Nuevo**: 0 tickets, 0 compartidas
2. **Usuario Activo**: 2 tickets, 12 compartidas
3. **Usuario Límite**: 100 tickets (máximo)
4. **Sorteo**: Verificar selección aleatoria

## 🔒 Seguridad

### Medidas Implementadas
- **Autenticación**: Solo usuarios autenticados
- **Validación**: Plataformas de compartida válidas
- **Límites**: Máximo 100 tickets por usuario
- **Auditoría**: Historial completo de compartidas
- **Verificación**: Links únicos por usuario

## 📈 Métricas y Analytics

### Datos a Rastrear
- Total de usuarios participando
- Total de tickets generados
- Total de compartidas realizadas
- Plataformas más utilizadas
- Conversión de referidos

### Firebase Analytics
```typescript
// Eventos personalizados
analytics.logEvent('rifa_ticket_earned', {
  user_id: userId,
  total_tickets: totalTickets
});

analytics.logEvent('rifa_shared', {
  user_id: userId,
  platform: plataforma
});
```

## 🎯 Próximos Pasos

### Fase 2 - Mejoras
- [ ] Dashboard de administrador
- [ ] Estadísticas en tiempo real
- [ ] Sistema de niveles VIP
- [ ] Múltiples premios
- [ ] Integración con redes sociales

### Fase 3 - Escalabilidad
- [ ] API REST para terceros
- [ ] Sistema de afiliados
- [ ] Múltiples idiomas
- [ ] App móvil nativa
- [ ] Integración con CRM

## 📞 Soporte

### Contacto Técnico
- **Desarrollador**: GanaFácil Team
- **Email**: tech@ganafacil.com
- **Documentación**: [docs.ganafacil.com](https://docs.ganafacil.com)

### Recursos
- **Firebase Docs**: [firebase.google.com](https://firebase.google.com)
- **Next.js Docs**: [nextjs.org](https://nextjs.org)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)

---

## 🏆 ¡La Rifa Más Grande de 2026!

**Chevrolet Silverado 2025 4x4 - Blanco - 0 Millas**

*Sorteo: 15 de Enero 2026 - 8:00 PM UTC*

*¡Participa GRATIS compartiendo la app!*
