import type {
  BaseKeystoneTypeInfo,
  KeystoneContext,
} from "@keystone-6/core/types";

declare global {
  namespace Express {
    export interface Request {
      context: KeystoneContext<BaseKeystoneTypeInfo>;
    }
  }

  declare module "*.png" {
    const value: { src: string };
    export default value;
  }
}

declare module "*.png" {
  const value: { src: string };
  export default value;
}
