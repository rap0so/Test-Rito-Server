import { config as configDotenv } from "dotenv";
import axios, { AxiosResponse } from "axios";

import sendMessage from "./sendWhatsAppMessage";
import { TRequestData } from "./types";

configDotenv();

const URL_SERVER =
  "https://lol.secure.dyn.riotcdn.net/channels/public/x/status/br1.json";
const FIVE_MINUTES = 30000;

const doRequest = async (urlServer: string) => await axios.get(urlServer);

const main = () => {
  const idInterval = setInterval(async () => {
    const requestData: AxiosResponse = await doRequest(URL_SERVER);

    const { data }: TRequestData = requestData;
    const incidents = data?.incidents ?? [];

    const hasCritical = incidents.some(
      (incident) => incident && incident.incident_severity === "critical"
    );
    const hasWarning = incidents.some(
      (incident) => incident && incident.incident_severity === "warning"
    );

    if (hasCritical) return console.log("O servidor está com erros criticos");

    if (hasWarning) return console.log("O servidor está com warnings");

    clearInterval(idInterval);

    return sendMessage().catch((error: Error) =>
      console.log(`Error sending message: ${JSON.stringify(error)}`)
    );
  }, FIVE_MINUTES);
};

main();
