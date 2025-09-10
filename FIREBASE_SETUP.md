# 🔥 CONFIGURACIÓN COMPLETA DE FIREBASE PARA GANA FÁCIL

## 1. CREAR PROYECTO EN FIREBASE

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Clic en "Crear un proyecto"
3. **Nombre del proyecto:** `gana-facil-lottery`
4. **Habilitar Google Analytics:** ✅ SÍ
5. **Crear proyecto**

## 2. CONFIGURAR AUTHENTICATION

### 2.1 Activar Authentication
1. En el menú lateral, ve a **"Authentication"**
2. Clic en **"Comenzar"**
3. Ve a la pestaña **"Sign-in method"**

### 2.2 Configurar Métodos de Autenticación
1. **Email/Password:**
   - Clic en "Email/Password"
   - Activar "Habilitar"
   - Guardar

2. **Google:**
   - Clic en "Google"
   - Activar "Habilitar"
   - Configurar email de soporte: `richardbejarano52@gmail.com`
   - Guardar

3. **Anónimo (opcional):**
   - Clic en "Anónimo"
   - Activar "Habilitar"
   - Guardar

## 3. CONFIGURAR FIRESTORE DATABASE

### 3.1 Crear Base de Datos
1. En el menú lateral, ve a **"Firestore Database"**
2. Clic en **"Crear base de datos"**
3. **Modo:** "Comenzar en modo de prueba" (por ahora)
4. **Ubicación:** `us-central1` (Iowa)
5. **Crear**

### 3.2 Configurar Reglas de Seguridad
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios pueden leer/escribir sus propios datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Predicciones públicas (solo lectura)
    match /predictions/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Resultados públicos (solo lectura)
    match /results/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Pagos (solo usuarios autenticados)
    match /payments/{document} {
      allow read, write: if request.auth != null;
    }
    
    // Notificaciones (solo usuarios autenticados)
    match /notifications/{document} {
      allow read, write: if request.auth != null;
    }
    
    // Casos de soporte (solo usuarios autenticados)
    match /supportCases/{document} {
      allow read, write: if request.auth != null;
    }
    
    // Analytics (solo lectura para usuarios autenticados)
    match /analytics/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 4. CONFIGURAR STORAGE

### 4.1 Crear Storage
1. En el menú lateral, ve a **"Storage"**
2. Clic en **"Comenzar"**
3. **Modo:** "Comenzar en modo de prueba"
4. **Ubicación:** `us-central1` (Iowa)
5. **Siguiente** → **Siguiente** → **Listo**

### 4.2 Configurar Reglas de Storage
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Usuarios pueden subir archivos a su carpeta
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Archivos públicos (solo lectura)
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 5. CONFIGURAR CLOUD MESSAGING

### 5.1 Activar Cloud Messaging
1. En el menú lateral, ve a **"Cloud Messaging"**
2. Ya está activado por defecto

### 5.2 Configurar Web Push
1. Ve a **"Configuración del proyecto"** (ícono de engranaje)
2. Pestaña **"Cloud Messaging"**
3. **Clave del servidor:** (se genera automáticamente)

## 6. OBTENER CONFIGURACIÓN DE LA APLICACIÓN WEB

### 6.1 Agregar Aplicación Web
1. En **"Configuración del proyecto"**
2. Scroll hasta **"Tus aplicaciones"**
3. Clic en **"Agregar app"** → **"Web"** (ícono `</>`)
4. **Apodo:** `Gana Fácil Web`
5. **Habilitar Firebase Hosting:** ✅ SÍ
6. **Registrar app**

### 6.2 Copiar Configuración
```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "gana-facil-lottery.firebaseapp.com",
  projectId: "gana-facil-lottery",
  storageBucket: "gana-facil-lottery.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123def456",
  measurementId: "G-ABC123DEF4"
};
```

## 7. CONFIGURAR VARIABLES DE ENTORNO

### 7.1 Crear archivo .env.local
```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=gana-facil-lottery.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=gana-facil-lottery
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=gana-facil-lottery.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abc123def456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABC123DEF4

# App Configuration
NEXT_PUBLIC_BYPASS_PAYWALL=false
NEXT_PUBLIC_APP_URL=https://tu-dominio.com
```

## 8. CONFIGURAR COLECCIONES EN FIRESTORE

### 8.1 Crear Colecciones Necesarias
1. **users** - Datos de usuarios
2. **predictions** - Predicciones de lotería
3. **results** - Resultados de lotería
4. **payments** - Pagos y suscripciones
5. **notifications** - Notificaciones push
6. **supportCases** - Casos de soporte
7. **analytics** - Datos de analytics

### 8.2 Estructura de Datos

#### users/{userId}
```json
{
  "username": "string",
  "email": "string",
  "phone": "string",
  "isAdmin": false,
  "isActive": true,
  "subscription": "free",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "lastLogin": "timestamp"
}
```

#### predictions/{predictionId}
```json
{
  "lottery": "powerball",
  "numbers": [1, 2, 3, 4, 5],
  "confidence": 85,
  "algorithm": "anbel",
  "createdAt": "timestamp",
  "expiresAt": "timestamp"
}
```

## 9. CONFIGURAR HOSTING (OPCIONAL)

### 9.1 Instalar Firebase CLI
```bash
npm install -g firebase-tools
```

### 9.2 Inicializar Hosting
```bash
firebase login
firebase init hosting
```

### 9.3 Desplegar
```bash
npm run build
firebase deploy
```

## 10. VERIFICAR CONFIGURACIÓN

### 10.1 Probar Conexión
1. Ejecutar: `npm run dev`
2. Abrir: `http://localhost:3000`
3. Verificar que no hay errores en consola
4. Probar login/registro

### 10.2 Verificar Funcionalidades
- ✅ Login/Registro
- ✅ Predicciones en tiempo real
- ✅ Notificaciones push
- ✅ Sistema de pagos
- ✅ Analytics

## 11. CONFIGURAR DOMINIO PERSONALIZADO

### 11.1 En Firebase Hosting
1. Ve a **"Hosting"**
2. Clic en **"Agregar dominio personalizado"**
3. Ingresa tu dominio
4. Sigue las instrucciones de DNS

## 12. CONFIGURAR ANALYTICS

### 12.1 Google Analytics
1. Ya está configurado automáticamente
2. Ve a **"Analytics"** en Firebase Console
3. Configura eventos personalizados si es necesario

## 13. CONFIGURAR SEGURIDAD

### 13.1 Reglas de Firestore (Producción)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Solo usuarios autenticados pueden acceder
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 13.2 Configurar CORS
- Firebase maneja CORS automáticamente
- No necesitas configuración adicional

## 14. MONITOREO Y MANTENIMIENTO

### 14.1 Firebase Console
- Monitorea uso de Firestore
- Revisa logs de Authentication
- Verifica Storage usage

### 14.2 Alertas
- Configura alertas de cuota
- Monitorea errores de autenticación
- Revisa métricas de rendimiento

---

## 🚀 RESUMEN DE PASOS

1. ✅ Crear proyecto en Firebase
2. ✅ Configurar Authentication
3. ✅ Configurar Firestore
4. ✅ Configurar Storage
5. ✅ Configurar Cloud Messaging
6. ✅ Obtener configuración web
7. ✅ Actualizar .env.local
8. ✅ Crear colecciones
9. ✅ Probar conexión
10. ✅ Desplegar a producción

**¡Con esta configuración, Gana Fácil estará 100% funcional en Firebase!** 🎯