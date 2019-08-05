<template>
  <div class="screenonebox" style="color:#fff;">
          <div class="screenleft">
            <div class="security">
                  <h2>安保巡查</h2>
                  <ul>
                      <li></li>
                  </ul>
            </div>
          </div>
          <div class="screencenter">
            2222
          </div>
          <div class="screenright">
            333
          </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss">
  .screenonebox{
    flex: 1;
    display: flex;
    padding: 0 1rem 2rem;

  }
  .screenleft{
    flex: 0 0 25%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .screencenter{
    flex: 0 0 50%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .screenright{
    flex: 0 0 25%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .security{
    color:#fff;
    h2{
      color:#fff;
    }
  }
</style>
