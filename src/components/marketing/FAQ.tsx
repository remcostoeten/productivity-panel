/**
 * This code was generated by Builder.io.
 */
import React from 'react';
import FAQItem from './FAQItem';

const faqItems = [
  {
    question: 'Do you have an annual plan or discounts?',
    iconSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/e2506519800fa37bb575769e982166ca2b3d4ad0b0a5048a190abdb106e3aeb9?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197',
  },
  {
    question: 'What happens when I reach the limit on the number of Blocks?',
    iconSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/659acfa84ad27be2241465a05c831eebfed93676ad2faa1b90b050ca30080c46?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197',
  },
  {
    question:
      'What happens when I reach the limit on the number of API Requests made?',
    iconSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/a6cde920ae5bc4e31059d4f04d01d5b9d439111d400145c7ee240c600a48afc9?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197',
  },
  {
    question: 'How are the number of Blocks counted?',
    iconSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/598918046523c1a9a121a34b8d95ac5b584296d8564ccdce437c81d6308272ee?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197',
  },
  {
    question: 'Is there any free trial available for the Team Plan?',
    iconSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/8cfee1ecc9aabcdf22b72964624ed6425ac71defa8f05bc1c16d967523506246?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197',
  },
];

const FAQ: React.FC = () => {
  return (
    <section className="mt-20">
      <h2 className="self-start mt-20 text-2xl font-medium tracking-tighter leading-none text-zinc-100 max-md:mt-10">
        Frequently Asked Questions
      </h2>
      {faqItems.map((item, index) => (
        <FAQItem key={index} {...item} />
      ))}
    </section>
  );
};

export default FAQ;