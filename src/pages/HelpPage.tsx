import { HelpCircle, Book, MessageCircle, FileText, ChevronRight } from "lucide-react";
import { faqs } from "@/data/mock";

const resources = [
  { icon: Book, title: "Getting Started Guide", desc: "Learn the basics of managing your finances" },
  { icon: MessageCircle, title: "Contact Support", desc: "Chat with our team for help" },
  { icon: FileText, title: "API Documentation", desc: "Integrate with third-party services" },
];

export default function HelpPage() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {resources.map((r) => (
          <div key={r.title} className="rounded-[14px] bg-secondary p-5 cursor-pointer hover:bg-accent transition-colors">
            <r.icon className="h-5 w-5 text-primary mb-3" strokeWidth={1.5} />
            <p className="text-sm font-medium text-foreground mb-1">{r.title}</p>
            <p className="text-xs text-muted-foreground">{r.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[14px] bg-secondary p-5">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <span className="text-sm text-muted-foreground">Frequently Asked Questions</span>
        </div>
        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <details key={i} className="group rounded-[10px] bg-card">
              <summary className="flex items-center justify-between cursor-pointer px-4 py-3 text-sm text-foreground">
                {faq.q}
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" strokeWidth={1.5} />
              </summary>
              <p className="px-4 pb-3 text-sm text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
