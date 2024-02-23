<script>
  import { output } from "./stores/output";
  import { dump } from "js-yaml";

  const activities = {
    meal: {
      prompt: "What meals did you have?",
      options: ["breakfast", "noon-snack", "lunch", "evening-snack", "dinner"],
      type: "nested",
    },
    socializing: {
      prompt: "Who did you socialize with?",
      options: ["family", "friends", "strangers"],
      type: "nested",
    },
    chores: {
      prompt: "Where did you do your chores?",
      options: ["kitchen", "living-room", "bedroom", "bathroom", "study-room"],
      type: "nested",
    },
    music: {
      prompt: "What musical instruments did you play?",
      options: ["piano", "violin"],
      type: "nested",
    },
    reading: {
      prompt: "What did you read?",
      options: ["non-fiction", "manhwa", "manga", "novel"],
      type: "nested",
    },
    laundry: {
      prompt: "Did you do laundry?",
      options: ["lights", "darks"],
      type: "nested",
    },
    "body-care": {
      prompt: "How did you take care of your body?",
      options: ["shower", "shave", "haircut"],
      type: "nested",
    },
    exercise: {
      prompt: "What exercise did you do?",
      options: ["walking", "workout"],
      type: "nested",
    },
    drawing: {
      prompt: "Did you draw?",
      type: "boolean",
    },
    writing: {
      prompt: "Did you write?",
      type: "boolean",
    },
  };

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
            {#if activities[key].type === "nested"}
              {#each activities[key].options as option}
                <label>
                  <input type="checkbox" name={option} />
                  {option}
                </label>
              {/each}
            {:else}
              <label>
                <input type="checkbox" name={key} />
                Yes
              </label>
            {/if}
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
