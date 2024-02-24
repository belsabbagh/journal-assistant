<script>
  import { createJournalEntry, activities } from "./core/journal";
  import ActivityCard from "./lib/ActivityCard.svelte";
  import { output } from "./stores/output";
  import { dump } from "js-yaml";

  function cpOut(_event) {
    navigator.clipboard.writeText($output);
  }

  function getDefaultDate() {
    return new Date().toISOString().split("T")[0];
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
        <div class="columns center">
          <div>
            <h2>What day are you reporting?</h2>
            <input
              type="date"
              name="date"
              required
              value={getDefaultDate()}
              class="custom-input"
            />
          </div>
          <div>
            <h2>Rate your day! (1-7)</h2>
            <input
              type="number"
              name="rating"
              min="1"
              max="7"
              step="1"
              required
              class="custom-input"
            />
          </div>
        </div>

        <div class="activity-cards">
          {#each Object.keys(activities) as key}
            <ActivityCard
              activitiesSet={key}
              prompt={activities[key].prompt}
              options={activities[key].options}
              type={activities[key].type}
            />
          {/each}
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Output</h2>
        <button type="button" on:click={cpOut}>Copy Output</button>
        <pre><code>{$output}</code></pre>
      </div>
    </div>
  </div>
</main>

<style>
  .columns {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .center {
    justify-content: center;
  }

  pre {
    border: 1px solid var(--color-primary);
    border-radius: 1rem;
    text-align: start;
    padding: 1rem;
    min-width: 300px;
    min-height: 500px;
  }
  .activity-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .custom-input {
    background-color: transparent;
    border: 1px solid var(--color-primary);
    border-radius: 1rem;
    padding: 0.5rem;
  }

  input[type="number"] {
    text-align: center;
    max-width: 3rem;
    appearance: textfield;
    
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

 
</style>
