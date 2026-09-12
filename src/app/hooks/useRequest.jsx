import { useToast } from '../context/ToastProvider';

/**
 * A custom hook that provides a standardized way to run asynchronous API requests.
 *
 * It handles the common boilerplate around network calls—like optionally clearing out
 * old UI state before starting, triggering success callbacks, and automatically
 * popping up toast notifications for successes, warnings, or errors.
 *
 * @returns {{ execute: Function }} An object containing the `execute` function.
 */
export function useRequest() {
  const { addToast } = useToast();

  /**
   * Runs your async request and manages the UI feedback based on the result.
   *
   * @param {Object} options - Configuration for the request.
   * @param {Function} options.request - The actual async API call you want to execute.
   * @param {Function} [options.onSuccess] - A callback that runs if the request succeeds, giving you the response data.
   * @param {Function} [options.reset] - A callback to clear out any previous UI state (like old errors) right before the request starts.
   * @param {boolean} [options.showSuccessToast=false] - Set this to true if you want to show a toast notification when the request succeeds.
   * @param {string} [options.successMessage] - A custom message for the success toast. If you leave this out, it uses the message from the API response.
   * @returns {Promise<*>} The response data if everything went well, or null if something failed.
   */
  const execute = async ({
    request,
    onSuccess,
    reset,
    showSuccessToast = false,
    successMessage,
  }) => {
    reset?.();

    try {
      const response = await request();

      if (response.status === 'success') {
        onSuccess?.(response.data);

        if (showSuccessToast) {
          addToast({
            message: successMessage ?? response.message,
            type: 'success',
          });
        }

        return response.data;
      }

      addToast({
        message: response.message,
        type: response.status === 'error' ? 'error' : 'warning',
      });

      return null;
    } catch (error) {
      addToast({
        message: String(error),
        type: 'error',
      });

      return null;
    }
  };

  return { execute };
}
