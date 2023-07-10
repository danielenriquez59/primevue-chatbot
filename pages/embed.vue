<template>
    <div class="grid grid-cols-12 w-1/2 p-5">
        {{ data }}
        <div class="col-span-6">
            <Button label="PDF > Embeddings > Store" icon="pi pi-send" class="px-1" @click="pdfToStore" />

        </div>
        <div class="col-span-6">
            <Button label="Clear Pinecone Store" icon="pi pi-send" class="px-1" @click="clearStore" />
        </div>
    </div>
    <div class="max-w-md p-3 space-x-2">
        Send a Message
        <Textarea v-model="userInput" placeholder="Type a message..."
            class="w-full px-2 py-1 rounded-md border-2 border-blue-300" />
        <Button label="Send" icon="pi pi-send" class="px-1" @click="sendMessage" />
    </div>
</template>

<script setup>
import Textarea from 'primevue/textarea';
const filesPdfFiles = ref([])
const response = ref({})
const userInput = ref("")
const state = reactive({
    loading: false,
})

async function pdfToStore() {
    const { data } = await useFetch('/api/pdf-to-store')
    return data.value
}

async function sendMessage() {
    state.loading = true
    const response = await $fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: userInput.value
        })
    });

    // const data = await response.json();
    state.loading = false
}

async function clearStore() {
    await useFetch('/api/delete-vectors')
    return
}
</script>
