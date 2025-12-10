/**
 * Landing Page Translations
 */

import type { Language } from "./index";

type TranslationKeys = {
  nav: {
    home: string;
    about: string;
    blog: string;
    contact: string;
    cta: string;
  };
  hero: {
    badge: string;
    title1: string;
    titleHighlight: string;
    title2: string;
    subtitle: string;
    subtitleHighlight: string;
    subtitleEnd: string;
    ctaPrimary: string;
    ctaSecondary: string;
    rotatingWords: string[];
  };
  stats: {
    savings: string;
    savingsLabel: string;
    time: string;
    timeLabel: string;
    success: string;
    successLabel: string;
  };
  trust: {
    rating: string;
    gdpr: string;
    madeIn: string;
  };
  trustMarquee: {
    title: string;
    items: string[];
  };
  features: {
    title: string;
    subtitle: string;
    analyse: {
      badge: string;
      headline: string;
      description: string;
      tags: string[];
    };
    assistant: {
      badge: string;
      headline: string;
      description: string;
      tags: string[];
    };
    autoFill: {
      badge: string;
      headline: string;
      description: string;
      tags: string[];
    };
  };
  footer: {
    description: string;
    benefits: string;
    legal: string;
    support: string;
    imprint: string;
    privacy: string;
    terms: string;
    accessibility: string;
    help: string;
    contact: string;
    faq: string;
    login: string;
    aiTransparency: string;
    copyright: string;
    trustedBy: string;
  };
};

export const translations: Record<Language, TranslationKeys> = {
  de: {
    nav: {
      home: "Home",
      about: "Über uns",
      blog: "Blog",
      contact: "Kontakt",
      cta: "Jetzt starten",
    },
    hero: {
      badge: "50+ Förderungen automatisch prüfen",
      title1: "Hol dir dein",
      titleHighlight: "Geld",
      title2: "zurück.",
      subtitle: "Finde in",
      subtitleHighlight: "3 Minuten",
      subtitleEnd:
        "heraus, welche Förderungen dir zustehen – KI-gestützt & 100% kostenlos.",
      ctaPrimary: "Jetzt Förderung prüfen",
      ctaSecondary: "So funktioniert's",
      rotatingWords: ["Geld", "Wohngeld", "BAföG", "Kindergeld", "Förderung"],
    },
    stats: {
      savings: "847€",
      savingsLabel: "Ø Ersparnis/Jahr",
      time: "3",
      timeLabel: "Minuten",
      success: "98%",
      successLabel: "Erfolgsquote",
    },
    trust: {
      rating: "4.9/5 Bewertung",
      gdpr: "DSGVO konform",
      madeIn: "Made in Germany",
    },
    trustMarquee: {
      title: "Über 50+ Förderungen automatisch prüfen",
      items: [
        "Wohngeld",
        "BAföG",
        "Kindergeld",
        "Elterngeld",
        "Bürgergeld",
        "Kinderzuschlag",
        "Wohnungsbauprämie",
        "Grundsicherung",
      ],
    },
    features: {
      title: "Alles was du brauchst",
      subtitle:
        "Unsere KI analysiert deine Situation und findet alle Förderungen für dich.",
      analyse: {
        badge: "Förder-Analyse",
        headline: "Automatisiere repetitive Aufgaben",
        description:
          "Wir helfen dir, interne Abläufe zu optimieren durch automatisierte Förder-Suche, Dokumenten-Analyse und Antrags-Workflows. Unsere KI durchsucht tausende Förderprogramme und findet automatisch die passenden für deine Situation.",
        tags: ["Wohngeld", "BAföG", "100+ Förderungen"],
      },
      assistant: {
        badge: "KI-Assistent",
        headline: "Delegiere tägliche Aufgaben",
        description:
          "Von der Dokumenten-Analyse bis zur Antrags-Vorbereitung – unser KI-Assistent arbeitet rund um die Uhr für dich. Er analysiert deine Unterlagen, erkennt relevante Daten und bereitet alles für den Antrag vor.",
        tags: ["Zusammenfassungen", "Analyse", "Vieles mehr"],
      },
      autoFill: {
        badge: "Auto-Anträge",
        headline: "Baue smartere Systeme",
        description:
          "Ob du bei Null startest oder ein bestehendes System verbesserst – wir entwickeln maßgeschneiderte Lösungen für deine Förderanträge. Formulare werden automatisch ausgefüllt und zur Einreichung vorbereitet.",
        tags: ["Auto-Fill", "PDF-Export", "Einreichung"],
      },
    },
    footer: {
      description:
        "Dein digitaler Assistent für Förderanträge. KI-gestützt, sicher und 100% DSGVO-konform.",
      benefits: "Förderungen",
      legal: "Rechtliches",
      support: "Support",
      imprint: "Impressum",
      privacy: "Datenschutz",
      terms: "AGB",
      accessibility: "Barrierefreiheit",
      help: "Hilfe & FAQ",
      contact: "Kontakt",
      faq: "FAQ",
      login: "Anmelden",
      aiTransparency: "KI-Transparenz",
      copyright: "Alle Rechte vorbehalten.",
      trustedBy: "Trusted by 10.000+ users",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      blog: "Blog",
      contact: "Contact",
      cta: "Get Started",
    },
    hero: {
      badge: "Check 50+ benefits automatically",
      title1: "Get your",
      titleHighlight: "Money",
      title2: "back.",
      subtitle: "Find out in",
      subtitleHighlight: "3 minutes",
      subtitleEnd:
        "which benefits you're entitled to – AI-powered & 100% free.",
      ctaPrimary: "Check Benefits Now",
      ctaSecondary: "How it works",
      rotatingWords: ["Money", "Housing", "BAföG", "Child", "Benefits"],
    },
    stats: {
      savings: "€847",
      savingsLabel: "Ø Savings/Year",
      time: "3",
      timeLabel: "Minutes",
      success: "98%",
      successLabel: "Success Rate",
    },
    trust: {
      rating: "4.9/5 Rating",
      gdpr: "GDPR compliant",
      madeIn: "Made in Germany",
    },
    trustMarquee: {
      title: "Check 50+ benefits automatically",
      items: [
        "Housing Benefit",
        "BAföG",
        "Child Benefit",
        "Parental Benefit",
        "Citizen's Benefit",
        "Child Supplement",
        "Housing Premium",
        "Basic Security",
      ],
    },
    features: {
      title: "Everything you need",
      subtitle:
        "Our AI analyzes your situation and finds all benefits for you.",
      analyse: {
        badge: "Benefit Analysis",
        headline: "Automate repetitive tasks",
        description:
          "We help you optimize internal processes through automated benefit search, document analysis, and application workflows. Our AI searches thousands of benefit programs and automatically finds the right ones for your situation.",
        tags: ["Housing Benefit", "BAföG", "100+ Benefits"],
      },
      assistant: {
        badge: "AI Assistant",
        headline: "Delegate daily tasks",
        description:
          "From document analysis to application preparation – our AI assistant works around the clock for you. It analyzes your documents, recognizes relevant data, and prepares everything for the application.",
        tags: ["Summaries", "Analysis", "Much more"],
      },
      autoFill: {
        badge: "Auto Applications",
        headline: "Build smarter systems",
        description:
          "Whether you're starting from scratch or improving an existing system – we develop customized solutions for your benefit applications. Forms are automatically filled out and prepared for submission.",
        tags: ["Auto-Fill", "PDF Export", "Submission"],
      },
    },
    footer: {
      description:
        "Your digital assistant for benefit applications. AI-powered, secure, and 100% GDPR compliant.",
      benefits: "Benefits",
      legal: "Legal",
      support: "Support",
      imprint: "Imprint",
      privacy: "Privacy",
      terms: "Terms",
      accessibility: "Accessibility",
      help: "Help & FAQ",
      contact: "Contact",
      faq: "FAQ",
      login: "Login",
      aiTransparency: "AI Transparency",
      copyright: "All rights reserved.",
      trustedBy: "Trusted by 10,000+ users",
    },
  },
  tr: {
    nav: {
      home: "Ana Sayfa",
      about: "Hakkımızda",
      blog: "Blog",
      contact: "İletişim",
      cta: "Başla",
    },
    hero: {
      badge: "50+ yardımı otomatik kontrol et",
      title1: "Paranı",
      titleHighlight: "geri al",
      title2: ".",
      subtitle: "",
      subtitleHighlight: "3 dakikada",
      subtitleEnd:
        "hangi yardımlara hak kazandığını öğren – Yapay zeka destekli & %100 ücretsiz.",
      ctaPrimary: "Şimdi Kontrol Et",
      ctaSecondary: "Nasıl çalışır",
      rotatingWords: ["Para", "Kira", "BAföG", "Çocuk", "Yardım"],
    },
    stats: {
      savings: "€847",
      savingsLabel: "Ø Tasarruf/Yıl",
      time: "3",
      timeLabel: "Dakika",
      success: "%98",
      successLabel: "Başarı Oranı",
    },
    trust: {
      rating: "4.9/5 Puan",
      gdpr: "KVKK uyumlu",
      madeIn: "Almanya'da üretildi",
    },
    trustMarquee: {
      title: "50+ yardımı otomatik kontrol et",
      items: [
        "Kira Yardımı",
        "BAföG",
        "Çocuk Parası",
        "Ebeveyn Parası",
        "Vatandaş Parası",
        "Çocuk Eki",
        "Konut Primi",
        "Temel Güvence",
      ],
    },
    features: {
      title: "İhtiyacın olan her şey",
      subtitle: "Yapay zekamız durumunu analiz eder ve tüm yardımları bulur.",
      analyse: {
        badge: "Yardım Analizi",
        headline: "Tekrarlayan görevleri otomatikleştir",
        description:
          "Otomatik yardım arama, belge analizi ve başvuru iş akışları ile dahili süreçleri optimize etmenize yardımcı oluyoruz. Yapay zekamız binlerce yardım programını tarar ve durumunuza uygun olanları otomatik olarak bulur.",
        tags: ["Kira Yardımı", "BAföG", "100+ Yardım"],
      },
      assistant: {
        badge: "Yapay Zeka Asistanı",
        headline: "Günlük görevleri devret",
        description:
          "Belge analizinden başvuru hazırlığına kadar – yapay zeka asistanımız sizin için 7/24 çalışır. Belgelerinizi analiz eder, ilgili verileri tanır ve başvuru için her şeyi hazırlar.",
        tags: ["Özetler", "Analiz", "Daha fazlası"],
      },
      autoFill: {
        badge: "Otomatik Başvurular",
        headline: "Daha akıllı sistemler kur",
        description:
          "Sıfırdan başlıyor veya mevcut bir sistemi geliştiriyor olun – yardım başvurularınız için özelleştirilmiş çözümler geliştiriyoruz. Formlar otomatik olarak doldurulur ve gönderime hazırlanır.",
        tags: ["Otomatik Doldur", "PDF Dışa Aktar", "Gönderim"],
      },
    },
    footer: {
      description:
        "Yardım başvuruları için dijital asistanınız. Yapay zeka destekli, güvenli ve %100 KVKK uyumlu.",
      benefits: "Yardımlar",
      legal: "Yasal",
      support: "Destek",
      imprint: "Künye",
      privacy: "Gizlilik",
      terms: "Şartlar",
      accessibility: "Erişilebilirlik",
      help: "Yardım & SSS",
      contact: "İletişim",
      faq: "SSS",
      login: "Giriş",
      aiTransparency: "Yapay Zeka Şeffaflığı",
      copyright: "Tüm hakları saklıdır.",
      trustedBy: "10.000+ kullanıcı tarafından güveniliyor",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      blog: "المدونة",
      contact: "اتصل بنا",
      cta: "ابدأ الآن",
    },
    hero: {
      badge: "تحقق من 50+ إعانة تلقائياً",
      title1: "احصل على",
      titleHighlight: "أموالك",
      title2: ".",
      subtitle: "اكتشف في",
      subtitleHighlight: "3 دقائق",
      subtitleEnd: "الإعانات التي تستحقها – بالذكاء الاصطناعي ومجاناً 100%.",
      ctaPrimary: "تحقق الآن",
      ctaSecondary: "كيف يعمل",
      rotatingWords: ["أموالك", "السكن", "BAföG", "الأطفال", "الإعانات"],
    },
    stats: {
      savings: "€847",
      savingsLabel: "متوسط التوفير/سنة",
      time: "3",
      timeLabel: "دقائق",
      success: "98%",
      successLabel: "نسبة النجاح",
    },
    trust: {
      rating: "4.9/5 تقييم",
      gdpr: "متوافق مع GDPR",
      madeIn: "صنع في ألمانيا",
    },
    trustMarquee: {
      title: "تحقق من 50+ إعانة تلقائياً",
      items: [
        "بدل السكن",
        "BAföG",
        "بدل الأطفال",
        "بدل الوالدين",
        "بدل المواطن",
        "علاوة الأطفال",
        "علاوة الإسكان",
        "الضمان الأساسي",
      ],
    },
    features: {
      title: "كل ما تحتاجه",
      subtitle: "يحلل ذكاؤنا الاصطناعي وضعك ويجد جميع الإعانات لك.",
      analyse: {
        badge: "تحليل الإعانات",
        headline: "أتمتة المهام المتكررة",
        description:
          "نساعدك على تحسين العمليات الداخلية من خلال البحث الآلي عن الإعانات وتحليل المستندات وسير عمل الطلبات. يبحث ذكاؤنا الاصطناعي في آلاف برامج الإعانات ويجد تلقائياً المناسبة لوضعك.",
        tags: ["بدل السكن", "BAföG", "100+ إعانة"],
      },
      assistant: {
        badge: "مساعد الذكاء الاصطناعي",
        headline: "فوض المهام اليومية",
        description:
          "من تحليل المستندات إلى إعداد الطلبات – يعمل مساعدنا الذكي على مدار الساعة من أجلك. يحلل مستنداتك ويتعرف على البيانات ذات الصلة ويجهز كل شيء للطلب.",
        tags: ["ملخصات", "تحليل", "المزيد"],
      },
      autoFill: {
        badge: "طلبات تلقائية",
        headline: "بناء أنظمة أذكى",
        description:
          "سواء كنت تبدأ من الصفر أو تحسن نظاماً موجوداً – نطور حلولاً مخصصة لطلبات الإعانات الخاصة بك. يتم ملء النماذج تلقائياً وإعدادها للتقديم.",
        tags: ["ملء تلقائي", "تصدير PDF", "تقديم"],
      },
    },
    footer: {
      description:
        "مساعدك الرقمي لطلبات الإعانات. مدعوم بالذكاء الاصطناعي وآمن ومتوافق 100% مع GDPR.",
      benefits: "الإعانات",
      legal: "قانوني",
      support: "الدعم",
      imprint: "البيانات القانونية",
      privacy: "الخصوصية",
      terms: "الشروط",
      accessibility: "إمكانية الوصول",
      help: "المساعدة والأسئلة الشائعة",
      contact: "اتصل بنا",
      faq: "الأسئلة الشائعة",
      login: "تسجيل الدخول",
      aiTransparency: "شفافية الذكاء الاصطناعي",
      copyright: "جميع الحقوق محفوظة.",
      trustedBy: "موثوق به من قبل 10,000+ مستخدم",
    },
  },
  ru: {
    nav: {
      home: "Главная",
      about: "О нас",
      blog: "Блог",
      contact: "Контакты",
      cta: "Начать",
    },
    hero: {
      badge: "Проверьте 50+ пособий автоматически",
      title1: "Верните свои",
      titleHighlight: "деньги",
      title2: "обратно.",
      subtitle: "Узнайте за",
      subtitleHighlight: "3 минуты",
      subtitleEnd: "на какие пособия вы имеете право – с ИИ и 100% бесплатно.",
      ctaPrimary: "Проверить сейчас",
      ctaSecondary: "Как это работает",
      rotatingWords: ["деньги", "жильё", "BAföG", "детские", "пособия"],
    },
    stats: {
      savings: "€847",
      savingsLabel: "Ø Экономия/Год",
      time: "3",
      timeLabel: "Минуты",
      success: "98%",
      successLabel: "Успешность",
    },
    trust: {
      rating: "4.9/5 Рейтинг",
      gdpr: "Соответствует GDPR",
      madeIn: "Сделано в Германии",
    },
    trustMarquee: {
      title: "Проверьте 50+ пособий автоматически",
      items: [
        "Жилищное пособие",
        "BAföG",
        "Детское пособие",
        "Родительское пособие",
        "Гражданское пособие",
        "Детская надбавка",
        "Жилищная премия",
        "Базовое обеспечение",
      ],
    },
    features: {
      title: "Всё что вам нужно",
      subtitle:
        "Наш ИИ анализирует вашу ситуацию и находит все пособия для вас.",
      analyse: {
        badge: "Анализ пособий",
        headline: "Автоматизируйте рутинные задачи",
        description:
          "Мы помогаем оптимизировать внутренние процессы через автоматический поиск пособий, анализ документов и рабочие процессы заявок. Наш ИИ просматривает тысячи программ пособий и автоматически находит подходящие для вашей ситуации.",
        tags: ["Жилищное пособие", "BAföG", "100+ пособий"],
      },
      assistant: {
        badge: "ИИ-ассистент",
        headline: "Делегируйте ежедневные задачи",
        description:
          "От анализа документов до подготовки заявок – наш ИИ-ассистент работает для вас круглосуточно. Он анализирует ваши документы, распознаёт релевантные данные и готовит всё для заявки.",
        tags: ["Резюме", "Анализ", "И многое другое"],
      },
      autoFill: {
        badge: "Авто-заявки",
        headline: "Создавайте умные системы",
        description:
          "Начинаете ли вы с нуля или улучшаете существующую систему – мы разрабатываем индивидуальные решения для ваших заявок на пособия. Формы автоматически заполняются и готовятся к подаче.",
        tags: ["Авто-заполнение", "PDF-экспорт", "Подача"],
      },
    },
    footer: {
      description:
        "Ваш цифровой помощник для заявок на пособия. На базе ИИ, безопасно и 100% соответствует GDPR.",
      benefits: "Пособия",
      legal: "Правовая информация",
      support: "Поддержка",
      imprint: "Импринт",
      privacy: "Конфиденциальность",
      terms: "Условия",
      accessibility: "Доступность",
      help: "Помощь и FAQ",
      contact: "Контакты",
      faq: "FAQ",
      login: "Войти",
      aiTransparency: "Прозрачность ИИ",
      copyright: "Все права защищены.",
      trustedBy: "Доверяют 10 000+ пользователей",
    },
  },
  pl: {
    nav: {
      home: "Strona główna",
      about: "O nas",
      blog: "Blog",
      contact: "Kontakt",
      cta: "Rozpocznij",
    },
    hero: {
      badge: "Sprawdź 50+ świadczeń automatycznie",
      title1: "Odzyskaj swoje",
      titleHighlight: "pieniądze",
      title2: ".",
      subtitle: "Dowiedz się w",
      subtitleHighlight: "3 minuty",
      subtitleEnd: "do jakich świadczeń masz prawo – z AI i 100% za darmo.",
      ctaPrimary: "Sprawdź teraz",
      ctaSecondary: "Jak to działa",
      rotatingWords: [
        "pieniądze",
        "mieszkanie",
        "BAföG",
        "dzieci",
        "świadczenia",
      ],
    },
    stats: {
      savings: "€847",
      savingsLabel: "Ø Oszczędność/Rok",
      time: "3",
      timeLabel: "Minuty",
      success: "98%",
      successLabel: "Skuteczność",
    },
    trust: {
      rating: "4.9/5 Ocena",
      gdpr: "Zgodne z RODO",
      madeIn: "Made in Germany",
    },
    trustMarquee: {
      title: "Sprawdź 50+ świadczeń automatycznie",
      items: [
        "Dodatek mieszkaniowy",
        "BAföG",
        "Zasiłek na dzieci",
        "Zasiłek rodzicielski",
        "Zasiłek obywatelski",
        "Dodatek na dzieci",
        "Premia mieszkaniowa",
        "Zabezpieczenie podstawowe",
      ],
    },
    features: {
      title: "Wszystko czego potrzebujesz",
      subtitle:
        "Nasza AI analizuje Twoją sytuację i znajduje wszystkie świadczenia.",
      analyse: {
        badge: "Analiza świadczeń",
        headline: "Automatyzuj powtarzalne zadania",
        description:
          "Pomagamy optymalizować procesy wewnętrzne poprzez automatyczne wyszukiwanie świadczeń, analizę dokumentów i przepływy pracy wniosków. Nasza AI przeszukuje tysiące programów świadczeń i automatycznie znajduje odpowiednie dla Twojej sytuacji.",
        tags: ["Dodatek mieszkaniowy", "BAföG", "100+ świadczeń"],
      },
      assistant: {
        badge: "Asystent AI",
        headline: "Deleguj codzienne zadania",
        description:
          "Od analizy dokumentów po przygotowanie wniosków – nasz asystent AI pracuje dla Ciebie całą dobę. Analizuje Twoje dokumenty, rozpoznaje istotne dane i przygotowuje wszystko do wniosku.",
        tags: ["Podsumowania", "Analiza", "I wiele więcej"],
      },
      autoFill: {
        badge: "Auto-wnioski",
        headline: "Buduj inteligentniejsze systemy",
        description:
          "Czy zaczynasz od zera, czy ulepszasz istniejący system – opracowujemy dostosowane rozwiązania dla Twoich wniosków o świadczenia. Formularze są automatycznie wypełniane i przygotowywane do złożenia.",
        tags: ["Auto-wypełnianie", "Eksport PDF", "Złożenie"],
      },
    },
    footer: {
      description:
        "Twój cyfrowy asystent do wniosków o świadczenia. Oparty na AI, bezpieczny i w 100% zgodny z RODO.",
      benefits: "Świadczenia",
      legal: "Prawne",
      support: "Wsparcie",
      imprint: "Impressum",
      privacy: "Prywatność",
      terms: "Regulamin",
      accessibility: "Dostępność",
      help: "Pomoc i FAQ",
      contact: "Kontakt",
      faq: "FAQ",
      login: "Zaloguj się",
      aiTransparency: "Przejrzystość AI",
      copyright: "Wszelkie prawa zastrzeżone.",
      trustedBy: "Zaufało nam 10 000+ użytkowników",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      about: "Nosotros",
      blog: "Blog",
      contact: "Contacto",
      cta: "Empezar",
    },
    hero: {
      badge: "Verifica 50+ ayudas automáticamente",
      title1: "Recupera tu",
      titleHighlight: "dinero",
      title2: ".",
      subtitle: "Descubre en",
      subtitleHighlight: "3 minutos",
      subtitleEnd: "a qué ayudas tienes derecho – con IA y 100% gratis.",
      ctaPrimary: "Verificar ahora",
      ctaSecondary: "Cómo funciona",
      rotatingWords: ["dinero", "vivienda", "BAföG", "hijos", "ayudas"],
    },
    stats: {
      savings: "€847",
      savingsLabel: "Ø Ahorro/Año",
      time: "3",
      timeLabel: "Minutos",
      success: "98%",
      successLabel: "Tasa de éxito",
    },
    trust: {
      rating: "4.9/5 Valoración",
      gdpr: "Cumple RGPD",
      madeIn: "Hecho en Alemania",
    },
    trustMarquee: {
      title: "Verifica 50+ ayudas automáticamente",
      items: [
        "Ayuda vivienda",
        "BAföG",
        "Ayuda hijos",
        "Ayuda parental",
        "Ayuda ciudadana",
        "Suplemento hijos",
        "Prima vivienda",
        "Seguridad básica",
      ],
    },
    features: {
      title: "Todo lo que necesitas",
      subtitle:
        "Nuestra IA analiza tu situación y encuentra todas las ayudas para ti.",
      analyse: {
        badge: "Análisis de ayudas",
        headline: "Automatiza tareas repetitivas",
        description:
          "Te ayudamos a optimizar procesos internos mediante búsqueda automática de ayudas, análisis de documentos y flujos de trabajo de solicitudes. Nuestra IA busca en miles de programas de ayudas y encuentra automáticamente los adecuados para tu situación.",
        tags: ["Ayuda vivienda", "BAföG", "100+ ayudas"],
      },
      assistant: {
        badge: "Asistente IA",
        headline: "Delega tareas diarias",
        description:
          "Desde el análisis de documentos hasta la preparación de solicitudes – nuestro asistente IA trabaja las 24 horas para ti. Analiza tus documentos, reconoce datos relevantes y prepara todo para la solicitud.",
        tags: ["Resúmenes", "Análisis", "Y mucho más"],
      },
      autoFill: {
        badge: "Auto-solicitudes",
        headline: "Construye sistemas más inteligentes",
        description:
          "Ya sea que empieces desde cero o mejores un sistema existente – desarrollamos soluciones personalizadas para tus solicitudes de ayudas. Los formularios se rellenan automáticamente y se preparan para su envío.",
        tags: ["Auto-rellenar", "Exportar PDF", "Envío"],
      },
    },
    footer: {
      description:
        "Tu asistente digital para solicitudes de ayudas. Con IA, seguro y 100% conforme con RGPD.",
      benefits: "Ayudas",
      legal: "Legal",
      support: "Soporte",
      imprint: "Aviso legal",
      privacy: "Privacidad",
      terms: "Términos",
      accessibility: "Accesibilidad",
      help: "Ayuda y FAQ",
      contact: "Contacto",
      faq: "FAQ",
      login: "Iniciar sesión",
      aiTransparency: "Transparencia IA",
      copyright: "Todos los derechos reservados.",
      trustedBy: "Confiado por 10.000+ usuarios",
    },
  },
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      blog: "Blog",
      contact: "Contato",
      cta: "Começar",
    },
    hero: {
      badge: "Verifique 50+ benefícios automaticamente",
      title1: "Recupere seu",
      titleHighlight: "dinheiro",
      title2: ".",
      subtitle: "Descubra em",
      subtitleHighlight: "3 minutos",
      subtitleEnd:
        "a quais benefícios você tem direito – com IA e 100% grátis.",
      ctaPrimary: "Verificar agora",
      ctaSecondary: "Como funciona",
      rotatingWords: ["dinheiro", "moradia", "BAföG", "filhos", "benefícios"],
    },
    stats: {
      savings: "€847",
      savingsLabel: "Ø Economia/Ano",
      time: "3",
      timeLabel: "Minutos",
      success: "98%",
      successLabel: "Taxa de sucesso",
    },
    trust: {
      rating: "4.9/5 Avaliação",
      gdpr: "Conforme RGPD",
      madeIn: "Feito na Alemanha",
    },
    trustMarquee: {
      title: "Verifique 50+ benefícios automaticamente",
      items: [
        "Auxílio moradia",
        "BAföG",
        "Auxílio filhos",
        "Auxílio parental",
        "Auxílio cidadão",
        "Suplemento filhos",
        "Prêmio habitação",
        "Segurança básica",
      ],
    },
    features: {
      title: "Tudo que você precisa",
      subtitle:
        "Nossa IA analisa sua situação e encontra todos os benefícios para você.",
      analyse: {
        badge: "Análise de benefícios",
        headline: "Automatize tarefas repetitivas",
        description:
          "Ajudamos você a otimizar processos internos através de busca automática de benefícios, análise de documentos e fluxos de trabalho de solicitações. Nossa IA pesquisa milhares de programas de benefícios e encontra automaticamente os adequados para sua situação.",
        tags: ["Auxílio moradia", "BAföG", "100+ benefícios"],
      },
      assistant: {
        badge: "Assistente IA",
        headline: "Delegue tarefas diárias",
        description:
          "Da análise de documentos à preparação de solicitações – nosso assistente IA trabalha 24 horas para você. Ele analisa seus documentos, reconhece dados relevantes e prepara tudo para a solicitação.",
        tags: ["Resumos", "Análise", "E muito mais"],
      },
      autoFill: {
        badge: "Auto-solicitações",
        headline: "Construa sistemas mais inteligentes",
        description:
          "Seja começando do zero ou melhorando um sistema existente – desenvolvemos soluções personalizadas para suas solicitações de benefícios. Os formulários são preenchidos automaticamente e preparados para envio.",
        tags: ["Auto-preencher", "Exportar PDF", "Envio"],
      },
    },
    footer: {
      description:
        "Seu assistente digital para solicitações de benefícios. Com IA, seguro e 100% conforme com RGPD.",
      benefits: "Benefícios",
      legal: "Legal",
      support: "Suporte",
      imprint: "Aviso legal",
      privacy: "Privacidade",
      terms: "Termos",
      accessibility: "Acessibilidade",
      help: "Ajuda e FAQ",
      contact: "Contato",
      faq: "FAQ",
      login: "Entrar",
      aiTransparency: "Transparência IA",
      copyright: "Todos os direitos reservados.",
      trustedBy: "Confiado por 10.000+ usuários",
    },
  },
  it: {
    nav: {
      home: "Home",
      about: "Chi siamo",
      blog: "Blog",
      contact: "Contatti",
      cta: "Inizia",
    },
    hero: {
      badge: "Verifica 50+ sussidi automaticamente",
      title1: "Recupera i tuoi",
      titleHighlight: "soldi",
      title2: ".",
      subtitle: "Scopri in",
      subtitleHighlight: "3 minuti",
      subtitleEnd: "a quali sussidi hai diritto – con IA e 100% gratis.",
      ctaPrimary: "Verifica ora",
      ctaSecondary: "Come funziona",
      rotatingWords: ["soldi", "alloggio", "BAföG", "figli", "sussidi"],
    },
    stats: {
      savings: "€847",
      savingsLabel: "Ø Risparmio/Anno",
      time: "3",
      timeLabel: "Minuti",
      success: "98%",
      successLabel: "Tasso di successo",
    },
    trust: {
      rating: "4.9/5 Valutazione",
      gdpr: "Conforme GDPR",
      madeIn: "Made in Germany",
    },
    trustMarquee: {
      title: "Verifica 50+ sussidi automaticamente",
      items: [
        "Sussidio alloggio",
        "BAföG",
        "Assegno figli",
        "Assegno genitori",
        "Assegno cittadino",
        "Supplemento figli",
        "Premio abitazione",
        "Sicurezza base",
      ],
    },
    features: {
      title: "Tutto ciò di cui hai bisogno",
      subtitle:
        "La nostra IA analizza la tua situazione e trova tutti i sussidi per te.",
      analyse: {
        badge: "Analisi sussidi",
        headline: "Automatizza compiti ripetitivi",
        description:
          "Ti aiutiamo a ottimizzare i processi interni attraverso la ricerca automatica di sussidi, l'analisi dei documenti e i flussi di lavoro delle domande. La nostra IA cerca in migliaia di programmi di sussidi e trova automaticamente quelli adatti alla tua situazione.",
        tags: ["Sussidio alloggio", "BAföG", "100+ sussidi"],
      },
      assistant: {
        badge: "Assistente IA",
        headline: "Delega compiti quotidiani",
        description:
          "Dall'analisi dei documenti alla preparazione delle domande – il nostro assistente IA lavora 24 ore su 24 per te. Analizza i tuoi documenti, riconosce i dati rilevanti e prepara tutto per la domanda.",
        tags: ["Riassunti", "Analisi", "E molto altro"],
      },
      autoFill: {
        badge: "Auto-domande",
        headline: "Costruisci sistemi più intelligenti",
        description:
          "Che tu parta da zero o migliori un sistema esistente – sviluppiamo soluzioni personalizzate per le tue domande di sussidi. I moduli vengono compilati automaticamente e preparati per l'invio.",
        tags: ["Auto-compilazione", "Esporta PDF", "Invio"],
      },
    },
    footer: {
      description:
        "Il tuo assistente digitale per le domande di sussidi. Con IA, sicuro e 100% conforme al GDPR.",
      benefits: "Sussidi",
      legal: "Legale",
      support: "Supporto",
      imprint: "Note legali",
      privacy: "Privacy",
      terms: "Termini",
      accessibility: "Accessibilità",
      help: "Aiuto e FAQ",
      contact: "Contatti",
      faq: "FAQ",
      login: "Accedi",
      aiTransparency: "Trasparenza IA",
      copyright: "Tutti i diritti riservati.",
      trustedBy: "Scelto da 10.000+ utenti",
    },
  },
};
