import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'

const ALL_SERVICES = [
  {
    icon: '🔧',
    name: 'Dayactirka',
    tagline: 'Alaabooyinka guriga',
    desc: 'Alaabooyinka guriga sida giraantiga, albaabada, daaqadaha, iyo waxkale oo la dayactiro.',
    features: ['Giraanti iyo albaabada', 'Daaqadaha', 'Wax weyn iyo yar', 'Soo degitaanka degdeg ah'],
    price: 'Ka bilaabma $15',
    color: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    accent: 'text-blue-600',
    border: 'border-blue-100 hover:border-blue-300',
  },
  {
    icon: '🚿',
    name: 'Berkedo',
    tagline: 'Biyo iyo xididka',
    desc: 'Dhibaatooyinka biyo-mareenka, berkadaha, tooyada, iyo dhamaan nidaamka biyaha guriga.',
    features: ['Dhibaatada berkada', 'Tooyada', 'Biyo-mareenka', 'Xididka cusub'],
    price: 'Ka bilaabma $25',
    color: 'bg-cyan-50',
    iconBg: 'bg-cyan-100',
    accent: 'text-cyan-600',
    border: 'border-cyan-100 hover:border-cyan-300',
  },
  {
    icon: '⚡',
    name: 'Koronto',
    tagline: 'Elektarikada & wiring',
    desc: 'Wiring-ga guriga, siiro cusub, nalal, switch-yada, iyo dhibaatada korontada.',
    features: ['Nalal iyo switch', 'Wiring cusub', 'MCB & fuse', 'Barasho dhibaato'],
    price: 'Ka bilaabma $30',
    color: 'bg-yellow-50',
    iconBg: 'bg-yellow-100',
    accent: 'text-yellow-700',
    border: 'border-yellow-100 hover:border-yellow-300',
  },
  {
    icon: '🎨',
    name: 'Midabka',
    tagline: 'Painting & decor',
    desc: 'Gurigaaga si qurux badan u midabee. Gudaha iyo dibadda labadaba. Midabka aad doratay.',
    features: ['Gudaha guriga', 'Dibadda', 'Saqafka', 'Texture & design'],
    price: 'Ka bilaabma $20',
    color: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    accent: 'text-purple-600',
    border: 'border-purple-100 hover:border-purple-300',
  },
  {
    icon: '🌿',
    name: 'Beerta',
    tagline: 'Dhirta & beer',
    desc: 'Beerta gurigaaga la nadiifiyo, geedaha la gooyo, dhirta la beero, iyo daaqada la naqshadeeyo.',
    features: ['Geedaha goynta', 'Dhirta beerta', 'Nadiifinta', 'Naqshadaynta'],
    price: 'Ka bilaabma $18',
    color: 'bg-green-50',
    iconBg: 'bg-green-100',
    accent: 'text-green-600',
    border: 'border-green-100 hover:border-green-300',
  },
  {
    icon: '🧹',
    name: 'Nadiifinta',
    tagline: 'Guriga oo dhan',
    desc: 'Nadiifin dhammaystiran oo gurigaaga ka dhigaysa mid cusub iyo nadiif ah. Xitaa xaafadaha adag.',
    features: ['Nadiifin buuxda', 'Kiimikooyinka ammaan', 'Qolalka dhamaan', 'Dharka & carpet'],
    price: 'Ka bilaabma $22',
    color: 'bg-rose-50',
    iconBg: 'bg-rose-100',
    accent: 'text-rose-600',
    border: 'border-rose-100 hover:border-rose-300',
  },
]

function ServiceCard({ icon, name, tagline, desc, features, price, color, iconBg, accent, border }) {
  return (
    <div className={`group flex flex-col gap-5 p-7 ${color} border ${border} rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}>
      <div className="flex items-start gap-4">
        <div className={`w-16 h-16 ${iconBg} rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div>
          <h3 className="font-black text-gray-900 text-xl">{name}</h3>
          <p className={`text-sm font-semibold ${accent}`}>{tagline}</p>
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>

      <ul className="space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle size={14} className={`${accent} flex-shrink-0`} />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between">
        <span className={`font-bold text-sm ${accent}`}>{price}</span>
        <Link
          to="/register"
          className={`inline-flex items-center gap-1.5 text-sm font-bold ${accent} hover:gap-2.5 transition-all`}
        >
          Codsi Dir <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-100 pt-32 pb-20 text-center px-6">
        <span className="inline-block px-3 py-1 bg-blue-900 text-blue-600 text-xs font-bold rounded-full uppercase tracking-widest mb-6">
          Adeegyadeena
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-black mb-5 tracking-tight">
          Adeeg kasta oo aad u baahan tahay
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
          Xirfadlayaashayada waxay bixiyaan adeegyada heerka sare ee tayada leh.
        </p>
        <Link
          to="/register"
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-900/40"
        >
          Bilow Hadda — Bilaash <ArrowRight size={18} />
        </Link>
      </section>

      {/* Cards */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_SERVICES.map((s) => (
            <ServiceCard key={s.name} {...s} />
          ))}
        </div>
      </section>
    </div>
  )
}
