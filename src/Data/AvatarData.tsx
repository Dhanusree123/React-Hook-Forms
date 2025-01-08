type AvatarData = {
  src: string;
  alt: string;
  disabled: boolean;
};

export const avatarData: AvatarData[] = [
  {
    src: "https://assets.minimals.cc/public/assets/icons/platforms/ic-jwt.svg",
    alt: "JWT Icon",
    disabled: true,
  },
  {
    src: "https://assets.minimals.cc/public/assets/icons/platforms/ic-firebase.svg",
    alt: "Firebase Icon",
    disabled: true,
  },
  {
    src: "https://assets.minimals.cc/public/assets/icons/platforms/ic-amplify.svg",
    alt: "Amplify Icon",
    disabled: false,
  },
  {
    src: "https://assets.minimals.cc/public/assets/icons/platforms/ic-auth0.svg",
    alt: "Auth0 Icon",
    disabled: true,
  },
  {
    src: "https://assets.minimals.cc/public/assets/icons/platforms/ic-supabase.svg",
    alt: "Supabase Icon",
    disabled: true,
  },
];
