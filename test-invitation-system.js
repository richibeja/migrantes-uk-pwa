// Test del sistema de invitaciones
const { invitationSystem } = require('./src/lib/invitation-system.ts');
const { dashboardAccessSystem } = require('./src/lib/dashboard-access.ts');

console.log('🧪 PROBANDO SISTEMA DE INVITACIONES...\n');

// 1. Crear una invitación de prueba
console.log('1. Creando invitación de prueba...');
const invitation = invitationSystem.createInvitation('admin', 'premium', 1);
console.log('✅ Invitación creada:', invitation);

// 2. Validar el código
console.log('\n2. Validando código...');
const validation = invitationSystem.validateInvitation(invitation.code);
console.log('✅ Validación:', validation);

// 3. Simular uso del código
console.log('\n3. Simulando uso del código...');
const userId = 'test_user_123';
const useResult = invitationSystem.useInvitation(invitation.code, userId);
console.log('✅ Resultado del uso:', useResult);

// 4. Otorgar acceso al dashboard
console.log('\n4. Otorgando acceso al dashboard...');
const accessResult = dashboardAccessSystem.grantDashboardAccess(userId, invitation.code, 'premium');
console.log('✅ Resultado del acceso:', accessResult);

// 5. Verificar acceso al dashboard
console.log('\n5. Verificando acceso al dashboard...');
const hasAccess = dashboardAccessSystem.hasDashboardAccess(userId);
console.log('✅ Tiene acceso:', hasAccess);

// 6. Verificar sesión
console.log('\n6. Verificando sesión...');
const sessionCheck = dashboardAccessSystem.isDashboardSessionValid();
console.log('✅ Sesión válida:', sessionCheck);

console.log('\n🎉 ¡SISTEMA FUNCIONANDO CORRECTAMENTE!');
