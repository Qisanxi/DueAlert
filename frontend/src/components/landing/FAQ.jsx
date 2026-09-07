import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'Do parents need to install any app?',
    a: 'No. DueAlert generates reminders that you send via WhatsApp. Parents just receive a normal WhatsApp message — nothing to install, no signup for them.',
  },
  {
    q: 'Is my student data safe?',
    a: 'Yes. Your data lives on Google Cloud (Firebase + Firestore) with the same encryption standard used by banks. Each institution\u2019s data is isolated — no other center can see your students.',
  },
  {
    q: 'Does DueAlert automatically send messages to parents?',
    a: 'No — you stay in control. DueAlert\u2019s AI drafts the perfect message for each student, but you review and hit send yourself. We never message parents without your approval.',
  },
  {
    q: 'What if a parent doesn\u2019t use WhatsApp?',
    a: 'The generated reminder can be copied as plain text and sent via SMS, email, or printed for a phone call. WhatsApp is the default because most Indian parents use it daily.',
  },
  {
    q: 'Can I import my existing student list?',
    a: 'Yes. Just upload a CSV file with student name, parent name, phone, course, fee amount, and due date. DueAlert imports them all at once and immediately runs AI analysis on each.',
  },
  {
    q: 'How accurate is the AI risk prediction?',
    a: 'The AI looks at payment history patterns, due date proximity, outstanding amount, and past delays to score each student 0–100. It\u2019s a smart prioritization tool — not a crystal ball — but it helps you focus your follow-up time where it matters most.',
  },
  {
    q: 'What does it cost?',
    a: 'DueAlert is currently free during the hackathon period. After launch, pricing will be a simple monthly subscription per institution — no per-student fees, no commissions on collections.',
  },
]

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="bg-white rounded-xl border border-warm-200 overflow-hidden transition-colors hover:border-brand-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-ink2-900 text-base">{faq.q}</span>
        <ChevronDown
          className={`h-5 w-5 text-brand-700 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-ink2-700 leading-relaxed text-sm">{faq.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {FAQS.map((faq, i) => (
        <FaqItem
          key={faq.q}
          faq={faq}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? -1 : i)}
        />
      ))}
    </div>
  )
}
