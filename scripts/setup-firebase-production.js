const fs = require('fs');
const path = require('path');

console.log('🔥 CONFIGURACIÓN DE FIREBASE PARA PRODUCCIÓN');
console.log('===============================================\n');

// Crear archivo .env.local con configuración de producción
const envFilePath = path.join(process.cwd(), '.env.local');

const envContent = `# Firebase Configuration - PRODUCCIÓN
# Reemplaza estos valores con tu configuración real de Firebase

NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=gana-facil-lottery.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=gana-facil-lottery
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=gana-facil-lottery.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abc123def456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABC123DEF4

# App Configuration
NEXT_PUBLIC_BYPASS_PAYWALL=false
NEXT_PUBLIC_APP_URL=https://tu-dominio.com

# Email Configuration
NEXT_PUBLIC_SUPPORT_EMAIL=richardbejarano52@gmail.com

# Payment Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
`;

try {
  fs.writeFileSync(envFilePath, envContent.trim());
  console.log('✅ Archivo .env.local creado exitosamente');
  console.log('📝 IMPORTANTE: Actualiza los valores de Firebase con tu configuración real\n');
} catch (error) {
  console.error('❌ Error al crear .env.local:', error.message);
}

// Crear archivo de configuración de Firestore
const firestoreRulesPath = path.join(process.cwd(), 'firestore.rules');

const firestoreRules = `rules_version = '2';
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
    
    // Testimonios (solo lectura)
    match /testimonials/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`;

try {
  fs.writeFileSync(firestoreRulesPath, firestoreRules);
  console.log('✅ Reglas de Firestore creadas (firestore.rules)');
} catch (error) {
  console.error('❌ Error al crear firestore.rules:', error.message);
}

// Crear archivo de configuración de Storage
const storageRulesPath = path.join(process.cwd(), 'storage.rules');

const storageRules = `rules_version = '2';
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
    
    // Testimonios (solo lectura)
    match /testimonials/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`;

try {
  fs.writeFileSync(storageRulesPath, storageRules);
  console.log('✅ Reglas de Storage creadas (storage.rules)');
} catch (error) {
  console.error('❌ Error al crear storage.rules:', error.message);
}

// Crear archivo firebase.json
const firebaseConfigPath = path.join(process.cwd(), 'firebase.json');

const firebaseConfig = {
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "storage": {
    "rules": "storage.rules"
  },
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
};

try {
  fs.writeFileSync(firebaseConfigPath, JSON.stringify(firebaseConfig, null, 2));
  console.log('✅ Configuración de Firebase creada (firebase.json)');
} catch (error) {
  console.error('❌ Error al crear firebase.json:', error.message);
}

// Crear archivo firestore.indexes.json
const firestoreIndexesPath = path.join(process.cwd(), 'firestore.indexes.json');

const firestoreIndexes = {
  "indexes": [
    {
      "collectionGroup": "predictions",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "lottery",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "createdAt",
          "order": "DESCENDING"
        }
      ]
    },
    {
      "collectionGroup": "results",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "lottery",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "drawDate",
          "order": "DESCENDING"
        }
      ]
    },
    {
      "collectionGroup": "users",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "isActive",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "createdAt",
          "order": "DESCENDING"
        }
      ]
    }
  ],
  "fieldOverrides": []
};

try {
  fs.writeFileSync(firestoreIndexesPath, JSON.stringify(firestoreIndexes, null, 2));
  console.log('✅ Índices de Firestore creados (firestore.indexes.json)');
} catch (error) {
  console.error('❌ Error al crear firestore.indexes.json:', error.message);
}

console.log('\n🎯 PRÓXIMOS PASOS:');
console.log('==================');
console.log('1. Ve a https://console.firebase.google.com/');
console.log('2. Crea un nuevo proyecto llamado "gana-facil-lottery"');
console.log('3. Habilita Authentication, Firestore, Storage y Cloud Messaging');
console.log('4. Copia la configuración de tu app web');
console.log('5. Actualiza el archivo .env.local con tus credenciales reales');
console.log('6. Ejecuta: npm run build');
console.log('7. Ejecuta: firebase deploy');
console.log('\n📚 Lee el archivo FIREBASE_SETUP.md para instrucciones detalladas');
console.log('\n✅ ¡Configuración de Firebase lista para producción!');
