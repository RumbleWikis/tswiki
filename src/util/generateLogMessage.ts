import { LOGGER_PREFIX } from "./constants.ts";

export default function generateLogMessage(message: string) {
  return `${LOGGER_PREFIX} ${message}`;
}
