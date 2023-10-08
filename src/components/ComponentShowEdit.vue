<template>
    <div class="centered-container">
        <a-table :columns="columns" :data-source="data" class="centered-table mt-5">
            <template #bodyCell="{ column, record }"></template>
            <template #action="{ text, record }">
                <a-button type="primary" @click="showEdit(record)">Editar</a-button>
                <a-button style="margin-left: 5px;" type="primary" @click="deleteUser(record)">Exluir</a-button>
            </template>
        </a-table>
    </div>

    <a-modal v-model:visible="visible" :title="modalTitle">
        <a-form @submit.prevent="submitForm">
            <a-form-item label="Nome:" :label-col="{ xs: 24, sm: 5 }" :wrapper-col="{ xs: 24, sm: 16 }" name="cliente">
                <a-input :value="cliente" @input="cliente = $event.target.value" />
            </a-form-item>

            <a-form-item label="Email:" :label-col="{ xs: 24, sm: 5 }" :wrapper-col="{ xs: 24, sm: 16 }" name="email">
                <a-input :value="email" @input="email = $event.target.value" />
            </a-form-item>

            <a-form-item label="Cidade:" :label-col="{ xs: 24, sm: 5 }" :wrapper-col="{ xs: 24, sm: 16 }" name="cidade">
                <a-input :value="cidade" @input="cidade = $event.target.value" />
            </a-form-item>
        </a-form>

        <template #footer>
            <a-button key="submit" type="primary" :loading="loading" @click="submitForm">Submit</a-button>
        </template>
    </a-modal>
</template>
  
<script>
import { defineComponent, ref, onMounted } from 'vue';
import { Modal } from 'ant-design-vue';
import http from '@/services/http.js';
import axios from 'axios';

export default defineComponent({
    setup() {
        const columns = ref([]);
        const data = ref([]);
        const loading = ref(false);
        const visible = ref(false);
        const isTrue = ref(false);
        const cliente = ref('');
        const email = ref('');
        const cidade = ref('');
        const id = ref('');
        const modalTitle = ref('');

        onMounted(() => {
            fetchData();
        });

        const fetchData = async () => {
            try {
                const response = await http.post(
                    '/API/connAPI.php',
                    {
                        function: 'Functions/showClient'
                    },
                );

                data.value = response.data.data;

                columns.value = Object.keys(data.value[0]).map((key) => ({
                    title: key,
                    dataIndex: key,
                    key,
                }));

                columns.value.push({
                    title: 'Action',
                    key: 'action',
                    slots: { customRender: 'action' },
                });

            } catch (error) {
                console.error(error);
            }
        };

        const showEdit = (recordData) => {
            console.log(recordData.id);
            visible.value = true;
            id.value = recordData.id
            cliente.value = recordData.cliente;
            email.value = recordData.email;
            cidade.value = recordData.cidade;
            modalTitle.value = `Editar Usuário: ${recordData.cliente}`
        };

        const submitForm = async () => {
            try {
                const response = await http.post(
                    '/API/connAPI.php',
                    {
                        function: 'Functions/updateClient',
                        id: id.value,
                        cliente: cliente.value,
                        email: email.value,
                        cidade: cidade.value,
                    },
                );

                let data = response.data.data;
                handleOk(data, cliente.value);
            } catch (error) {
                console.error(error);
            }
        };

        const handleOk = (data, cliente) => {
            loading.value = true;

            setTimeout(() => {
                loading.value = false;
                visible.value = false;

                countDown(data, cliente);
            }, 1000);
        };

        const countDown = (data, cliente) => {
            let secondsToGo = 3;
            console.log(data, cliente);
            const modal = Modal.success({
                title: `${data}`,
                content: `Essa modal irá sumir daqui ${secondsToGo} segundos.`,
                onOk: () => {
                    clearInterval(interval);
                    modal.destroy();
                    fetchData();
                    isTrue.value = true;
                    console.log(isTrue.value, '1');
                },
            });

            const interval = setInterval(() => {
                secondsToGo -= 1;
                modal.update({
                    content: `Essa modal irá sumir daqui ${secondsToGo} segundos.`,
                });
            }, 1000);

            setTimeout(() => {
                clearInterval(interval);
                modal.destroy();
                if (!isTrue.value) {
                    console.log(isTrue.value, '2');
                    fetchData();
                }
                isTrue.value = false; // Reiniciando o valor para false após o timeout
            }, secondsToGo * 1000);
        };

        const deleteUser = (recordData) => {
            console.log(recordData.id);
            const modal = Modal.success({
                title: `Excluir o cliente ${recordData.cliente}`,
                content: `Deseja excluir o ${recordData.cliente}?`,
                onOk: () => {
                    modal.destroy();
                    actionDeleteUser(recordData);
                },
            });
        };

        const actionDeleteUser = async (recordData) => {
            try {
                const response = await http.post(
                    '/API/connAPI.php',
                    {
                        function: 'Functions/deleteClient',
                        id: recordData.id,
                        cliente: recordData.cliente,
                    },
                );
                
                if (response.data.status === 'success') {
                    fetchData();
                }
                
            } catch (error) {
                console.error(error);
            }
        };

        return {
            data,
            columns,
            loading,
            visible,
            showEdit,
            deleteUser,
            handleOk,
            cliente,
            email,
            cidade,
            submitForm,
            modalTitle,
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
  