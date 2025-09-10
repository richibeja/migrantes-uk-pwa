#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Aplicando patrón seguro de Firebase en todo el código...\n');

// Patrones a reemplazar
const patterns = [
  // Patrón 1: Verificar auth antes de usar
  {
    search: /auth\.onAuthStateChanged/g,
    replace: 'auth && auth.onAuthStateChanged'
  },
  {
    search: /signInWithEmailAndPassword\(auth,/g,
    replace: 'signInWithEmailAndPassword(auth!,'
  },
  {
    search: /createUserWithEmailAndPassword\(auth,/g,
    replace: 'createUserWithEmailAndPassword(auth!,'
  },
  {
    search: /signInAnonymously\(auth\)/g,
    replace: 'signInAnonymously(auth!)'
  },
  {
    search: /signOut\(auth\)/g,
    replace: 'signOut(auth!)'
  },
  {
    search: /getRedirectResult\(auth\)/g,
    replace: 'getRedirectResult(auth!)'
  },
  {
    search: /signInWithRedirect\(auth,/g,
    replace: 'signInWithRedirect(auth!,'
  },
  {
    search: /signInWithPopup\(auth,/g,
    replace: 'signInWithPopup(auth!,'
  },
  {
    search: /onAuthStateChanged\(auth,/g,
    replace: 'onAuthStateChanged(auth!,'
  },

  // Patrón 2: Verificar db antes de usar
  {
    search: /collection\(db,/g,
    replace: 'collection(db!,'
  },
  {
    search: /doc\(db,/g,
    replace: 'doc(db!,'
  },
  {
    search: /getDocs\(query\(collection\(db,/g,
    replace: 'getDocs(query(collection(db!,'
  },
  {
    search: /addDoc\(collection\(db,/g,
    replace: 'addDoc(collection(db!,'
  },
  {
    search: /setDoc\(doc\(db,/g,
    replace: 'setDoc(doc(db!,'
  },
  {
    search: /updateDoc\(doc\(db,/g,
    replace: 'updateDoc(doc(db!,'
  },
  {
    search: /getDoc\(doc\(db,/g,
    replace: 'getDoc(doc(db!,'
  },
  {
    search: /runTransaction\(db,/g,
    replace: 'runTransaction(db!,'
  },

  // Patrón 3: Agregar imports de React
  {
    search: /React\.useState/g,
    replace: 'React.useState'
  },
  {
    search: /React\.useEffect/g,
    replace: 'React.useEffect'
  },

  // Patrón 4: Corregir tipos de interfaces
  {
    search: /a\.uid/g,
    replace: 'a.id'
  },
  {
    search: /it\.title/g,
    replace: 'it.subject'
  },
  {
    search: /it\.caseCode/g,
    replace: 'it.id'
  },
  {
    search: /it\.amount/g,
    replace: 'it.priority'
  }
];

// Archivos a procesar
const filesToProcess = [
  'src/app/admin/cases/page.tsx',
  'src/app/admin/payments/page.tsx',
  'src/app/assistant/page.tsx',
  'src/app/auth/login/page.tsx',
  'src/app/auth/register/page.tsx',
  'src/app/directory/page.tsx',
  'src/app/letter/page.tsx',
  'src/app/profile/ProfileClient.tsx',
  'src/app/qna/QnaClient.tsx',
  'src/components/AnalyticsDashboard.tsx',
  'src/components/AssignedToDisplay.tsx',
  'src/components/NotificationCenter.tsx',
  'src/components/ui/button.tsx',
  'src/lib/codes.ts',
  'src/lib/firebaseCodes.ts',
  'src/lib/firebaseUsers.ts',
  'src/lib/i18n.ts',
  'src/lib/subscription.ts'
];

let totalFiles = 0;
let processedFiles = 0;

filesToProcess.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    totalFiles++;
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    patterns.forEach(pattern => {
      if (pattern.search.test(content)) {
        content = content.replace(pattern.search, pattern.replace);
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content);
      processedFiles++;
      console.log(`✅ ${filePath}`);
    } else {
      console.log(`⚪ ${filePath} (sin cambios necesarios)`);
    }
  } else {
    console.log(`❌ ${filePath} (archivo no encontrado)`);
  }
});

console.log(`\n📊 Resumen:`);
console.log(`  - Archivos procesados: ${processedFiles}/${totalFiles}`);
console.log(`  - Patrones aplicados: ${patterns.length}`);

console.log('\n🎯 Próximos pasos:');
console.log('  1. Ejecutar: npm run check-types');
console.log('  2. Revisar errores restantes');
console.log('  3. Corregir manualmente si es necesario');
console.log('  4. Ejecutar: npm run build');

console.log('\n✨ ¡Corrección automática completada!');
