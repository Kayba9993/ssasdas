import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define available languages
export type SupportedLanguage = 'ar' | 'en' | 'es';

type Translations = {
  [key: string]: {
    [key in SupportedLanguage]: string;
  };
};

// Initial translation data
const translations: Translations = {
  // Common UI elements
  "nav.home": {
    ar: "الرئيسية",
    en: "Home",
    es: "Inicio",
  },
  "nav.professors": {
    ar: "المدرسين",
    en: "Professors",
    es: "Profesores",
  },
  "nav.languages": {
    ar: "اللغات",
    en: "Languages",
    es: "Idiomas",
  },
  "nav.register": {
    ar: "التسجيل",
    en: "Register",
    es: "Registro",
  },
  "nav.contact": {
    ar: "اتصل بنا",
    en: "Contact Us",
    es: "Contacto",
  },
  "button.register": {
    ar: "سجل الآن",
    en: "Register Now",
    es: "Regístrate Ahora",
  },
  "button.submit": {
    ar: "إرسال",
    en: "Submit",
    es: "Enviar",
  },
  "button.cancel": {
    ar: "إلغاء",
    en: "Cancel",
    es: "Cancelar",
  },
  "button.registering": {
    ar: "جاري التسجيل...",
    en: "Registering...",
    es: "Registrando...",
  },
  "button.submitRegistration": {
    ar: "إرسال طلب التسجيل",
    en: "Submit Registration",
    es: "Enviar Registro",
  },
  "languages.title": {
    ar: "اللغات المتوفرة",
    en: "Available Languages",
    es: "Idiomas Disponibles",
  },
  "languages.registerCourse": {
    ar: "سجل في إحدى دوراتنا",
    en: "Register for a course",
    es: "Regístrate en un curso",
  },
  "language.select": {
    ar: "اختر اللغة",
    en: "Select Language",
    es: "Seleccionar Idioma",
  },
  // Hero Section
  "hero.title": {
    ar: "دورات لغوية عالية الجودة بأسعار معقولة",
    en: "High-Quality Language Courses at Reasonable Prices",
    es: "Cursos de Idiomas de Alta Calidad a Precios Razonables",
  },
  "hero.description1": {
    ar: "نعتقد أن اختيار الدورة المناسبة لا يجب أن يكون أمرًا معقدًا. إذا لم تكن راضيًا عن الدورة التي اخترتها.",
    en: "We believe that choosing the right course shouldn't be complicated. If you're not satisfied with your chosen course.",
    es: "Creemos que elegir el curso adecuado no debería ser complicado. Si no estás satisfecho con el curso que elegiste.",
  },
  "hero.description2": {
    ar: "ابدأ الآن تعلم لغتك المفضلة في بيئة تعليمية مريحة وبأسعار مناسبة!",
    en: "Start learning your favorite language now in a comfortable educational environment at affordable prices!",
    es: "¡Empieza a aprender tu idioma favorito ahora en un entorno educativo cómodo y a precios asequibles!",
  },
  "hero.imageAlt": {
    ar: "دورة لغوية",
    en: "Language Course",
    es: "Curso de Idioma",
  },
  "button.meetProfessors": {
    ar: "تعرف على أساتذتنا",
    en: "Meet Our Professors",
    es: "Conoce a Nuestros Profesores",
  },
  // Features Section
  "features.whyChooseUs": {
    ar: "لماذا تختارنا؟",
    en: "Why Choose Us?",
    es: "¿Por qué elegirnos?",
  },
  "features.quality": {
    ar: "جودة عالية",
    en: "High Quality",
    es: "Alta Calidad",
  },
  "features.quality.desc": {
    ar: "أساتذة متخصصون في تدريس اللغات بشهادات معتمدة وخبرات واسعة",
    en: "Specialized professors in language teaching with certified qualifications and extensive experience",
    es: "Profesores especializados en la enseñanza de idiomas con cualificaciones certificadas y amplia experiencia",
  },
  "features.prices": {
    ar: "أسعار معقولة",
    en: "Reasonable Prices",
    es: "Precios Razonables",
  },
  "features.prices.desc": {
    ar: "أسعار تنافسية مع خيارات متعددة تناسب مختلف الميزانيات",
    en: "Competitive prices with multiple options to suit different budgets",
    es: "Precios competitivos con múltiples opciones para adaptarse a diferentes presupuestos",
  },
  "features.schedule": {
    ar: "مواعيد مرنة",
    en: "Flexible Schedule",
    es: "Horario Flexible",
  },
  "features.schedule.desc": {
    ar: "دورات صباحية ومسائية وعطلة نهاية الأسبوع لتناسب جدولك الزمني",
    en: "Morning, evening and weekend courses to suit your schedule",
    es: "Cursos de mañana, tarde y fin de semana para adaptarse a tu horario",
  },
  "features.groups": {
    ar: "مجموعات صغيرة",
    en: "Small Groups",
    es: "Grupos Pequeños",
  },
  "features.groups.desc": {
    ar: "عدد محدود من الطلاب في كل مجموعة لضمان الاستفادة القصوى",
    en: "Limited number of students in each group to ensure maximum benefit",
    es: "Número limitado de estudiantes en cada grupo para garantizar el máximo beneficio",
  },
  // Testimonials Section
  "testimonials.title": {
    ar: "ماذا يقول طلابنا",
    en: "What Our Students Say",
    es: "Lo que dicen nuestros estudiantes",
  },
  // Teachers/Professors Section
  "professors.title": {
    ar: "أساتذتنا",
    en: "Our Professors",
    es: "Nuestros Profesores",
  },
  "professors.meetButton": {
    ar: "تعرف على الأستاذ",
    en: "Meet the Professor",
    es: "Conoce al Profesor",
  },
  "professors.viewAll": {
    ar: "عرض جميع الأساتذة",
    en: "View All Professors",
    es: "Ver Todos los Profesores",
  },
  "professors.backToList": {
    ar: "العودة إلى قائمة الأساتذة",
    en: "Back to Professors List",
    es: "Volver a la Lista de Profesores",
  },
  "professors.contactViaWhatsApp": {
    ar: "تواصل مع الأستاذ عبر الواتساب",
    en: "Contact Professor via WhatsApp",
    es: "Contactar al Profesor por WhatsApp",
  },
  "professors.notFound": {
    ar: "الأستاذ غير موجود",
    en: "Professor not found",
    es: "Profesor no encontrado",
  },
  // Teachers page (fixing the missing translation)
  "teachers.title": {
    ar: "أساتذتنا",
    en: "Our Teachers",
    es: "Nuestros Profesores",
  },
  // Registration Page
  "register.title": {
    ar: "التسجيل في الدورات",
    en: "Course Registration",
    es: "Registro de Cursos",
  },
  "register.description": {
    ar: "املأ النموذج أدناه للتسجيل في إحدى دوراتنا اللغوية. سيتواصل معك فريقنا في أقرب وقت ممكن لتأكيد التسجيل وترتيب مواعيد الدروس.",
    en: "Fill out the form below to register for one of our language courses. Our team will contact you as soon as possible to confirm registration and arrange lesson times.",
    es: "Complete el formulario a continuación para registrarse en uno de nuestros cursos de idiomas. Nuestro equipo se pondrá en contacto con usted lo antes posible para confirmar el registro y organizar los horarios de las clases.",
  },
  "register.paymentMethod.card": {
    ar: "تسجيل",
    en: "Register",
    es: "Registro",
  },
  "register.paymentMethod.bank": {
    ar: "تحويل بنكي",
    en: "Bank Transfer",
    es: "Transferencia Bancaria",
  },
  "register.bankTransfer.title": {
    ar: "بإمكانك الدفع مسبقا",
    en: "You can pay in advance",
    es: "Puede pagar por adelantado",
  },
  "register.bankTransfer.instruction": {
    ar: "عبر الإرسال لأحد البنوك أسفله",
    en: "Via transfer to one of the banks below",
    es: "Mediante transferencia a uno de los bancos siguientes",
  },
  "register.bankTransfer.baridBank": {
    ar: "عبر BARID BANK",
    en: "Via BARID BANK",
    es: "A través de BARID BANK",
  },
  "register.bankTransfer.cihBank": {
    ar: "عبر CIH BANK",
    en: "Via CIH BANK",
    es: "A través de CIH BANK",
  },
  "register.bankTransfer.accountHolder": {
    ar: "صاحب الحساب",
    en: "Account Holder",
    es: "Titular de la cuenta",
  },
  "register.bankTransfer.contactAfter": {
    ar: "بعد إتمام التحويل، يرجى التواصل معنا عبر واتساب لتأكيد تسجيلك",
    en: "After completing the transfer, please contact us via WhatsApp to confirm your registration",
    es: "Después de completar la transferencia, contáctenos a través de WhatsApp para confirmar su registro",
  },
  "register.bankTransfer.contactWhatsApp": {
    ar: "تواصل معنا عبر واتساب",
    en: "Contact us via WhatsApp",
    es: "Contáctenos por WhatsApp",
  },
  "register.form.title": {
    ar: "سجل الآن",
    en: "Register Now",
    es: "Regístrate Ahora",
  },
  "register.form.personalInfo": {
    ar: "المعلومات الشخصية",
    en: "Personal Information",
    es: "Información Personal",
  },
  "register.form.courseInfo": {
    ar: "معلومات الدورة",
    en: "Course Information",
    es: "Información del Curso",
  },
  // Form Fields
  "form.fullName": {
    ar: "الاسم الكامل",
    en: "Full Name",
    es: "Nombre Completo",
  },
  "form.fullNamePlaceholder": {
    ar: "الاسم و النسب",
    en: "First and Last Name",
    es: "Nombre y Apellido",
  },
  "form.age": {
    ar: "العمر",
    en: "Age",
    es: "Edad",
  },
  "form.agePlaceholder": {
    ar: "العمر",
    en: "Age",
    es: "Edad",
  },
  "form.email": {
    ar: "البريد الإلكتروني",
    en: "Email",
    es: "Correo Electrónico",
  },
  "form.emailPlaceholder": {
    ar: "البريد الإلكتروني",
    en: "Email Address",
    es: "Dirección de Correo Electrónico",
  },
  "form.phone": {
    ar: "الهاتف",
    en: "Phone",
    es: "Teléfono",
  },
  "form.phonePlaceholder": {
    ar: "الهاتف",
    en: "Phone Number",
    es: "Número de Teléfono",
  },
  "form.selectLevel": {
    ar: "حدد المستوى",
    en: "Select Level",
    es: "Seleccionar Nivel",
  },
  "form.chooseLevelPlaceholder": {
    ar: "اختر المستوى",
    en: "Choose Level",
    es: "Elegir Nivel",
  },
  "level.beginner": {
    ar: "مبتدئ",
    en: "Beginner",
    es: "Principiante",
  },
  "level.intermediate": {
    ar: "متوسط",
    en: "Intermediate",
    es: "Intermedio",
  },
  "level.advanced": {
    ar: "متقدم",
    en: "Advanced",
    es: "Avanzado",
  },
  "form.selectLanguage": {
    ar: "حدد اللغة",
    en: "Select Language",
    es: "Seleccionar Idioma",
  },
  "form.chooseLanguagePlaceholder": {
    ar: "اختر اللغة",
    en: "Choose Language",
    es: "Elegir Idioma",
  },
  "form.selectSubscription": {
    ar: "حدد اشتراكك",
    en: "Select Subscription",
    es: "Seleccionar Suscripción",
  },
  "form.chooseSubscriptionPlaceholder": {
    ar: "اختر نوع الاشتراك",
    en: "Choose Subscription Type",
    es: "Elegir Tipo de Suscripción",
  },
  "subscription.individual": {
    ar: "فردي",
    en: "Individual",
    es: "Individual",
  },
  "subscription.group": {
    ar: "جماعي",
    en: "Group",
    es: "Grupo",
  },
  "subscription.online": {
    ar: "عبر الإنترنت",
    en: "Online",
    es: "En línea",
  },
  "form.paymentMethod": {
    ar: "طريقة الدفع",
    en: "Payment Method",
    es: "Método de Pago",
  },
  "form.creditCard": {
    ar: "بطاقة ائتمان",
    en: "Credit Card",
    es: "Tarjeta de Crédito",
  },
  // Notifications
  "notifications.registrationSuccess": {
    ar: "تم إرسال طلب التسجيل بنجاح",
    en: "Registration request sent successfully",
    es: "Solicitud de registro enviada con éxito",
  },
  "notifications.contactSoon": {
    ar: "سنتواصل معك قريبًا لتأكيد التسجيل",
    en: "We will contact you soon to confirm registration",
    es: "Nos pondremos en contacto contigo pronto para confirmar el registro",
  },
  "notifications.error": {
    ar: "حدث خطأ",
    en: "An error occurred",
    es: "Se produjo un error",
  },
  "notifications.tryAgain": {
    ar: "يرجى المحاولة مرة أخرى",
    en: "Please try again",
    es: "Inténtalo de nuevo",
  },
  "whatsapp.newRegistration": {
    ar: "طلب تسجيل جديد",
    en: "New registration request",
    es: "Nueva solicitud de registro",
  },
  // Languages Page
  "languages.pageTitle": {
    ar: "اللغات المتوفرة",
    en: "Available Languages",
    es: "Idiomas Disponibles",
  },
  "languages.learnWith": {
    ar: "تعلم {language} مع أفضل الأساتذة المتخصصين. دورات لجميع المستويات من المبتدئ إلى المتقدم.",
    en: "Learn {language} with the best specialized professors. Courses for all levels from beginner to advanced.",
    es: "Aprende {language} con los mejores profesores especializados. Cursos para todos los niveles desde principiante hasta avanzado.",
  },
  "button.inquiry": {
    ar: "استفسار",
    en: "Inquiry",
    es: "Consulta",
  },
  // Contact Page
  "contact.title": {
    ar: "تواصل معنا",
    en: "Contact Us",
    es: "Contáctanos",
  },
  "contact.description": {
    ar: "نحن هنا للإجابة على جميع استفساراتك. يمكنك التواصل معنا عبر إحدى الطرق التالية.",
    en: "We are here to answer all your inquiries. You can contact us through one of the following methods.",
    es: "Estamos aquí para responder a todas sus consultas. Puede contactarnos a través de uno de los siguientes métodos.",
  },
  "contact.methods": {
    ar: "وسائل الاتصال",
    en: "Contact Methods",
    es: "Métodos de Contacto",
  },
  "contact.phone": {
    ar: "الهاتف",
    en: "Phone",
    es: "Teléfono",
  },
  "contact.email": {
    ar: "البريد الإلكتروني",
    en: "Email",
    es: "Correo Electrónico",
  },
  "contact.address": {
    ar: "العنوان",
    en: "Address",
    es: "Dirección",
  },
  "contact.whatsapp": {
    ar: "واتساب",
    en: "WhatsApp",
    es: "WhatsApp",
  },
  "contact.whatsapp.desc": {
    ar: "يمكنك التواصل معنا مباشرة عبر واتساب للحصول على رد سريع",
    en: "You can contact us directly via WhatsApp for a quick response",
    es: "Puede contactarnos directamente a través de WhatsApp para obtener una respuesta rápida",
  },
  "button.whatsapp": {
    ar: "مراسلة عبر واتساب",
    en: "Message via WhatsApp",
    es: "Mensaje por WhatsApp",
  },
  // Footer
  "footer.description": {
    ar: "نقدم دورات لغوية عالية الجودة بأسعار معقولة. نؤمن بأن تعلم لغة جديدة يجب أن يكون متاحًا للجميع.",
    en: "We offer high quality language courses at reasonable prices. We believe that learning a new language should be accessible to everyone.",
    es: "Ofrecemos cursos de idiomas de alta calidad a precios razonables. Creemos que aprender un nuevo idioma debe ser accesible para todos.",
  },
  "footer.quickLinks": {
    ar: "روابط سريعة",
    en: "Quick Links",
    es: "Enlaces Rápidos",
  },
  "footer.contactUs": {
    ar: "تواصل معنا",
    en: "Contact Us",
    es: "Contáctanos",
  },
  "footer.copyright": {
    ar: "© {year} أكاديمية اللغات. جميع الحقوق محفوظة",
    en: "© {year} Language Academy. All Rights Reserved",
    es: "© {year} Academia de Idiomas. Todos los derechos reservados",
  },
  // WhatsApp Page
  "whatsapp.title": {
    ar: "تواصل معنا عبر واتساب",
    en: "Contact Us via WhatsApp",
    es: "Contáctanos por WhatsApp",
  },
  "whatsapp.description": {
    ar: "يمكنك التواصل معنا بسهولة عبر واتساب للاستفسار عن الدورات اللغوية أو للتسجيل في دورة معينة.",
    en: "You can easily contact us via WhatsApp to inquire about language courses or to register for a specific course.",
    es: "Puedes contactarnos fácilmente a través de WhatsApp para preguntar sobre cursos de idiomas o para registrarte en un curso específico.",
  },
  "whatsapp.form.title": {
    ar: "تواصل معنا عبر واتساب",
    en: "Contact Us via WhatsApp",
    es: "Contáctanos por WhatsApp",
  },
  "whatsapp.form.name": {
    ar: "الاسم",
    en: "Name",
    es: "Nombre",
  },
  "whatsapp.form.message": {
    ar: "الرسالة",
    en: "Message",
    es: "Mensaje",
  },
  "whatsapp.form.send": {
    ar: "إرسال عبر الواتساب",
    en: "Send via WhatsApp",
    es: "Enviar por WhatsApp",
  },
  "whatsapp.form.sending": {
    ar: "جاري الإرسال...",
    en: "Sending...",
    es: "Enviando...",
  },
  "whatsapp.form.hint": {
    ar: "سيتم فتح تطبيق واتساب تلقائيًا بعد الضغط على الزر",
    en: "WhatsApp will open automatically after clicking the button",
    es: "WhatsApp se abrirá automáticamente después de hacer clic en el botón",
  },
  // Error/NotFound Page
  "404.title": {
    ar: "404",
    en: "404",
    es: "404",
  },
  "404.message": {
    ar: "عذراً، الصفحة غير موجودة",
    en: "Sorry, page not found",
    es: "Lo sentimos, página no encontrada",
  },
  "404.button": {
    ar: "العودة إلى الصفحة الرئيسية",
    en: "Return to Home Page",
    es: "Volver a la Página Principal",
  },
  // Loading states
  "loading.general": {
    ar: "جاري التحميل...",
    en: "Loading...",
    es: "Cargando...",
  },
  "loading.teachers": {
    ar: "جاري تحميل المدرسين...",
    en: "Loading teachers...",
    es: "Cargando profesores...",
  },
  "loading.languages": {
    ar: "جاري تحميل اللغات...",
    en: "Loading languages...",
    es: "Cargando idiomas...",
  },
  // Error states
  "error.general": {
    ar: "حدث خطأ في التحميل",
    en: "Loading error occurred",
    es: "Ocurrió un error de carga",
  },
  "error.retry": {
    ar: "إعادة المحاولة",
    en: "Retry",
    es: "Reintentar",
  },
  // Common actions
  "action.viewMore": {
    ar: "عرض المزيد",
    en: "View More",
    es: "Ver Más",
  },
  "action.viewLess": {
    ar: "عرض أقل",
    en: "View Less",
    es: "Ver Menos",
  },
  "action.close": {
    ar: "إغلاق",
    en: "Close",
    es: "Cerrar",
  },
  "action.save": {
    ar: "حفظ",
    en: "Save",
    es: "Guardar",
  },
  "action.edit": {
    ar: "تعديل",
    en: "Edit",
    es: "Editar",
  },
  "action.delete": {
    ar: "حذف",
    en: "Delete",
    es: "Eliminar",
  },
  "action.confirm": {
    ar: "تأكيد",
    en: "Confirm",
    es: "Confirmar",
  },
  // Status messages
  "status.success": {
    ar: "تم بنجاح",
    en: "Success",
    es: "Éxito",
  },
  "status.failed": {
    ar: "فشل",
    en: "Failed",
    es: "Falló",
  },
  "status.pending": {
    ar: "في الانتظار",
    en: "Pending",
    es: "Pendiente",
  },
  "status.completed": {
    ar: "مكتمل",
    en: "Completed",
    es: "Completado",
  },
  // Time and dates
  "time.today": {
    ar: "اليوم",
    en: "Today",
    es: "Hoy",
  },
  "time.yesterday": {
    ar: "أمس",
    en: "Yesterday",
    es: "Ayer",
  },
  "time.tomorrow": {
    ar: "غداً",
    en: "Tomorrow",
    es: "Mañana",
  },
  "time.week": {
    ar: "أسبوع",
    en: "Week",
    es: "Semana",
  },
  "time.month": {
    ar: "شهر",
    en: "Month",
    es: "Mes",
  },
  "time.year": {
    ar: "سنة",
    en: "Year",
    es: "Año",
  },
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    // Get language from localStorage or default to Arabic
    const savedLanguage = localStorage.getItem('language') as SupportedLanguage;
    return savedLanguage && ['ar', 'en', 'es'].includes(savedLanguage) ? savedLanguage : 'ar';
  });

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || translations[key]['ar'] || key;
  };

  // Determine text direction based on language
  const getDirection = (lang: SupportedLanguage): 'rtl' | 'ltr' => {
    return lang === 'ar' ? 'rtl' : 'ltr';
  };

  // Direction based on language
  const dir = getDirection(language);

  // Apply direction to HTML element
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    
    // Add appropriate class for text alignment based on direction
    if (dir === 'rtl') {
      document.documentElement.classList.add('rtl');
      document.documentElement.classList.remove('ltr');
    } else {
      document.documentElement.classList.add('ltr');
      document.documentElement.classList.remove('rtl');
    }
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};