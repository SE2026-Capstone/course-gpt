This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Setting up auth locally

1. Generate secret in .env file with `npx auth secret`.
2. Create a [new Google Cloud project](https://developers.google.com/workspace/guides/create-project).
3. Create an external [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent). Fill out only the required info, keep clicking Next.
4. On the [Credentials page](https://console.cloud.google.com/apis/credentials), click "Create credentials" and select "OAuth client ID".
5. Select "Web application" for Application type.
6. Enter the following information:

|                               | For development                                  | For production                                   |
| ----------------------------- | ------------------------------------------------ | ------------------------------------------------ |
| Authorized JavaScript origins | `http://localhost:3000`                          | `https://{YOUR_DOMAIN}`                          |
| Authorized redirect URIs      | `http://localhost:3000/api/auth/callback/google` | `https://{YOUR_DOMAIN}/api/auth/callback/google` |

7. Update your `.env` file with the Google Client ID and Client secret shown in the "OAuth client created" dialog.
