import * as user from "./schemas/user";
import * as session from "./schemas/session";

export const schema = { ...user, ...session };