import { getEnvironment } from "../../utils/getEnvironment";

const UTBETALINGSOVERSIKT_URL = {
  local: "http://localhost:3000/utbetalingsoversikt",
  development: "https://www.intern.dev.nav.no/utbetalingsoversikt",
  production: "https://tjenester.nav.no/utbetalingsoversikt",
};

const UTBETALINGSOVERSIKT_API_URL = {
  local: "http://localhost:3000/utbetalingsvoversikt-api",
  development: "https://www.intern.dev.nav.no/tms-utbetalingsoversikt-api/utbetaling",
  production: "https://person.nav.no/tms-utbetalingsoversikt-api/utbetaling",
};

export const utbetalingsoversiktApiUrl = `${UTBETALINGSOVERSIKT_API_URL[getEnvironment()]}`;
export const utbetalingsoversiktUrl = UTBETALINGSOVERSIKT_URL[getEnvironment()];
