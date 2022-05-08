<svelte:head>
  <title>Revision Helper</title>
</svelte:head>

<main>
  <h1 class="text-primary">Hello User!</h1>
  <div>
    <footer class="footer" style="padding: 4em">Made with ❤️ in svelte <br>By Charlie Prescod 2022</footer>
  </div>
  
</main>

<style lang="scss">
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 4rem auto;
    max-width: 14rem;
  }

  /*p {
    max-width: 14rem;
    margin: 2rem auto;
    line-height: 1.35;
  }*/
  .footer {
    bottom: 0
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    /*p {
      max-width: none;
    }*/
  }
</style>
