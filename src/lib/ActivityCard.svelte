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
          <span> {option}</span>
        </label>
      {/each}
    {:else}
      <label>
        <input type="checkbox" name={activitiesSet} />
        <span>Yes</span>
      </label>
    {/if}
  </div>
</div>

<style>
  .options {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    border: 1px solid var(--color-primary);
    border-radius: 1rem;
    padding: 1rem;
  }

  .activity-card {
    margin: 0.75rem;
    min-width: 200px;
    max-width: 350px;
    text-align: start;
  }

  /* transparent checkbox */
  input[type="checkbox"] {
    appearance: none;
    display: none;
    background-color: transparent;
    float: left;
    line-height: 3em;
    width: 8em;
    height: 3em;
    margin: 4px;
    background-color: #104068;
    border-radius: 4px;
    border: 1px solid #fff;
    overflow: hidden;
  }

  input[type="checkbox"] + span {
    display: block;
    line-height: 3em;
    cursor: pointer;
    text-align: center;

  }

  input[type="checkbox"]:checked + span {
    background-color: #e0aed0;
    border-radius: 1rem;
  }
</style>
