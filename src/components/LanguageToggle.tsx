import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGUAGES = [
  { value: "en", label: "language.en" },
  { value: "zh", label: "language.zh" },
] as const;

export function LanguageToggle() {
  const { i18n, t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label={t("language.label")}
        >
          <Languages className="h-[18px] w-[18px]" aria-hidden="true" strokeWidth={1.5} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        <DropdownMenuRadioGroup
          value={i18n.language}
          onValueChange={(value) => i18n.changeLanguage(value)}
        >
          {LANGUAGES.map((lang) => (
            <DropdownMenuRadioItem key={lang.value} value={lang.value}>
              {t(lang.label)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
