import { Save, X } from "lucide-react";
import { Form, redirect, useNavigate, type ActionFunctionArgs } from "react-router";
import { contactsStore } from "services/data.service";
import { useMobile } from "~/hooks/usehook";
import { getInitials, getRandomColor } from "~/lib/utils";
export async function action({ params, request, context }: ActionFunctionArgs) {
    const formData = await request.formData()
    const id = params.id;
    const data = {
        name: formData.get('username') as string,
        phones: formData.get('phone') as string,
        emails: formData.get('email') as string,
        addresses: formData.get('address') as string,
        favorite: false,
        initials: getInitials(formData.get('username') as string),
        userId: context.user.id,
        color: getRandomColor()
    }

    const res = await contactsStore.create(data)
    console.log(res);
    
        throw redirect("/carnet-adresses");
    
}
export default function New() {
    const { isMobile } = useMobile()
    const navigate = useNavigate();
    const contact = [
        { label: 'Nom complet', key: 'username', type: 'text', placeholder: 'Ex: Sophie Martin' },
        { label: 'Téléphone', key: 'phone', type: 'tel', placeholder: 'Ex: +33 6 12 34 56 78' },
        { label: 'Email', key: 'email', type: 'email', placeholder: 'Ex: sophie.martin@email.fr' },
    ];
    return <div
        className="modal-backdrop"
        style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: isMobile ? 'flex-end' : 'center',
            justifyContent: 'center', zIndex: 1000, padding: isMobile ? '15px' : '20px'
        }}
    >
        <div
            className="modal-content" style={{
                background: 'white',
                borderRadius: isMobile ? '30px 30px 0 0' : '40px',
                padding: isMobile ? '30px 20px 40px' : '50px',
                maxWidth: isMobile ? '100%' : '600px',
                width: '100%',
                boxShadow: '0 20px 80px rgba(0,0,0,0.2)',
                maxHeight: isMobile ? '90vh' : 'auto',
                overflowY: 'auto'
            }}>
            <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: '30px'
            }}>
                <h2 style={{
                    fontSize: isMobile ? '26px' : '32px', fontWeight: '400',
                    margin: 0, fontFamily: '"Instrument Serif", serif', color: '#2d2d2d'
                }}>
                    {'Nouveau contact'}
                </h2>
                <button
                    onClick={() => navigate(-1)}
                    className="button" style={{
                        background: 'transparent',
                        borderRadius: '18px', fontSize: '15px',
                        cursor: 'pointer',
                        padding: '8px', color: '#aaa'
                    }}>
                    <X size={24} />
                </button>
            </div>
            <Form method="post">
                {contact.map(({ label, key, type, placeholder }) => (
                    <div key={key} style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block', marginBottom: '8px', fontFamily: '"Inter", sans-serif',
                            fontSize: '12px', fontWeight: '600', color: '#2d2d2d',
                            textTransform: 'uppercase', letterSpacing: '0.1em'
                        }}>{label}</label>
                        <input
                            type={type}
                            defaultValue={""}
                            name={key}
                            className="input-field"
                            style={{
                                width: '100%', padding: '14px 18px', border: '2px solid #f0f0f0',
                                borderRadius: '18px', fontSize: '15px', fontFamily: '"Inter", sans-serif',
                                outline: 'none', background: '#fafafa'
                            }}
                            placeholder={placeholder}
                        />
                    </div>
                ))}

                <div style={{ marginBottom: '30px' }}>
                    <label style={{
                        display: 'block', marginBottom: '8px', fontFamily: '"Inter", sans-serif',
                        fontSize: '12px', fontWeight: '600', color: '#2d2d2d',
                        textTransform: 'uppercase', letterSpacing: '0.1em'
                    }}>Adresse</label>
                    <textarea
                        defaultValue=""
                        name="address"
                        className="input-field"
                        style={{
                            width: '100%', padding: '14px 18px', border: '2px solid #f0f0f0',
                            borderRadius: '18px', fontSize: '15px', fontFamily: '"Inter", sans-serif',
                            outline: 'none', background: '#fafafa', minHeight: '90px', resize: 'vertical'
                        }}
                        placeholder="Ex: 15 Rue de la Paix, 75002 Paris"
                    />
                </div>

                <button
                    type="submit"
                    className="button"
                    style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white', border: 'none', padding: '16px', borderRadius: '28px',
                        fontSize: '16px', fontFamily: '"Inter", sans-serif', fontWeight: '500',
                        cursor: 'pointer', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: '10px',
                        boxShadow: '0 8px 24px rgba(102,126,234,0.35)'
                    }}
                >
                    <Save size={20} />
                    {'Ajouter le contact'}
                </button>
            </Form>
        </div>
    </div>

}