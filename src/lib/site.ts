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
  { label: "أعمالنا", href: "/portfolio" },
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
  icon: string;
  title: string;
  description: string;
  href?: string;
};

export const products: Product[] = [
  {
    icon: "badge",
    title: "مسارات HR",
    description: "حلول ذكية لإدارة الموارد البشرية والرواتب بكل سهولة.",
    href: "https://masarats.com.sa/hr",
  },
  {
    icon: "payments",
    title: "مسارات سداد",
    description: "نظام فوترة إلكتروني متكامل وآمن لعمليات الدفع.",
    href: "https://masarats.com.sa/sadad",
  },
  {
    icon: "inventory_2",
    title: "مسارات أرشفة",
    description: "تنظيم وأرشفة الملفات إلكترونيًا لسهولة الوصول والحماية.",
    href: "https://masarats.com.sa/archive",
  },
  {
    icon: "warehouse",
    title: "مسارات مستودعات",
    description: "إدارة المخزون والمستودعات بدقة وفعالية عالية.",
    href: "https://masarats.com.sa/warehouse",
  },
  {
    icon: "support_agent",
    title: "مسارات دعم",
    description: "نظام تذاكر متطور لإدارة خدمة العملاء والدعم الفني.",
  },
  {
    icon: "analytics",
    title: "مسارات تحليل",
    description: "لوحات تحكم ذكية لتحليل البيانات ودعم اتخاذ القرار.",
  },
  {
    icon: "domain",
    title: "مسارات أملاك",
    description: "نظام متخصص لإدارة العقارات والممتلكات والمرافق.",
  },
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

export type Project = {
  client: string;
  work: string;
  status: "قائم" | "منتهي";
};

export const projects: Project[] = [
  { client: "بلدية محافظة بقعاء", work: "صيانة وتطوير الخدمات التقنية بالمرافق", status: "قائم" },
  { client: "بلدية تربة منطقة حائل", work: "صيانة وتوريد وتركيب كاميرات للحدائق العامة والمباني", status: "قائم" },
  { client: "المركز السعودي لكفاءة الطاقة", work: "إدارة نظام إلكتروني للمخزون والأصول (خمس مراحل)", status: "قائم" },
  { client: "وزارة الداخلية – مستشفى قوى الأمن", work: "تأمين أقراص صلبة لأجهزة التخزين", status: "منتهي" },
  { client: "وزارة الصحة – منطقة القصيم", work: "توريد وتركيب أجهزة مراكز المختبر الإقليمي", status: "منتهي" },
  { client: "بلدية محافظة بقعاء", work: "عقد صيانة الكمبيوترات", status: "منتهي" },
  { client: "بلدية محافظة بقعاء", work: "صيانة كاميرات مراقبة شبكية", status: "منتهي" },
  { client: "بلدية محافظة بقعاء", work: "صيانة شبكة الحاسب الآلي والطابعات", status: "منتهي" },
  { client: "بلدية محافظة بقعاء", work: "تطوير وتوريد البرمجيات والتطبيقات", status: "منتهي" },
  { client: "بلدية محافظة بقعاء", work: "توريد أجهزة تقنية ومستلزماتها", status: "منتهي" },
  { client: "بلدية محافظة بقعاء", work: "توريد وتركيب وصيانة أجهزة الحاسب وشبكات الاتصالات", status: "منتهي" },
  { client: "بلدية جدة", work: "تقديم وتطوير الخدمات الرقمية والتطبيقات التقنية", status: "منتهي" },
  { client: "أمانة منطقة الجوف", work: "توريد وتركيب وصيانة أجهزة الحاسب والطابعات والمحولات الشبكية", status: "منتهي" },
];
