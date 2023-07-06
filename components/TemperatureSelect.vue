<template>
    <div class="flex items-center space-x-4">
        <span @mouseover="visible = true" @mouseleave="visible = false" class="hover:underline">Temperature:</span>
        <InputNumber v-model="currentTemperature" inputId="minmaxfraction" :min="0.01" :max="1" class=""
            :minFractionDigits="1" :maxFractionDigits="1" />
        <CustomDialog :visible="visible">
            Controls randomness: Lowering results in less random completions.
            As the temperature approaches zero, the model will become deterministic and repetitive.
        </CustomDialog>
    </div>
</template>

<script setup>
import InputNumber from 'primevue/inputnumber';
const currentTemperature = useTemperature()
const visible = ref(false);

</script>

<style lang="scss" scoped></style>