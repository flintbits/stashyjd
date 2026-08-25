import { invokeSafe } from "../../../lib/api";

export const applucationServiceApi = {
  fetchAllApplications() {
    return invokeSafe("fetch_applications");
  },
};
