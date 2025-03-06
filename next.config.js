/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
     remotePatterns: [
       {
         protocol: "https",
         hostname: "**",
       },
     ],
   },
   env: {
     JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
   },
   output: "standalone", // Ensures the app runs as a single unit (useful for deployment)
   experimental: {
   },
   reactStrictMode: true, // Helps catch issues early
 };
 
 module.exports = nextConfig;
 