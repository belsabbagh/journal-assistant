<script>
  export let activitiesSet;
  export let prompt;
  export let options;
  export let type;
</script>

<div class="activity-card">
  <h3>{prompt}</h3>
  <div class="options">
    {#if type === "nested"}
      {#each options as option}
        <label>
          <input type="checkbox" name={option} />
          {option}
        </label>
      {/each}
    {:else}
      <label>
        <input type="checkbox" name={activitiesSet} />
        Yes
      </label>
    {/if}
  </div>
</div>

<style>
  .options {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    border: 1px solid #ccc;
    border-radius: 1rem;
    padding: 1rem;
  }

  .activity-card {

    margin: 0.75rem;
    min-width: 200px;
    max-width: 350px;
    text-align: start;
  }
</style>
