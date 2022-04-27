interface Path {
  route: string;
  policy?: "notLogged" | undefined;
}

export const publicPaths: Path[] = [
  {
    route: "/login",
    policy: "notLogged",
  },
  {
    route: "/signup",
    policy: "notLogged",
  },
];
