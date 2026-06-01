import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  site,
  services,
  products,
  projects,
  partners,
  advantages,
} from "../src/lib/site";

const sectors = [
  { icon: "account_balance", title: "القطاع الحكومي", description: "وزارات وجهات حكومية ومراكز متخصصة." },
  { icon: "location_city", title: "القطاع البلدي", description: "أمانات وبلديات في مختلف المناطق." },
  { icon: "health_and_safety", title: "القطاع الصحي", description: "مستشفيات ومرافق ومختبرات صحية." },
  { icon: "bolt", title: "قطاع الطاقة", description: "جهات ومراكز كفاءة الطاقة." },
  { icon: "local_police", title: "القطاع الأمني", description: "جهات أمنية ومرافقها الحيوية." },
  { icon: "business_center", title: "القطاع الخاص", description: "مؤسسات وشركات تتطلّع للتحول الرقمي." },
];

const processSteps = [
  { icon: "travel_explore", title: "الاستكشاف والتحليل", description: "نفهم احتياجاتك ونحلّل وضعك التقني الحالي لتحديد الفرص والأولويات." },
  { icon: "architecture", title: "تصميم الحل", description: "نصمّم حلًا مخصّصًا يحقق أهدافك باستخدام أنسب التقنيات وأفضل الممارسات." },
  { icon: "deployed_code", title: "التنفيذ والتكامل", description: "ننفّذ الحل وندمجه مع أنظمتك القائمة بسلاسة وأمان وأقل تأثير على العمل." },
  { icon: "support_agent", title: "الدعم والتطوير", description: "ندعمك ونطوّر الحل باستمرار لضمان أعلى أداء واستمرارية دون انقطاع." },
];

const prisma = new PrismaClient();

const faqs = [
  { question: "ما الخدمات التي تقدّمها مسارات المستكشف؟", answer: "نقدّم حلولًا متكاملة في الاتصالات والشبكات، البنية التحتية لتقنية المعلومات، الأمن السيبراني، التحول الرقمي وأتمتة الأعمال، الأنظمة الذكية وإنترنت الأشياء، توريد وتركيب الأجهزة، وحلول مراكز البيانات، إضافة إلى عقود الدعم والتشغيل والصيانة." },
  { question: "ما المناطق التي تغطّونها داخل المملكة؟", answer: "نخدم عملاءنا في مختلف مناطق المملكة العربية السعودية، ولدينا سجل تنفيذ مشاريع في عدة مناطق مع جهات حكومية ومؤسسات." },
  { question: "هل تعملون مع الجهات الحكومية؟", answer: "نعم، نفخر بسجل أعمال واسع مع جهات حكومية كالأمانات والبلديات والوزارات والمراكز المتخصصة، ونلتزم بالمعايير والمتطلبات النظامية لهذه الجهات." },
  { question: "كيف أطلب عرض سعر أو استشارة؟", answer: "يمكنك طلب عرض سعر عبر نموذج التواصل في صفحة «تواصل معنا»، أو مباشرة عبر الهاتف أو واتساب أو البريد الإلكتروني، وسيتواصل معك فريقنا في أقرب وقت." },
  { question: "هل تقدّمون عقود دعم وصيانة؟", answer: "نعم، نوفّر عقود دعم وتشغيل وصيانة (وقائية وعلاجية) باتفاقيات مستوى خدمة (SLA) واضحة تضمن جاهزية أنظمتك واستمرارية أعمالك." },
  { question: "كم يستغرق تنفيذ المشروع؟", answer: "يعتمد ذلك على نطاق المشروع وتعقيده. نحدّد جدولًا زمنيًا واضحًا في مرحلة تصميم الحل بعد دراسة احتياجاتك، ونلتزم بمواعيد التسليم المتفق عليها." },
  { question: "هل حلولكم متوافقة مع الأنظمة المحلية؟", answer: "نعم، نحرص على توافق حلولنا مع المتطلبات النظامية المحلية، بما في ذلك متطلبات الفوترة الإلكترونية (هيئة الزكاة والضريبة والجمارك) وأفضل ممارسات حماية البيانات والأمن السيبراني." },
];

async function main() {
  // Settings (singleton)
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: site.name,
      tagline: site.tagline,
      url: site.url,
      email: site.email,
      phone: site.phone,
      phoneDisplay: site.phoneDisplay,
      whatsapp: site.whatsapp,
      address: site.address,
    },
  });

  // Services
  for (const [i, s] of services.entries()) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        slug: s.slug,
        icon: s.icon,
        title: s.title,
        description: s.description,
        overview: s.overview,
        features: s.features,
        accent: s.accent,
        order: i,
      },
    });
  }

  // Products
  for (const [i, p] of products.entries()) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        icon: p.icon,
        title: p.title,
        description: p.description,
        tagline: p.tagline,
        overview: p.overview,
        features: p.features,
        href: p.href ?? null,
        order: i,
      },
    });
  }

  // Projects (no natural unique key — reset then insert)
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: projects.map((p, i) => ({
      client: p.client,
      work: p.work,
      status: p.status,
      category: p.category,
      order: i,
    })),
  });

  // Partners
  await prisma.partner.deleteMany();
  await prisma.partner.createMany({
    data: partners.map((p, i) => ({
      name: p.name,
      sector: p.sector,
      icon: p.icon,
      logo: p.logo ?? null,
      order: i,
    })),
  });

  // FAQs
  await prisma.faq.deleteMany();
  await prisma.faq.createMany({
    data: faqs.map((f, i) => ({ question: f.question, answer: f.answer, order: i })),
  });

  // Advantages
  await prisma.advantage.deleteMany();
  await prisma.advantage.createMany({
    data: advantages.map((a, i) => ({ icon: a.icon, title: a.title, description: a.description, order: i })),
  });

  // Sectors
  await prisma.sector.deleteMany();
  await prisma.sector.createMany({
    data: sectors.map((s, i) => ({ ...s, order: i })),
  });

  // Process steps
  await prisma.processStep.deleteMany();
  await prisma.processStep.createMany({
    data: processSteps.map((s, i) => ({ ...s, order: i })),
  });

  // Admin user
  const email = process.env.ADMIN_EMAIL ?? "admin@mmit.sa";
  const password = process.env.ADMIN_PASSWORD ?? "Admin@12345";
  const name = process.env.ADMIN_NAME ?? "مدير الموقع";
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    update: { name, role: "admin" },
    create: { email, name, role: "admin", passwordHash },
  });

  console.log("✓ Seed complete. Admin:", email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
