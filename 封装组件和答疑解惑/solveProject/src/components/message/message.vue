<template>
  <div class="base-message">
    <cart></cart>
    <footers :urlRouter="$route.path"></footers>
  </div>
</template>
<script>
 import footers from '@/components/common/footer'
 import cart from '@/components/common/cart'
  export default{
    components:{footers,cart}
  }
</script>
