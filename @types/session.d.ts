declare module "iron-session" {
    interface IronSessionData {
      token?: {
        token: string;
        expires: string;
      };
      refreshtoken?: {
        token: string;
        expires: string;
      }
    }
  }