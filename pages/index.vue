<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 class="mb-6 text-3xl font-bold text-center text-gray-700">Welcome to our App</h1>
        <div class="space-y-4">
            <Button label="Standard Open AI Chat" class="w-full" @click="navigateTo('/openaichat')" />
            <Button label="Pinecone QA Chat" class="w-full" @click="navigateTo('/vectorqa')" />
        </div>
    </div>
</template>
  
<script>

function navigateTo(route) {
    this.$router.push(route);
}

</script>
  
<style scoped></style>
  