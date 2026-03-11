// ============================================
// MongoDB Database Configuration
// ============================================

import mongoose from "mongoose";
import { MONGODB_URI } from "./env";


// Configuration
const MONGODB_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
};

// Connection Management
class Database {
  connection = null
  constructor() {
    this.connection = null;
  }

  /**
   * Connect to MongoDB
   */
  async connect() {
    try {
      if (this.connection) {
        console.log('📦 Déjà connecté à MongoDB');
        return this.connection;
      }

      console.log('🔌 Connexion à MongoDB...');
      
      const connection = await mongoose.connect(MONGODB_URI);
      
      console.log('✅ Connecté à MongoDB avec succès');
      console.log(`📍 Base de données: ${connection.connection.name}`);
      console.log(`🌐 Hôte: ${connection.connection.host}`);
      
      // Event handlers
      mongoose.connection.on('error', (error) => {
        console.error('❌ Erreur MongoDB:', error);
      });

      mongoose.connection.on('disconnected', () => {
        console.log('⚠️ Déconnecté de MongoDB');
      });

      mongoose.connection.on('reconnected', () => {
        console.log('🔄 Reconnecté à MongoDB');
      });

      return this.connection;
    } catch (error) {
      console.error('❌ Erreur de connexion à MongoDB:', error);
      throw error;
    }
  }

  /**
   * Disconnect from MongoDB
   */
  async disconnect() {
    try {
      if (!this.connection) {
        console.log('⚠️ Aucune connexion active');
        return;
      }

      await mongoose.disconnect();
      this.connection = null;
      console.log('👋 Déconnecté de MongoDB');
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion:', error);
      throw error;
    }
  }

  /**
   * Get connection status
   */
  isConnected() {
    return mongoose.connection.readyState === 1;
  }

  /**
   * Get database statisticsMarce1998
   */
  async getStats() {
    try {
      const db = mongoose.connection.db;
      const stats = await db?.stats();
      return {
        database: db?.databaseName,
        collections: stats?.collections,
        dataSize: `${(stats?.dataSize / 1024 / 1024).toFixed(2)} MB`,
        indexSize: `${(stats?.indexSize / 1024 / 1024).toFixed(2)} MB`,
        objects: stats?.objects
      };
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  }

  /**
   * Drop database (use with caution!)
   */
  async dropDatabase() {
    try {
      if (!this.isConnected()) {
        throw new Error('Non connecté à la base de données');
      }

      await mongoose.connection.db?.dropDatabase();
      console.log('🗑️ Base de données supprimée');
    } catch (error) {
      console.error('❌ Erreur lors de la suppression de la base:', error);
      throw error;
    }
  }
}

// Export singleton instance
const database = new Database();

export default database;