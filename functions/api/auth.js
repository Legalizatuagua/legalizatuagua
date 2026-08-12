export async function onRequest(context) {
    const client_id = context.env.GITHUB_CLIENT_ID;
    
    if (!client_id) {
        return new Response('GITHUB_CLIENT_ID no configurado', { status: 500 });
    }

    const url = new URL(context.request.url);
    // Cloudflare Pages url
    const redirect_uri = `${url.origin}/api/callback`;
    
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user&redirect_uri=${encodeURIComponent(redirect_uri)}`;
    
    return Response.redirect(githubAuthUrl, 302);
}
