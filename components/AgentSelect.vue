<template>
    <div class="flex w-1/4 items-center space-x-4">
        <span @mouseover="visible = true" @mouseleave="visible = false" class="hover:underline">Agent:</span>
        <Dropdown v-model="currentAgent" :options="options" optionLabel="name" placeholder="Agent Default"
            class="w-full md:w-14rem" />
        <CustomDialog :visible="visible">
            Controls personality of the model. <br>{{ currentAgent.name }}: {{ currentAgent.info }}
        </CustomDialog>

    </div>
</template>

<script setup>
import Dropdown from 'primevue/dropdown';

const visible = ref(false);
const currentAgent = useAgent()
const options = ref(Object.values(agents));

onBeforeMount(() => {
    currentAgent.value = options.value[0]; // set to default agent
})
</script>

<style lang="scss" scoped></style>