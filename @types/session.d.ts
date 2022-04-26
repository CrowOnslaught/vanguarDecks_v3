export {};

type token = {
  token: string;
  expires: Date;
}

declare module "iron-session" {
    interface IronSessionData {
      tokens?: {
        access: token;
        refresh: token;
      };
    }
  }
