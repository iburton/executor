<!------------------------------------------------------------------------------------------------
  -- Toast Message Component
  ------------------------------------------------------------------------------------------------
  Properties:
   * timer - Number of seconds to display the toast message (default: 10)
   * message - The text to display in the toast message
  ----------------------------------------------------------------------------------------------->
  
<script>
  import { onMount } from 'svelte'

  let nodeRef
  export let timer = 10
  export let message = 'Toast Message'

  const closeThis = () => {
    nodeRef.classList.add('fade')
    nodeRef.classList.add('out')

    setTimeout(() => {
      nodeRef.parentNode.removeChild(nodeRef)
    }, 750)
  }

  onMount(async () => {
    setTimeout(() => {
      closeThis()
    }, timer * 1000)
  })
</script>

<div class="floating toast-box compact unclickable transition visible" style="display: table !important;" bind:this={nodeRef}>
  <div class="info ui attached active progress inverted top compact" data-percent="">
    <div class="bar down progressing" style="animation-duration: {timer}s;">        
    </div>
  </div>
  <div class="ui toast compact visible" style="opacity: 1;">
    <div class="content">
      <div>{message}</div>
    </div>
    <i class="close icon" on:click|once={closeThis}></i>
    <span class="wait progressing" style="animation-duration: 1s;"></span>
  </div>
</div>
