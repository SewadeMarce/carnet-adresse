import { Heart, Search } from "lucide-react";
import { useMobile } from "~/hooks/usehook";
import SearchBar from "./search";
import { Link, useParams } from "react-router";
import type { ContactType } from "types";


export default function ContactList({
    favoriteContacts = [], regularContacts = [], filteredContacts = []
}: {
    favoriteContacts: ContactType[], regularContacts: ContactType[], filteredContacts: ContactType[]

}) {

    const { isMobile, mobileView } = useMobile();
    return (<>
        {(!isMobile || mobileView === 'list') && (
            <div
                style={{
                    background: 'white', borderRadius: '30px', padding: isMobile ? '20px' : '30px',
                    boxShadow: '0 10px 50px rgba(0,0,0,0.06)',
                    maxHeight: isMobile ? 'none' : 'calc(100vh - 2px)',
                    overflow: 'hidden', display: 'flex', flexDirection: 'column',
                    animation: 'fadeInUp 0.6s ease-out 0.1s both'
                }}>
                {/* Search */}
                <SearchBar />

                {/* Contact List */}
                <div style={{ overflowY: 'auto', flex: 1 }}>
                    {favoriteContacts.length > 0 && (
                        <div style={{ marginBottom: '20px' }}>
                            <h3 style={{
                                fontFamily: '"Inter", sans-serif', fontSize: '11px', fontWeight: '600',
                                textTransform: 'uppercase', letterSpacing: '0.1em', color: '#aaa', marginBottom: '12px'
                            }}>Favoris</h3>
                            {favoriteContacts.map((c, i) => <ContactCard key={c._id as string} index={i} c={c}
                            />)
                            }
                        </div>
                    )}
                    {regularContacts.length > 0 && (
                        <div>
                            <h3 style={{
                                fontFamily: '"Inter", sans-serif', fontSize: '11px', fontWeight: '600',
                                textTransform: 'uppercase', letterSpacing: '0.1em', color: '#aaa', marginBottom: '12px'
                            }}>Tous les contacts</h3>
                            {regularContacts.map((c, i) => <ContactCard key={c._id as string} c={c} index={favoriteContacts.length + i} />)}
                        </div>
                    )}
                    {filteredContacts.length === 0 && (
                        <div style={{
                            textAlign: 'center', padding: '50px 20px', color: '#aaa',
                            fontFamily: '"Inter", sans-serif', fontSize: '14px'
                        }}>Aucun contact trouvé</div>
                    )}
                </div>
            </div>
        )}
    </>
    )
}


const ContactCard = ({ c, index }: { c: ContactType, index: number }) => {
    // const params = useParams()
    const contact = {
        id: c._id,
        name: c.name,
        phone: c.phones,
        favorite: c.favorite,
        initials: c.initials,
        color: c.color,
    };
    const { isMobile, id } = useMobile()
    return (
        <Link to={`/carnet-adresses/${contact.id}`}
            key={contact.id as string}
            // onClick={() => handleSelectContact(contact)}
            className="contact-card"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '15px',
                borderRadius: '20px',
                cursor: 'pointer',
                marginBottom: '10px',
                background: id === contact.id && !isMobile
                    ? 'linear-gradient(135deg, #f8f9ff 0%, #fff5f8 100%)' : 'transparent',
                border: id === contact.id && !isMobile
                    ? '2px solid #667eea' : '2px solid transparent',
                animationDelay: `${index * 0.05}s`
            }}
        >
            <div className="avatar" style={{
                width: '50px', height: '50px', borderRadius: '50%',
                background: contact.color, display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: 'white', fontFamily: '"Inter", sans-serif',
                fontWeight: '600', fontSize: '16px', flexShrink: 0
            }}>
                {contact.initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                    fontWeight: '500', fontSize: '16px', color: '#2d2d2d', marginBottom: '3px',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    fontFamily: '"Instrument Serif", serif'
                }}>{contact.name}</div>
                <div style={{
                    fontSize: '13px', color: '#888', fontFamily: '"Inter", sans-serif',
                    fontWeight: '300', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>{contact.phone}</div>
            </div>
            {contact.favorite && (
                <Heart size={18} fill="#ff6b9d" color="#ff6b9d" className="favorite-icon" style={{ flexShrink: 0 }} />
            )}
        </Link>
    )
}