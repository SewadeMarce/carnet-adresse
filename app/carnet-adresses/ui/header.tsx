import { Plus, Users } from "lucide-react";
import { Link } from "react-router";
import { useMobile } from "~/hooks/usehook";

export default function Header({ totalContacts }: { totalContacts: string }) {
    const { isMobile } = useMobile()
    return <div style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #faf8fc 100%)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: isMobile ? '24px 20px' : '40px 60px',
        borderRadius: '0 0 40px 40px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
        animation: 'fadeInUp 0.6s ease-out'
    }}>
        <div style={{
            maxWidth: '1400px', margin: '0 auto',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px'
        }}>
            <Link to={'/'} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '24px', fontWeight: '400', color: '#2d2d2d' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(102,126,234,0.3)' }}>
                    <Users size={20} color="white" strokeWidth={2} />
                </div>
                ContactFlow
            </Link>
            <div>
                <h1 style={{
                    fontSize: isMobile ? '32px' : '48px', fontWeight: '400',
                    margin: '0 0 6px 0', color: '#2d2d2d', letterSpacing: '-0.02em'
                }}>
                    Mes Contacts
                </h1>
                <p style={{
                    fontFamily: '"Inter", sans-serif', fontSize: '14px',
                    color: '#888', margin: '0', fontWeight: '300'
                }}>
                    {totalContacts}
                </p>
            </div>

            <Link to={'/carnet-adresses/new'}
                // onClick={() => setShowAddModal(true)}
                className="button"
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white', border: 'none',
                    padding: isMobile ? '12px 20px' : '16px 32px',
                    borderRadius: '50px',
                    fontSize: isMobile ? '14px' : '15px',
                    fontFamily: '"Inter", sans-serif', fontWeight: '500',
                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                    gap: '8px', boxShadow: '0 8px 24px rgba(102,126,234,0.35)',
                    whiteSpace: 'nowrap'
                }}
            >
                <Plus size={isMobile ? 18 : 20} />
                {isMobile ? 'Ajouter' : 'Nouveau contact'}
            </Link>
        </div>
    </div>
}