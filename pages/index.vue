<template>
    <div class="flex items-center justify-center space-x-4 py-4 bg-gray-200">
        <ModelSelect></ModelSelect>
        <AgentSelect></AgentSelect>
        <TemperatureSelect></TemperatureSelect>
    </div>
    <div class="h-[87vh] flex flex-col bg-gray-100 p-4 px-24">
        <div class="flex flex-col h-full overflow-y-auto space-y-4">
            <div class="flex space-x-2">
                <img src="@/assets/primevue-logo.webp" width="20" />
                <h2>PrimeVue ChatBot</h2>
            </div>
            <div v-if="conversationHistory.length !== 0" v-for="(message, index) in conversationHistory" :key="index"
                class="max-w-lg mx-auto min-w-[25vw] text-white">
                <div class="rounded-lg shadow-md p-2 px-3" :class="{
                    'bg-blue-400 -mr-40': message.role === 'user',
                    'bg-gray-500 -ml-40': message.role === 'assistant'
                }">
                    <p>{{ message.content }}</p>
                </div>
            </div>
            <div v-else> <span class="text-gray-400 ml-5">Feel free to start a new chat!</span> </div>
        </div>
        <div class="flex -pt-5 space-x-2">
            <Textarea v-model="userInput" placeholder="Type a message..."
                class="w-full px-2 py-1 rounded-md border-2 border-blue-300" />
            <Button label="Send" icon="pi pi-send" class="px-1" @click="sendMessage" />
        </div>
    </div>
</template>

<script setup>
import Textarea from 'primevue/textarea';
// state composables
const currentTemperature = useTemperature()
const currentAgent = useAgent()
const currentChatModel = useChatModel()

// ref vars
const statusMessage = ref("")
const conversationHistory = ref([
]);
const userInput = ref("")

async function sendMessage() {
    // clean message 
    if (userInput.value.trim() === "") {
        //we don't want to send empty messages
        return;
    }

    const selectedModel = currentChatModel.value.name;
    const selectedTokens = currentChatModel.value.tokens;
    const sysprom = currentAgent.value.systemprompt

    //add user message to conversation history
    conversationHistory.value.push({ role: "user", content: userInput.value });

    //system prompt + conversation history
    const FullPrompt = [{ role: "system", content: sysprom }].concat(
        conversationHistory.value
    );

    // push user message
    const result = await callOpenai(selectedModel, FullPrompt, currentTemperature.value, selectedTokens);
    console.log(result)
    conversationHistory.value.push({ role: "assistant", content: result.answer });
    statusMessage.value = `Used ${result.total_tokens} tokens. finish_reason=${result.finish_reason}`
    // reset input
    userInput.value = ""
}


</script>

<style lang="scss" scoped></style>