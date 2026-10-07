export const ROLES = {
  ADMIN: 'ADMIN',
  ANALISTA: 'ANALISTA',
  PROVEEDOR: 'PROVEEDOR',
  AUDITOR: 'AUDITOR'
};

export const PERMISSIONS = {
  VIEW_MENU_CONFIG: 'VIEW_MENU_CONFIG',
  VIEW_MENU_HOMOLOGACION: 'VIEW_MENU_HOMOLOGACION',
  ACTION_EVALUATE_DOC: 'ACTION_EVALUATE_DOC', // Aprobar/Rechazar docs
  ACTION_DISCARD_PROSPECT: 'ACTION_DISCARD_PROSPECT',
  ACTION_INVITE_PROSPECT: 'ACTION_INVITE_PROSPECT',
  ACTION_UPLOAD_DOC: 'ACTION_UPLOAD_DOC', // Proveedor sube doc
  ACTION_ADD_NOTE: 'ACTION_ADD_NOTE'
};

const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
  [ROLES.ANALISTA]: [
    PERMISSIONS.VIEW_MENU_HOMOLOGACION,
    PERMISSIONS.ACTION_EVALUATE_DOC,
    PERMISSIONS.ACTION_ADD_NOTE,
    PERMISSIONS.ACTION_INVITE_PROSPECT
  ],
  [ROLES.PROVEEDOR]: [
    PERMISSIONS.ACTION_UPLOAD_DOC
  ],
  [ROLES.AUDITOR]: [
    PERMISSIONS.VIEW_MENU_HOMOLOGACION
  ]
};

// Usuario actual (mock, se puede cambiar para probar roles)
let currentUser = {
  name: 'Paul Andrade',
  email: 'pandrade@grupolajoya.com.pe',
  role: ROLES.ADMIN, 
  // Si fuera proveedor:
  // role: ROLES.PROVEEDOR, providerRuc: '20539627938'
};

export function getCurrentUser() {
  return currentUser;
}

export function setCurrentUser(user) {
  currentUser = user;
}

export function hasPermission(permission) {
  const perms = ROLE_PERMISSIONS[currentUser.role] || [];
  return perms.includes(permission);
}

export function getRoleName(role) {
  const names = {
    [ROLES.ADMIN]: 'Administrador',
    [ROLES.ANALISTA]: 'Analista Revisor',
    [ROLES.PROVEEDOR]: 'Proveedor',
    [ROLES.AUDITOR]: 'Auditor (Solo Lectura)'
  };
  return names[role] || 'Desconocido';
}
