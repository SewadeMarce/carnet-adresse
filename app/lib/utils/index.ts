export const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

export const getRandomColor = () => {

    const colors = [
        '#FF6B9D', '#4ECDC4', '#FFD93D',
        '#95E1D3', '#F38181', '#AA96DA',
        '#FCBAD3', '#A8D8EA', '#667eea',
        '#764ba2', '#ff8fab', '#44a08d'
    ];

    return colors[Math.floor(Math.random() * colors.length)];
};

export const getTotalContacts = (contacts) => `${contacts.length} contact ${contacts.length > 1 ? 's' : ''} · ${contacts.filter(c => c.favorite).length} favori${contacts.filter(c => c.favorite).length > 1 ? 's' : ''}`;

