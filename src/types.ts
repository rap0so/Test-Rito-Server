export type TIncidents = {
  incident_severity?: "critical" | "info" | "warning";
}[];

export type TRequestData = {
  data: {
    incidents: TIncidents;
  };
};
