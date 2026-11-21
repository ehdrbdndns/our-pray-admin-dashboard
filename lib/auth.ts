import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      // GitHub now sends `iss` on the OAuth callback (RFC 9207). Without a
      // matching issuer, @auth/core falls back to "https://authjs.dev" and the
      // callback fails with `unexpected "iss" (issuer) response parameter value`.
      // Newer @auth/core versions set this same value on the GitHub provider.
      issuer: 'https://github.com/login/oauth'
    })
  ]
});
