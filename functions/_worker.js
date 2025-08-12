export default {
  async fetch(request, env, _ctx) {
    const url = new URL(request.url);

    // Handle API requests
    if (url.pathname.startsWith('/api/')) {
      // Add your API handling logic here
      return new Response('API endpoint', {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Handle static files
    try {
      const response = await env.ASSETS.fetch(request);
      return response;
    } catch (_e) {
      return new Response('Not Found', { status: 404 });
    }
  },
};
