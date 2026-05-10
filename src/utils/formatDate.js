export function formatRelativeDate(dateStr) {
  if (!dateStr) return { relative: "", absolute: "" };

  const date = new Date(dateStr.replace(" ", "T"));
  const now = new Date();

  const diffMs = now - date;

  if (diffMs < 0) {
    return { relative: "Just now", absolute: "" };
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30.44);
  const diffYears = Math.floor(diffMonths / 12);

  let relative;

  if (diffMinutes < 5) {
    relative = "Just now";
  } else if (diffMinutes < 60) {
    relative = `${diffMinutes} min${diffMinutes > 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    relative = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  } else if (diffDays < 7) {
    relative = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } else if (diffWeeks < 4) {
    relative = `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
  } else if (diffMonths < 12) {
    relative = `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  } else {
    relative = `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
  }

  const absolute =
    diffDays < 1
      ? date.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : date.toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

  return { relative, absolute };
}
