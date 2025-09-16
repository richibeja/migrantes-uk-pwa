# 🔥 ACTUALIZACIÓN DE DOMINIOS FIREBASE

## Dominios que necesitas agregar en Firebase Console:

1. **Authentication > Settings > Authorized domains:**
   - `gana-facil-5fxy5qcd3-ganafacils-projects.vercel.app`
   - `gana-facil-7d54ub3o2-ganafacils-projects.vercel.app`
   - `ganafaci-anbel-pwa.vercel.app`
   - `localhost` (para desarrollo)

2. **Firestore > Rules > Security rules:**
   - Verificar que las reglas permitan acceso desde estos dominios

3. **Storage > Rules > Security rules:**
   - Verificar que las reglas permitan acceso desde estos dominios

## Pasos para actualizar:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: `gana-facil-rifa-d5609`
3. Ve a **Authentication > Settings**
4. En **Authorized domains**, agrega:
   - `gana-facil-5fxy5qcd3-ganafacils-projects.vercel.app`
5. Guarda los cambios

## Verificación:
- Los errores `auth/unauthorized-domain` deberían desaparecer
- El login con Google debería funcionar correctamente
