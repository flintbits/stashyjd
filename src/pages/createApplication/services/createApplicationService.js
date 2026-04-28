import { invoke } from "@tauri-apps/api/core";
import { invokeSafe } from "../../../lib/api";

// export async function createApplication(data) {
//   return invoke("create_application", {
//     companyName: data.companyName,
//     roleTitle: data.roleTitle,
//     location: data.location || null,
//     jobUrl: data.jobUrl || null,
//   });
// }

export const api = {
  createApplication(data) {
    return invokeSafe("create_application", {
      companyName: data.companyName,
      roleTitle: data.roleTitle,
      location: data.location || null,
      jobUrl: data.jobUrl || null,
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
