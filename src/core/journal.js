import a from "../assets/activities.json";
export const activities = a;

function permalinkActivity(prefix, activity) {
  return `${prefix}/${activity}`;
}
function createActivities(data) {
  let done = [];
  for (const key in activities) {
    if (activities[key].type === "boolean") {
      if (data.has(key)) {
        done.push(key);
      }
      continue;
    }
    const flat = activities[key].options
      .filter((activity) => data.has(activity))
      .map((activity) => permalinkActivity(key, activity));
    done = done.concat(flat);
  }
  return done;
}

function getSurroundingDates(date) {
  let prevDate = new Date(date);
  prevDate.setDate(prevDate.getDate() - 1);
  let prevFormatted = prevDate.toISOString().split("T")[0];
  let nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + 1);
  let nextFormatted = nextDate.toISOString().split("T")[0];

  return {
    prev: prevFormatted,
    next: nextFormatted,
  };
}

export function createJournalEntry(data) {
  const date = data.get("date");
  const rating = parseInt(data.get("rating"));
  const activities = createActivities(data);
  const { prev, next } = getSurroundingDates(date);
  return { activities, prev, next, rating, tags: ["daily"] };
}
