# 🚀 CONFIGURACIÓN DE FIREBASE PARA LA RIFA

## 📋 **PASOS PARA ACTIVAR LA RIFA COMPLETAMENTE:**

### **1. CREAR PROYECTO EN FIREBASE:**
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o usa uno existente
3. Activa **Firestore Database** y **Authentication**

### **2. CONFIGURAR FIRESTORE:**
1. En Firestore, crea las siguientes colecciones:
   - `rifa_tickets` - Para datos de usuarios y tickets
   - `rifa_compartidas` - Para tracking de compartidas
   - `rifa_ganadores` - Para ganadores del sorteo

### **3. REGLAS DE SEGURIDAD FIRESTORE:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios pueden leer/escribir sus propios datos
    match /rifa_tickets/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Usuarios pueden leer/escribir sus compartidas
    match /rifa_compartidas/{docId} {
      allow read, write: if request.auth != null;
    }
    
    // Solo lectura para estadísticas generales
    match /rifa_stats/{docId} {
      allow read: if true;
    }
  }
}
```

### **4. ACTUALIZAR CONFIGURACIÓN:**
1. Ve a **Project Settings** en Firebase
2. Copia la configuración a `src/lib/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: "tu-api-key-real",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id-real",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "tu-messaging-sender-id-real",
  appId: "tu-app-id-real"
};
```

### **5. INSTALAR DEPENDENCIAS:**
```bash
npm install firebase
```

## 🎯 **CÓMO FUNCIONA LA RIFA REAL:**

### **SISTEMA DE TICKETS:**
- ✅ **Base de datos real** en Firebase
- ✅ **Contador automático** de compartidas
- ✅ **Tickets automáticos** cada 5 compartidas
- ✅ **Tracking en tiempo real** de progreso
- ✅ **Historial completo** de todas las compartidas

### **FUNCIONALIDADES IMPLEMENTADAS:**
- 🚀 **Generación de links únicos** para cada usuario
- 📱 **Compartir en WhatsApp, Facebook, Twitter, Telegram**
- 📋 **Copiar link** al portapapeles
- 🎫 **Sistema automático** de tickets
- 📊 **Estadísticas en tiempo real**
- 🔔 **Notificaciones** cuando recibes tickets

### **FLUJO DE PARTICIPACIÓN:**
1. **Usuario activa** con código
2. **Entra a "Mi Rifa"** desde el dashboard
3. **Hace clic** en "COMPARTIR APP Y GANAR TICKETS"
4. **Se genera** su link único personalizado
5. **Comparte** en redes sociales
6. **Cada persona** que use su link cuenta como 1 compartida
7. **Al llegar a 5** compartidas, recibe 1 ticket automáticamente
8. **Puede seguir compartiendo** para más tickets

## ⚠️ **IMPORTANTE:**

- **La rifa ya está 100% funcional** una vez configurado Firebase
- **Todos los datos son reales** y se guardan en la nube
- **El sistema es automático** - no requiere intervención manual
- **Los tickets se calculan** en tiempo real
- **El historial se actualiza** automáticamente

## 🏆 **PREMIO:**

**Chevrolet Silverado 2025 4x4**
- Color: Blanco
- 0 Millas
- Totalmente Nueva de Concesionario
- Sorteo: 15 de Enero 2026

## 🔧 **SOLUCIÓN DE PROBLEMAS:**

Si la rifa no funciona:
1. Verifica que Firebase esté configurado correctamente
2. Revisa la consola del navegador para errores
3. Asegúrate de que las reglas de Firestore permitan lectura/escritura
4. Verifica que las colecciones estén creadas en Firebase

**¡Una vez configurado Firebase, la rifa funcionará completamente en tiempo real!**
