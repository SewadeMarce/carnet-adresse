//import { Save, X } from "lucide-react";
// import { useNavigate } from "react-router";
// import  { useMobile } from "~/hooks/usehook";

// export default function New() {
//     const {isMobile} = useMobile()
//     const navigate = useNavigate()
//     return <div
//         className="modal-backdrop"
//        onClick={() => navigate(-1)}
//         style={{
//             position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
//             background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
//             display: 'flex', alignItems: isMobile ? 'flex-end' : 'center',
//             justifyContent: 'center', zIndex: 1000, padding: isMobile ? '0' : '20px'
//         }}
//     >
//         <div
//             className="modal-content" style={{
//                 background: 'white',
//                 borderRadius: isMobile ? '30px 30px 0 0' : '40px',
//                 padding: isMobile ? '30px 20px 40px' : '50px',
//                 maxWidth: isMobile ? '100%' : '600px',
//                 width: '100%',
//                 boxShadow: '0 20px 80px rgba(0,0,0,0.2)',
//                 maxHeight: isMobile ? '90vh' : 'auto',
//                 overflowY: 'auto'
//             }}>
//             <div style={{
//                 display: 'flex', justifyContent: 'space-between',
//                 alignItems: 'center', marginBottom: '30px'
//             }}>
//                 <h2 style={{
//                     fontSize: isMobile ? '26px' : '32px', fontWeight: '400',
//                     margin: 0, fontFamily: '"Instrument Serif", serif', color: '#2d2d2d'
//                 }}>
//                     { 'Modifier le contact'}
//                 </h2>
//                 <button 
//              //   onClick={closeModal}
//                  className="button" style={{
//                     background: 'transparent', border: 'none', cursor: 'pointer',
//                     padding: '8px', color: '#aaa'
//                 }}>
//                     <X size={24} />
//                 </button>
//             </div>

//             {[
//                 { label: 'Nom complet', key: 'name', type: 'text', placeholder: 'Ex: Sophie Martin' },
//                 { label: 'Téléphone', key: 'phone', type: 'tel', placeholder: 'Ex: +33 6 12 34 56 78' },
//                 { label: 'Email', key: 'email', type: 'email', placeholder: 'Ex: sophie.martin@email.fr' },
//             ].map(({ label, key, type, placeholder }) => (
//                 <div key={key} style={{ marginBottom: '20px' }}>
//                     <label style={{
//                         display: 'block', marginBottom: '8px', fontFamily: '"Inter", sans-serif',
//                         fontSize: '12px', fontWeight: '600', color: '#2d2d2d',
//                         textTransform: 'uppercase', letterSpacing: '0.1em'
//                     }}>{label}</label>
//                     <input
//                         type={type}
//                        // value={formData[key]}
//                         //onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
//                         className="input-field"
//                         style={{
//                             width: '100%', padding: '14px 18px', border: '2px solid #f0f0f0',
//                             borderRadius: '18px', fontSize: '15px', fontFamily: '"Inter", sans-serif',
//                             outline: 'none', background: '#fafafa'
//                         }}
//                         placeholder={placeholder}
//                     />
//                 </div>
//             ))}

//             <div style={{ marginBottom: '30px' }}>
//                 <label style={{
//                     display: 'block', marginBottom: '8px', fontFamily: '"Inter", sans-serif',
//                     fontSize: '12px', fontWeight: '600', color: '#2d2d2d',
//                     textTransform: 'uppercase', letterSpacing: '0.1em'
//                 }}>Adresse</label>
//                 <textarea
//                     // value={formData.address}
//                     // onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                     className="input-field"
//                     style={{
//                         width: '100%', padding: '14px 18px', border: '2px solid #f0f0f0',
//                         borderRadius: '18px', fontSize: '15px', fontFamily: '"Inter", sans-serif',
//                         outline: 'none', background: '#fafafa', minHeight: '90px', resize: 'vertical'
//                     }}
//                     placeholder="Ex: 15 Rue de la Paix, 75002 Paris"
//                 />
//             </div>

//             <button
//                 //onClick={editingContact ? handleUpdateContact : handleAddContact}
//                 className="button"
//                 style={{
//                     width: '100%',
//                     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                     color: 'white', border: 'none', padding: '16px', borderRadius: '28px',
//                     fontSize: '16px', fontFamily: '"Inter", sans-serif', fontWeight: '500',
//                     cursor: 'pointer', display: 'flex', alignItems: 'center',
//                     justifyContent: 'center', gap: '10px',
//                     boxShadow: '0 8px 24px rgba(102,126,234,0.35)'
//                 }}
//             >
//                 <Save size={20} />
//                 {'Enregistrer les modifications'}
//             </button>
//         </div>
//     </div>

// }



import { redirect, useLoaderData, useNavigate, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { useMobile } from "~/hooks/usehook";
import { Mail, MapPin, Phone, X } from "lucide-react";
import ModificationCard from "./ui/modification-card";
import { contactsStore } from "services/data.service";
export async function loader({ params }: LoaderFunctionArgs) {
    const id = params.id as string;
    const { contact } = await contactsStore.getById(id);
    if (!contact) throw new Response('contact non trouvé', { status: 404 });

    return contact
}
export async function action({ params, request }: ActionFunctionArgs) {
    const formData = await request.formData()
    const id = params.id as string;

    const data = {
        //_id?: string | Types.ObjectId | undefined;
        // userId: Types.ObjectId;
        name: formData.get('username') as string,
        emails: formData.get('email') as string,
        favorite: formData.get('favorite') === 'true',
        color: formData.get('color') as string,
        phones: formData.get('phone') as string,
        addresses: formData.get('address') as string,
        initials: formData.get('initials') as string,
    }
    console.log(data);
    const res = await contactsStore.update(id, data)
    console.log({ res });

    return redirect(`/carnet-adresses/${id}`)
}
export default function Page() {
    const contact = useLoaderData()
    const navigate = useNavigate()
    const { isMobile, mobileView } = useMobile()
    return <>
        {
            (!isMobile || mobileView === 'detail') && (
                <div
                    style={{
                        background: 'white', borderRadius: '30px',
                        padding: isMobile ? '25px 20px' : '50px',
                        boxShadow: '0 10px 50px rgba(0,0,0,0.06)',
                        minHeight: isMobile ? 'auto' : '500px',
                        animation: 'fadeInUp 0.6s ease-out 0.2s both'
                    }}>
                    <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', marginBottom: '30px'
                    }}>
                        <h2 style={{
                            fontSize: isMobile ? '26px' : '32px', fontWeight: '400',
                            margin: 0, fontFamily: '"Instrument Serif", serif', color: '#2d2d2d'
                        }}>
                            {'Modifier le contact'}
                        </h2>
                        <button
                            onClick={() => navigate(-1)}
                            className="button" style={{
                                background: 'transparent', border: 'none', cursor: 'pointer',
                                padding: '8px', color: '#aaa'
                            }}>
                            <X size={24} />
                        </button>
                    </div>
                    <ModificationCard c={contact} />
                </div>
            )
        }

    </>

};
