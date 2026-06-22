import { Wrench, Users, Star, Shield, ArrowRight } from 'lucide-react'

import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <div className="max-w-5xl mx-auto px-6 space-y-32">
        
        {/* Hero Section */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Ku saabsan ServiceHub
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Adeeg tayo leh oo lagu <br/> 
            <span className="text-blue-600">aamini karo</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Waxaan dhisaynaa buundo u dhexeysa xirfadlayaasha iyo macaamiisha, annagoo hubinayna in adeeg kasta uu noqdo mid fudud oo ammaan ah.
          </p>
        </section>

        {/* Values Section - Nadiif ah oo isku xiran */}
        <section>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Aaminaad', desc: 'Xirfadlayaal la xaqiijiyay' },
              { icon: Star, title: 'Tayada', desc: 'Adeeg heer sare ah' },
              { icon: Users, title: 'Bulshada', desc: 'Xiriirka dadka' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section - Full Color Block */}
        <section className="bg-blue-600 rounded-3xl p-12 text-white flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-6">Hadafkayaga waa adiga</h2>
          <p className="text-blue-50 max-w-xl text-lg mb-8 leading-relaxed">
            Inaan dib u habeyn ku samayno sida aad u heli karto adeegyada guriga, annagoo ka dhigayna mid dhijitaal ah oo ku shaqaynaya hal guji.
          </p>
         <Link


  to="/services" 
  className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors inline-block"
>
  Baro wax badan
</Link>
        </section>

      </div>
    </div>
  )
}