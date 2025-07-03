import { useLanguage } from "@/contexts/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const { t, dir } = useLanguage();

  const faqs = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1')
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2')
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3')
    },
    {
      question: t('faq.q4'),
      answer: t('faq.a4')
    }
  ];

  return (
    <div className="py-16 bg-gray-50" dir={dir}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-academy-green">
          {t("faq.title")}
        </h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                <AccordionTrigger 
                  className={`text-left hover:no-underline py-6 ${
                    dir === 'rtl' ? 'text-right font-arabic' : 'text-left'
                  }`}
                >
                  <span className={`text-lg font-semibold text-gray-800 ${
                    dir === 'rtl' ? 'font-arabic' : ''
                  }`}>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent 
                  className={`pb-6 ${
                    dir === 'rtl' ? 'text-right font-arabic' : 'text-left'
                  }`}
                >
                  <p className={`text-gray-600 leading-relaxed ${
                    dir === 'rtl' ? 'font-arabic' : ''
                  }`}>
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;