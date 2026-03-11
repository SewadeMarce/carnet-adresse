import { ArrowLeft, BackpackIcon, Edit2, Heart, Mail, MapPin, Phone, Trash2, User } from "lucide-react";
import { Form, useNavigate } from "react-router";
import { useMobile } from "~/hooks/usehook";
import BtnFavorit from "./btn-favorite";
import { useState } from "react";
import { getInitials } from "~/lib/utils";
import type { ContactType } from "types";

const ModificationCard = ({ c }: { c: ContactType }) => {
    const contact = {
        id: c._id,
        name: c.name,
        phone: c.phones,
        email: c.emails,
        address: c.addresses,
        favorite: c.favorite,
        initials: c.initials,
        color: c.color
    };
    const { isMobile } = useMobile()
    const [formData, setFormData] = useState(contact.name)
    const details = [
        { id: 'phone', icon: <Phone size={22} style={{ color: '#667eea', marginTop: '2px', flexShrink: 0 }} />, label: 'Téléphone', value: contact.phone },
        { id: 'email', icon: <Mail size={22} style={{ color: '#667eea', marginTop: '2px', flexShrink: 0 }} />, label: 'Email', value: contact.email },
        { id: 'address', icon: <MapPin size={22} style={{ color: '#667eea', marginTop: '2px', flexShrink: 0 }} />, label: 'Adresse', value: contact.address },
    ]
    const navigate = useNavigate();

    const initials = getInitials(formData)
    return (
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
            <Form method="post">

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
                        {initials}
                        <input type="hidden" name="initials" value={initials} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{
                            fontSize: isMobile ? '24px' : '32px', fontWeight: '400', margin: '0 0 10px 0',
                            color: '#2d2d2d', fontFamily: '"Instrument Serif", serif'
                        }}>

                            <input
                                type="text"
                                value={formData}
                                name="username"
                                onChange={(e) => setFormData(e.target.value)}
                                style={{
                                    width: '100%', padding: '14px 18px 14px 46px',
                                    border: '2px solid #f0f0f0', borderRadius: '25px',
                                    //fontSize: '14px', 
                                    fontFamily: '"Inter", sans-serif',
                                    outline: 'none',
                                    //  background: '#fafafa'
                                }} />
                        </h2>
                        <BtnFavorit favorite={contact.favorite} />
                    </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                    {details.map(({ icon, label, value, id }) => (
                        <div
                            key={label} style={{
                                display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '15px',
                                padding: '18px', background: '#fafafa', borderRadius: '20px'
                            }}>
                            {icon}
                            <div>
                                <label style={{
                                    fontFamily: '"Inter", sans-serif', fontSize: '12px', color: '#aaa',
                                    marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600'
                                }}>
                                    {label}
                                </label>
                                <div
                                    style={{
                                        fontSize: isMobile ? '15px' : '18px', color: '#2d2d2d',
                                        fontFamily: '"Inter", sans-serif', fontWeight: '400', wordBreak: 'break-word', lineHeight: '1.5'
                                    }}
                                >
                                    <input
                                        type="text"
                                        defaultValue={value as string} 
                                        name={`${id.toLocaleLowerCase()}`}
                                        style={{
                                            width: '100%', padding: '14px 18px 14px 46px',
                                            border: '2px solid #f0f0f0', borderRadius: '25px',
                                            //fontSize: '14px',
                                            fontFamily: '"Inter", sans-serif',
                                            outline: 'none',
                                            //  background: '#fafafa'

                                        }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                        type="submit"
                        className="button"
                        style={{
                            flex: 1, minWidth: '120px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white', border: 'none', padding: '14px', borderRadius: '30px',
                            fontSize: '15px', fontFamily: '"Inter", sans-serif', fontWeight: '500',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                        }}>
                        <Edit2 size={18} /> Modifier
                    </button>
                    {/* <button
                        //  onClick={() => navigate(contact.id)}
                        className="button" style={{
                            flex: 1, minWidth: '120px',
                            background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)',
                            color: 'white', border: 'none', padding: '14px', borderRadius: '30px',
                            fontSize: '15px', fontFamily: '"Inter", sans-serif', fontWeight: '500',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                        }}>
                        <BackpackIcon size={18} /> 
                        Annuler
                    </button> */}
                </div>
                                        <input type="hidden" name="color" value={contact.color} />

            </Form>

        </div>
    );
};
export default ModificationCard