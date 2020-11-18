<!------------------------------------------------------------------------------------------------
  -- Login Form Component
  ----------------------------------------------------------------------------------------------->

<script>
  import { navigateTo } from 'svelte-router-spa'
  import currentUser from '../../stores/store_current_user'
  import notification from '../../stores/store_notification'

  let email = ''
  let password = ''

  const login = () => {
    currentUser.signInEmail(email, password)
      .then(() => {
        notification.set({ message: `Welcome back ${$currentUser.email}!`, timer: 3 })
        navigateTo('/')
      })
      .catch(() => {
        notification.set({ message: 'Login failed, try again.', timer: 5 })
      })
  }

  const signup = () => {
    navigateTo('signup')
  }
</script>

<div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui teal image header">
      <img src="images/p-120x120.png" class="image" alt="logo">
      <div class="content">
        Executor Log-in
      </div>
    </h2>
    <form class="ui large form">
      <div class="ui stacked segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i> 
            <input type="text" name="email" bind:value={email} placeholder="E-mail address">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" name="password" bind:value={password} placeholder="Password">
          </div>
        </div>
        <div class="ui buttons fluid large">
          <button class="ui button teal" on:click|preventDefault={login}>Log In</button>
          <div class="or"></div>
          <button class="ui button"on:click|preventDefault={signup}>Sign Up</button>
        </div>        
      </div>

      <div class="ui error message"></div>

    </form>
  </div>
</div>

<style type="text/css">
  .grid {
    height: 100%;
    background-color: #DADADA;
  }
  .image {
    margin-top: -100px;
  }
  .column {
    max-width: 450px;
  }
</style>
