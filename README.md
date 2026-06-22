# 🔧 ServiceHub

Platform ay macaamiisha ku codsan karaan adeegyada guriga, xirfadlayaashuna u qaban karaan, status-kana la beddeli karo.

---






## 📁 Folder Structure

```
src/
├── components/
│   ├── common/          # Notification, StatusBadge, Avatar, Spinner
│   └── layout/          # Navbar, MainLayout, ProtectedRoute
├── context/
│   └── AppContext.jsx   # Context API + Reducer (state management)
├── hooks/
│   ├── useRequests.js   # CRUD for service requests
│   └── useProfile.js    # Profile update
├── lib/
│   └── supabase.js      # Supabase client
├── pages/
│   ├── shared/          # Home, Login, Register, Dashboard, Profile, About
│   ├── user/            # MyRequests
│   └── worker/          # AllRequests
└── App.jsx              # Routes
```

---

##  Roles

| Role | Awoodaha |
|------|----------|
| **User/Macmiil** | Register, codsi abuur, codsigiisa arag, codsi tirtir |
| **Worker/Xirfadle** | Dhammaan codsiyada arag, status beddel (complete/reject/pending), faallo ku dar |

---


