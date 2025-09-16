# 🔥 Configuración de Firebase con Google Authentication

## 📋 Pasos para Habilitar Google Authentication

### 1. Crear Proyecto en Firebase Console
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto"
3. Nombre del proyecto: `ganafacil-anbel-ia`
4. Habilita Google Analytics (opcional)

### 2. Configurar Authentication
1. En el panel izquierdo, haz clic en "Authentication"
2. Ve a la pestaña "Sign-in method"
3. Habilita "Google" como proveedor
4. Configura el nombre del proyecto y email de soporte

### 3. Configurar Web App
1. En el panel izquierdo, haz clic en "Project settings" (⚙️)
2. Ve a la pestaña "General"
3. En "Your apps", haz clic en "Web" (</>)
4. Nombre de la app: `GanaFácil Web`
5. Habilita "Firebase Hosting" (opcional)

### 4. Obtener Configuración
Copia la configuración de Firebase y reemplaza en `src/lib/firebase.ts`:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "ganafacil-anbel-ia.firebaseapp.com",
  projectId: "ganafacil-anbel-ia",
  storageBucket: "ganafacil-anbel-ia.appspot.com",
  messagingSenderId: "TU_SENDER_ID_AQUI",
  appId: "TU_APP_ID_AQUI"
};
```

### 5. Configurar Dominios Autorizados
1. En Authentication > Settings > Authorized domains
2. Agrega:
   - `localhost` (para desarrollo)
   - `gana-facil-cny8fymm0-ganafacils-projects.vercel.app` (tu dominio de Vercel)

### 6. Configurar Google OAuth
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto
3. Ve a "APIs & Services" > "Credentials"
4. Crea "OAuth 2.0 Client IDs"
5. Tipo: "Web application"
6. Orígenes autorizados:
   - `http://localhost:3000`
   - `https://gana-facil-cny8fymm0-ganafacils-projects.vercel.app`
7. URIs de redirección:
   - `https://ganafacil-anbel-ia.firebaseapp.com/__/auth/handler`

### 7. Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ganafacil-anbel-ia.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ganafacil-anbel-ia
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ganafacil-anbel-ia.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id_aqui
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id_aqui
```

### 8. Configurar Firestore
1. En Firebase Console, ve a "Firestore Database"
2. Crea una base de datos
3. Selecciona "Start in test mode" (para desarrollo)
4. Elige una ubicación (us-east1 recomendado)

### 9. Reglas de Firestore
Configura las reglas de seguridad en Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura/escritura a usuarios autenticados
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 10. Probar la Configuración
1. Ejecuta `npm run dev`
2. Ve a `http://localhost:3000/auth/login`
3. Haz clic en "Continuar con Google"
4. Deberías ver el popup de Google

## 🚨 Notas Importantes

- **Nunca expongas las claves privadas** en el código
- **Usa variables de entorno** para la configuración
- **Configura dominios autorizados** correctamente
- **Prueba en desarrollo** antes de desplegar a producción

## 🔧 Solución de Problemas

### Error: "Firebase no está configurado"
- Verifica que las variables de entorno estén configuradas
- Asegúrate de que `firebaseEnabled` sea `true`

### Error: "Popup bloqueado"
- El navegador puede estar bloqueando popups
- Usa `signInWithRedirect` como fallback

### Error: "Dominio no autorizado"
- Agrega tu dominio a la lista de dominios autorizados en Firebase

## 📞 Soporte

Si tienes problemas con la configuración, contacta al equipo de desarrollo.
