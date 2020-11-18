<!------------------------------------------------------------------------------------------------
  -- Home component for the main application               
  ----------------------------------------------------------------------------------------------->

<script>
  import CurrentUser from '../../stores/store_current_user'
  import units from '../../stores/store_units'

  const units2 = units.structured
</script>

<div>
  Main App
  {$CurrentUser.email}

  {#each $units2 as ut}
    <br/>
    {#each ut.children as ch}
    {ut.name} - {ch.name} <br/>
    {/each}
    <br/>
  {/each}
</div>
