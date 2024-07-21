https://supabase.com/docs/guides/auth/managing-user-data
https://dev.to/sruhleder/creating-user-profiles-on-sign-up-in-supabase-5037
https://supabase.com/docs/guides/auth/social-login/auth-github?queryGroups=environment&environment=server
https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app
https://www.youtube.com/watch?v=cN2RE6EpExE

notes:
    1. Create Supabase
        1.1 Authentication -> Providers
            1.1.2 client id and secret from github oauth
        1.2 Triggers and Functions for User Table
        1.3 RLS on posts and comment table
    2. Create Github OAuth
        2.1 homepage url to either localhost or deployed url
        2.2 authorizaton callback url to callback url of supabase auth provider (github)
    3. env management in vercel

need to follow managing 

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
