import type { ComponentProps } from "react";

export function DottyLogo(props: ComponentProps<"img">) {
	return (
		<img
			src="/logo-128.png"
			srcSet="/logo-128.png 1x, /logo-256.png 2x"
			width={24}
			height={24}
			alt="Dotty"
			{...props}
		/>
	);
}
