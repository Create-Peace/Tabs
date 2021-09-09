<template>
  <div class="tab_pane" v-if="active">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'TabPane',
  props: {
    label: String,
    name: String
  },
  data () {
    return {
      index: null
    }
  },
  computed: {
    active() {
      const active = this.$parent.currentName === (this.label || this.index)
      return active;
    },
  }
}
</script>