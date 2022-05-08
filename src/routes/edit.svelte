<svelte:head>
  <title>Edit</title>
</svelte:head>

<script>
  import {findWithAttr} from "./db.json"
  import Card from '$lib/components/Card.svelte'
  import {onMount} from "svelte"

  var cardstemp = []
  var cards = []
  let data = {}

  onMount(async () => {
    const res = await fetch('db.json')
    data = await res.json()
    Object.keys(data.cards).forEach(key => {
      let comb = data.cards[key]
      cardstemp = [comb, ...cardstemp]
    });
    cardstemp.forEach(array => {
      array.forEach(card => {
        cards = [...cards, card]
      })
    })
  })

  let editlayout = false
  let chosencard = {}

  let newQuestion = ""
  let newAnswer = ""

  function editmode(card){
    chosencard = card
    editlayout = true
  }

  async function edit(card){
    const res = await fetch("db.json", {
      method: "POST",
      body: JSON.stringify({action: "edit", content: {question: newQuestion, answer: newAnswer, id: card.id, time: card.time, league: card.league}})
    })
    
    let index = findWithAttr(cards, "id", card.id)

    cards[index] = {question: newQuestion, answer: newAnswer, id: card.id, time: card.time, league: card.league}
        
    cards = cards

    editlayout = false
  }

  async function remove(card){
    const res = await fetch("db.json", {
      method: "POST",
      body: JSON.stringify({action: "remove", content: {id: card.id, league: card.league}})
    })

    let index = findWithAttr(cards, "id", card.id)

    cards.splice(index, 1)
        
    cards = cards
  }

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
</script>

<h1 class="pagetitle">Edit</h1>

  {#if editlayout==true}
  
    <div>
      <h3>Question</h3>
      <input bind:value={newQuestion}>
    </div>
    <div class="border" />
    <div>
      <h3>Answer</h3>
      <textarea class="answer" bind:value={newAnswer}></textarea>
    </div> 
    <div class="border" />
    <p class="id">{chosencard.id}</p>
    <button class="button delete" on:click={() => editlayout = false}>Cancel</button>
    <button class="button" on:click={edit(chosencard)}>Save</button>

{:else}

  <div class="border" />

  {#if cards.length == 0}
    <p>No cards :(</p>
  {:else}
    {#each cards as entry}
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
        <div class="border" />
        <button class="button delete" on:click={remove(entry)}>delete</button>
        <button class="button" on:click={editmode(entry)}>edit</button>
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

    .delete {
      background-color: red;
    }

    textarea {
      height: 70px!important;
    }
  </style>
{/if}
