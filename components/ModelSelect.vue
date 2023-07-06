<template>
    <div class="flex w-1/4 items-center space-x-4">
        <span>Model:</span>
        <Dropdown v-model="currentChatModel" editable :options="options" optionLabel="name" placeholder="Select a Model"
            class="w-full md:w-14rem" />
    </div>
</template>

<script setup>
import Dropdown from 'primevue/dropdown';

const currentChatModel = useChatModel()
const options = ref(Object.values(models));

onBeforeMount(() => {
    currentChatModel.value = options.value[0]; // set to default agent
})
</script>

<style lang="scss" scoped></style>