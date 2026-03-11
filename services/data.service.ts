import Contact from 'server/models/Contacts';
import User from 'server/models/User';
import type { ContactType } from 'types';

export const contactsStore = {
    getAll: async () => {
        try {
            const contacts = await Contact.find();
            return {
                success: true,
                status: 200,
                contacts,
            };
        } catch (error) {
            console.error('Erreur lors de la récupération des contacts:', error);
            return {
                succes: false,
                status: 500,
                error: 'Erreur serveur'
            };
        }
    },
    getById: async (id: string) => {
        try {
            const contact = await Contact.findById(id);
            if (!contact) {
                return {
                    success: false,
                    status: 404,
                    error: 'Contact non trouvé',
                }
            }
            return {
                success: true,
                status: 200,
                contact: JSON.parse(JSON.stringify(contact)),
            };
        } catch (error) {
            console.error('Erreur lors de la récupération du contact:', error);
            return {
                succes: false,
                status: 500,
                error: 'Erreur serveur'
            };
        }
    },
    getByUser: async (userId: string) => {
        try {
            const contacts = await Contact.find().
                where('userId').equals(userId);

            (contacts)
            return {
                success: true,
                status: 200,
                contacts: JSON.parse(JSON.stringify(contacts)),
            };
        } catch (error) {
            console.error('Erreur lors de la récupération des contacts:', error);
            return {
                succes: false,
                status: 500,
                error: 'Erreur serveur'
            };
        }
    },

    create: async (body: ContactType) => {
        try {
            const newContact = new Contact(body);
            const savedContact = await newContact.save();
            return {
                success: true,
                status: 201,
                savedContact,
            };
        } catch (error: any) {
            console.error('Erreur lors de la création du contact:', error);
            return {
                succes: false,
                status: 500,
                error: 'Erreur serveur'
            };
        }
    },

    update: async (id: string, body: ContactType) => {
        try {
            const updatedContact = await Contact.findByIdAndUpdate(
                id,
                body,
                { new: true, runValidators: true }
            );
            if (!updatedContact) {
                return {
                    success: false,
                    status: 404,
                    error: 'Contact non trouvé',
                }
            }
            return {
                success: true,
                status: 201,
                updatedContact,
            };
        } catch (error: any) {
            console.error('Erreur lors de la mise à jour du contact:', error);
            return {
                succes: false,
                status: 500,
                error: 'Erreur serveur'
            };
        }
    },
    pushFavorite: async (id: string, body: { favorite: boolean }) => {
        try {
            const updatedContact = await Contact.findByIdAndUpdate(
                id,
                body,
                { new: true, runValidators: true }
            );
            if (!updatedContact) {
                return {
                    success: false,
                    status: 404,
                    error: 'Contact non trouvé',
                }
            }
            return {
                success: true,
                status: 201,
                updatedContact,
            };
        } catch (error: any) {
            console.error('Erreur lors de la mise à jour du contact:', error);
            return {
                succes: false,
                status: 500,
                error: 'Erreur serveur'
            };
        }
    },
    delete: async (id: string) => {
        try {
            const deletedContact = await Contact.findByIdAndDelete(id);
            if (!deletedContact) {
                return {
                    success: false,
                    status: 404,
                    error: 'Contact non trouvé',
                }
            }
            return {
                success: true,
                status: 201,
                deletedContact,
                message: 'Contact supprimé avec succès',

            };
        } catch (error) {
            console.error('Erreur lors de la suppression du contact:', error);
            return {
                succes: false,
                status: 500,
                error: 'Erreur serveur'
            };
        }
    },

    search: async (userId: string, q: string = "") => {
        try {
            const query = q ? {
                $or: [
                    { name: { $regex: q, $options: 'i' } },
                    { emails: { $regex: q, $options: 'i' } },
                    { phones: { $regex: q, $options: 'i' } }
                ]
            } : {};

            const contacts = await Contact.find(query).
                where('userId').equals(userId);

            return {
                success: true,
                status: 200,
                contacts: JSON.parse(JSON.stringify(contacts)),
            };
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
            return {
                succes: false,
                status: 500,
                error: 'Erreur serveur'
            };
        }
    },
}

export const statsStores = {

    getAll: async () => {
        try {
            const user = await User.find().countDocuments();
            const contact = await Contact.find().countDocuments();

            return {
                success: true,
                status: 200,
                user,
                contact
            };
        } catch (error) {
            console.error('Erreur lors de la récupération des contacts:', error);
            return {
                succes: false,
                status: 500,
                error: 'Erreur serveur'
            };
        }
    },
}