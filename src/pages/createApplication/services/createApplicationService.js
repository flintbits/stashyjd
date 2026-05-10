import { invoke } from "@tauri-apps/api/core";
import { invokeSafe } from "../../../lib/api";

export const api = {
  createApplication(payload) {
    return invokeSafe("create_application", {
      applicationData: payload,
    });
  },
};
/*
      getApplications() {
    return invokeSafe("get_applications");
  },

  deleteApplication(id) {
    return invokeSafe("delete_application", { id });
  },

  updateStatus(id, status) {
    return invokeSafe("update_status", { id, status });
  },
};

*/
