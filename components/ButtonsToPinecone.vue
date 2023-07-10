<template>
    <div class="grid grid-cols-12 w-1/2 p-5">
        {{ data }}
        <div class="col-span-6">
            <Button label="PDF > Embeddings > Store" icon="pi pi-send" class="px-1" @click="pdfToStore" size="small" />

        </div>
        <div class="col-span-6">
            <Button label="Clear Pinecone Store" icon="pi pi-trash" class="px-1" @click="clearStore" size="small" />
        </div>
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

async function clearStore() {
    await useFetch('/api/delete-vectors')
    return
}
</script>