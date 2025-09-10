# 🎬 Videos Personalizados - GANA FÁCIL

## 📁 Estructura de Archivos

```
public/videos/personalized/
├── README.md                           # Este archivo
├── ganafacil-demo-es.mp4              # Video personalizado en español
└── ganafacil-demo-en.mp4              # Video personalizado en inglés
```

## 🎯 Cómo Subir Tu Video Personalizado

### **Paso 1: Preparar el Video**
1. **Crear carpeta**: `videos-personalizados/` en la raíz del proyecto
2. **Nombrar archivo** según el idioma:
   - **Español**: `ganafacil-demo-es.mp4`
   - **Inglés**: `ganafacil-demo-en.mp4`

### **Paso 2: Ejecutar Script de Subida**
```bash
node scripts/upload-video.js
```

### **Paso 3: Verificar Funcionamiento**
1. **Abrir**: `http://localhost:3001/sales` (español)
2. **Abrir**: `http://localhost:3001/sales-en` (inglés)
3. **Verificar**: Que el video se reproduce correctamente

## 📐 Especificaciones Técnicas

### **Formato del Video**
- **Duración**: 2.5 minutos (150 segundos)
- **Formato**: MP4 (H.264)
- **Resolución**: 1280x720 (HD) o superior
- **Aspect Ratio**: 16:9
- **Audio**: Estéreo, 44.1kHz
- **Bitrate**: 2-5 Mbps (recomendado)

### **Contenido Recomendado**
Basado en el guión del avatar, tu video debe mostrar:

1. **Hook Inicial** (0-15s): Presentación del problema
2. **Problema Personal** (15-45s): Experiencia personal
3. **Descubrimiento** (45-75s): Método de análisis
4. **Transformación** (75-105s): Resultados obtenidos
5. **Verdad Científica** (105-135s): Explicación técnica
6. **Solución GANA FÁCIL** (135-165s): Presentación del sistema
7. **Accesibilidad** (165-195s): Fácil de usar
8. **Resultados Comprobados** (195-225s): Testimonios
9. **Call to Action** (225-250s): Invitación a probar
10. **Cierre Honesto** (250-270s): Expectativas realistas

### **Elementos Visuales a Mostrar**
- **Dashboard principal** con loterías
- **Algoritmos Anbel, Fibonacci, Estadístico**
- **Datos en tiempo real** (actualizaciones cada 5 min)
- **4 loterías principales** (Powerball, Mega Millions, etc.)
- **Motor Anbel** con 94% precisión
- **Clubs ANBEL** (predicciones en equipo)
- **Acceso móvil** (responsive design)
- **Análisis histórico** (resultados pasados)
- **Notificaciones inteligentes**
- **Botón de descarga/activación**

## 🛠️ Herramientas de Edición Recomendadas

### **Gratuitas**
- **DaVinci Resolve**: Editor profesional gratuito
- **OpenShot**: Editor simple y fácil de usar
- **Shotcut**: Editor multiplataforma

### **De Pago**
- **Adobe Premiere Pro**: Estándar de la industria
- **Final Cut Pro**: Para Mac
- **Sony Vegas Pro**: Editor profesional

### **Online**
- **Canva**: Editor simple online
- **Kapwing**: Editor de video online
- **Clipchamp**: Editor de Microsoft

## 🎨 Consejos de Producción

### **Grabación de Pantalla**
1. **Usar OBS Studio** para grabar la pantalla
2. **Resolución**: 1920x1080 o superior
3. **FPS**: 30 o 60 fps
4. **Audio**: Grabar narración por separado

### **Edición**
1. **Cortar** secciones innecesarias
2. **Añadir** transiciones suaves
3. **Sincronizar** audio con video
4. **Añadir** texto superpuesto para puntos clave

### **Optimización**
1. **Comprimir** para web (2-5 Mbps)
2. **Exportar** en MP4 (H.264)
3. **Verificar** que se reproduce en navegadores

## 🔧 Solución de Problemas

### **Video No Se Reproduce**
1. **Verificar formato**: Debe ser MP4 (H.264)
2. **Verificar tamaño**: No debe estar vacío
3. **Verificar ruta**: Debe estar en la carpeta correcta
4. **Revisar consola**: Buscar errores en el navegador

### **Video Se Ve Distorsionado**
1. **Verificar aspect ratio**: Debe ser 16:9
2. **Verificar resolución**: Mínimo 1280x720
3. **Re-exportar** con configuraciones correctas

### **Audio No Funciona**
1. **Verificar codec**: Debe ser AAC
2. **Verificar bitrate**: 128kbps o superior
3. **Verificar canales**: Estéreo

## 📊 Métricas de Rendimiento

### **Tamaño de Archivo Recomendado**
- **Español**: 15-30 MB
- **Inglés**: 15-30 MB
- **Total**: Máximo 60 MB

### **Tiempo de Carga**
- **Conexión rápida**: < 5 segundos
- **Conexión media**: < 15 segundos
- **Conexión lenta**: < 30 segundos

## 🚀 Despliegue en Producción

### **Vercel/Netlify**
1. **Subir** videos a la carpeta `public/videos/personalized/`
2. **Verificar** que se sirven correctamente
3. **Probar** en diferentes dispositivos

### **CDN (Opcional)**
Para mejor rendimiento:
1. **Subir** a Cloudinary, AWS S3, etc.
2. **Actualizar** rutas en el componente
3. **Configurar** compresión automática

## 📞 Soporte

Si tienes problemas:
1. **Verificar** que el archivo está en la ruta correcta
2. **Comprobar** que el formato es MP4
3. **Revisar** la consola del navegador
4. **Probar** en diferentes navegadores

---

**¡Tu video personalizado está listo para convertir visitantes en usuarios!** 🎬✨
