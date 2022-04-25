export {};

type token = {
  token: string;
  expires: string;
}

declare module "iron-session" {
    interface IronSessionData {
      tokens?: {
        access: token;
        refresh: token;
      };
    }
  }