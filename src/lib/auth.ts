// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { nextCookies } from "better-auth/next-js";
import { magicLink } from "better-auth/plugins";
import type { User } from "@prisma/client"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Réinitialisation de votre mot de passe",
        text: `Lien de réinitialisation : ${url}`, // fallback texte brut
        html: `
          <div style="font-family: sans-serif; line-height: 1.5;">
            <p>Bonjour,</p>
            <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
            <p>
              <a href="${url}" style="display: inline-block; background: #000; color: #fff; padding: 10px 16px; text-decoration: none; border-radius: 4px;">
                Réinitialiser le mot de passe
              </a>
            </p>
            <p>Ou copiez ce lien dans votre navigateur :</p>
            <pre>${url}</pre>
          </div>
        `,
      });
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Vérification de votre adresse email",
        text: `Lien de vérification : ${url}`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.5;">
            <p>Bienvenue !</p>
            <p>Merci de confirmer votre adresse email :</p>
            <p>
              <a href="${url}" style="display: inline-block; background: #000; color: #fff; padding: 10px 16px; text-decoration: none; border-radius: 4px;">
                Vérifier mon email
              </a>
            </p>
            <p>Ou copiez ce lien :</p>
            <pre>${url}</pre>
          </div>
        `,
      });
    },
  },

  magicLink: {
    enabled: true,
  },

  overrides: {
    session: {
      async getSession({ user }: { user: User }) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            id: true,
            email: true,
            isPremium: true,
            name: true,
            image: true,
          },
        });

        if (!dbUser) return null;
        return { user: dbUser };
      },
    },
  },

  smtp: {
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT),
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
    from: process.env.FROM_EMAIL!,
  },

  plugins: [
    nextCookies(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await sendEmail({
          to: email,
          subject: "Connexion par lien magique",
          text: `Clique ici pour te connecter : ${url}`,
          html: `
            <p>Clique ici pour te connecter :</p>
            <a href="${url}" style="padding: 8px 16px; background: black; color: white; border-radius: 4px; text-decoration: none;">Connexion</a>
            <p>Ou copie le lien : ${url}</p>
          `,
        });
      },
    }),
  ],
});
