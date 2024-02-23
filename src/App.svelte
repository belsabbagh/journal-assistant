<script>
  import { output } from "./stores/output";
  import { dump } from "js-yaml";

  const activities = {
    meal: {
      prompt: "What meals did you have?",
      options: ["breakfast", "noon-snack", "lunch", "evening-snack", "dinner"],
    },
    socializing: {
      prompt: "Who did you socialize with?",
      options: ["family", "friends", "strangers"],
    },
    chores: {
      prompt: "Where did you do your chores?",
      options: ["kitchen", "living-room", "bedroom", "bathroom", "study-room"],
    },
    music: {
      prompt: "What musical instruments did you play?",
      options: ["piano", "violin"],
    },
    reading: {
      prompt: "What did you read?",
      options: ["non-fiction", "manhwa", "manga", "novel"],
    },
    laundry: {
      prompt: "Did you do laundry?",
      options: ["lights", "darks"],
    },
    "body-care": {
      prompt: "How did you take care of your body?",
      options: ["shower", "shave", "haircut"],
    },
  };

  function permalinkActivity(prefix, activity) {
    return `${prefix}/${activity}`;
  }
  function createActivities(data) {
    let done = [];
    for (const key in activities) {
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

  function createJournalEntry(data) {
    const date = data.get("date");
    const rating = parseInt(data.get("rating"));
    const activities = createActivities(data);
    const { prev, next } = getSurroundingDates(date);
    return { activities, prev, next, rating, tags: ["daily"] };
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const entry = createJournalEntry(data);
    const yaml = dump(entry);
    output.set(yaml);
  }
</script>

<main>
  <h1>Daily Journal</h1>

  <div class="card">
    <div class="columns">
      <form on:submit={handleSubmit}>
        <h2>What day are you reporting?</h2>
        <input
          type="date"
          name="date"
          required
          value={new Date().toISOString().split("T")[0]}
        />
        <h2>How do you rate your day?</h2>
        <input type="number" name="rating" min="1" max="7" step="1" required />
        {#each Object.keys(activities) as key}
          <h2>{activities[key].prompt}</h2>
          <div>
            {#each activities[key].options as activity}
              <label>
                <input type="checkbox" name={activity} />
                {activity}
              </label>
            {/each}
          </div>
        {/each}
        <button type="submit">Submit</button>
      </form>
      <pre><code>{$output}</code></pre>
    </div>
  </div>
</main>

<style>
  .columns {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  pre {
    border: 1px solid #ccc;
    text-align: start;
    padding: 1rem;
    min-width: 300px;
  }
</style>
