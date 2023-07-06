<template>
    <div class="flex w-1/4 items-center space-x-4">
        <span @mouseover="visible = true" @mouseleave="visible = false" class="hover:underline">Model:</span>
        <Dropdown v-model="currentChatModel" editable :options="options" optionLabel="name" placeholder="Select a Model"
            class="w-full md:w-14rem" />
        <CustomDialog :visible="visible">
            The model which will generate the completion. Some models are suitable for natural language tasks, others
            specialize in code.
        </CustomDialog>
    </div>
</template>

<script setup>
import Dropdown from 'primevue/dropdown';

const visible = ref(false);
const currentChatModel = useChatModel()
const options = ref(Object.values(models));

onBeforeMount(() => {
    currentChatModel.value = options.value[0]; // set to default agent
})
</script>

<style lang="scss" scoped></style>