// Sistema de backup para GANA FÁCIL
export interface BackupData {
  id: string;
  timestamp: string;
  version: string;
  data: {
    predictions: any[];
    users: any[];
    settings: any;
    analytics: any[];
  };
  size: number;
  checksum: string;
}

export class BackupSystem {
  private static instance: BackupSystem;
  private backups: BackupData[] = [];
  private maxBackups = 10;

  static getInstance(): BackupSystem {
    if (!BackupSystem.instance) {
      BackupSystem.instance = new BackupSystem();
    }
    return BackupSystem.instance;
  }

  // Crear backup
  async createBackup(): Promise<BackupData> {
    try {
      console.log('💾 Creando backup del sistema...');

      const data = {
        predictions: JSON.parse(localStorage.getItem('predictions') || '[]'),
        users: JSON.parse(localStorage.getItem('users') || '[]'),
        settings: JSON.parse(localStorage.getItem('settings') || '{}'),
        analytics: JSON.parse(localStorage.getItem('analytics') || '[]')
      };

      const backup: BackupData = {
        id: `backup_${Date.now()}`,
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        data,
        size: JSON.stringify(data).length,
        checksum: this.calculateChecksum(data)
      };

      this.backups.push(backup);
      await this.saveBackups();

      console.log('✅ Backup creado exitosamente');
      return backup;

    } catch (error) {
      console.error('❌ Error creando backup:', error);
      throw error;
    }
  }

  // Restaurar backup
  async restoreBackup(backupId: string): Promise<boolean> {
    try {
      console.log(`🔄 Restaurando backup: ${backupId}`);

      const backup = this.backups.find(b => b.id === backupId);
      if (!backup) {
        throw new Error('Backup no encontrado');
      }

      // Verificar checksum
      if (backup.checksum !== this.calculateChecksum(backup.data)) {
        throw new Error('Backup corrupto');
      }

      // Restaurar datos
      localStorage.setItem('predictions', JSON.stringify(backup.data.predictions));
      localStorage.setItem('users', JSON.stringify(backup.data.users));
      localStorage.setItem('settings', JSON.stringify(backup.data.settings));
      localStorage.setItem('analytics', JSON.stringify(backup.data.analytics));

      console.log('✅ Backup restaurado exitosamente');
      return true;

    } catch (error) {
      console.error('❌ Error restaurando backup:', error);
      return false;
    }
  }

  // Listar backups
  getBackups(): BackupData[] {
    return [...this.backups].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  // Eliminar backup
  async deleteBackup(backupId: string): Promise<boolean> {
    try {
      const index = this.backups.findIndex(b => b.id === backupId);
      if (index === -1) {
        return false;
      }

      this.backups.splice(index, 1);
      await this.saveBackups();

      console.log(`✅ Backup ${backupId} eliminado`);
      return true;

    } catch (error) {
      console.error('❌ Error eliminando backup:', error);
      return false;
    }
  }

  // Exportar backup
  exportBackup(backupId: string): string {
    const backup = this.backups.find(b => b.id === backupId);
    if (!backup) {
      throw new Error('Backup no encontrado');
    }

    return JSON.stringify(backup, null, 2);
  }

  // Importar backup
  async importBackup(backupJson: string): Promise<boolean> {
    try {
      const backup: BackupData = JSON.parse(backupJson);
      
      // Verificar estructura
      if (!backup.id || !backup.timestamp || !backup.data) {
        throw new Error('Formato de backup inválido');
      }

      // Verificar checksum
      if (backup.checksum !== this.calculateChecksum(backup.data)) {
        throw new Error('Backup corrupto');
      }

      this.backups.push(backup);
      await this.saveBackups();

      console.log('✅ Backup importado exitosamente');
      return true;

    } catch (error) {
      console.error('❌ Error importando backup:', error);
      return false;
    }
  }

  // Limpiar backups antiguos
  async cleanupOldBackups(): Promise<void> {
    if (this.backups.length <= this.maxBackups) {
      return;
    }

    // Ordenar por timestamp y mantener solo los más recientes
    this.backups.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    const toDelete = this.backups.splice(this.maxBackups);
    await this.saveBackups();

    console.log(`🧹 ${toDelete.length} backups antiguos eliminados`);
  }

  // Calcular checksum
  private calculateChecksum(data: any): string {
    const str = JSON.stringify(data);
    let hash = 0;
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convertir a 32-bit integer
    }
    
    return hash.toString(16);
  }

  // Guardar backups en localStorage
  private async saveBackups(): Promise<void> {
    localStorage.setItem('backups', JSON.stringify(this.backups));
  }

  // Cargar backups desde localStorage
  async loadBackups(): Promise<void> {
    try {
      const stored = localStorage.getItem('backups');
      if (stored) {
        this.backups = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error cargando backups:', error);
      this.backups = [];
    }
  }

  // Backup automático
  startAutoBackup(intervalMs: number = 24 * 60 * 60 * 1000): void { // 24 horas
    setInterval(async () => {
      try {
        await this.createBackup();
        await this.cleanupOldBackups();
      } catch (error) {
        console.error('Error en backup automático:', error);
      }
    }, intervalMs);

    console.log('🔄 Backup automático iniciado');
  }

  // Obtener estadísticas
  getStats(): any {
    const totalSize = this.backups.reduce((sum, b) => sum + b.size, 0);
    const oldestBackup = this.backups.length > 0 ? 
      this.backups[this.backups.length - 1].timestamp : null;
    const newestBackup = this.backups.length > 0 ? 
      this.backups[0].timestamp : null;

    return {
      totalBackups: this.backups.length,
      totalSize,
      averageSize: this.backups.length > 0 ? totalSize / this.backups.length : 0,
      oldestBackup,
      newestBackup,
      maxBackups: this.maxBackups
    };
  }
}

// Instancia global
export const backupSystem = BackupSystem.getInstance();

// Hook para React
export const useBackupSystem = () => {
  return backupSystem;
};
