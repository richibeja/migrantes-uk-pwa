# 🚀 Configuración de PayPal Real para GanaFácil

## **📋 Pasos para activar PayPal real:**

### **1. Crear cuenta de desarrollador PayPal:**
- Ve a [developer.paypal.com](https://developer.paypal.com)
- Crea una cuenta o inicia sesión
- Accede al Dashboard de desarrollador

### **2. Crear aplicación:**
- En el dashboard, ve a "My Apps & Credentials"
- Haz clic en "Create App"
- Dale un nombre (ej: "GanaFácil Production")
- Selecciona "Business" como tipo de cuenta

### **3. Obtener credenciales:**
- **Client ID**: Copia el Client ID de tu aplicación
- **Secret**: Guarda el Secret (no lo compartas)

### **4. Configurar variables de entorno:**
Crea o edita el archivo `.env.local` en la raíz del proyecto:

```bash
# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=TU_CLIENT_ID_AQUI
PAYPAL_SECRET=TU_SECRET_AQUI

# Opcional: Configuración adicional
NEXT_PUBLIC_PAYPAL_MODE=production
NEXT_PUBLIC_PAYPAL_CURRENCY=USD
```

### **5. Activar modo producción:**
Edita `src/lib/paypalConfig.ts`:

```typescript
export const PAYPAL_CONFIG = {
  mode: 'production', // Cambiar de 'sandbox' a 'production'
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test',
  // ... resto de configuración
};
```

### **6. Instalar dependencias de PayPal:**
```bash
npm install @paypal/react-paypal-js
```

### **7. Configurar webhooks (opcional pero recomendado):**
- En el dashboard de PayPal, ve a "Webhooks"
- Crea un webhook para `PAYMENT.CAPTURE.COMPLETED`
- URL: `https://tu-dominio.com/api/paypal/webhook`

## **🔒 Configuración de seguridad:**

### **Variables de entorno requeridas:**
```bash
# Obligatorio para producción
NEXT_PUBLIC_PAYPAL_CLIENT_ID=TU_CLIENT_ID_REAL

# Opcional pero recomendado
PAYPAL_SECRET=TU_SECRET_REAL
NEXT_PUBLIC_PAYPAL_MODE=production
```

### **Configuración de CORS:**
Si tienes problemas de CORS, agrega en tu servidor:
```typescript
// Permitir PayPal
app.use(cors({
  origin: ['https://www.paypal.com', 'https://www.sandbox.paypal.com']
}));
```

## **🧪 Modo Sandbox vs Producción:**

### **Sandbox (Desarrollo):**
- ✅ Pagos simulados
- ✅ Sin costos reales
- ✅ Ideal para pruebas
- ❌ No genera ingresos reales

### **Producción (Real):**
- ✅ Pagos reales
- ✅ Ingresos reales
- ✅ Clientes reales
- ❌ Requiere configuración completa

## **📱 Funcionalidades incluidas:**

### **✅ Activación automática:**
- Generación de códigos únicos
- Activación inmediata de cuenta
- Envío por WhatsApp
- Redirección al dashboard

### **✅ Seguridad:**
- Verificación de pagos
- Validación de transacciones
- Protección contra fraudes
- Logs de auditoría

### **✅ Notificaciones:**
- Email de confirmación
- WhatsApp automático
- SMS (opcional)
- Notificaciones push

## **🚨 Solución de problemas:**

### **Error: "PayPal not configured"**
- Verifica que `NEXT_PUBLIC_PAYPAL_CLIENT_ID` esté configurado
- Asegúrate de que el archivo `.env.local` esté en la raíz

### **Error: "CORS policy"**
- Verifica la configuración de CORS en tu servidor
- Asegúrate de que PayPal esté en la lista blanca

### **Error: "Invalid client ID"**
- Verifica que el Client ID sea correcto
- Asegúrate de que la aplicación esté activa en PayPal

## **📞 Soporte:**

Si tienes problemas:
1. Revisa los logs de la consola
2. Verifica la configuración de variables de entorno
3. Confirma que PayPal esté configurado correctamente
4. Contacta soporte técnico

## **🎯 Próximos pasos:**

Una vez configurado PayPal real:
1. **Probar pagos** en modo sandbox
2. **Configurar webhooks** para notificaciones
3. **Implementar base de datos** para transacciones
4. **Configurar notificaciones** por email
5. **Implementar sistema de códigos** en base de datos

---

**¡Con PayPal real configurado, GanaFácil estará listo para generar ingresos reales!** 🚀💰
