import { ArrowLeft, Edit2, Heart, Mail, MapPin, Phone, Trash2, User } from "lucide-react";
import { useNavigate } from "react-router";
import { useMobile } from "~/hooks/usehook";
import BtnFavorit from "./btn-favorit";
import { DeleteButton } from "./confirmarion-modal";
import { useState } from "react";
import type { ContactType } from "types";

type Contact = {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    favorite: boolean;
    initials: string;
    color: string;
}

const DetailCard = ({ c }: { c: ContactType }) => {
    const contact = {
        id: c._id,
        name: c.name,
        phone: c.phones,
        email: c.emails,
        address: c.addresses,
        favorite: c.favorite,
        initials: c.initials,
        color: c.color,
    };
    const { isMobile } = useMobile()
    const details = [
        { icon: <Phone size={22} style={{ color: '#667eea', marginTop: '2px', flexShrink: 0 }} />, label: 'Téléphone', value: contact.phone },
        { icon: <Mail size={22} style={{ color: '#667eea', marginTop: '2px', flexShrink: 0 }} />, label: 'Email', value: contact.email },
        { icon: <MapPin size={22} style={{ color: '#667eea', marginTop: '2px', flexShrink: 0 }} />, label: 'Adresse', value: contact.address },
    ]
    const [showdeleteModal, setShowdeleteModal] = useState(false);
    const navigate = useNavigate()
    return (<>

        <div>
            {isMobile && (
                <button
                    onClick={() => navigate(-1)}
                    className="button" style={{
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '8px', color: '#667eea',
                        fontFamily: '"Inter", sans-serif', fontSize: '15px', fontWeight: '500',
                        padding: '0', marginBottom: '25px'
                    }}>
                    <ArrowLeft size={20} /> Retour
                </button>
            )}

            <div style={{
                display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px',
                paddingBottom: '25px', borderBottom: '1px solid #f0f0f0',
                flexWrap: isMobile ? 'wrap' : 'nowrap'
            }}>
                <div style={{
                    width: isMobile ? '80px' : '100px', height: isMobile ? '80px' : '100px',
                    borderRadius: '50%', background: contact.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontFamily: '"Inter", sans-serif', fontWeight: '600',
                    fontSize: isMobile ? '28px' : '36px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    flexShrink: 0
                }}>
                    {contact.initials}
                </div>
                <div style={{ flex: 1 }}>
                    <h2 style={{
                        fontSize: isMobile ? '24px' : '32px', fontWeight: '400', margin: '0 0 10px 0',
                        color: '#2d2d2d', fontFamily: '"Instrument Serif", serif'
                    }}>{contact.name}</h2>
                    <BtnFavorit favorite={contact.favorite} />
                </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
                {details.map(({ icon, label, value }) => (
                    <div
                        key={label} style={{
                            display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '15px',
                            padding: '18px', background: '#fafafa', borderRadius: '20px'
                        }}>
                        {icon}
                        <div>
                            <div style={{
                                fontFamily: '"Inter", sans-serif', fontSize: '12px', color: '#aaa',
                                marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600'
                            }}>{label}</div>
                            <div style={{
                                fontSize: isMobile ? '15px' : '18px', color: '#2d2d2d',
                                fontFamily: '"Inter", sans-serif', fontWeight: '400', wordBreak: 'break-word', lineHeight: '1.5'
                            }}>{value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                    onClick={() => navigate(`/carnet-adresses/${contact.id}/edit`)}
                    className="button" style={{
                        flex: 1, minWidth: '120px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white', border: 'none', padding: '14px', borderRadius: '30px',
                        fontSize: '15px', fontFamily: '"Inter", sans-serif', fontWeight: '500',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                    }}>
                    <Edit2 size={18} /> Modifier
                </button>
                <button
                    onClick={() => setShowdeleteModal(true)}
                    className="button" style={{
                        flex: 1, minWidth: '120px',
                        background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)',
                        color: 'white', border: 'none', padding: '14px', borderRadius: '30px',
                        fontSize: '15px', fontFamily: '"Inter", sans-serif', fontWeight: '500',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                    }}>
                    <Trash2 size={18} /> Supprimer
                </button>
            </div>
        </div>
        {showdeleteModal && (
            <DeleteButton open={setShowdeleteModal} />
        )}
    </>);
};
export default DetailCard