import React, { useState, useEffect } from 'react';
import { Users, Search, Heart, TrendingUp, Star, ArrowRight, Sparkles, Plus, Phone, Mail, Calendar, BarChart3, Zap, Shield, Menu, X } from 'lucide-react';
import { Link, useLoaderData } from 'react-router';
import { statsStores } from 'services/data.service';
const stepNav = [

  {
    link: '#features',
    label: 'Fonctionnalités',
  },
  {
    link: '#testimonials',
    label: 'Témoignages',
  },
  {
    link: '#pricing',
    label: 'Tarifs'
  }
];
export async function loader() {

  const res = await statsStores.getAll();
  return JSON.parse(JSON.stringify(res));
}
const HomePage = () => {
  const loaderData = useLoaderData()
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { icon: Users, value: loaderData.user, label: 'Utilisateurs actifs' },
    { icon: Phone, value: loaderData.contact, label: 'Contacts gérés' },
    { icon: Heart, value: '98%', label: 'Satisfaction' },
    { icon: Zap, value: '24/7', label: 'Disponibilité' }
  ];

  const features = [
    { icon: Search, title: 'Recherche intelligente', description: "Trouvez n'importe quel contact en un instant grâce à notre moteur de recherche avancé.", color: '#667eea' },
    { icon: Heart, title: 'Favoris personnalisés', description: 'Marquez vos contacts importants et accédez-y rapidement depuis votre tableau de bord.', color: '#ff6b9d' },
    { icon: Shield, title: 'Sécurité garantie', description: 'Vos données sont cryptées et protégées avec les plus hauts standards de sécurité.', color: '#4ecdc4' },
    { icon: Calendar, title: 'Synchronisation multi-appareils', description: "Accédez à vos contacts depuis n'importe quel appareil, à tout moment.", color: '#ffd93d' },
    { icon: BarChart3, title: 'Statistiques détaillées', description: "Visualisez l'évolution de votre carnet d'adresses avec des graphiques intuitifs.", color: '#95e1d3' },
    { icon: Zap, title: 'Importation rapide', description: "Importez vos contacts existants en quelques clics depuis n'importe quelle source.", color: '#aa96da' }
  ];

  const testimonials = [
    { name: 'Sophie Martin', role: 'Entrepreneure', content: "Une application magnifique et intuitive. J'ai enfin tous mes contacts organisés !", avatar: 'SM', color: '#ff6b9d' },
    { name: 'Alexandre Dubois', role: 'Directeur Commercial', content: 'La fonction de recherche est incroyablement rapide. Un gain de temps précieux.', avatar: 'AD', color: '#4ecdc4' },
    { name: 'Marie Laurent', role: 'Consultante', content: "Interface élégante et fonctionnalités puissantes. Exactement ce dont j'avais besoin.", avatar: 'ML', color: '#ffd93d' }
  ];

  return (
    <div style={{ fontFamily: '"Instrument Serif", serif', background: 'linear-gradient(135deg, #fdfbfb 0%, #f7f4f9 50%, #fef9f8 100%)', minHeight: '100vh' }}>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="mobile-menu">
          {['Fonctionnalités', 'Témoignages', 'Tarifs'].map((link, i) => (
            <a key={i} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(!menuOpen)} style={{ fontFamily: '"Inter", sans-serif', fontSize: '22px', fontWeight: '600', color: '#2d2d2d', textDecoration: 'none' }}>
              {link}
            </a>
          ))}
          <Link to={'/carnet-adresses'} className="button" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '14px 36px', borderRadius: '30px', fontSize: '17px', fontFamily: '"Inter", sans-serif', fontWeight: '600', cursor: 'pointer' }}>
            Commencer
          </Link>
        </div>
      )}

      {/* Navigation */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: scrollY > 50 ? 'rgba(255,255,255,0.9)' : 'transparent',
        backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none', borderBottom: scrollY > 50 ? '1px solid rgba(0,0,0,0.06)' : 'none', transition: 'all 0.3s ease'
      }} className="nav-padding">
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '24px', fontWeight: '400', color: '#2d2d2d' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(102,126,234,0.3)' }}>
              <Users size={20} color="white" strokeWidth={2} />
            </div>
            ContactFlow
          </div>

          {/* Desktop Nav */}
          <div className="nav-links" style={{ gap: '40px', alignItems: 'center', fontFamily: '"Inter", sans-serif', fontSize: '15px', fontWeight: '500' }}>
            {['#features:Fonctionnalités', '#testimonials:Témoignages', '#pricing:Tarifs'].map((item, i) => {
              const [href, label] = item.split(':');
              return <a key={i} href={href} style={{ color: '#2d2d2d', textDecoration: 'none' }}>{label}</a>;
            })}
            <Link to={'/carnet-adresses'} className="button" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '30px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 8px 24px rgba(102,126,234,0.35)' }}>
              Commencer
            </Link>
          </div>

          {/* Mobile Hamburger */}
          {!menuOpen ? (<button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'transparent', border: '2px solid #f0f0f0', borderRadius: '25px', cursor: 'pointer', color: '#2d2d2d', padding: '4px' }}>
            <Menu size={26} />
          </button>)
            : (<button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'transparent', border: '2px solid #f0f0f0', borderRadius: '25px', cursor: 'pointer', color: '#2d2d2d', padding: '4px' }}>
              <X size={26} />
            </button>)}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden' }} className="hero-padding">
        <div className="floating-shape" style={{ width: '600px', height: '600px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', top: '-200px', right: '-150px', animation: 'float 20s ease-in-out infinite' }}></div>
        <div className="floating-shape" style={{ width: '500px', height: '500px', background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)', bottom: '-150px', left: '-100px', animation: 'floatReverse 15s ease-in-out infinite' }}></div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }} className="hero-grid">
          {/* Left / Main Content */}
          <div style={{ animation: 'slideInLeft 0.8s ease-out' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #f8f9ff 0%, #fff5f8 100%)', border: '2px solid #667eea', borderRadius: '50px', padding: '8px 18px', marginBottom: '24px', fontFamily: '"Inter", sans-serif', fontSize: '13px', fontWeight: '600', color: '#667eea', animation: 'scaleIn 0.6s ease-out 0.3s both' }}>
              ✨ Nouveau: Synchronisation automatique
            </div>

            <h1 className="hero-title" style={{ fontWeight: '400', lineHeight: '1.1', margin: '0 0 24px 0', color: '#2d2d2d', letterSpacing: '-0.03em' }}>
              Gérez vos contacts avec{' '}
              <span className="shimmer-text">style</span>
            </h1>

            <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '18px', color: '#666', lineHeight: '1.7', margin: '0 0 40px 0', fontWeight: '300', maxWidth: '540px' }}>
              L'application de carnet d'adresses la plus élégante et intuitive. Organisez, synchronisez et accédez à vos contacts depuis n'importe où.
            </p>

            <div className="hero-buttons" style={{ display: 'flex', gap: '15px' }}>
              <Link to={'/carnet-adresses'} className="button" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '35px', fontSize: '16px', fontFamily: '"Inter", sans-serif', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 12px 35px rgba(102,126,234,0.4)' }}>
                Commencer gratuitement <ArrowRight size={18} />
              </Link>
              {/* <button className="button" style={{ background: 'white', color: '#2d2d2d', border: '2px solid #e0e0e0', padding: '16px 32px', borderRadius: '35px', fontSize: '16px', fontFamily: '"Inter", sans-serif', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                Voir la démo <Sparkles size={18} />
              </button> */}
            </div>

            {/* <div style={{ display: 'flex', gap: '20px', marginTop: '40px', fontFamily: '"Inter", sans-serif', fontSize: '14px', color: '#888', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="#ffd93d" color="#ffd93d" />)}
                <span style={{ marginLeft: '5px', color: '#2d2d2d', fontWeight: '600' }}>4.9/5</span>
              </div>
              <div>10,000+ utilisateurs satisfaits</div>
            </div> */}
          </div>

          {/* Right Mockup - hidden on mobile */}
          <div className="hero-mockup" style={{ position: 'relative', animation: 'slideInLeft 0.8s ease-out' }}>
            <div style={{ background: 'white', borderRadius: '40px', padding: '35px', boxShadow: '0 40px 100px rgba(0,0,0,0.15)', transform: 'perspective(1000px) rotateY(-5deg)', animation: 'float 6s ease-in-out infinite' }}>
              {[
                { name: 'Sophie Martin', phone: '+33 6 12 34 56 78', color: '#ff6b9d', initials: 'SM' },
                { name: 'Alexandre Dubois', phone: '+33 6 98 76 54 32', color: '#4ecdc4', initials: 'AD' },
                { name: 'Marie Laurent', phone: '+33 7 11 22 33 44', color: '#ffd93d', initials: 'ML' }
              ].map((contact, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '18px', padding: '18px', background: index === 0 ? 'linear-gradient(135deg, #f8f9ff 0%, #fff5f8 100%)' : 'transparent', border: index === 0 ? '2px solid #667eea' : '2px solid transparent', borderRadius: '22px', marginBottom: '12px', animation: `slideInLeft 0.6s ease-out ${index * 0.1}s both` }}>
                  <div style={{ width: '55px', height: '55px', borderRadius: '50%', background: contact.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: '"Inter", sans-serif', fontWeight: '700', fontSize: '17px', flexShrink: 0 }}>{contact.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', fontSize: '17px', color: '#2d2d2d', marginBottom: '4px', fontFamily: '"Instrument Serif", serif' }}>{contact.name}</div>
                    <div style={{ fontSize: '13px', color: '#888', fontFamily: '"Inter", sans-serif' }}>{contact.phone}</div>
                  </div>
                  {index === 0 && <Heart size={18} fill="#ff6b9d" color="#ff6b9d" />}
                </div>
              ))}
            </div>
            <div style={{ position: 'absolute', top: '-25px', right: '-25px', width: '85px', height: '85px', borderRadius: '25px', background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(255,107,157,0.4)', animation: 'pulse 3s ease-in-out infinite' }}>
              <Plus size={35} color="white" strokeWidth={3} />
            </div>
            <div style={{ position: 'absolute', bottom: '-25px', left: '-25px', width: '85px', height: '85px', borderRadius: '25px', background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(78,205,196,0.4)', animation: 'pulse 3s ease-in-out infinite 1.5s' }}>
              <Search size={35} color="white" strokeWidth={3} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ background: 'white', borderRadius: '60px 60px 0 0' }} className="section-padding">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }} className="stats-grid">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="stat-card" style={{ textAlign: 'center', padding: '30px 15px', animationDelay: `${index * 0.1}s` }}>
                <div style={{ width: '65px', height: '65px', borderRadius: '20px', background: 'linear-gradient(135deg, #f8f9ff 0%, #fff5f8 100%)', margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconComponent size={30} color="#667eea" strokeWidth={1.5} />
                </div>
                <div style={{ fontSize: '36px', fontWeight: '400', color: '#2d2d2d', marginBottom: '8px' }}>{stat.value}</div>
                <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', color: '#888', fontWeight: '500' }}>{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ background: 'white' }} className="section-padding">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 className="section-title" style={{ fontWeight: '400', margin: '0 0 16px 0', color: '#2d2d2d', letterSpacing: '-0.02em' }}>
              Des fonctionnalités <span className="shimmer-text">puissantes</span>
            </h2>
            <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '18px', color: '#666', fontWeight: '300', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              Tout ce dont vous avez besoin pour gérer vos contacts de manière efficace et élégante
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="feature-card" style={{ background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)', borderRadius: '30px', padding: '35px', border: '1px solid #e8e8e8', animation: `slideInUp 0.6s ease-out ${index * 0.1}s both` }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: `${feature.color}18`, marginBottom: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconComponent size={28} color={feature.color} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: '400', margin: '0 0 12px 0', color: '#2d2d2d' }}>{feature.title}</h3>
                  <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '15px', color: '#666', lineHeight: '1.7', margin: '0', fontWeight: '300' }}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" style={{ background: 'linear-gradient(135deg, #fdfbfb 0%, #f7f4f9 50%, #fef9f8 100%)' }} className="section-padding">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 className="section-title" style={{ fontWeight: '400', margin: '0 0 16px 0', color: '#2d2d2d', letterSpacing: '-0.02em' }}>
              Ils nous font <span className="shimmer-text">confiance</span>
            </h2>
            <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '18px', color: '#666', fontWeight: '300' }}>Rejoignez des milliers d'utilisateurs satisfaits</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card" style={{ background: 'white', borderRadius: '30px', padding: '35px', boxShadow: '0 10px 50px rgba(0,0,0,0.06)', animation: `slideInUp 0.6s ease-out ${index * 0.1}s both` }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#ffd93d" color="#ffd93d" />)}
                </div>
                <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#2d2d2d', lineHeight: '1.7', margin: '0 0 25px 0', fontWeight: '400' }}>"{testimonial.content}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: testimonial.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: '"Inter", sans-serif', fontWeight: '700', fontSize: '15px', flexShrink: 0 }}>{testimonial.avatar}</div>
                  <div>
                    <div style={{ fontWeight: '500', fontSize: '16px', color: '#2d2d2d', marginBottom: '2px' }}>{testimonial.name}</div>
                    <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '13px', color: '#888' }}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" style={{ background: 'white', position: 'relative', overflow: 'hidden' }} className="section-padding">
        <div className="floating-shape" style={{ width: '500px', height: '500px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', top: '-150px', right: '-80px', animation: 'rotate 30s linear infinite' }}></div>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 className="cta-title" style={{ fontWeight: '400', margin: '0 0 24px 0', color: '#2d2d2d', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
            Commencez gratuitement dès aujourd'hui. Aucune carte de crédit requise.

          </h2>
          <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '18px', color: '#666', margin: '0 0 40px 0', fontWeight: '300', lineHeight: '1.7' }}>
            Prêt à organiser vos contacts ?
          </p>
          <Link to={'/carnet-adresses'} className="button" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '18px 44px', borderRadius: '40px', fontSize: '17px', fontFamily: '"Inter", sans-serif', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '12px', boxShadow: '0 15px 40px rgba(102,126,234,0.4)' }}>
            Commencer maintenant <ArrowRight size={22} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#2d2d2d', color: 'white', borderRadius: '50px 50px 0 0' }} className="footer-padding">
             <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
               <div className="footer-grid" style={{ marginBottom: '50px' }}>
                 <div style={{ gridColumn: '1 / -1' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>
                     <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <Users size={20} color="white" strokeWidth={2} />
                     </div>
                     ContactFlow
                   </div>
                   <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', color: '#aaa', lineHeight: '1.7', fontWeight: '300', maxWidth: '320px' }}>
                     L'application de carnet d'adresses la plus élégante et intuitive pour gérer tous vos contacts.
                   </p>
                 </div>
     
                 {[
                   { title: 'Produit', links: ['Fonctionnalités', 'Tarifs', 'Démo'] },
                   { title: 'Entreprise', links: ['À propos', 'Blog', 'Carrières'] },
                   { title: 'Support', links: ['Aide', 'Contact', 'Confidentialité'] }
                 ].map((col, i) => (
                   <div key={i}>
                     <h4 style={{ fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: '600', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{col.title}</h4>
                     <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', fontWeight: '300', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                       {col.links.map((link, j) => (
                         <a key={j} href="#" style={{ color: '#aaa', textDecoration: 'none' }}>{link}</a>
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
     
               <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', textAlign: 'center', fontFamily: '"Inter", sans-serif', fontSize: '13px', color: '#888', fontWeight: '300' }}>
                 © 2026 ContactFlow. Tous droits réservés.
               </div>
             </div>
           </footer>
    </div>
  );
};

export default HomePage;