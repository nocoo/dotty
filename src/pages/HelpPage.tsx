import { HelpCircle, Book, MessageCircle, FileText, ChevronRight, type LucideIcon } from "lucide-react";
import { useHelpViewModel } from "@/viewmodels/useHelpViewModel";

const iconMap: Record<string, LucideIcon> = {
  book: Book,
  "message-circle": MessageCircle,
  "file-text": FileText,
};

export default function HelpPage() {
  const { resources, filteredFAQs } = useHelpViewModel();

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {resources.map((r) => {
          const Icon = iconMap[r.icon] ?? HelpCircle;
          return (
            <div key={r.title} className="rounded-card bg-secondary p-5 cursor-pointer hover:bg-accent transition-colors">
              <Icon className="h-5 w-5 text-primary mb-3" strokeWidth={1.5} />
              <p className="text-sm font-medium text-foreground mb-1">{r.title}</p>
              <p className="text-xs text-muted-foreground">{r.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-card bg-secondary p-5">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <span className="text-sm text-muted-foreground">Frequently Asked Questions</span>
        </div>
        <div className="flex flex-col gap-2">
          {filteredFAQs.map((faq, i) => (
            <details key={i} className="group rounded-widget bg-card">
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
