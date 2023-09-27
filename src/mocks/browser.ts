import { setupWorker } from "msw";
import { handlersAllContent } from "./allContent";

export const worker = setupWorker(...handlersAllContent);
