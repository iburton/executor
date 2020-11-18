<!------------------------------------------------------------------------------------------------
  -- MainApp Component   
  ----------------------------------------------------------------------------------------------->
  
<script>
  import { Route } from 'svelte-router-spa'

  export let currentRoute = null
</script>

<main >
  <div class="ui left sidebar vertical menu visible  full height">
    <div class="item">
      <h2><img src="/images/p-120x120.png" style="width: 50px; height: 50px;" alt="logo">&nbsp;&nbsp;Executor</h2>
    </div>
    <a class="active item" href="#inbox">
      <div class="ui teal label">1</div>
      Inbox
    </a>
    <a class="item" href="#number2">
      2
    </a>
    <a class="item" href="#number3">
      3
    </a>
  </div>

  <div class="pusher">
    <!-- Site content !-->
    <Route {currentRoute} />
  </div>
</main>
