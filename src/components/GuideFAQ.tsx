import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { guideFAQs } from "@/lib/guide-faqs";

interface Props {
  slug: string;
}

/**
 * Renders a visible FAQ accordion for a guide and emits matching FAQPage
 * JSON-LD so Google can surface the Q&As as rich results. The answers
 * shown on screen and the answers in the structured data are identical —
 * Google requires this for FAQ rich-result eligibility.
 */
const GuideFAQ = ({ slug }: Props) => {
  const faqs = guideFAQs[slug];
  if (!faqs?.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <section className="container mx-auto px-6 md:px-12 lg:px-20 py-12 max-w-3xl">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <h2 className="heading-section mb-6">Frequently asked questions</h2>
      <Accordion type="single" collapsible>
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`guide-faq-${i}`}>
            <AccordionTrigger className="text-left text-base font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default GuideFAQ;
