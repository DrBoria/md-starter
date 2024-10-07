import { getInitPage } from '@keystone-6/auth/pages/InitPage';

const fieldPaths = ["email","password"];

export default getInitPage({"listKey":"User","fieldPaths":["email","password"],"enableWelcome":true});
