/**
 * Todos los textos del sitio, en español e inglés.
 * `es` define la forma; `en` tiene que tener exactamente las mismas claves
 * (TypeScript avisa si falta alguna).
 */

const es = {
  locale: "es-AR",
  ogLocale: "es_AR",

  seo: {
    homeTitle: "Meiba Talent | Headhunting en Argentina: tech, comercial, marketing y logística",
    description:
      "Meiba Talent arma equipos de tecnología, comercial, marketing y logística en Argentina. Headhunting ágil, humano y estratégico. Primera terna en 72hs.",
    blogTitle: "Blog | Meiba Talent",
    blogDescription:
      "Ideas, datos y guías sobre headhunting tecnológico, contratación y talento tech en Argentina y LATAM.",
    notFoundTitle: "Página no encontrada",
    breadcrumbHome: "Inicio",
  },

  nav: {
    about: "Nosotros",
    methodology: "Metodología",
    services: "Servicios",
    specializations: "Especialidades",
    blog: "Blog",
    contact: "Contacto",
    toggleMenu: "Abrir o cerrar el menú",
    language: "Idioma",
    switchTo: { es: "Ver el sitio en español", en: "Ver el sitio en inglés" },
  },

  hero: {
    eyebrow: "Tu partner estratégico",
    title: "El talento correcto, en el momento justo.",
    body: "Armamos equipos de tecnología, comercial, marketing y logística. Sabemos encontrar a las personas que tu negocio necesita. Lo demás, lo conversamos.",
    cta: "Conversemos",
    imageAlt: "Equipo de profesionales colaborando en una oficina moderna",
  },

  values: {
    eyebrow: "Lo que nos mueve",
    title: "Creemos en otra forma de hacer las cosas.",
    items: ["Equipo.", "Conexión genuina.", "Innovación constante.", "Ética con impacto."],
  },

  methodology: {
    eyebrow: "Cómo trabajamos",
    title: "Rápido. Preciso. Humano.",
    body: "Combinamos headhunting con análisis profundo del mercado. No esperamos que el talento llegue — vamos a buscarlo.",
    stats: ["Primera terna de candidatos", "Garantía de reemplazo", "Años de experiencia"],
    cta: "Conocé el proceso completo",
  },

  services: {
    eyebrow: "¿Por qué elegirnos?",
    title: "Tu partner estratégico.",
    items: [
      {
        title: "Trabajamos a riesgo",
        description:
          "Sin costos iniciales ni retainers: solo cobramos si contratás a un candidato que te presentamos. Honorarios altamente competitivos que se adaptan a tus necesidades.",
      },
      {
        title: "Garantía y seguimiento",
        description:
          "Acompañamiento posterior a la contratación y reposición sin costo si no se cumplen las expectativas dentro del plazo acordado.",
      },
      {
        title: "Expertise en reclutamiento",
        description:
          "Más de 10 años de experiencia encontrando a los profesionales que empujarán tu proyecto hacia el éxito.",
      },
      {
        title: "Proceso ágil y transparente",
        description:
          "Status en tiempo real, informes de disponibilidad, benchmarks salariales y herramientas de selección potenciadas con IA.",
      },
    ],
  },

  segments: {
    eyebrow: "¿Con quién trabajamos?",
    title: "Entendemos tu momento.",
    items: [
      {
        title: "Startups y scaleups",
        hint: "Equipos fundacionales que necesitan crecer rápido sin perder identidad.",
      },
      {
        title: "Multinacionales con operación regional",
        hint: "Compañías que buscan talento local con mentalidad global.",
      },
      {
        title: "PyMEs armando equipo",
        hint: "Empresas en crecimiento que suman las primeras estructuras de cada área.",
      },
    ],
    notYou: "¿No te ves reflejado?",
    notYouCta: "Hablemos igual.",
  },

  // Áreas de práctica. Cada una agrupa los perfiles que buscamos dentro de ella.
  specializations: {
    title: "Hablamos tu idioma.",
    body: "Buscamos perfiles en cuatro áreas, con el mismo método y el mismo nivel de exigencia en cada una.",
    areas: [
      {
        area: "Tecnología",
        roles: ["Desarrollo", "Data", "Inteligencia Artificial", "Cloud", "DevOps", "Product", "UX/UI", "Cybersecurity"],
      },
      {
        area: "Comercial y ventas",
        roles: ["Ventas B2B", "Key Account", "Inside Sales", "Customer Success", "Jefaturas comerciales"],
      },
      {
        area: "Marketing",
        roles: ["Performance", "Brand", "Contenidos", "CRM", "Growth"],
      },
      {
        area: "Logística y operaciones",
        roles: ["Supply Chain", "Planeamiento", "Comercio exterior", "Distribución", "Jefaturas de operaciones"],
      },
    ],
  },

  clients: {
    eyebrow: "Marcas que confían en nosotros",
  },

  contact: {
    title: "La mejor contratación empieza con una conversación.",
    body: "Dejanos tus datos y un especialista te contacta. O escribinos directo por el canal que prefieras.",
    calendar: "Agendar una charla",
    whatsappAria: "Escribinos por WhatsApp",
    whatsappMessage: "Hola Meiba 👋 Quiero contar qué necesita mi equipo y conocer cómo trabajan.",
  },

  form: {
    name: "Nombre *",
    namePlaceholder: "Tu nombre",
    nameError: "Contanos tu nombre",
    email: "Email *",
    emailPlaceholder: "tu@empresa.com",
    emailError: "Email inválido",
    company: "Empresa",
    companyPlaceholder: "Nombre de tu empresa",
    phone: "Teléfono / WhatsApp",
    role: "¿Qué perfil necesitás cubrir?",
    rolePlaceholder: "Ej: Backend Senior, Key Account, Jefe de Logística...",
    message: "Contanos más",
    messagePlaceholder: "¿Qué necesita tu equipo hoy?",
    submit: "Quiero que me contacten",
    submitting: "Enviando...",
    footnote: "Te respondemos en menos de 24 hs hábiles. Sin spam.",
    notConfigured: "El formulario no está configurado para enviar mails todavía.",
    sendError: "No pudimos enviar el mensaje. Probá de nuevo o escribinos por mail.",
    successToast: "¡Recibido! Te respondemos en menos de 24 hs.",
    successTitle: "¡Gracias por escribirnos!",
    successBody: "Recibimos tu mensaje. Un especialista de Meiba te contacta en menos de 24 horas hábiles.",
  },

  blog: {
    eyebrow: "Blog",
    title: "Talento tech, sin vueltas.",
    body: "Datos, criterios y guías prácticas sobre contratación tecnológica en Argentina y la región.",
    empty: "Muy pronto, los primeros artículos.",
    readArticle: "Leer artículo",
    minutes: "min",
    readingTime: "min de lectura",
    back: "Volver al blog",
    ctaTitle: "¿Necesitás sumar talento a tu equipo?",
    ctaBody: "Primera terna en 72 hs. Hablemos.",
    ctaButton: "Quiero que me contacten",
  },

  notFound: {
    message: "No encontramos esta página.",
    home: "Volver al inicio",
  },

  footer: {
    location: "Buenos Aires, Argentina.",
  },
};

export type Translations = typeof es;

const en: Translations = {
  locale: "en-US",
  ogLocale: "en_US",

  seo: {
    homeTitle: "Meiba Talent | Headhunting in Argentina: tech, sales, marketing and logistics",
    description:
      "Meiba Talent builds technology, sales, marketing and logistics teams in Argentina. Agile, human and strategic headhunting. First shortlist in 72 hours.",
    blogTitle: "Blog | Meiba Talent",
    blogDescription:
      "Ideas, data and guides on tech headhunting, hiring and tech talent in Argentina and LATAM.",
    notFoundTitle: "Page not found",
    breadcrumbHome: "Home",
  },

  nav: {
    about: "About us",
    methodology: "Methodology",
    services: "Services",
    specializations: "Specialties",
    blog: "Blog",
    contact: "Contact",
    toggleMenu: "Toggle menu",
    language: "Language",
    switchTo: { es: "View the site in Spanish", en: "View the site in English" },
  },

  hero: {
    eyebrow: "Your strategic partner",
    title: "The right talent, right on time.",
    body: "We build technology, sales, marketing and logistics teams. We know how to find the people your business needs. The rest, we'll talk through together.",
    cta: "Let's talk",
    imageAlt: "Team of professionals collaborating in a modern office",
  },

  values: {
    eyebrow: "What drives us",
    title: "We believe in a different way of doing things.",
    items: ["Team.", "Genuine connection.", "Constant innovation.", "Ethics with impact."],
  },

  methodology: {
    eyebrow: "How we work",
    title: "Fast. Precise. Human.",
    body: "We combine headhunting with deep market analysis. We don't wait for talent to show up — we go out and find it.",
    stats: ["First candidate shortlist", "Replacement guarantee", "Years of experience"],
    cta: "See the full process",
  },

  services: {
    eyebrow: "Why choose us?",
    title: "Your strategic partner.",
    items: [
      {
        title: "We work on contingency",
        description:
          "No upfront costs or retainers: we only charge if you hire a candidate we introduced. Highly competitive fees that adapt to your needs.",
      },
      {
        title: "Guarantee and follow-up",
        description:
          "Support after the hire and a replacement at no cost if expectations aren't met within the agreed period.",
      },
      {
        title: "Recruiting expertise",
        description:
          "More than 10 years of experience finding the professionals who will push your project toward success.",
      },
      {
        title: "Agile, transparent process",
        description:
          "Real-time status, availability reports, salary benchmarks and AI-powered selection tools.",
      },
    ],
  },

  segments: {
    eyebrow: "Who do we work with?",
    title: "We understand where you are.",
    items: [
      {
        title: "Startups and scaleups",
        hint: "Founding teams that need to grow fast without losing their identity.",
      },
      {
        title: "Multinationals with regional operations",
        hint: "Companies looking for local talent with a global mindset.",
      },
      {
        title: "SMBs building their team",
        hint: "Growing companies putting the first structures of each area in place.",
      },
    ],
    notYou: "Don't see yourself here?",
    notYouCta: "Let's talk anyway.",
  },

  specializations: {
    title: "We speak your language.",
    body: "We search for talent in four areas, with the same method and the same high bar in each one.",
    areas: [
      {
        area: "Technology",
        roles: ["Development", "Data", "Artificial Intelligence", "Cloud", "DevOps", "Product", "UX/UI", "Cybersecurity"],
      },
      {
        area: "Sales",
        roles: ["B2B Sales", "Key Account", "Inside Sales", "Customer Success", "Sales leadership"],
      },
      {
        area: "Marketing",
        roles: ["Performance", "Brand", "Content", "CRM", "Growth"],
      },
      {
        area: "Logistics and operations",
        roles: ["Supply Chain", "Planning", "Foreign trade", "Distribution", "Operations leadership"],
      },
    ],
  },

  clients: {
    eyebrow: "Brands that trust us",
  },

  contact: {
    title: "The best hire starts with a conversation.",
    body: "Leave us your details and a specialist will get in touch. Or reach out directly through the channel you prefer.",
    calendar: "Book a call",
    whatsappAria: "Message us on WhatsApp",
    whatsappMessage: "Hi Meiba 👋 I'd like to tell you what my team needs and learn how you work.",
  },

  form: {
    name: "Name *",
    namePlaceholder: "Your name",
    nameError: "Please tell us your name",
    email: "Email *",
    emailPlaceholder: "you@company.com",
    emailError: "Invalid email",
    company: "Company",
    companyPlaceholder: "Your company's name",
    phone: "Phone / WhatsApp",
    role: "What role do you need to fill?",
    rolePlaceholder: "E.g. Senior Backend, Key Account, Head of Logistics...",
    message: "Tell us more",
    messagePlaceholder: "What does your team need today?",
    submit: "Get in touch with me",
    submitting: "Sending...",
    footnote: "We reply within 24 business hours. No spam.",
    notConfigured: "The form isn't set up to send emails yet.",
    sendError: "We couldn't send your message. Try again or email us.",
    successToast: "Got it! We'll reply within 24 hours.",
    successTitle: "Thanks for reaching out!",
    successBody: "We received your message. A Meiba specialist will contact you within 24 business hours.",
  },

  blog: {
    eyebrow: "Blog",
    title: "Tech talent, no fluff.",
    body: "Data, criteria and practical guides on tech hiring in Argentina and the region.",
    empty: "The first articles are coming soon.",
    readArticle: "Read article",
    minutes: "min",
    readingTime: "min read",
    back: "Back to the blog",
    ctaTitle: "Need to add talent to your team?",
    ctaBody: "First shortlist in 72 hours. Let's talk.",
    ctaButton: "Get in touch with me",
  },

  notFound: {
    message: "We couldn't find this page.",
    home: "Back to home",
  },

  footer: {
    location: "Buenos Aires, Argentina.",
  },
};

export const translations = { es, en };
