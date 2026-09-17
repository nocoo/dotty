import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export function HeaderTooltip({ label, children }: { label: string; children: ReactElement }) {
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent side="bottom" sideOffset={6}>
					{label}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

export function HexlyLink() {
	const { i18n } = useTranslation();
	const chinese = i18n.language.startsWith("zh");
	const label = chinese ? "在 hexly.ai 查看 Dotty" : "Dotty on hexly.ai";
	return (
		<HeaderTooltip label={label}>
			<a
				href="https://hexly.ai/projects/dotty"
				target="_blank"
				rel="noopener noreferrer"
				aria-label={`${label}${chinese ? "（在新标签页打开）" : " (opens in a new tab)"}`}
				className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
			>
				<svg
					className="size-[18px]"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={1.5}
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<path d="m12 2 8.66 5v10L12 22l-8.66-5V7Z" />
					<path d="M12 2v20M3.34 7l17.32 10m0-10L3.34 17" />
				</svg>
			</a>
		</HeaderTooltip>
	);
}
