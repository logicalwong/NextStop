import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Compass, MessageCircle, User } from 'lucide-react'
import { supabase } from './supabase'

// --- 1. The Discovery Swipe Deck Screen ---
const DiscoverScreen = ({ lang }) => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase.from('profiles').select('*');
      if (data) setProfiles(data);
      if (error) console.error("Error fetching profiles:", error);
    };
    fetchProfiles();
  }, []);

  const handleSwipe = () => setCurrentIndex((prev) => prev + 1);

  if (profiles.length === 0) return <div className="flex h-full items-center justify-center p-6 text-textMuted font-medium">Loading profiles...</div>;
  
  if (currentIndex >= profiles.length) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center shadow-md mb-4 border border-passGrey"><span className="text-4xl">🚇</span></div>
        <h2 className="text-2xl font-bold text-primary mb-2">{lang === 'EN' ? "End of the line!" : "你已經到達終點站！"}</h2>
        <p className="text-textMuted">{lang === 'EN' ? "Check back later for new commuters." : "請稍後再來查看新用戶。"}</p>
      </div>
    );
  }

  const profile = profiles[currentIndex];
  // Use a fallback image if the user doesn't have one in the database yet
  const displayImage = profile.image_url || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="flex flex-col h-full items-center justify-center p-4 pt-16 pb-6">
      <div className="w-full max-w-sm aspect-[3/4] bg-surface rounded-[24px] shadow-xl relative overflow-hidden border border-passGrey/50 transition-transform duration-300">
        <img src={displayImage} alt="Profile" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-textMain/95 via-textMain/30 to-transparent"></div>
        <div className="absolute bottom-0 w-full p-6 text-surface">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-3xl font-bold tracking-tight">{profile.name}, {profile.age}</h2>
            {profile.is_verified && <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">{lang === 'EN' ? 'Verified 💼' : '已認證 💼'}</span>}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-surface/20 backdrop-blur-md rounded-full text-xs border border-surface/30">💼 {profile.industry}</span>
            <span className="px-3 py-1 bg-[#E0F0FF]/95 text-[#0055A5] rounded-full text-xs font-semibold shadow-sm">🚇 {lang === 'EN' ? 'Work: ' : '工作: '}{profile.mtr_line}</span>
          </div>
          <p className="text-sm opacity-95 leading-relaxed">{profile.bio}</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-8 mt-6">
        <button onClick={handleSwipe} className="w-16 h-16 bg-surface rounded-full shadow-md flex items-center justify-center text-textMuted hover:text-textMain border border-passGrey active:scale-95"><span className="text-2xl font-bold">✕</span></button>
        <button onClick={handleSwipe} className="w-16 h-16 bg-surface rounded-full shadow-md flex items-center justify-center text-accent hover:bg-accent/10 border border-passGrey active:scale-95"><span className="text-3xl">♥</span></button>
      </div>
    </div>
  )
}

// --- 2. Dummy Screens ---
const MatchesScreen = () => <div className="p-6 text-center text-textMain mt-20"><h2>Matches & Chats Go Here</h2></div>
const ProfileScreen = () => (
  <div className="flex flex-col items-center justify-center h-full p-6 text-center mt-10">
    <h2 className="text-textMain font-bold text-xl mb-6">Profile Settings</h2>
    <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="px-8 py-3 bg-surface text-accent border border-accent rounded-full font-bold shadow-sm hover:bg-accent hover:text-white transition">Log Out</button>
  </div>
)

// --- 3. App Shell & Layout ---
function Layout({ lang, setLang }) {
  const location = useLocation();
  return (
    <div className="flex flex-col h-screen bg-background relative">
      <header className="absolute top-0 w-full bg-background/80 backdrop-blur-lg z-50 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary tracking-tight">NextStop <span className="font-normal text-lg">下一站</span></h1>
        <button onClick={() => setLang(lang === 'EN' ? 'ZH' : 'EN')} className="px-3 py-1 bg-surface shadow-sm rounded-full text-sm font-medium text-textMain border border-passGrey">{lang === 'EN' ? '繁中' : 'EN'}</button>
      </header>
      <main className="flex-1 overflow-y-auto pb-20">
        <Routes>
          <Route path="/" element={<DiscoverScreen lang={lang} />} />
          <Route path="/matches" element={<MatchesScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </main>
      <nav className="absolute bottom-0 w-full bg-surface border-t border-passGrey px-6 py-4 flex justify-between items-center rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50">
        <Link to="/" className={`flex flex-col items-center gap-1 ${location.pathname === '/' ? 'text-primary' : 'text-textMuted'}`}><Compass size={24} strokeWidth={location.pathname === '/' ? 2.5 : 2} /><span className="text-[10px] font-medium">{lang === 'EN' ? 'Discover' : '探索'}</span></Link>
        <Link to="/matches" className={`flex flex-col items-center gap-1 ${location.pathname === '/matches' ? 'text-primary' : 'text-textMuted'}`}><div className="relative"><MessageCircle size={24} strokeWidth={location.pathname === '/matches' ? 2.5 : 2} /><span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-surface"></span></div><span className="text-[10px] font-medium">{lang === 'EN' ? 'Matches' : '配對'}</span></Link>
        <Link to="/profile" className={`flex flex-col items-center gap-1 ${location.pathname === '/profile' ? 'text-primary' : 'text-textMuted'}`}><User size={24} strokeWidth={location.pathname === '/profile' ? 2.5 : 2} /><span className="text-[10px] font-medium">{lang === 'EN' ? 'Profile' : '個人'}</span></Link>
      </nav>
    </div>
  );
}

// --- 4. Onboarding Screen ---
const OnboardingScreen = ({ session, onComplete, lang }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [industry, setIndustry] = useState('');
  const [mtr, setMtr] = useState('');
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Explicitly mapping the frontend inputs to the Supabase database columns
    const { error } = await supabase.from('profiles').insert([
      { 
        id: session.user.id, 
        name: name, 
        age: parseInt(age) || 25, 
        industry: industry, 
        mtr_line: mtr, 
        bio: bio,
        is_verified: true
      }
    ]);
    
    setSaving(false);
    
    if (error) {
      alert(`Database Error: ${error.message}`);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background items-center p-6 pt-12 overflow-y-auto">
      <h1 className="text-3xl font-bold text-primary mb-2">{lang === 'EN' ? 'Create Profile' : '建立個人檔案'}</h1>
      <p className="text-textMuted mb-8 text-center">{lang === 'EN' ? '60-second onboarding to start swiping.' : '只需 60 秒，立即開始配對。'}</p>
      
      <div className="w-full max-w-sm space-y-4 pb-10">
        <input type="text" placeholder={lang === 'EN' ? 'First Name' : '名字'} value={name} onChange={e=>setName(e.target.value)} className="w-full p-4 rounded-2xl border border-passGrey bg-surface focus:outline-none focus:border-primary shadow-sm" />
        <input type="number" placeholder={lang === 'EN' ? 'Age' : '年齡'} value={age} onChange={e=>setAge(e.target.value)} className="w-full p-4 rounded-2xl border border-passGrey bg-surface focus:outline-none focus:border-primary shadow-sm" />
        <input type="text" placeholder={lang === 'EN' ? 'Industry (e.g. Finance, Tech)' : '行業 (如：金融、科技)'} value={industry} onChange={e=>setIndustry(e.target.value)} className="w-full p-4 rounded-2xl border border-passGrey bg-surface focus:outline-none focus:border-primary shadow-sm" />
        <input type="text" placeholder={lang === 'EN' ? 'Work MTR Station' : '工作港鐵站'} value={mtr} onChange={e=>setMtr(e.target.value)} className="w-full p-4 rounded-2xl border border-passGrey bg-surface focus:outline-none focus:border-primary shadow-sm" />
        <textarea placeholder={lang === 'EN' ? 'Short Bio...' : '簡介...'} value={bio} onChange={e=>setBio(e.target.value)} className="w-full p-4 rounded-2xl border border-passGrey bg-surface focus:outline-none focus:border-primary shadow-sm h-28 resize-none" />
        
        <button onClick={handleSave} disabled={saving || !name} className="w-full bg-primary text-white p-4 rounded-2xl font-bold hover:bg-primary/90 transition shadow-md mt-4">
          {saving ? 'Saving...' : (lang === 'EN' ? 'Complete Profile' : '完成設定')}
        </button>
      </div>
    </div>
  );
}

// --- 5. Auth Screen ---
const AuthScreen = ({ lang, setLang }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = async (isSignUp) => {
    setLoading(true);
    setError(null);
    
    if (isSignUp) {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) {
        setError(signUpError.message);
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) setError(signInError.message);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-background items-center justify-center p-6 relative">
      <div className="absolute top-6 right-6">
        <button onClick={() => setLang(lang === 'EN' ? 'ZH' : 'EN')} className="px-3 py-1 bg-surface shadow-sm rounded-full text-sm font-medium text-textMain border border-passGrey">
          {lang === 'EN' ? '繁中' : 'EN'}
        </button>
      </div>
      <h1 className="text-4xl font-bold text-primary mb-2 tracking-tight">NextStop <span className="font-normal text-3xl">下一站</span></h1>
      <p className="text-textMuted mb-10 text-center font-medium">{lang === 'EN' ? 'Skip the small talk. Meet halfway.' : '跳過客套，在中間點相遇。'}</p>
      
      <div className="w-full max-w-sm space-y-4">
        <input type="email" placeholder={lang === 'EN' ? 'Work or University Email' : '工作或大學電郵'} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 rounded-2xl border border-passGrey bg-surface focus:outline-none focus:border-primary shadow-sm" />
        <input type="password" placeholder={lang === 'EN' ? 'Password' : '密碼'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 rounded-2xl border border-passGrey bg-surface focus:outline-none focus:border-primary shadow-sm" />
        {error && <p className="text-accent text-sm text-center font-medium">{error}</p>}
        
        <div className="pt-4 space-y-3">
          <button onClick={() => handleAuth(false)} disabled={loading} className="w-full bg-primary text-white p-4 rounded-2xl font-bold hover:bg-primary/90 transition shadow-md">
            {loading ? '...' : (lang === 'EN' ? 'Log In' : '登入')}
          </button>
          <button onClick={() => handleAuth(true)} disabled={loading} className="w-full bg-surface text-primary border-2 border-primary p-4 rounded-2xl font-bold hover:bg-passGrey transition">
            {lang === 'EN' ? 'Create Account' : '註冊帳號'}
          </button>
        </div>
      </div>
    </div>
  )
}

// --- 6. Main App Component ---
export default function App() {
  const [lang, setLang] = useState('EN');
  const [session, setSession] = useState(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const checkProfile = async (currentSession) => {
      if (currentSession?.user?.id) {
        const { data } = await supabase.from('profiles').select('id').eq('id', currentSession.user.id).single();
        setHasProfile(!!data);
      }
      setLoadingAuth(false);
    };

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession) checkProfile(currentSession);
      else setLoadingAuth(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) checkProfile(newSession);
      else {
        setHasProfile(false);
        setLoadingAuth(false);
      }
    });
    
    return () => subscription.unsubscribe();
  }, []);

  if (loadingAuth) return <div className="flex h-screen items-center justify-center bg-background"><div className="text-primary font-bold text-xl">Loading...</div></div>;
  
  if (!session) return <AuthScreen lang={lang} setLang={setLang} />;
  
  if (!hasProfile) return <OnboardingScreen session={session} onComplete={() => setHasProfile(true)} lang={lang} />;

  return (
    <BrowserRouter>
      <Layout lang={lang} setLang={setLang} />
    </BrowserRouter>
  );
}