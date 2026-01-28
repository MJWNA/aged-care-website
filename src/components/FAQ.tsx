import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'I am new to aged care, where do I start?',
      answer: (
        <>
          <strong>Step 1:</strong> Call My Aged Care on{' '}
          <a 
            href="tel:1800200422" 
            className="font-bold underline hover:no-underline"
            style={{ color: '#f4b400' }}
          >
            1800 200 422
          </a>{' '}
          to register and get assessed.
          <br /><br />
          <strong>Step 2:</strong> Once approved, call us and we'll help you find the right provider - completely free.
        </>
      )
    },
    {
      question: 'What support services can I get through the program?',
      answer: (
        <>
          The program covers <strong>personal care</strong>, <strong>nursing</strong>, <strong>allied health</strong> (physio, podiatry), <strong>domestic help</strong>, <strong>transport</strong>, <strong>meals</strong>, <strong>home modifications</strong>, and <strong>respite care</strong>.
          <br /><br />
          <strong>Every family's needs are different.</strong> Let us help you understand exactly what you're entitled to and which services will make the biggest difference for your loved one.
          <br /><br />
          <strong style={{ color: '#f4b400' }}>Call us today - we're here to help.</strong>
        </>
      )
    },
    {
      question: 'How do I know if I am eligible for the Support at Home program?',
      answer: (
        <>
          Most Australians over 65 (or 50+ for Aboriginal and Torres Strait Islander people) qualify for some level of support.
          <br /><br />
          <strong>The question isn't just "Am I eligible?" - it's "What am I entitled to?"</strong>
          <br /><br />
          We help families navigate the assessment process and <strong>maximize what you're entitled to</strong>. Many families don't realize the full extent of services available to them.
          <br /><br />
          <strong style={{ color: '#f4b400' }}>Call us - let's find out what support your family can access.</strong>
        </>
      )
    },
    {
      question: 'Can I change providers under Support at Home?',
      answer: 'Yes. You can move providers at any time. We help you compare options and navigate transfers so care stays continuous.'
    },
    {
      question: 'What if I\'m already with a provider but unhappy?',
      answer: 'You\'re not stuck. We can help you review other providers, understand options, and move to a better fit without exit fees under the new rules.'
    }
  ];

  return (
    <section id="faq" className="py-12 md:py-20" style={{ background: '#f7f9fb' }}>
      <div className="container max-w-[900px] mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4" style={{ color: '#0f4c75' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg" style={{ color: '#718096' }}>
            Everything you need to know about our free service
          </p>
        </div>
        
        <div className="space-y-3 md:space-y-4">
          {faqs.slice(0, 5).map((faq, index) => (
            <div 
              key={index} 
              className="md:hidden rounded-xl overflow-hidden shadow-md border transition-all duration-200"
            >
              <details 
                open={openIndex === index}
                className="rounded-2xl p-4 border shadow-lg cursor-pointer"
                style={{
                  background: '#ffffff',
                  borderColor: '#e7edf5'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenIndex(openIndex === index ? null : index);
                }}
              >
                <summary className="font-bold cursor-pointer list-none" style={{ color: '#0f1f2e' }}>
                  {faq.question}
                </summary>
                {openIndex === index && (
                  <div className="mt-3" style={{ color: '#566273' }}>
                    {faq.answer}
                  </div>
                )}
              </details>
            </div>
          ))}
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="hidden md:block rounded-xl overflow-hidden shadow-md border transition-all duration-200"
            >
              <details 
                open={openIndex === index}
                className="rounded-2xl p-4 border shadow-lg cursor-pointer"
                style={{
                  background: '#ffffff',
                  borderColor: '#e7edf5'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenIndex(openIndex === index ? null : index);
                }}
              >
                <summary className="font-bold cursor-pointer list-none" style={{ color: '#0f1f2e' }}>
                  {faq.question}
                </summary>
                {openIndex === index && (
                  <div className="mt-3" style={{ color: '#566273' }}>
                    {faq.answer}
                  </div>
                )}
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}











