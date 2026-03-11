import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { Form, useActionData, useNavigation, useNavigate, type ActionFunctionArgs } from 'react-router';
import { redirect } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
export async function loader({ request, context }: LoaderFunctionArgs) {

    const user = context.user;
    if (user) {
        throw redirect("/carnet-adresses");
    }
  }
const step = ['Connexion', 'Inscription'];
const socialBtn = [
  {
    label: 'Google',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    )
  },
  {
    label: 'Apple',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.957 4.45z" />
      </svg>
    )
  }
];

export async function clientAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const isLogin = formData.get('condition') === 'true';
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const username = formData.get('username') as string;
   try {
     if (isLogin) {
       const response = await fetch('/api/auth/login', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         credentials: 'include',
         body: JSON.stringify({ email, password }),
       });

       if (!response.ok) {
         const error = await response.json();
         return { error: error.error || 'Erreur de connexion' };
       }

       const userData = await response.json();
       return { success: true, user: userData, redirectTo: '/carnet-adresses' };
     } else {
       const response = await fetch('/api/auth/register', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         credentials: 'include',
         body: JSON.stringify({ username, email, password }),
       });

       if (!response.ok) {
         const error = await response.json();
         return { error: error.error || 'Erreur d\'inscription' };
       }

       const userData = await response.json();
       return { success: true, user: userData, redirectTo: '/carnet-adresses' };
     }
   } catch (error) {
     console.error('Auth error:', error);
     return { error: 'Erreur réseau. Veuillez réessayer.' };
   }
}

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [focusedField, setFocusedField] = useState<null | 'name' | 'email' | 'password'>(null);
  const [isMobile, setIsMobile] = useState(false);

  const actionData = useActionData<typeof clientAction>();
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (actionData?.success && actionData.user) {
      // Store user in localStorage and redirect
      localStorage.setItem('user', JSON.stringify(actionData.user));
      navigate(actionData.redirectTo || '/carnet-adresses', { replace: true });
    }
  }, [actionData, navigate]);

  const isSubmitting = navigation.state === 'submitting';

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: isMobile ? 'column' : 'row', fontFamily: '"Instrument Serif", serif', background: 'linear-gradient(135deg, #fdfbfb 0%, #f7f4f9 50%, #fef9f8 100%)', position: 'relative', overflow: 'hidden'
    }}>


      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>
      <div className="floating-shape shape-3"></div>

      {/* Left Panel - shown on desktop, condensed header on mobile */}
      {isMobile ? (
        /* Mobile top header strip */
        <div style={{
          padding: '40px 24px 30px', textAlign: 'center', position: 'relative', zIndex: 1, animation: 'slideInUp 0.7s ease-out'
        }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 40px rgba(102,126,234,0.4)', animation: 'float 6s ease-in-out infinite'
          }}>
            <Sparkles size={36} color="white" strokeWidth={1.5} />
          </div>
          <h1 style={{
            fontSize: '32px', fontWeight: '400', margin: '0 0 10px 0',
            color: '#2d2d2d', lineHeight: '1.2', letterSpacing: '-0.02em'
          }}>
            Gérez vos contacts{' '}
            <span className="shimmer-text">avec élégance</span>
          </h1>
          <p style={{
            fontFamily: '"Inter", sans-serif', fontSize: '15px', color: '#666',
            lineHeight: '1.7', fontWeight: '300', margin: '0', maxWidth: '420px',
            marginLeft: 'auto', marginRight: 'auto'
          }}>
            Une expérience moderne et intuitive pour organiser tous vos contacts.
          </p>
        </div>
      ) : (
        /* Desktop left panel */
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center',
          padding: '80px', position: 'relative', zIndex: 1,
          animation: 'slideInLeft 0.8s ease-out'
        }}>
          <div style={{ maxWidth: '500px', textAlign: 'center' }}>
            <div style={{
              width: '120px', height: '120px', borderRadius: '40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              margin: '0 auto 40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 20px 60px rgba(102,126,234,0.4)',
              animation: 'float 6s ease-in-out infinite'
            }}>
              <Sparkles size={60} color="white" strokeWidth={1.5} />
            </div>
            <h1 style={{
              fontSize: '56px', fontWeight: '400', margin: '0 0 20px 0',
              color: '#2d2d2d', lineHeight: '1.2', letterSpacing: '-0.02em'
            }}>
              Gérez vos contacts{' '}
              <span className="shimmer-text">avec élégance</span>
            </h1>
            <p style={{
              fontFamily: '"Inter", sans-serif', fontSize: '18px', color: '#666',
              lineHeight: '1.8', fontWeight: '300', margin: '0'
            }}>
              Une expérience moderne et intuitive pour organiser tous vos contacts professionnels et personnels en un seul endroit.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '60px', opacity: 0.6 }}>
              {[
                'linear-gradient(135deg, #FF6B9D 0%, #ff8fab 100%)',
                'linear-gradient(135deg, #4ECDC4 0%, #44a08d 100%)',
                'linear-gradient(135deg, #FFD93D 0%, #ffc107 100%)'
              ].map((bg, i) => (
                <div key={i} style={{
                  width: '60px', height: '60px', borderRadius: '50%', background: bg,
                  animation: `float 4s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`
                }}></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Right Panel - Auth Form */}
      <div style={{
        flex: isMobile ? 'none' : 1, display: 'flex', flexDirection: 'column', justifyContent: isMobile ? 'flex-start' : 'center', alignItems: 'center', padding: isMobile ? '0 16px 40px' : '80px', position: 'relative', zIndex: 1
      }}>
        <div style={{
          width: '100%', maxWidth: '480px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', borderRadius: isMobile ? '36px' : '50px', padding: isMobile ? '36px 24px' : '60px', boxShadow: '0 30px 90px rgba(0,0,0,0.10)', border: '1px solid rgba(255,255,255,0.8)', animation: isMobile ? 'slideInUp 0.8s ease-out 0.2s both' : 'slideInRight 0.8s ease-out'
        }}>
          {/* Error Message */}
          {actionData?.error && (
            <div style={{
              background: '#fee',
              border: '1px solid #fcc',
              color: '#c33',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {actionData.error}
            </div>
          )}

          {/* Toggle Buttons */}
          <div style={{ display: 'flex', gap: '24px', marginBottom: '40px', justifyContent: 'center' }}>
            {step.map((label, i) => {
              const active = i === 0 ? isLogin : !isLogin;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setIsLogin(i === 0)}
                  className={`toggle-button ${active ? 'active' : ''}`}
                  style={{
                    background: 'transparent', border: 'none', fontSize: isMobile ? '20px' : '24px', fontFamily: '"Instrument Serif", serif', color: active ? '#2d2d2d' : '#aaa', cursor: 'pointer', padding: '10px 0', fontWeight: '400', transition: 'all 0.3s ease'
                  }}
                >{label}</button>
              );
            })}
          </div>

          <Form method="post" >
            {/* Name Field */}
            {!isLogin && (
              <div className="input-container" style={{ marginBottom: '20px', animation: 'scaleIn 0.3s ease-out' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: '600', color: '#2d2d2d', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Nom complet</label>
                <div style={{ position: 'relative' }}>
                  <div className="icon-wrapper" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: focusedField === 'name' ? '#667eea' : '#aaa', zIndex: 1 }}>
                    <User size={18} />
                  </div>
                  <input
                    name="username"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="input-field"
                    style={{ width: '100%', padding: '16px 18px 16px 50px', border: `2px solid ${focusedField === 'name' ? '#667eea' : '#f0f0f0'}`, borderRadius: '22px', fontSize: '15px', fontFamily: '"Inter", sans-serif', outline: 'none', background: 'white' }}
                    placeholder="Votre nom"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="input-container" style={{ marginBottom: '20px', animation: `scaleIn 0.3s ease-out ${!isLogin ? '0.1s' : '0s'} both` }}>
              <label style={{ display: 'block', marginBottom: '10px', fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: '600', color: '#2d2d2d', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <div className="icon-wrapper" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: focusedField === 'email' ? '#667eea' : '#aaa', zIndex: 1 }}>
                  <Mail size={18} />
                </div>
                <input
                  name="email"
                  type="email" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                  className="input-field"
                  style={{ width: '100%', padding: '16px 18px 16px 50px', border: `2px solid ${focusedField === 'email' ? '#667eea' : '#f0f0f0'}`, borderRadius: '22px', fontSize: '15px', fontFamily: '"Inter", sans-serif', outline: 'none', background: 'white' }}
                  placeholder="votre@email.fr"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="input-container" style={{ marginBottom: '28px', animation: `scaleIn 0.3s ease-out ${!isLogin ? '0.2s' : '0.1s'} both` }}>
              <label style={{ display: 'block', marginBottom: '10px', fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: '600', color: '#2d2d2d', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Mot de passe</label>
              <div style={{ position: 'relative' }}>
                <div className="icon-wrapper" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: focusedField === 'password' ? '#667eea' : '#aaa', zIndex: 1 }}>
                  <Lock size={18} />
                </div>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'} value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)}
                  className="input-field"
                  style={{ width: '100%', padding: '16px 50px 16px 50px', border: `2px solid ${focusedField === 'password' ? '#667eea' : '#f0f0f0'}`, borderRadius: '22px', fontSize: '15px', fontFamily: '"Inter", sans-serif', outline: 'none', background: 'white' }}
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#aaa', padding: '5px', display: 'flex', alignItems: 'center', transition: 'color 0.3s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#aaa'}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            {isLogin && (
              <div style={{ marginBottom: '28px', textAlign: 'right', animation: 'fadeIn 0.3s ease-out 0.2s both' }}>
                <button type="button" style={{ background: 'transparent', border: 'none', color: '#667eea', fontFamily: '"Inter", sans-serif', fontSize: '14px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
                  Mot de passe oublié ?
                </button>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={isSubmitting} className="button" style={{ width: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '18px', borderRadius: '28px', fontSize: '16px', fontFamily: '"Inter", sans-serif', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 12px 35px rgba(102,126,234,0.4)', marginBottom: '24px', animation: 'scaleIn 0.3s ease-out 0.3s both', opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? 'Chargement...' : (isLogin ? 'Se connecter' : 'Créer mon compte')}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', animation: 'fadeIn 0.3s ease-out 0.4s both' }}>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #e0e0e0, transparent)' }}></div>
              <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '12px', color: '#aaa', fontWeight: '500' }}>OU</span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #e0e0e0, transparent)' }}></div>
            </div>

            {/* Social Buttons */}
            <div style={{ display: 'flex', gap: '12px', animation: 'fadeIn 0.3s ease-out 0.5s both' }}>
              {socialBtn.map(({ label, icon }) => (
                <button key={label} type="button" className="button" style={{
                  flex: 1, background: 'white', border: '2px solid #f0f0f0',
                  padding: '14px', borderRadius: '22px', fontSize: '14px',
                  fontFamily: '"Inter", sans-serif', fontWeight: '500', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '8px', color: '#2d2d2d', transition: 'all 0.3s ease'
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#667eea'; e.currentTarget.style.background = '#f8f9ff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.background = 'white'; }}>
                  {icon} {label}
                </button>
              ))}
            </div>
            <input type="hidden" name="condition" value={`${isLogin}`} />
          </Form>

          <p style={{ textAlign: 'center', marginTop: '28px', fontFamily: '"Inter", sans-serif', fontSize: '13px', color: '#888', lineHeight: '1.6', animation: 'fadeIn 0.3s ease-out 0.6s both' }}>
            {isLogin ? "Vous n'avez pas de compte ? " : "Vous avez déjà un compte ? "}
            <button style={{ background: 'transparent', border: 'none', color: '#667eea', cursor: 'pointer', fontWeight: '600', fontSize: '13px', fontFamily: '"Inter", sans-serif', transition: 'all 0.3s ease' }}
              onClick={() => setIsLogin(!isLogin)}
              onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
              {isLogin ? 'Créez-en un' : 'Connectez-vous'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;


//   return (
//     <div style={{
//       minHeight: '100vh', display: 'flex', flexDirection: isMobile ? 'column' : 'row', fontFamily: '"Instrument Serif", serif', background: 'linear-gradient(135deg, #fdfbfb 0%, #f7f4f9 50%, #fef9f8 100%)', position: 'relative', overflow: 'hidden'
//     }}>


//       <div className="floating-shape shape-1"></div>
//       <div className="floating-shape shape-2"></div>
//       <div className="floating-shape shape-3"></div>

//       {/* Left Panel - shown on desktop, condensed header on mobile */}
//       {isMobile ? (
//         /* Mobile top header strip */
//         <div style={{
//           padding: '40px 24px 30px', textAlign: 'center', position: 'relative', zIndex: 1, animation: 'slideInUp 0.7s ease-out'
//         }}>
//           <div style={{
//             width: '72px', height: '72px', borderRadius: '24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 40px rgba(102,126,234,0.4)', animation: 'float 6s ease-in-out infinite'
//           }}>
//             <Sparkles size={36} color="white" strokeWidth={1.5} />
//           </div>
//           <h1 style={{
//             fontSize: '32px', fontWeight: '400', margin: '0 0 10px 0',
//             color: '#2d2d2d', lineHeight: '1.2', letterSpacing: '-0.02em'
//           }}>
//             Gérez vos contacts{' '}
//             <span className="shimmer-text">avec élégance</span>
//           </h1>
//           <p style={{
//             fontFamily: '"Inter", sans-serif', fontSize: '15px', color: '#666',
//             lineHeight: '1.7', fontWeight: '300', margin: '0', maxWidth: '420px',
//             marginLeft: 'auto', marginRight: 'auto'
//           }}>
//             Une expérience moderne et intuitive pour organiser tous vos contacts.
//           </p>
//         </div>
//       ) : (
//         /* Desktop left panel */
//         <div style={{
//           flex: 1, display: 'flex', flexDirection: 'column',
//           justifyContent: 'center', alignItems: 'center',
//           padding: '80px', position: 'relative', zIndex: 1,
//           animation: 'slideInLeft 0.8s ease-out'
//         }}>
//           <div style={{ maxWidth: '500px', textAlign: 'center' }}>
//             <div style={{
//               width: '120px', height: '120px', borderRadius: '40px',
//               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//               margin: '0 auto 40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
//               boxShadow: '0 20px 60px rgba(102,126,234,0.4)',
//               animation: 'float 6s ease-in-out infinite'
//             }}>
//               <Sparkles size={60} color="white" strokeWidth={1.5} />
//             </div>
//             <h1 style={{
//               fontSize: '56px', fontWeight: '400', margin: '0 0 20px 0',
//               color: '#2d2d2d', lineHeight: '1.2', letterSpacing: '-0.02em'
//             }}>
//               Gérez vos contacts{' '}
//               <span className="shimmer-text">avec élégance</span>
//             </h1>
//             <p style={{
//               fontFamily: '"Inter", sans-serif', fontSize: '18px', color: '#666',
//               lineHeight: '1.8', fontWeight: '300', margin: '0'
//             }}>
//               Une expérience moderne et intuitive pour organiser tous vos contacts professionnels et personnels en un seul endroit.
//             </p>
//             <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '60px', opacity: 0.6 }}>
//               {[
//                 'linear-gradient(135deg, #FF6B9D 0%, #ff8fab 100%)',
//                 'linear-gradient(135deg, #4ECDC4 0%, #44a08d 100%)',
//                 'linear-gradient(135deg, #FFD93D 0%, #ffc107 100%)'
//               ].map((bg, i) => (
//                 <div key={i} style={{
//                   width: '60px', height: '60px', borderRadius: '50%', background: bg,
//                   animation: `float 4s ease-in-out infinite`,
//                   animationDelay: `${i * 0.5}s`
//                 }}></div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Right Panel - Auth Form */}
//       <div style={{
//         flex: isMobile ? 'none' : 1, display: 'flex', flexDirection: 'column', justifyContent: isMobile ? 'flex-start' : 'center', alignItems: 'center', padding: isMobile ? '0 16px 40px' : '80px', position: 'relative', zIndex: 1
//       }}>
//         <div style={{
//           width: '100%', maxWidth: '480px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', borderRadius: isMobile ? '36px' : '50px', padding: isMobile ? '36px 24px' : '60px', boxShadow: '0 30px 90px rgba(0,0,0,0.10)', border: '1px solid rgba(255,255,255,0.8)', animation: isMobile ? 'slideInUp 0.8s ease-out 0.2s both' : 'slideInRight 0.8s ease-out'
//         }}>
//           {/* Toggle Buttons */}
//           <div style={{ display: 'flex', gap: '24px', marginBottom: '40px', justifyContent: 'center' }}>
//             {step.map((label, i) => {
//               const active = i === 0 ? isLogin : !isLogin;
//               return (
//                 <button
//                   key={label}
//                   onClick={() => setIsLogin(i === 0)}
//                   className={`toggle-button ${active ? 'active' : ''}`}
//                   style={{
//                     background: 'transparent', border: 'none', fontSize: isMobile ? '20px' : '24px', fontFamily: '"Instrument Serif", serif', color: active ? '#2d2d2d' : '#aaa', cursor: 'pointer', padding: '10px 0', fontWeight: '400', transition: 'all 0.3s ease'
//                   }}
//                 >{label}</button>
//               );
//             })}
//           </div>

//           <Form method="post" >
//             {/* Name Field */}
//             {!isLogin && (
//               <div className="input-container" style={{ marginBottom: '20px', animation: 'scaleIn 0.3s ease-out' }}>
//                 <label style={{ display: 'block', marginBottom: '10px', fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: '600', color: '#2d2d2d', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Nom complet</label>
//                 <div style={{ position: 'relative' }}>
//                   <div className="icon-wrapper" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: focusedField === 'name' ? '#667eea' : '#aaa', zIndex: 1 }}>
//                     <User size={18} />
//                   </div>
//                   <input
//                     name="username"
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     onFocus={() => setFocusedField('name')}
//                     onBlur={() => setFocusedField(null)}
//                     className="input-field"
//                     style={{ width: '100%', padding: '16px 18px 16px 50px', border: `2px solid ${focusedField === 'name' ? '#667eea' : '#f0f0f0'}`, borderRadius: '22px', fontSize: '15px', fontFamily: '"Inter", sans-serif', outline: 'none', background: 'white' }}
//                     placeholder="Votre nom"
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Email Field */}
//             <div className="input-container" style={{ marginBottom: '20px', animation: `scaleIn 0.3s ease-out ${!isLogin ? '0.1s' : '0s'} both` }}>
//               <label style={{ display: 'block', marginBottom: '10px', fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: '600', color: '#2d2d2d', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</label>
//               <div style={{ position: 'relative' }}>
//                 <div className="icon-wrapper" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: focusedField === 'email' ? '#667eea' : '#aaa', zIndex: 1 }}>
//                   <Mail size={18} />
//                 </div>
//                 <input
//                   name="email"
//                   type="email" value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
//                   className="input-field"
//                   style={{ width: '100%', padding: '16px 18px 16px 50px', border: `2px solid ${focusedField === 'email' ? '#667eea' : '#f0f0f0'}`, borderRadius: '22px', fontSize: '15px', fontFamily: '"Inter", sans-serif', outline: 'none', background: 'white' }}
//                   placeholder="votre@email.fr"
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="input-container" style={{ marginBottom: '28px', animation: `scaleIn 0.3s ease-out ${!isLogin ? '0.2s' : '0.1s'} both` }}>
//               <label style={{ display: 'block', marginBottom: '10px', fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: '600', color: '#2d2d2d', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Mot de passe</label>
//               <div style={{ position: 'relative' }}>
//                 <div className="icon-wrapper" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: focusedField === 'password' ? '#667eea' : '#aaa', zIndex: 1 }}>
//                   <Lock size={18} />
//                 </div>
//                 <input
//                   name="password"
//                   type={showPassword ? 'text' : 'password'} value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                   onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)}
//                   className="input-field"
//                   style={{ width: '100%', padding: '16px 50px 16px 50px', border: `2px solid ${focusedField === 'password' ? '#667eea' : '#f0f0f0'}`, borderRadius: '22px', fontSize: '15px', fontFamily: '"Inter", sans-serif', outline: 'none', background: 'white' }}
//                   placeholder="••••••••"
//                 />
//                 <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#aaa', padding: '5px', display: 'flex', alignItems: 'center', transition: 'color 0.3s ease' }}
//                   onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
//                   onMouseLeave={(e) => e.currentTarget.style.color = '#aaa'}>
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             {/* Forgot Password */}
//             {isLogin && (
//               <div style={{ marginBottom: '28px', textAlign: 'right', animation: 'fadeIn 0.3s ease-out 0.2s both' }}>
//                 <button type="button" style={{ background: 'transparent', border: 'none', color: '#667eea', fontFamily: '"Inter", sans-serif', fontSize: '14px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.3s ease' }}
//                   onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
//                   onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
//                   Mot de passe oublié ?
//                 </button>
//               </div>
//             )}

//             {/* Submit */}
//             <button type="submit" className="button" style={{ width: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '18px', borderRadius: '28px', fontSize: '16px', fontFamily: '"Inter", sans-serif', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 12px 35px rgba(102,126,234,0.4)', marginBottom: '24px', animation: 'scaleIn 0.3s ease-out 0.3s both' }}>
//               {isLogin ? 'Se connecter' : 'Créer mon compte'}
//               <ArrowRight size={18} />
//             </button>

//             {/* Divider */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', animation: 'fadeIn 0.3s ease-out 0.4s both' }}>
//               <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #e0e0e0, transparent)' }}></div>
//               <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '12px', color: '#aaa', fontWeight: '500' }}>OU</span>
//               <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #e0e0e0, transparent)' }}></div>
//             </div>

//             {/* Social Buttons */}
//             <div style={{ display: 'flex', gap: '12px', animation: 'fadeIn 0.3s ease-out 0.5s both' }}>
//               {socialBtn.map(({ label, icon }) => (
//                 <button key={label} type="button" className="button" style={{
//                   flex: 1, background: 'white', border: '2px solid #f0f0f0',
//                   padding: '14px', borderRadius: '22px', fontSize: '14px',
//                   fontFamily: '"Inter", sans-serif', fontWeight: '500', cursor: 'pointer',
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   gap: '8px', color: '#2d2d2d', transition: 'all 0.3s ease'
//                 }}
//                   onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#667eea'; e.currentTarget.style.background = '#f8f9ff'; }}
//                   onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.background = 'white'; }}>
//                   {icon} {label}
//                 </button>
//               ))}
//             </div>
//             <input type="hidden" name="condition" value={`${isLogin}`} />
//           </Form>

//           <p style={{ textAlign: 'center', marginTop: '28px', fontFamily: '"Inter", sans-serif', fontSize: '13px', color: '#888', lineHeight: '1.6', animation: 'fadeIn 0.3s ease-out 0.6s both' }}>
//             {isLogin ? "Vous n'avez pas de compte ? " : "Vous avez déjà un compte ? "}
//             <button style={{ background: 'transparent', border: 'none', color: '#667eea', cursor: 'pointer', fontWeight: '600', fontSize: '13px', fontFamily: '"Inter", sans-serif', transition: 'all 0.3s ease' }}
//               onClick={() => setIsLogin(!isLogin)}
//               onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
//               onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
//               {isLogin ? 'Créez-en un' : 'Connectez-vous'}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;