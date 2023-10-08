<template>
    <div class="centered-container">
        <a-table :columns="columns" :data-source="data" :pagination="false" class="centered-table mt-5">
            <template #bodyCell="{ column, record }"></template>
            <template #action="{ text, record }"></template>
        </a-table>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { defineComponent, ref, onMounted } from 'vue';
import http from '@/services/http.js';
import axios from 'axios';

export default defineComponent({
    setup() {

        const columns = ref([]);
        const data = ref([]);
        const route = useRoute();

        onMounted(async () => {
            try {
                const response = await http.post('/API/connAPI.php', {
                    function: 'Functions/showUser',
                    id: route.params.id,
                });

                // Definir os dados retornados
                data.value = response.data.data;

                // Definir as colunas com base nos dados retornados
                columns.value = Object.keys(data.value[0]).map((key) => ({
                    title: key,
                    dataIndex: key,
                    key,
                }));
            } catch (error) {
                console.error(error);
            }
        });

        return {
            columns,
            data,
        };
    },
});

</script>

<style scoped>
    .centered-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .centered-table {
        width: fit-content;
    }
</style>