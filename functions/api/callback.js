export async function onRequest(context) {
    const client_id = context.env.GITHUB_CLIENT_ID;
    const client_secret = context.env.GITHUB_CLIENT_SECRET;
    
    if (!client_id || !client_secret) {
        return new Response('GITHUB_CLIENT_ID o GITHUB_CLIENT_SECRET no configurados', { status: 500 });
    }

    const url = new URL(context.request.url);
    const code = url.searchParams.get('code');
    
    if (!code) {
        return new Response('No se recibió el código de GitHub', { status: 400 });
    }

    try {
        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id,
                client_secret,
                code
            })
        });

        const data = await response.json();
        
        if (data.error) {
            return new Response(`Error de GitHub: ${data.error_description || data.error}`, { status: 400 });
        }

        const token = data.access_token;
        const provider = 'github';

        // Render HTML that Decap CMS expects from its auth endpoint
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Autenticación exitosa</title>
        </head>
        <body>
          <script>
            function receiveMessage(e) {
              window.opener.postMessage(
                'authorization:' + '${provider}' + ':' + 'success:' + '{"token":"${token}","provider":"${provider}"}',
                e.origin
              );
            }
            window.addEventListener("message", receiveMessage, false);
            window.opener.postMessage("authorizing:${provider}", "*");
          </script>
        </body>
        </html>
        `;

        return new Response(html, {
            headers: { 'Content-Type': 'text/html;charset=UTF-8' }
        });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
}
