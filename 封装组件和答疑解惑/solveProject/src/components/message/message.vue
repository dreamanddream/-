<template>
  <div class="base-message">
    <cart></cart>
    <footers :urlRouter="$route.path"></footers>
  </div>
</template>
<script>
 import footers from '@/components/common/footer'
 import cart from '@/components/common/cart'
 import {mapGetters} from 'vuex'
  export default{
    components:{footers,cart}
  }
</script>
