import { invokeSafe } from '../lib/invokeSafe';

export const applicationService = {
  createApplication(payload) {
    return invokeSafe('create_application', {
      applicationData: payload,
    });
  },

  fetchAllApplications() {
    return invokeSafe('fetch_applications');
  },
};