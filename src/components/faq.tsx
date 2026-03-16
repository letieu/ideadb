"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is ideaDB?",
    answer:
      "ideaDB is a curated, read-only database of real-world problems, startup ideas, and existing products. It aggregates publicly available discussions from Reddit, Hacker News, and other social networks so that innovators and entrepreneurs can do focused market and problem research in one place.",
  },
  {
    question: "Where does the data come from?",
    answer:
      "All content is aggregated from public sources — primarily Reddit and Hacker News. Each problem and idea detail page shows the original source posts, including the author, community score, date, and a direct link back to the original discussion.",
  },
  {
    question: "How often is the database updated?",
    answer:
      "The database is updated daily with newly discovered problems, ideas, and products sourced from social networks.",
  },
  {
    question: "What is the difference between Problems, Ideas, and Products?",
    answer:
      "Problems are real pain points expressed by real users in online communities. Ideas are innovative concepts or feature-sets proposed to address those problems. Products are existing market solutions — tools and services already tackling one or more of the listed problems. They are cross-linked so you can navigate from a problem to its potential solutions and back.",
  },
  {
    question: "Can I submit a problem or idea?",
    answer:
      "Not directly — ideaDB is currently a curated, read-only database. You can upvote problems and ideas to surface the most relevant ones. If you have a suggestion or want to contribute, reach out via the Contact & Feedback link below.",
  },
  {
    question: "Is ideaDB free to use?",
    answer:
      "Yes. ideaDB is completely free to browse with no account or subscription required.",
  },
  {
    question: "Is ideaDB open source?",
    answer:
      "Yes. The source code is available on GitHub. You can find the link in the top-right corner of the site.",
  },
  {
    question: "Who is ideaDB built for?",
    answer:
      "ideaDB is built for startup founders, indie hackers, product managers, and anyone who wants to deeply understand real user problems before building a solution. It is especially useful for idea validation and market research.",
  },
];

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/10 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
        aria-expanded={open}
      >
        <span className="text-xs font-semibold tracking-wide text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-150">
          {question}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-muted-foreground/30 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <p className="pb-4 text-xs text-muted-foreground/40 leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
}

export function Faq() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="text-center text-[10px] tracking-[0.2em] uppercase text-muted-foreground/25 font-bold mb-6">
        Frequently Asked Questions
      </p>
      <div>
        {faqs.map((faq) => (
          <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}
