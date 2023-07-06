<template>
    <div class="flex items-center space-x-4">
        <span>Temperature:</span>
        <InputNumber v-model="currentTemperature" inputId="minmaxfraction" :min="0.01" :max="1" class=""
            :minFractionDigits="1" :maxFractionDigits="1" />
    </div>
</template>

<script setup>
import InputNumber from 'primevue/inputnumber';
const currentTemperature = useTemperature()

// const temperature = ref(0.5);
// currentTemperature.value = temperature

</script>

<style lang="scss" scoped></style>