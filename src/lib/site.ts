export const site = {
  name: "مسارات المستكشف",
  tagline: "للاتصالات وتقنية المعلومات",
  url: "https://mmit.sa",
  email: "admin@mmit.sa",
  phone: "0536930366",
  phoneDisplay: "053 693 0366",
  whatsapp: "966536930366",
  address: "المملكة العربية السعودية، الرياض، حي الصحافة",
} as const;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "الرئيسية", href: "/" },
  { label: "الخدمات", href: "/services" },
  { label: "المنتجات", href: "/products" },
  { label: "أعمالنا", href: "/portfolio" },
  { label: "شركاؤنا", href: "/partners" },
  { label: "من نحن", href: "/about" },
  { label: "تواصل معنا", href: "/contact" },
];

export type Service = {
  icon: string;
  title: string;
  description: string;
  accent: "secondary" | "primary";
};

export const services: Service[] = [
  {
    icon: "router",
    title: "حلول الاتصالات والشبكات",
    description:
      "تصميم وتنفيذ شبكات اتصالات متقدمة تضمن استقرار وسرعة نقل البيانات للمؤسسات بمختلف أحجامها.",
    accent: "secondary",
  },
  {
    icon: "dns",
    title: "البنية التحتية لتقنية المعلومات",
    description:
      "تأسيس بنية تحتية قوية وقابلة للتطوير تدعم التحول الرقمي وتضمن استمرارية الأعمال بكفاءة.",
    accent: "primary",
  },
  {
    icon: "security",
    title: "الأمن السيبراني وحماية البيانات",
    description:
      "توفير طبقات حماية متقدمة للأنظمة والبيانات ضد التهديدات السيبرانية المتزايدة بفعالية عالية.",
    accent: "secondary",
  },
  {
    icon: "transform",
    title: "التحول الرقمي وأتمتة الأعمال",
    description:
      "تحويل العمليات التقليدية إلى رقمية لتحسين الكفاءة وتقليل الأخطاء البشرية وتسريع الإنجاز.",
    accent: "primary",
  },
  {
    icon: "smart_toy",
    title: "الأنظمة الذكية وحلول إنترنت الأشياء",
    description:
      "تطوير ودمج أنظمة ذكية تعتمد على إنترنت الأشياء لمراقبة وإدارة الموارد بذكاء.",
    accent: "secondary",
  },
  {
    icon: "support_agent",
    title: "الدعم الفني والتشغيل والصيانة",
    description:
      "خدمات دعم فني شاملة وصيانة دورية لضمان استمرارية عمل الأنظمة دون انقطاع.",
    accent: "primary",
  },
  {
    icon: "precision_manufacturing",
    title: "توريد وتركيب الأجهزة والأنظمة التقنية",
    description:
      "توفير أحدث الأجهزة والمعدات التقنية مع خدمات التركيب الاحترافي والتهيئة.",
    accent: "secondary",
  },
  {
    icon: "storage",
    title: "حلول مراكز البيانات والخوادم",
    description:
      "تصميم وتجهيز مراكز بيانات متطورة تضمن حفظ ومعالجة البيانات بأعلى معايير الأمان والأداء.",
    accent: "primary",
  },
];

export type Product = {
  slug: string;
  icon: string;
  title: string;
  description: string;
  tagline: string;
  overview: string;
  features: string[];
  href?: string;
};

export const products: Product[] = [
  {
    slug: "hr",
    icon: "badge",
    title: "مسارات HR",
    description: "حلول ذكية لإدارة الموارد البشرية والرواتب بكل سهولة.",
    tagline: "إدارة متكاملة لرأس المال البشري",
    overview:
      "نظام شامل لإدارة الموارد البشرية يغطي دورة حياة الموظف كاملة — من التوظيف وحتى نهاية الخدمة — مع أتمتة الرواتب والحضور والإجازات في منصة واحدة سهلة الاستخدام.",
    features: [
      "ملفات الموظفين وبياناتهم الكاملة",
      "إدارة الرواتب والأجور ومسيّرات الدفع",
      "تتبّع الحضور والانصراف والإجازات",
      "تقييم الأداء وإدارة الأهداف",
      "خدمة ذاتية للموظفين عبر الجوال",
      "تقارير ولوحات تحكم تحليلية",
    ],
    href: "https://masarats.com.sa/hr",
  },
  {
    slug: "sadad",
    icon: "payments",
    title: "مسارات سداد",
    description: "نظام فوترة إلكتروني متكامل وآمن لعمليات الدفع.",
    tagline: "فوترة ومدفوعات إلكترونية موثوقة",
    overview:
      "بوابة فوترة ومدفوعات إلكترونية آمنة تسهّل تحصيل المستحقات وإصدار الفواتير الضريبية المتوافقة مع متطلبات هيئة الزكاة والضريبة والجمارك.",
    features: [
      "فواتير ضريبية متوافقة مع ZATCA",
      "ربط مع بوابات الدفع الإلكتروني",
      "تحصيل آمن ومتابعة المستحقات",
      "إدارة العملاء والاشتراكات",
      "تقارير مالية لحظية",
      "تنبيهات وإشعارات تلقائية",
    ],
    href: "https://masarats.com.sa/sadad",
  },
  {
    slug: "archive",
    icon: "inventory_2",
    title: "مسارات أرشفة",
    description: "تنظيم وأرشفة الملفات إلكترونيًا لسهولة الوصول والحماية.",
    tagline: "أرشفة إلكترونية وإدارة وثائق",
    overview:
      "حل متكامل للأرشفة الإلكترونية وإدارة الوثائق يحوّل المستندات الورقية إلى أصول رقمية منظّمة، مع بحث فوري وصلاحيات دقيقة وحماية عالية.",
    features: [
      "أرشفة المستندات وفهرستها",
      "بحث فوري بالنص الكامل",
      "صلاحيات وصول متعددة المستويات",
      "سير عمل اعتماد الوثائق",
      "نسخ احتياطي آمن",
      "سجل تدقيق كامل للعمليات",
    ],
    href: "https://masarats.com.sa/archive",
  },
  {
    slug: "warehouse",
    icon: "warehouse",
    title: "مسارات مستودعات",
    description: "إدارة المخزون والمستودعات بدقة وفعالية عالية.",
    tagline: "إدارة مخزون ومستودعات ذكية",
    overview:
      "نظام لإدارة المخزون والمستودعات يمنحك رؤية دقيقة ولحظية لحركة الأصناف عبر مواقع متعددة، مع جرد آلي وتنبيهات ذكية لإعادة الطلب.",
    features: [
      "إدارة الأصناف وحركة الإدخال والإخراج",
      "دعم تعدد المستودعات والمواقع",
      "الجرد الدوري والمستمر",
      "تنبيهات حدود إعادة الطلب",
      "تتبّع بالباركود/QR",
      "تقارير المخزون والتقييم",
    ],
    href: "https://masarats.com.sa/warehouse",
  },
  {
    slug: "support",
    icon: "support_agent",
    title: "مسارات دعم",
    description: "نظام تذاكر متطور لإدارة خدمة العملاء والدعم الفني.",
    tagline: "نظام تذاكر ودعم فني احترافي",
    overview:
      "منصة لإدارة خدمة العملاء والدعم الفني عبر نظام تذاكر متكامل يوحّد قنوات التواصل ويضمن الالتزام باتفاقيات مستوى الخدمة.",
    features: [
      "نظام تذاكر متعدد القنوات",
      "اتفاقيات مستوى الخدمة (SLA)",
      "قاعدة معرفة للحلول الشائعة",
      "توزيع وتصعيد آلي للتذاكر",
      "استبيانات رضا العملاء",
      "تقارير أداء فريق الدعم",
    ],
  },
  {
    slug: "analytics",
    icon: "analytics",
    title: "مسارات تحليل",
    description: "لوحات تحكم ذكية لتحليل البيانات ودعم اتخاذ القرار.",
    tagline: "ذكاء أعمال ولوحات تحكم",
    overview:
      "منصة ذكاء أعمال تحوّل بياناتك إلى رؤى قابلة للتنفيذ عبر لوحات تحكم تفاعلية ومؤشرات أداء تدعم اتخاذ القرار بثقة.",
    features: [
      "لوحات تحكم تفاعلية قابلة للتخصيص",
      "مؤشرات الأداء الرئيسية (KPIs)",
      "تكامل مع مصادر بيانات متعددة",
      "تقارير مجدولة وتلقائية",
      "تنبيهات على الانحرافات",
      "تصدير ومشاركة التقارير",
    ],
  },
  {
    slug: "estate",
    icon: "domain",
    title: "مسارات أملاك",
    description: "نظام متخصص لإدارة العقارات والممتلكات والمرافق.",
    tagline: "إدارة عقارات ومرافق",
    overview:
      "نظام متخصص لإدارة العقارات والممتلكات يغطي العقود والإيجارات والصيانة والتحصيل، لإدارة محافظ عقارية متعددة بكفاءة.",
    features: [
      "سجل العقارات والوحدات",
      "إدارة العقود والإيجارات",
      "تحصيل الإيجارات والمتابعة المالية",
      "طلبات وجدولة الصيانة",
      "إدارة الملاك والمستأجرين",
      "تقارير الإشغال والإيرادات",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export type Partner = {
  name: string;
  sector: string;
  icon: string;
  /** Path under /public if an official logo asset is available. */
  logo?: string;
};

// Derived from our project history (سابقة الأعمال). Drop an official logo into
// public/partners/<file> and set `logo` to show it instead of the monogram.
export const partners: Partner[] = [
  { name: "وزارة الصحة", sector: "القطاع الصحي — منطقة القصيم", icon: "health_and_safety" },
  { name: "وزارة الداخلية", sector: "مستشفى قوى الأمن", icon: "local_police" },
  { name: "المركز السعودي لكفاءة الطاقة", sector: "قطاع الطاقة", icon: "bolt" },
  { name: "أمانة منطقة الجوف", sector: "القطاع البلدي", icon: "location_city" },
  { name: "بلدية جدة", sector: "القطاع البلدي", icon: "location_city" },
  { name: "بلدية محافظة بقعاء", sector: "القطاع البلدي", icon: "location_city" },
  { name: "بلدية تربة منطقة حائل", sector: "القطاع البلدي", icon: "location_city" },
];

export type Advantage = { icon: string; title: string; description: string };

export const advantages: Advantage[] = [
  {
    icon: "verified",
    title: "الجودة الفائقة",
    description: "نلتزم بأعلى معايير الجودة العالمية في جميع مراحل تنفيذ المشاريع.",
  },
  {
    icon: "schedule",
    title: "الالتزام التام",
    description: "نحترم أوقات التسليم ونضمن تنفيذ المشاريع وفق الخطط المتفق عليها.",
  },
  {
    icon: "lightbulb",
    title: "حلول مبتكرة",
    description: "نقدم أحدث التقنيات لضمان بقاء أعمالكم في الصدارة التنافسية.",
  },
  {
    icon: "support_agent",
    title: "دعم فني مستمر",
    description: "فريقنا متاح على مدار الساعة لضمان استمرارية أعمالكم بلا توقف.",
  },
];

export const projectCategories = [
  "تطوير برمجيات",
  "أنظمة مراقبة",
  "صيانة تقنية",
  "توريد وتركيب",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  client: string;
  work: string;
  status: "قائم" | "منتهي";
  category: ProjectCategory;
};

export const projects: Project[] = [
  { client: "بلدية محافظة بقعاء", work: "صيانة وتطوير الخدمات التقنية بالمرافق", status: "قائم", category: "تطوير برمجيات" },
  { client: "بلدية تربة منطقة حائل", work: "صيانة وتوريد وتركيب كاميرات للحدائق العامة والمباني", status: "قائم", category: "أنظمة مراقبة" },
  { client: "المركز السعودي لكفاءة الطاقة", work: "إدارة نظام إلكتروني للمخزون والأصول (خمس مراحل)", status: "قائم", category: "تطوير برمجيات" },
  { client: "وزارة الداخلية – مستشفى قوى الأمن", work: "تأمين أقراص صلبة لأجهزة التخزين", status: "منتهي", category: "توريد وتركيب" },
  { client: "وزارة الصحة – منطقة القصيم", work: "توريد وتركيب أجهزة مراكز المختبر الإقليمي", status: "منتهي", category: "توريد وتركيب" },
  { client: "بلدية محافظة بقعاء", work: "عقد صيانة الكمبيوترات", status: "منتهي", category: "صيانة تقنية" },
  { client: "بلدية محافظة بقعاء", work: "صيانة كاميرات مراقبة شبكية", status: "منتهي", category: "أنظمة مراقبة" },
  { client: "بلدية محافظة بقعاء", work: "صيانة شبكة الحاسب الآلي والطابعات", status: "منتهي", category: "صيانة تقنية" },
  { client: "بلدية محافظة بقعاء", work: "تطوير وتوريد البرمجيات والتطبيقات", status: "منتهي", category: "تطوير برمجيات" },
  { client: "بلدية محافظة بقعاء", work: "توريد أجهزة تقنية ومستلزماتها", status: "منتهي", category: "توريد وتركيب" },
  { client: "بلدية محافظة بقعاء", work: "توريد وتركيب وصيانة أجهزة الحاسب وشبكات الاتصالات", status: "منتهي", category: "توريد وتركيب" },
  { client: "بلدية جدة", work: "تقديم وتطوير الخدمات الرقمية والتطبيقات التقنية", status: "منتهي", category: "تطوير برمجيات" },
  { client: "أمانة منطقة الجوف", work: "توريد وتركيب وصيانة أجهزة الحاسب والطابعات والمحولات الشبكية", status: "منتهي", category: "توريد وتركيب" },
];
