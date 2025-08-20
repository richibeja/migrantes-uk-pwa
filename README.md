# 🎯 GanaFácil - Predicciones de Lotería con Algoritmos Avanzados

Una aplicación web moderna y potente que proporciona predicciones de lotería usando algoritmos matemáticos avanzados, integración con WhatsApp, pagos PayPal y soporte multiidioma.

## ✨ Características Principales

### 🔮 Predicciones Avanzadas
- **Algoritmo Anbel**: Patrones matemáticos avanzados para predicciones precisas
- **Método Probabilístico**: Análisis estadístico de frecuencias y probabilidades
- **Método Histórico**: Análisis de patrones históricos y tendencias
- **Filtrado Cruzado**: Combinación inteligente de múltiples algoritmos

### 🎰 Loterías Soportadas
- **Colombia**: Baloto
- **Reino Unido**: Lotto UK, EuroMillions UK
- **Europa**: EuroMillions
- **España**: La Primitiva, Bonoloto
- **Estados Unidos**: Powerball, Mega Millions, Florida Lotto

### 📱 Integraciones Modernas
- **WhatsApp**: Contacto directo para soporte y activación
- **PayPal**: Pagos seguros para códigos de activación
- **PWA**: Aplicación web progresiva instalable
- **Multiidioma**: Español e inglés con detección automática

### 🔐 Sistema de Seguridad
- Códigos de activación únicos y seguros
- Autenticación de administrador
- Bloqueo automático por intentos fallidos
- Gestión de sesiones segura

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js >= 20.0.0
- npm >= 10.0.0
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/gana-facil.git
   cd gana-facil
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.local.example .env.local
   # Editar .env.local con tus configuraciones
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🌐 Despliegue en Vercel

### Configuración Automática

1. **Conectar con GitHub**
   - Haz fork del repositorio
   - Conecta tu cuenta de GitHub con Vercel
   - Importa el proyecto

2. **Configurar variables de entorno en Vercel**
   ```env
   NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
   NEXT_PUBLIC_APP_NAME=GanaFácil
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=ganafacil2025
   ```

3. **Desplegar**
   - Vercel detectará automáticamente que es un proyecto Next.js
   - El build se ejecutará automáticamente
   - La app estará disponible en tu dominio

### Configuración Manual

1. **Build del proyecto**
   ```bash
   npm run build
   ```

2. **Verificar build**
   ```bash
   npm run start
   ```

3. **Subir a Vercel**
   ```bash
   vercel --prod
   ```

## 📱 Funcionalidades PWA

### Instalación
- **Chrome/Edge**: Click en el icono de instalación en la barra de direcciones
- **Safari**: Compartir → Agregar a pantalla de inicio
- **Android**: Notificación de instalación automática

### Características Offline
- Caché de recursos estáticos
- Funcionamiento offline básico
- Sincronización automática al reconectar

## 💬 Integración WhatsApp

### Configuración
- Número configurado: `+19295909116`
- Mensaje automático personalizable
- Contacto directo para soporte

### Uso
- Botón flotante en todas las páginas
- Formularios de contacto integrados
- Respuesta automática para códigos

## 💳 Integración PayPal

### Configuración
- Cuenta: `richardbejarano52@gmail.com`
- Moneda: USD (configurable)
- Monto: $29.99 por código de activación

### Flujo de Pago
1. Usuario selecciona opción de pago
2. Redirección a PayPal
3. Confirmación de pago
4. Generación automática de código
5. Activación inmediata de la cuenta

## 🌍 Sistema Multiidioma

### Idiomas Soportados
- **Español** (predeterminado)
- **Inglés** (detectado automáticamente)

### Características
- Detección automática del idioma del navegador
- Cambio manual de idioma
- Persistencia de preferencia
- Traducción completa de la interfaz

## 🔧 Estructura del Proyecto

```
gana-facil/
├── src/
│   ├── app/                 # Páginas de la aplicación
│   ├── components/          # Componentes reutilizables
│   ├── hooks/              # Hooks personalizados
│   ├── lib/                # Utilidades y APIs
│   ├── i18n/               # Traducciones
│   └── types/              # Tipos TypeScript
├── public/                 # Archivos estáticos
├── scripts/                # Scripts de utilidad
└── docs/                   # Documentación
```

## 🎨 Tecnologías Utilizadas

### Frontend
- **Next.js 15**: Framework React con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS 4**: Framework CSS utility-first
- **Framer Motion**: Animaciones declarativas

### Backend & APIs
- **Firebase**: Autenticación y base de datos
- **APIs de Loterías**: Conexiones reales a APIs oficiales
- **PayPal API**: Procesamiento de pagos
- **WhatsApp Business API**: Integración de mensajería

### PWA & Performance
- **Service Worker**: Funcionalidad offline
- **Manifest.json**: Configuración de app
- **Lazy Loading**: Carga optimizada
- **Caché Inteligente**: Gestión de recursos

## 📊 Monitoreo y Analytics

### Métricas Incluidas
- Eventos de usuario
- Conversiones de pago
- Uso de funcionalidades
- Performance de la aplicación

### Herramientas
- Google Analytics 4
- Vercel Analytics
- Métricas personalizadas

## 🔒 Seguridad

### Medidas Implementadas
- Autenticación JWT
- Encriptación bcrypt
- Rate limiting
- Validación de entrada
- Sanitización de datos

### Compliance
- GDPR ready
- HTTPS obligatorio
- Cookies seguras
- Política de privacidad integrada

## 🚀 Roadmap

### Próximas Funcionalidades
- [ ] Más loterías internacionales
- [ ] App móvil nativa
- [ ] Notificaciones push avanzadas
- [ ] Sistema de referidos
- [ ] Dashboard de estadísticas avanzado
- [ ] Integración con más métodos de pago

### Mejoras Técnicas
- [ ] GraphQL API
- [ ] Microservicios
- [ ] Machine Learning avanzado
- [ ] Real-time updates
- [ ] Multi-tenant architecture

## 🤝 Contribución

### Cómo Contribuir
1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

### Estándares de Código
- TypeScript strict mode
- ESLint + Prettier
- Conventional Commits
- Test coverage > 80%

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

### Contacto
- **WhatsApp**: +19295909116
- **Email**: soporte@ganafacil.com
- **Documentación**: [docs.ganafacil.com](https://docs.ganafacil.com)

### Comunidad
- **Discord**: [discord.gg/ganafacil](https://discord.gg/ganafacil)
- **Telegram**: [t.me/ganafacil](https://t.me/ganafacil)
- **GitHub Issues**: [github.com/tu-usuario/gana-facil/issues](https://github.com/tu-usuario/gana-facil/issues)

## 🙏 Agradecimientos

- Equipo de desarrollo GanaFácil
- Comunidad de usuarios
- Contribuidores de código abierto
- APIs de loterías oficiales

---

**GanaFácil** - Transformando la forma de jugar a la lotería con tecnología avanzada 🎯✨

│   ├── app/                    # App Router de Next.js
│   │   ├── page.tsx           # Página principal
│   │   ├── activate/          # Activación de códigos
│   │   ├── dashboard/         # Dashboard de predicciones
│   │   ├── admin/             # Panel de administración
│   │   ├── layout.tsx         # Layout principal
│   │   └── globals.css        # Estilos globales
│   ├── components/             # Componentes reutilizables
│   ├── hooks/                  # Custom hooks
│   ├── lib/                    # Utilidades y configuraciones
│   └── config/                 # Configuraciones
├── public/                     # Archivos estáticos
│   ├── icons/                  # Iconos de la aplicación
│   └── manifest.json           # Configuración PWA
├── firebase/                   # Configuración de Firebase
└── package.json                # Dependencias del proyecto
```

## 🎮 Uso de la Aplicación

### 1. **Acceso Público**
- Visita la página principal para conocer el servicio
- Revisa testimonios y características

### 2. **Activación de Código**
- Navega a `/activate`
- Ingresa tu código de activación exclusivo
- Recibe confirmación de activación

### 3. **Dashboard de Predicciones**
- Accede a `/dashboard` (solo usuarios activados)
- Visualiza predicciones en tiempo real
- Filtra por tipo de lotería
- Revisa estadísticas y confianza

### 4. **Panel de Administración**
- Accede a `/admin`
- Credenciales: `admin` / `ganafacil2025`
- Gestiona códigos de activación
- Monitorea el sistema

## 🔐 Códigos de Activación

La aplicación incluye códigos de prueba pre-configurados:

- `GANA2025POWER001`
- `GANA2025MEGA002`
- `GANA2025EURO003`
- `GANA2025UK004`
- `GANA2025SPAIN005`

## 🎨 Personalización

### Colores del Tema
```css
:root {
  --gold: #FFD700;
  --dark: #0F0F0F;
  --darker: #000000;
}
```

### Efectos Glass
```css
.glass-effect {
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 215, 0, 0.1);
}
```

## 📱 Características PWA

- **Instalable**: Se puede instalar como aplicación nativa
- **Offline**: Funciona sin conexión a internet
- **Responsive**: Adaptable a cualquier dispositivo
- **Fast**: Carga rápida y navegación fluida

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Subir carpeta .next a Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

- **Email**: soporte@ganafacil.com
- **Documentación**: [docs.ganafacil.com](https://docs.ganafacil.com)
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/gana-facil/issues)

## 🙏 Agradecimientos

- Next.js por el framework increíble
- Tailwind CSS por los estilos
- Framer Motion por las animaciones
- La comunidad de desarrolladores

---

**GanaFácil** - Transformando predicciones en realidad 🎯✨

*Desarrollado con ❤️ y Next.js*
