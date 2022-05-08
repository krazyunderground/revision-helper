<svelte:head>
  <title>Create</title>
</svelte:head>

<h1 class="pagetitle">Create</h1>
<p>This is the creating page</p>

<script context="module">
  
</script>

<script>
  import Card from '$lib/components/Card.svelte'
  import uniqid from 'uniqid';

  let question = ""
  let answer = ""

  let array = []

  function handleCreate(){
    array = [{question: question, answer: answer, id: uniqid(), time: Date.now(), league: "first"}, ...array]
    question = ""
    answer = ""
  }
  async function handleSave(){
    const res = await fetch("db.json", {
      method: "POST",
      body: JSON.stringify({action: "create", content: array})
    })
    array = []
  }
</script>

<div style="justify-content: center;">
  <div>
    <h3>Question</h3>
    <input bind:value={question}>
  </div>
  <div class="border" />
  <div>
    <h3>Answer</h3>
    <textarea class="answer" bind:value={answer}></textarea>
  </div> 
  <div class="border" />
  <button class="button" on:click={handleCreate}>Submit</button>
  <button class="button" on:click={handleSave}>Save Cards</button>
</div>

<div class="border" />

{#if array.length == 0}
  <p>No new cards</p>
{:else}
  {#each array as entry}
    <Card>
      <div>
        <h3>{entry.question}</h3>
        <div>
          <div>
            <span>{entry.answer}</span>
          </div>
          <div>
            <span class="id">{entry.id}</span>
          </div>
        </div>
      </div>
    </Card>
    
    <div class="border" />
  {/each}
{/if}


<style>
  .border {
    padding: 10px
  }

  .id {
    color: rgb(199, 199, 199);
  }

  textarea {
    height: 70px;
  }
</style>