<template>
    <Dialog v-model:visible="visible" :style="{ width: '30vw' }" class="absolute bottom-96" :position="position">
        <p class="-mt-1">
            <slot></slot>
        </p>
    </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog';
const visible = ref(false);
const position = ref('bottom');
</script>

<style lang="scss" scoped></style>