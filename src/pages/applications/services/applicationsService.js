import { invokeSafe } from "../../../lib/api";

export const applicationServiceApi = {
  fetchAllApplications() {
    return invokeSafe("fetch_applications");
  },
};
