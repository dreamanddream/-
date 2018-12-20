<template>
  <div class="base-message">
    <footers :urlRouter="$route.path"></footers>
  </div>
</template>
<script>
 import footers from '@/components/common/footer'
  export default{
    components:{footers}
  }
</script>
