<template>
  <b-modal :id="modalId" centered hide-footer>
    <template #modal-title>
      <slot name="title">Modal Title</slot>
    </template>
    <div class="d-block text-center">
      <slot></slot>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: ['modalId']
}
</script>