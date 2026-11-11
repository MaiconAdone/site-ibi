# Site IBI Mauá

Site estático da Igreja Batista Independente de Mauá, baseado no
[church-site-template](https://github.com/kbennett2000/church-site-template) (licença MIT).

## Onde editar o conteúdo
- Dados da igreja, horários, endereço, WhatsApp e redes: `content/site.json`
- Menu: `content/navigation.json`
- Ofertas/PIX: `content/giving.json`
- Crenças: `content/beliefs.json` · Agenda: `content/events.json`
- Textos em Markdown: `content/story.md`, `content/ministries/`, `content/sermons/`, `content/staff/`, `content/announcements/`
- Cores: `app/globals.css` (azul e vermelho da logo) · Logo: `public/images/brand/logo-ibi.png`

Os formulários (visita, oração, contato) abrem o WhatsApp da igreja com a mensagem pronta.

## Comandos
- `npm run dev` — rodar localmente
- `npm run build` — gera o site em `out/`

## Publicar na Hostinger
Envie o **conteúdo** de `out/` para `public_html` (Gerenciador de Arquivos → Upload do zip → Extrair).
