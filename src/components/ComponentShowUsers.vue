<template>
    <div class="centered-container">
        <a-table :columns="columns" :data-source="data" class="centered-table mt-5">
            <template #bodyCell="{ column, record }"></template>
            <template #action="{ text, record }">
                <!-- <a-button type="primary" @click="editUser(record)">Editar</a-button> -->
                <a-button type="primary" @click="$router.push({ name: 'viewUser', params: { id: record.id } })">
                    Visualizar Usuário
                </a-button>
            </template>
        </a-table>
    </div>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue';
import http from '@/services/http.js';
import axios from 'axios';

export default {
    setup() {

        const columns = ref([]);
        const data = ref([]);

        onMounted(async () => {
            try {
                const response = await http.post('/API/connAPI.php',
                    {
                        function: 'Functions/showClient',
                    },
                );
                // Definir os dados retornados
                data.value = response.data.data;

                // Definir as colunas com base nos dados retornados
                columns.value = Object.keys(data.value[0]).map((key) => ({
                    title: key,
                    dataIndex: key,
                    key,
                }));

                // Adicionar a coluna "Action"
                columns.value.push({
                    title: 'Action',
                    key: 'action',
                    slots: { customRender: 'action' },
                });
            } catch (error) {
                console.error(error);
            }
        })

        return {
            data,
            columns,
        };
    }
};
</script>

<!-- <template>
    <div class="d-flex justify-content-center mt-3">
        <div>
            <table class="table table-hover table-dark mt-4">
                <thead>
                    <tr>
                        <th style="text-align: center;">ID</th>
                        <th style="text-align: center;">Nome</th>
                        <th style="text-align: center;">E-mail</th>
                        <th style="text-align: center;">Cidade</th>
                        <th style="text-align: center;">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td class="text-center">{{ user.id }}</td>
                        <td class="text-center">{{ user.cliente || 'Nome não disponível' }}</td>
                        <td class="text-center">{{ user.email || 'E-mail não disponível' }}</td>
                        <td class="text-center">{{ user.cidade || 'Cidade não disponível' }}</td>
                        <td class="text-center">
                            <div class="d-flex justify-content-between">
                                <button @click="$router.push({ name: 'viewUser', params: { id: user.id } })"
                                    class="btn btn-primary mr-2">
                                    Visualizar Usuário
                                </button>
                                <button @click="$router.push({ name: 'viewUser', params: { id: user.id } })"
                                    class="btn btn-primary mr-2 aaa">
                                    Editar
                                </button>
                                <button @click="$router.push({ name: 'viewUser', params: { id: user.id } })"
                                    class="btn btn-primary mr-2">
                                    Deletar
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    data() {
        return {
            users: [],
        };
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        fetchUsers() {
            axios.post('http://localhost/programacao-web/CriandoAPIPHP/API/connAPI.php', {
                function: 'Functions/showClient'
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(response => {
                    this.users = response.data.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },

        // verUsuario(user) {
        //     this.$router.push({ name: 'viewUser', params: { id: user.id } });
        // },

    },
};
</script>

<style>
    button.btn.btn-primary {
        width: 155px;
    }
    .aaa {
        margin-left: 10px;
        margin-right: 10px;
    }
</style> -->