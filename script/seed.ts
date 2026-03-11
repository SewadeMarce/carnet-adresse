import bcrypt from "bcryptjs";
import type { ObjectId, Types } from "mongoose";
import database from "server/config/db";
import Contact from "server/models/Contacts";
import User from "server/models/User";


// Sample colors for avatars
const COLORS = [
  '#FF6B9D', '#4ECDC4', '#FFD93D', 
  '#95E1D3', '#F38181', '#AA96DA', 
  '#FCBAD3', '#A8D8EA','#667eea', 
  '#764ba2', '#ff8fab', '#44a08d'
];

// Sample French names
const FIRST_NAMES = [
  'Sophie', 'Alexandre', 'Marie', 'Thomas', 'Camille',
  'Lucas', 'Emma', 'Hugo', 'Louis',
   'Gabriel', 'Arthur', 'Manon',
  'Jules', 'Sarah', 'Antoine'
];

const LAST_NAMES = [
  'Martin', 'Dubois', 'Laurent', 'Moreau', 'Simon',
  'Bernard', 'Thomas', 'Robert', 'Richard', 'Petit',
  'Durand', 'Leroy', 'Moreau', 'Garcia', 'David',
  'Bertrand', 'Roux', 'Vincent', 'Fournier', 'Girard'
];

const CITIES = [
  'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice',
  'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'
];



/**
 * Generate random phone number
 */
function generatePhoneNumber() {
  const prefix = '+33 ';
  const numbers = [];
  for (let i = 0; i < 9; i++) {
    if (i % 2 === 0 && i !== 0) numbers.push(' ');
    numbers.push(Math.floor(Math.random() * 10));
  }
  return prefix + numbers.join('');
}

/**
 * Generate random email
 */
function generateEmail(firstName:string, lastName:string) {
  const domains = ['email.fr', 'gmail.com', 'outlook.fr', 'yahoo.fr', 'hotmail.fr'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
}

/**
 * Get random element from array
 */
function getRandomElement(array:string[]) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get random elements from array
 */


async function createUsers() {
  console.log('\n👤 Création des utilisateurs...');
  
  const hashedPassword = await bcrypt.hash('Password123!', 10);
  
  const users = [
    {
      username: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      password: hashedPassword,
    
    },
    {
      username: 'Marie Durand',
      email: 'marie.durand@example.com',
      password: hashedPassword,
    
    }
  ];

  const createdUsers = await User.insertMany(users);
  console.log(`✅ ${createdUsers.length} utilisateurs créés`);
  
  return createdUsers;
}
async function createContacts(userId:Types.ObjectId, count = 30) {
  console.log(`\n📇 Création de ${count} contacts pour l'utilisateur...`);
  
  const contacts = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = getRandomElement(FIRST_NAMES);
    const lastName = getRandomElement(LAST_NAMES);
    const color = getRandomElement(COLORS);
    
    const contact = {
      userId,
      name:  `${firstName} ${lastName}`,
      phones: generatePhoneNumber(),
      emails: generateEmail(firstName, lastName),
      addresses:  getRandomElement(CITIES),
      favorite: Math.random() > 0.75,
      color: color,
      initials: (firstName[0] + lastName[0]).toUpperCase(),
      };
    
  
    

    contacts.push(contact);
  }
  
  const createdContacts = await Contact.insertMany(contacts);

  console.table(createContacts)
  console.log(`✅ ${createdContacts.length} contacts créés`);
  
  return createdContacts;
}

export default async function seed() {
  try {
    console.log('🌱 Démarrage du seed de la base de données...');
    console.log('═'.repeat(50));
    
    // Connect to database
    await database.connect();
    
    // Clear existing data
    console.log('\n🗑️ Nettoyage des données existantes...');
    await User.deleteMany({});
    await Contact.deleteMany({});
       console.log('✅ Données existantes supprimées');
    
    // Create users
    const users = await createUsers();
    const id = users[0]._id 
    // Create contacts for first user
    const contacts = await createContacts(id , 30);
    

    // Display statistics
    console.log('\n📈 Statistiques de la base de données:');
    console.log('═'.repeat(50));
    const stats = await database.getStats();
    console.log(`📦 Base de données: ${stats.database}`);
    console.log(`📊 Collections: ${stats.collections}`);
    console.log(`💾 Taille des données: ${stats.dataSize}`);
    console.log(`🔍 Taille des index: ${stats.indexSize}`);
    console.log(`📄 Nombre d'objets: ${stats.objects}`);
    
    console.log('\n✨ Seed terminé avec succès!');
    console.log('═'.repeat(50));
    console.log('\n👤 Utilisateurs de test:');
    console.log('   Email: jean.dupont@example.com');
    console.log('   Email: marie.durand@example.com');
    console.log('   Mot de passe: Password123!');
    console.log('═'.repeat(50));
    
  } catch (error) {
    console.error('\n❌ Erreur lors du seed:', error);
    throw error;
  } finally {
    await database.disconnect();
  }
}


  const testimonials = [
    { userId: 'Sophie Martin', role: 'Entrepreneure', content: "Une application magnifique et intuitive. J'ai enfin tous mes contacts organisés !", avatar: 'SM', color: '#ff6b9d' ,rating:4,},
    { userId: 'Alexandre Dubois', role: 'Directeur Commercial', content: 'La fonction de recherche est incroyablement rapide. Un gain de temps précieux.', avatar: 'AD', color: '#4ecdc4' ,rating:4,},
    { userId: 'Marie Laurent', role: 'Consultante', content: "Interface élégante et fonctionnalités puissantes. Exactement ce dont j'avais besoin.", avatar: 'ML', color: '#ffd93d',rating:4, }
  ];