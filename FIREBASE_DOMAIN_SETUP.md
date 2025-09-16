# 🔧 Configuración de Dominios Firebase - Guía Paso a Paso

## ❌ Error Actual
```
Firebase: Error (auth/unauthorized-domain)
```

## ✅ Solución: Agregar Dominios Autorizados

### **Paso 1: Firebase Console - Dominios Autorizados**

1. **Abre Firebase Console:**
   - Ve a: https://console.firebase.google.com/project/gana-facil-rifa-d5609/authentication/settings

2. **Configurar Dominios Autorizados:**
   - En la sección **Authorized domains**
   - Haz clic en **Add domain**
   - Agrega estos dominios uno por uno:
     - `gana-facil-js2hq197j-ganafacils-projects.vercel.app`
     - `gana-facil-rifa-d5609.web.app`
     - `gana-facil-rifa-d5609.firebaseapp.com`
   - Haz clic en **Add** para cada uno

### **Paso 2: Google Cloud Console - OAuth 2.0 Client ID**

1. **Abre Google Cloud Console:**
   - Ve a: https://console.cloud.google.com/apis/credentials?project=gana-facil-rifa-d5609

2. **Editar OAuth 2.0 Client ID:**
   - Busca tu **OAuth 2.0 Client ID** (tipo: Web application)
   - Haz clic en el ícono de editar (lápiz)

3. **Agregar Authorized JavaScript origins:**
   - Agrega estas URLs:
     - `https://gana-facil-js2hq197j-ganafacils-projects.vercel.app`
     - `https://gana-facil-rifa-d5609.web.app`
     - `https://gana-facil-rifa-d5609.firebaseapp.com`

4. **Agregar Authorized redirect URIs:**
   - Agrega estas URLs:
     - `https://gana-facil-js2hq197j-ganafacils-projects.vercel.app`
     - `https://gana-facil-rifa-d5609.web.app`
     - `https://gana-facil-rifa-d5609.firebaseapp.com`

5. **Guardar cambios:**
   - Haz clic en **Save**

### **Paso 3: Verificar Configuración**

1. **Espera 5-10 minutos** para que los cambios se propaguen

2. **Prueba la página de test:**
   - Ve a: https://gana-facil-rifa-d5609.web.app/test-firebase-domains.html
   - Haz clic en "Probar Google Auth"

3. **Prueba la aplicación:**
   - Ve a: https://gana-facil-js2hq197j-ganafacils-projects.vercel.app/auth/login-es
   - Intenta hacer login con Google

## 🔍 Verificación de Dominios

### **Dominios que deben estar configurados:**

**Firebase Console:**
- ✅ `localhost` (para desarrollo)
- ✅ `gana-facil-rifa-d5609.web.app`
- ✅ `gana-facil-rifa-d5609.firebaseapp.com`
- ❌ `gana-facil-js2hq197j-ganafacils-projects.vercel.app` ← **FALTA ESTE**

**Google Cloud Console:**
- ✅ `https://gana-facil-rifa-d5609.web.app`
- ✅ `https://gana-facil-rifa-d5609.firebaseapp.com`
- ❌ `https://gana-facil-js2hq197j-ganafacils-projects.vercel.app` ← **FALTA ESTE**

## 🚨 Nota Importante

El dominio de Vercel cambia con cada deploy. Para evitar este problema en el futuro:

1. **Configura un dominio personalizado** en Vercel
2. **O agrega el dominio de Vercel** cada vez que cambie

## 📞 Si el problema persiste

1. Verifica que hayas agregado **exactamente** el dominio: `gana-facil-js2hq197j-ganafacils-projects.vercel.app`
2. Espera 10-15 minutos para la propagación
3. Limpia la caché del navegador
4. Prueba en modo incógnito

## 🔗 Enlaces Directos

- **Firebase Console:** https://console.firebase.google.com/project/gana-facil-rifa-d5609/authentication/settings
- **Google Cloud Console:** https://console.cloud.google.com/apis/credentials?project=gana-facil-rifa-d5609
- **Página de Test:** https://gana-facil-rifa-d5609.web.app/test-firebase-domains.html
- **Aplicación:** https://gana-facil-js2hq197j-ganafacils-projects.vercel.app/auth/login-es
