import authOptions from "@/app/utils/authOptions";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };






// import NextAuth, { AuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";

// const config = {
//   serverURL: process.env.SERVER_URL,
//   apiURL: 'https://furniture.fly.dev',
//   localURL: 'http://localhost:8080',
// }

// export const authOptions: AuthOptions = {
//   providers: [
//     Credentials({
//       credentials: {
//         username: { label: "Username" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//         try {
//           const res = await fetch(`${config.serverURL}/auth/login`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               username: credentials?.username,
//               password: credentials?.password,
//             }),
//           });

//           // Check if the response is OK (2xx)
//           if (!res.ok) {
//             throw new Error('Invalid login credentials');
//           }

//           const user = await res.json();

//           // If the user object contains a token, login is successful
//           if (user?.token) {
//             return {
//               id: user.userId,
//               name: user.username,
//               email: user.email,
//               role: user.role,
//               token: user.token,  // Save the token for future use
//             };
//           }

//           // Return null if login fails
//           return null;
//         } catch (error) {
//           console.error('Error during authentication:', error);
//           return null;
//         }
//       }
//     })
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       // If this is the first login (user exists), add the user data to the token
//       if (user) {
//         console.log('User object:', user);  // Debugging purposes
//         token.accessToken = user.token;
//         token.role = user.role;  // Save role in token
//         token.sub = user.id;     // Set the user's ID (subject)
//       }
//       console.log('Token object:', token);  // Debugging purposes
//       return token;
//     },
//     async session({ session, token, user }) {
//       // Add access token and role to session object
//       console.log('Session object before:', session);  // Debugging
//       console.log('Token object:', token);             // Debugging
//       console.log('User object:', user);             // Debugging

//       session.accessToken = token.accessToken as string;
//       session.role = token.role as string;  // Retrieve the role from token
//       session.userId = token.sub as string; // Retrieve user ID from token

//       console.log('Session object after:', session);  // Debugging
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,  // Ensure this is set in your environment variables
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };