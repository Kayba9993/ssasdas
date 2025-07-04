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
  "logo.name": {
    ar: "أكاديمية اللغات",
    en: "Learn Academy",
    es: "Learn Academy",
  },
  "logo.tagline": {
    ar: "تعلم اللغة، غير حياتك",
    en: "Learn the Language, Change Your Life.",
    es: "Domina el idioma y transforma tu futuro.",
  },
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
    ar: "مرحباً بكم في Learn Accademy",
    en: "Welcome to Learn Accademy",
    es: "Bienvenido a Learn Accademy",
  },
  "hero.description1": {
    ar: "خطوتكم الأولى نحو إتقان اللغات الأجنبية تبدأ من هنا.",
    en: "Your first step toward mastering a foreign language starts here.",
    es: "Tu primer paso hacia dominar un idioma extranjero empieza aquí.",
  },
  "hero.description2": {
    ar: "هل تطمح لتعلم اللغة الإنجليزية أو الإسبانية؟\nهل ترغب في تطوير مهاراتك اللغوية لأغراض مهنية، دراسية أو شخصية؟\n.",
    en: "Do you aspire to learn English or Spanish?\nDo you want to improve your language skills for professional, academic, or personal purposes?",
    es: "¿Aspiras a aprender inglés o español?\n¿Quieres mejorar tus habilidades lingüísticas con fines profesionales, académicos o personales?",
  },
  "hero.description3": {
    ar: "في Learn Accademy، نقدم لكم تجربة تعليمية مباشرة، فعالة ومصممة خصيصًا لتناسب احتياجاتكم.",
    en: "At Learn Accademy, we offer a live, effective, and tailored learning experience to meet your needs.",
    es: "En Learn Accademy, te ofrecemos una experiencia educativa en vivo, eficaz y personalizada para adaptarse a tus necesidades.",
  },
  "hero.imageAlt": {
    ar: "تعلم اللغات مع Learn Accademy",
    en: "Learn languages with Learn Accademy",
    es: "Aprende idiomas con Learn Accademy",
  },
  "button.meetProfessors": {
    ar: "تعرف على أساتذتنا",
    en: "Meet Our Professors",
    es: "Conoce a Nuestros Profesores",
  },
  // Features Section
  "features.whyChooseUs": {
    ar: "لماذا تختار Learn Accademy؟",
    en: "Why Choose Learn Accademy?",
    es: "¿Por qué elegir Learn Accademy?",
  },
  "features.quality": {
    ar: "أساتذة معتمدون",
    en: "Qualified Teachers",
    es: "Profesores calificados",
  },
  "features.quality.desc": {
    ar: "دروس مباشرة بتواصل حي مع مدرسين محترفين وذوي خبرة.",
    en: "Live classes with experienced, professional instructors.",
    es: "Clases en vivo con docentes experimentados.",
  },
  "features.prices": {
    ar: "منهج تفاعلي حديث",
    en: "Interactive Method",
    es: "Método interactivo",
  },
  "features.prices.desc": {
    ar: "بدون فيديوهات مسجلة مملة. ستشارك وتتحدث وتتفاعل في الوقت الحقيقي.",
    en: "No boring recordings. Just real-time learning and real conversations.",
    es: "Nada de grabaciones aburridas. Aquí participas y practicas en tiempo real.",
  },
  "features.schedule": {
    ar: "مرونة في المواعيد",
    en: "Flexible Schedules",
    es: "Horarios flexibles",
  },
  "features.schedule.desc": {
    ar: "تعلّم من أي مكان وفي الوقت الذي يناسبك عبر الهاتف أو الكمبيوتر.",
    en: "Learn anytime, from anywhere — phone, tablet, or laptop.",
    es: "Aprende cuando quieras y desde cualquier dispositivo.",
  },
  "features.groups": {
    ar: "حصة تجريبية مجانية",
    en: "Free Trial Class",
    es: "Clase de prueba gratuita",
  },
  "features.groups.desc": {
    ar: "ابدأ اليوم بدون التزام لتتعرف بنفسك على طريقتنا.",
    en: "Try it out with no commitment and see how it works.",
    es: "Empieza sin compromiso y conoce nuestro método.",
  },
  // FAQ / Q&A Section
  "faq.title": {
    ar: "الأسئلة الشائعة",
    en: "Frequently Asked Questions",
    es: "Preguntas Frecuentes",
  },
  "faq.q1": {
    ar: "هل أستطيع تجربة الدروس قبل الاشتراك؟",
    en: "Can I try the lessons before subscribing?",
    es: "¿Puedo probar las clases antes de suscribirme?",
  },
  "faq.a1": {
    ar: "نعم، نقدم حصة تجريبية مجانية لتتعرف على أسلوبنا التعليمي قبل اتخاذ القرار.",
    en: "Yes, we offer a free trial class so you can experience our teaching method before committing.",
    es: "Sí, ofrecemos una clase de prueba gratuita para que conozcas nuestro método antes de decidirte.",
  },
  "faq.q2": {
    ar: "ما هي اللغات التي يمكنني تعلمها؟",
    en: "Which languages can I learn?",
    es: "¿Qué idiomas puedo aprender?",
  },
  "faq.a2": {
    ar: "حاليًا نوفر دورات في اللغة الإنجليزية والإسبانية.",
    en: "Currently, we offer courses in English and Spanish.",
    es: "Actualmente, ofrecemos cursos de inglés y español.",
  },
  "faq.q3": {
    ar: "هل الدروس مباشرة أم مسجلة؟",
    en: "Are the lessons live or recorded?",
    es: "¿Las clases son en vivo o grabadas?",
  },
  "faq.a3": {
    ar: "جميع الدروس مباشرة وتفاعلية مع المعلم.",
    en: "All lessons are live and interactive with the teacher.",
    es: "Todas las clases son en vivo e interactivas con el profesor.",
  },
  "faq.q4": {
    ar: "كيف يمكنني الدفع مقابل الدورات؟",
    en: "How can I pay for the courses?",
    es: "¿Cómo puedo pagar los cursos?",
  },
  "faq.a4": {
    ar: "نوفر خيارات دفع متعددة مثل البطاقة البنكية والتحويل البنكي.",
    en: "We offer multiple payment options such as credit card and bank transfer.",
    es: "Ofrecemos varias opciones de pago como tarjeta de crédito y transferencia bancaria.",
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
  // WhatsApp Float Button
  "whatsapp.float.title": {
    ar: "تحدث معنا",
    en: "Chat with us",
    es: "Chatea con nosotros",
  },
  "whatsapp.float.subtitle": {
    ar: "نحن هنا للمساعدة!",
    en: "We're here to help!",
    es: "¡Estamos aquí para ayudar!",
  },
  "whatsapp.float.greeting": {
    ar: "مرحباً! 👋 كيف يمكننا مساعدتك اليوم؟",
    en: "Hi there! 👋 How can we help you today?",
    es: "¡Hola! 👋 ¿Cómo podemos ayudarte hoy?",
  },
  "whatsapp.float.replyTime": {
    ar: "عادة ما نرد فوراً",
    en: "Typically replies instantly",
    es: "Normalmente responde al instante",
  },
  "whatsapp.float.startChat": {
    ar: "بدء المحادثة",
    en: "Start Chat",
    es: "Iniciar Chat",
  },
  "whatsapp.float.clickToChat": {
    ar: "اضغط للدردشة على الواتساب",
    en: "Click to chat on WhatsApp",
    es: "Haz clic para chatear en WhatsApp",
  },
  "whatsapp.float.tooltip": {
    ar: "تحدث معنا على الواتساب",
    en: "Chat with us on WhatsApp",
    es: "Chatea con nosotros en WhatsApp",
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
  // Admin Login Page
  "admin.login.title": {
    ar: "تسجيل الدخول للوحة التحكم",
    en: "Admin Panel Login",
    es: "Inicio de Sesión del Panel de Administración",
  },
  "admin.login.email": {
    ar: "البريد الإلكتروني",
    en: "Email",
    es: "Correo Electrónico",
  },
  "admin.login.password": {
    ar: "كلمة المرور",
    en: "Password",
    es: "Contraseña",
  },
  "admin.login.emailPlaceholder": {
    ar: "أدخل البريد الإلكتروني",
    en: "Enter email address",
    es: "Ingrese dirección de correo electrónico",
  },
  "admin.login.passwordPlaceholder": {
    ar: "أدخل كلمة المرور",
    en: "Enter password",
    es: "Ingrese contraseña",
  },
  "admin.login.button": {
    ar: "تسجيل الدخول",
    en: "Login",
    es: "Iniciar Sesión",
  },
  "admin.login.loading": {
    ar: "جاري تسجيل الدخول...",
    en: "Logging in...",
    es: "Iniciando sesión...",
  },
  "admin.login.demo": {
    ar: "لتسجيل الدخول التجريبي: admin@example.com / admin123",
    en: "For demo login: admin@example.com / admin123",
    es: "Para inicio de sesión de demostración: admin@example.com / admin123",
  },
  "hero.titlet": {
    ar: "تحدث الإنجليزية بثقة",
    en: "Speak English with confidence",
    es: "Habla inglés con confianza",
  },
  "hero.subtitle": {
    ar: "ابتداءً من فصلك الأول",
    en: "Starting from your very first class",
    es: "Comenzando desde tu primera clase",
  },
  "hero.description": {
    ar: "في Learn Academy، نساعدك على التحدث بالإنجليزية في محادثات حقيقية، وليس مجرد حفظ القواعد.",
    en: "At Learn Academy, we help you speak English in real conversations, not just memorize grammar.",
    es: "En Learn Academy, te ayudamos a hablar inglés en conversaciones reales, no solo memorizar gramática.",
  },
  "hero.cta": {
    ar: "ابدأ فصلي المجاني",
    en: "Start My Free Class",
    es: "Comenzar Mi Clase Gratuita",
  },
  "features.title": {
    ar: "ما تحصل عليه:",
    en: "What you get:",
    es: "Lo que obtienes:",
  },
  "features.teachers": {
    ar: "دروس مباشرة مع مدرسين معتمدين يتحدثون الإنجليزية",
    en: "Live lessons with certified English-speaking teachers",
    es: "Clases en vivo con profesores certificados de habla inglesa",
  },
  "features.method": {
    ar: "طريقة عملية تركز على التحدث والاستماع",
    en: "Practical method focused on speaking & listening",
    es: "Método práctico enfocado en hablar y escuchar",
  },
  "features.schedules": {
    ar: "جدول مرن – تعلم في أي وقت، في أي مكان",
    en: "Flexible schedule – learn anytime, anywhere",
    es: "Horario flexible – aprende en cualquier momento, en cualquier lugar",
  },
  "features.trial": {
    ar: "الفصل الأول مجاناً – بدون التزام!",
    en: "First class FREE – no commitment!",
    es: "¡Primera clase GRATIS – sin compromiso!",
  },
  "why.title": {
    ar: "لماذا تختار Learn Accademy؟",
    en: "Why choose Learn Academy?",
    es: "¿Por qué elegir Learn Academy?",
  },
  "why.subtitle": {
    ar: "لأنك تستحق أن:",
    en: "Because you deserve to:",
    es: "Porque mereces:",
  },
  "why.interviews": {
    ar: "كن واثقاً في المقابلات والاجتماعات",
    en: "Be confident in interviews and meetings",
    es: "Ser confiado en entrevistas y reuniones",
  },
  "why.travel": {
    ar: "سافر وتحدث بدون خوف",
    en: "Travel and speak without fear",
    es: "Viajar y hablar sin miedo",
  },
  "why.opportunities": {
    ar: "ادرس وانمِ فرصك",
    en: "Study and grow your opportunities",
    es: "Estudiar y hacer crecer tus oportunidades",
  },
  "why.speak": {
    ar: "وأخيراً تحدث الإنجليزية، وليس مجرد دراستها",
    en: "And finally speak English, not just study it",
    es: "Y finalmente hablar inglés, no solo estudiarlo",
  },
  "testimonials.titlet": {
    ar: "آلاف المتعلمين يثقون بالفعل في Learn Academy",
    en: "Thousands of learners already trust Learn Academy",
    es: "Miles de estudiantes ya confían en Learn Academy",
  },
  "cta.title": {
    ar: "ابدأ رحلتك الآن",
    en: "Start your journey now",
    es: "Comienza tu viaje ahora",
  },
  "cta.subtitle": {
    ar: "انضم اليوم واحصل على فصل تجريبي مجاني.",
    en: "Join today and get your free trial class.",
    es: "Únete hoy y obtén tu clase de prueba gratuita.",
  },
  "footer.support": {
    ar: "تحتاج مساعدة؟ فريق الدعم متاح 24/7.",
    en: "Need help? Our support team is available 24/7.",
    es: "¿Necesitas ayuda? Nuestro equipo de soporte está disponible 24/7.",
  },
  "teacher.specializations": {
    ar: "التخصصات",
    en: "Specializations",
    es: "Especializaciones",
  },
  // Teacher Detail Page
  "teacher.specializations": {
    ar: "التخصصات",
    en: "Specializations",
    es: "Especializaciones",
  },
  "teacher.qualification": {
    ar: "التأهيل العلمي",
    en: "Qualification",
    es: "Cualificación",
  },
  "teacher.experience": {
    ar: "سنوات الخبرة",
    en: "Years of Experience",
    es: "Años de Experiencia",
  },
  "teacher.experienceYears": {
    ar: "{years} سنة",
    en: "{years} years",
    es: "{years} años",
  },
  "teacher.bio": {
    ar: "نبذة عن المدرس",
    en: "About the Teacher",
    es: "Acerca del Profesor",
  },
  "teacher.defaultBio": {
    ar: "مدرس متخصص في تدريس اللغات",
    en: "Specialized language teacher",
    es: "Profesor especializado en idiomas",
  },
  "teacher.defaultExperience": {
    ar: "خبرة واسعة في التدريس",
    en: "Extensive teaching experience",
    es: "Amplia experiencia docente",
  },
  "hero.badge": {
    ar: "تعلم الإنجليزية بسهولة",
    en: "English Learning Made Simple",
    es: "Aprender inglés de manera simple",
  },
  "features.trial.description": {
    ar: "جرب قبل أن تلتزم بأي شيء",
    en: "Try before you commit to anything",
    es: "Prueba antes de comprometerte con algo",
  },
  "features.schedule.description": {
    ar: "اجعل التعلم يتناسب مع نمط حياتك المزدحم",
    en: "Fit learning into your busy lifestyle",
    es: "Adapta el aprendizaje a tu estilo de vida ocupado",
  },
  "features.method.description": {
    ar: "محادثات حقيقية، وليس مجرد تمارين قواعد",
    en: "Real conversations, not just grammar drills",
    es: "Conversaciones reales, no solo ejercicios de gramática",
  },
  "features.teachers.description": {
    ar: "تعلم من متحدثين أصليين ذوي خبرة",
    en: "Learn from experienced native speakers",
    es: "Aprende de hablantes nativos experimentados",
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