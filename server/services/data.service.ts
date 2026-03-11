const contacts = [
    {
        id: "1",
        name: "Sophie Martin",
        phone: "+33 6 12 34 56 78",
        email: "sophie.martin@email.fr",
        address: "15 Rue de la Paix, 75002 Paris",
        favorite: true,
        initials: "SM",
        color: "#FF6B9D"
    },
    {
        id: "2",
        name: "Alexandre Dubois",
        phone: "+33 6 98 76 54 32",
        email: "alex.dubois@email.fr",
        address: "8 Avenue des Champs, 69001 Lyon",
        favorite: false,
        initials: "AD",
        color: "#4ECDC4"
    },
    {
        id: "3",
        name: "Marie Laurent",
        phone: "+33 7 11 22 33 44",
        email: "marie.l@email.fr",
        address: "23 Boulevard Victor Hugo, 31000 Toulouse",
        favorite: true,
        initials: "ML",
        color: "#FFD93D"
    },
    {
        id: "4",
        name: "Marie Laurent",
        phone: "+33 7 11 22 33 44",
        email: "marie.l@email.fr",
        address: "23 Boulevard Victor Hugo, 31000 Toulouse",
        favorite: true,
        initials: "ML",
        color: "#FFD93D"
    },
    {
        id: "5",
        name: "Marie Laurent",
        phone: "+33 7 11 22 33 44",
        email: "marie.l@email.fr",
        address: "23 Boulevard Victor Hugo, 31000 Toulouse",
        favorite: true,
        initials: "ML",
        color: "#FFD93D"
    },
    {
        id: "7",
        name: "Marie Laurent",
        phone: "+33 7 11 22 33 44",
        email: "marie.l@email.fr",
        address: "23 Boulevard Victor Hugo, 31000 Toulouse",
        favorite: true,
        initials: "ML",
        color: "#FFD93D"
    }
];
const dataServices = {
    getAllContacts: async (params: string) => {

        const filteredContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(params.toLowerCase()) ||
            contact.email.toLowerCase().includes(params.toLowerCase()) ||
            contact.phone.includes(params)
        );

        return filteredContacts
    },


    getContactById: async (params: string) => {
        return contacts.find(c => c.id === params)
    }
}

export default dataServices;