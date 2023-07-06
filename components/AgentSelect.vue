<template>
    <div class="flex w-1/4 items-center space-x-4">
        <span>Agent:</span>
        <Dropdown v-model="currentAgent" :options="options" optionLabel="name" placeholder="Agent Default"
            class="w-full md:w-14rem" />
    </div>
</template>

<script setup>
import Dropdown from 'primevue/dropdown';

const currentAgent = useAgent()
const options = ref(Object.values(agents));

onBeforeMount(() => {
    currentAgent.value = options.value[0]; // set to default agent
})
</script>

<style lang="scss" scoped></style>