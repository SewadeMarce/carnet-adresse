import mongoose from "mongoose";

// Contact Schema
const contactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'L\'ID utilisateur est requis'],
    index: true
  },
  name: {
    type: String,
    required: [true, 'Le prénom est requis'],
    trim: true,
    maxlength: [50, 'Le prénom ne peut pas dépasser 50 caractères']
  },

  phones: String,
  emails: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email invalide']
  },
  addresses: {
    type: String,
    trim: true
  },
  favorite: {
    type: Boolean,
    default: false,
    index: true
  },

  initials: {
    type: String,
    trim: true,
    uppercase: true,
    maxlength: 2
  },
  color: {
    type: String,
    default: '#667eea',
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Couleur hexadécimale invalide']
  },

}, {
  timestamps: true
});
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
export default Contact;