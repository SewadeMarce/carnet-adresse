import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'L\'ID utilisateur est requis'],
    index: true
  },

  role: {
    type: String,
    trim: true,
    default: "Client"
  },
  content: {
    type: String,
    required: [true, "Le message ne peut pas être vide"],
    minlength: [10, "Le témoignage est trop court"],
    maxlength: 500
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5
  },
  isApproved: {
    type: Boolean,
    default: false // Nécessite une validation manuelle pour s'afficher
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Testimonial= mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
export default Testimonial;Testimonial;