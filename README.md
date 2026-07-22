# Ecommerce WebApp using Nextjs + ContextAPI and Backend using Nodejs


tech stack: frontend: Nextjs, Axios, ContextApi, Nodejs, JWT, Mongodb, nodemailer, multer, cloudinary

Key Features: 
Shopping Cart with Redux, Product Listing & Filtering, Mock Checkout Flow

How to run:
just go into the root of directory and enter command "npm run dev" ....

i have deployed it on vercel as well

i convert it from rectjs to nextjs and than deploy, in my first attempt build failed but than i research to find out there is new setting arrangement for nextjs in vercel.

after one week when i run frontend again it start panicing and reloading within a time of fractions. when i debug i figure out the issue is with 
Turbopack, it crashes on edge cases.
to stable Developement enviroment use Webpack as it is more mature.

All we need to do use this "dev": "next dev --webpack", in scripts of package.json


## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
