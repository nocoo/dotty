export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		if (url.pathname === "/api/live") {
			url.pathname = "/api/live.json";
			const asset = await env.ASSETS.fetch(url);
			return new Response(asset.body, {
				status: asset.status,
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					"Cache-Control": "no-store",
				},
			});
		}
		return env.ASSETS.fetch(request);
	},
};
