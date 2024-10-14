import type { AdminConfig } from "@keystone-6/core/types";

import { Logo } from "@md/components";
import { CustomNavigation } from "./system-components/CustomNavigation";

export const components: AdminConfig["components"] = {
  Navigation: CustomNavigation,
  Logo,
};
