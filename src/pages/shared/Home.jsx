import { Link } from 'react-router-dom'
import { ArrowRight, Star, Shield, CheckCircle, Clock, ChevronRight, HelpCircle, Mail, MapPin, Zap } from 'lucide-react'

// DATA
const SERVICES = [
  { icon: '🔧', name: 'Dayactir', desc: 'Alaabooyinka guriga ee la dayactiray' },
  { icon: '🚿', name: 'Berkedo', desc: 'Biyo-mareenka iyo xididka' },
  { icon: '⚡', name: 'Koronto', desc: 'Elektarikada iyo wiring-ga' },
  { icon: '🎨', name: 'Midabka', desc: 'Painting iyo qurxinta guriga' },
  { icon: '🌿', name: 'Beerta', desc: 'Dhirta iyo beeraha guriga' },
  { icon: '🧹', name: 'Nadiifin', desc: 'Nadiifinta guriga oo dhan' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      
      {/* --- HERO:  */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-slate-950 text-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-blue-300 text-sm mb-6 border border-white/10">
            <Zap size={16} className="text-yellow-400" /> Hadda waa waqtigii gurigaaga la daryeeli lahaa!
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tight">
            Adeeg <span className="text-blue-500">Deg-deg</span> ah, <br /> Tayo <span className="text-blue-500">Sare</span> leh.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            ServiceHub waxay ku xirtaa xirfadlayaasha ugu khibradda badan magaalada. Hal codsi, shaqadana waa dhammaatay.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20 transform hover:-translate-y-1">Hadda Bilow</Link>
          </div>
        </div>
      </section>

      {/* --- SERVICES: */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-black text-center mb-16">Adeegyada aan ku siinayno</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((s) => (
            <div key={s.name} className="group p-8 bg-white rounded-3xl border border-slate-100 hover:border-blue-200 transition-all shadow-sm hover:shadow-2xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 flex items-center justify-center rounded-2xl text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">{s.icon}</div>
              <h3 className="font-bold text-xl mb-2">{s.name}</h3>
              <p className="text-slate-500 text-sm mb-6">{s.desc}</p>
              <Link to="/register" className="text-blue-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">
                Codso Adeeg <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA BANNER:  */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Diyaar ma u tahay inaad bilowdo?</h2>
          <p className="text-blue-100 mb-10">In ka badan 2,400 macaamiil ayaa ServiceHub ku aaminay gurigooda.</p>
          <Link to="/register" className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-black hover:bg-slate-100 transition-all">Account Bilaash ah Sameyso</Link>
        </div>
      </section>

      {/* --- FOOTER: */}
      <footer className="bg-white border-t border-slate-100 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <h2 className="font-black text-2xl text-blue-600 mb-4">ServiceHub</h2>
            <p className="text-slate-500 text-sm max-w-sm">Mogadishu, Somalia. Hadafkayagu waa inaan gurigaaga ka dhigno meel nabad ah oo qurux badan.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
               <li><Link to="/services">services</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li className="flex items-center gap-2"><Mail size={14}/> info@servicehub.so</li>
              <li className="flex items-center gap-2"><MapPin size={14}/> Banadir, Somalia</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-16 text-xs text-slate-400">
          © 2026 ServiceHub. Dhammaan xuquuqdu way dhowran tahay.
        </div>
      </footer>
    </div>
  )
}