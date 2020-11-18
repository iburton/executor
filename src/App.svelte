<!------------------------------------------------------------------------------------------------
  -- Base Application Component                                                                 --
  ----------------------------------------------------------------------------------------------->

<script>
  import { onMount, onDestroy } from 'svelte'
  import { Router } from 'svelte-router-spa'
  import routes from './routes'

  import Toast from './components/elements/toast.svelte'
  import notifications from './stores/store_notification'

  let unsubscribe
  let toaster

  let child

  onMount(async () => {
    unsubscribe = notifications.subscribe((value) => {
      if (value.message != null) {
        child = new Toast({
          target: toaster,
          props: { message: value.message, timer: value.timer },
        })
      }
    })
  })

  onDestroy(async () => {
    child = null
    unsubscribe()
  })
</script>

<div class="top right ui toast-container" bind:this={toaster}>
</div>
<Router {routes} />
