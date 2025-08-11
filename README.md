# IP Guardian Questionnaire

A dynamic, interactive questionnaire built with Next.js that helps users identify their intellectual property protection needs. The application guides users through a series of questions and provides tailored recommendations based on their responses.

## Features

- 🎯 Dynamic question flow based on user responses
- 🔄 Branching logic for personalized paths
- 📱 Fully responsive design
- 📝 Contact form integration
- 📧 Email notifications via Resend API
- 🔙 Navigation with Previous/Next functionality
- 🔄 Restart option at any point

## Tech Stack

- Next.js 15.2
- React 19
- TypeScript
- Tailwind CSS
- Resend (for email functionality)

## Prerequisites

- Node.js (v20 or later recommended)
- npm, yarn, or pnpm
- Resend account and API key

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd questionnaire
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with:

```env
RESEND_API_KEY=your_resend_api_key_here
TO_EMAIL_ADDRESS=recipient@example.com
```

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Production Build

```bash
npm run build
npm run start
```

## Embedding the Questionnaire

### Basic Iframe Implementation

To embed the questionnaire in your website, add the following HTML:

```html
<iframe
  src="https://your-questionnaire-domain.com"
  width="100%"
  height="700px"
  frameborder="0"
  style="border: none; max-width: 100%; border-radius: 8px;"
  title="IP Guardian Questionnaire"
></iframe>
```

### Responsive Implementation

For a responsive implementation that adjusts to content height:

```html
<div
  style="position: relative; width: 100%; height: 0; padding-bottom: 75%; min-height: 700px;"
>
  <iframe
    src="https://your-questionnaire-domain.com"
    style="position: absolute; width: 100%; height: 100%; border: none; border-radius: 8px;"
    frameborder="0"
    title="IP Guardian Questionnaire"
    allowtransparency="true"
  ></iframe>
</div>
```

### Security Configuration

To allow embedding, you need to configure your Next.js application to accept requests from the parent website. Add the following to your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://your-parent-website.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

Replace `https://your-parent-website.com` with the actual domain where you'll embed the questionnaire.

### Styling Tips

1. The questionnaire is designed to be responsive and will adapt to the iframe's width.
2. Minimum recommended iframe height is 700px.
3. For the best experience, use a width of at least 600px.
4. The questionnaire includes its own padding and margins.

### Communication with Parent Window

The questionnaire can communicate with the parent window using `postMessage`. Events are sent for:

- Question navigation
- Form submission
- Questionnaire completion

Example of listening for events in the parent window:

```javascript
window.addEventListener("message", function (event) {
  if (event.origin !== "https://your-questionnaire-domain.com") return;

  const data = event.data;
  switch (data.type) {
    case "questionnaireComplete":
      // Handle completion
      break;
    case "formSubmitted":
      // Handle form submission
      break;
  }
});
```

## Customization

### Theme

The questionnaire uses CSS variables for theming. You can override these in your iframe implementation:

```html
<iframe
  src="https://your-questionnaire-domain.com"
  style="
    --primary: #26229a;
    --secondary: #3f3c9a;
    --primary-light: #7764ac;
    --highlight: #b83867;
    --accent: #ffffff;
  "
></iframe>
```

### Custom Endpoints

If you need to use different endpoints for the form submission or other functionality, you can pass them as URL parameters:

```html
<iframe
  src="https://your-questionnaire-domain.com?apiEndpoint=https://your-api.com/submit"
></iframe>
```

## Troubleshooting

### Common Issues

1. **X-Frame-Options Blocking**: Ensure your Next.js configuration includes proper headers.
2. **Height Issues**: Use the responsive implementation or adjust the iframe height.
3. **Style Conflicts**: The questionnaire is isolated in an iframe, but check for CSS variable conflicts.

### Browser Support

The questionnaire supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE file for details.

## Support

For support, please open an issue in the repository or contact support@your-domain.com.
