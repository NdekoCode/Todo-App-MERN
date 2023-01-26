import { dirname } from "path";
import { fileURLToPath } from "url";
export const __filname = fileURLToPath(dirname(import.meta.url));
export const __dirname = dirname(__filname);
