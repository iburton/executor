<!------------------------------------------------------------------------------------------------
  -- Logout Form Component
  ----------------------------------------------------------------------------------------------->

<script>
  import { onMount } from 'svelte'
  import { navigateTo } from 'svelte-router-spa'
  import currentUser from '../../stores/store_current_user'

  onMount(async () => {
    setTimeout(() => {
      currentUser.signOut()
      navigateTo('login')
    }, 1500)
  })
</script>

<div class="ui middle aligned center aligned grid">
  <div class="ui active dimmer">
    <div class="ui massive text loader">Logging Out</div>
  </div>
  <p></p>
  <p></p>
  <p></p>
</div>

<style>
  .grid {
    height: 100%;
    background-color: #DADADA;
  }
</style>
