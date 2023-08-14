import { getEnvironment } from "../../utils/getEnvironment";
import dayjs from "dayjs";

const toDate = dayjs().format("YYYYMMDD");
const fromDate = dayjs().subtract(3, "month").format("YYYYMMDD");

const UTBETALINGSOVERSIKT_URL = {
  local: "http://localhost:3000/utbetalingsoversikt",
  development: "https://www.intern.dev.nav.no/utbetalingsoversikt",
  production: "https://tjenester.nav.no/utbetalingsoversikt",
};

const UTBETALINGSOVERSIKT_API_URL = {
  local: "http://localhost:3000/utbetalingsvoversikt-api",
  development: "https://www.intern.dev.nav.no/tms-utbetalingsoversikt-api/utbetalinger",
  production: "https://person.nav.no/tms-utbetalingsoversikt-api/utbetalinger",
};


export const utbetalingsoversiktApiUrl = `${UTBETALINGSOVERSIKT_API_URL[getEnvironment()]}?&fom=${fromDate}&tom=${toDate}`;
export const utbetalingsoversiktUrl = UTBETALINGSOVERSIKT_URL[getEnvironment()];
