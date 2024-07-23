This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview of Solution
    NextJS for frontend
    TailwindCSS for design
    Github for OAuth & code repository
    Supabase for Middleware and Backend
    Vercel for deployment

## Explanation of Architecture
    NextJS was used for the frontend development, and mainly used server side components since it handled blog posts. Because server side components are best used for SEO, and the point of (most) blog posts are for other people to read it.

    Supabase was used for the authentication middleware and backend. The middleware is to prevent unauthorized users from accessing different certain parts of the website, and blocking certain actions like not allowing unregistered users to add posts or comments. The posts and comments also support image posting

    Github was also used for OAuth/Open Authorization. The info from Github OAuth is stored in Supabase, and is what is used to have references to the posts and comments.

    Vercel was used to deploy the entire project.

## Approach and Methodology
    I started with the creation of the Supabase and Github OAuth. I created the necessary columns, schemas, tables, policies, providers, and URL configuration in Supabase for both local and production environments. I created a project with NextJS and started development as usual. After development (connecting to the backend, changing design, basic setup, etc.), I pushed the NextJS project into Github, which was then deployed to Vercel which watches the changes live if there are changes in the main branch.

    tl;dr:
        1. Created Supabase and its required factors (schemas, columns, policies, URL configuration)
        2. Created an OAuth app under Github
        3. Make NextJS app
        4. Pushed NextJS to Github
        5. Connected the project to Vercel
        6. Deployed Vercel to the repository and main branch of the project

    Sidenote: I admit the quality of the project could be higher, but it took me some time to learn how Supabase works, trying to debug ShadCN to Javascript ( which I opted to use instead of learning TypeScript at the same time for the project because it'd take too long if I tried to maximize both at the same time [but could've been better in hindsight]). It also didn't help that I didn't have a lot of free time the entire week to work on this. Also, there are no unit tests for the project because it'd take too long as well ( little experience, would've needed more time )

## How to run locally
    1. Clone the project
    2. Use the command prompt to enter the directory
    3. **npm install** to install all the packages
    4. Copy paste the .env file into the root folder of the project ( ask for a copy from me )
    5. **npm run dev** under command prompt to start the project
    6. Open the project in your web browser ( http://localhost:3000 )