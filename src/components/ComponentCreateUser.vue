<template>
  <div class="d-flex align-items-center justify-content-center mt-5">
    <form @submit.prevent="submitForm" class="w-50">
      <div class="row mb-3">
        <label for="cliente" class="col-sm-2 col-form-label">Nome:</label>
        <div class="col-sm-10">
          <input type="text" id="cliente" v-model="cliente" required class="form-control custom-input">
        </div>
      </div>
      <div class="row mb-3">
        <label for="email" class="col-sm-2 col-form-label">Email:</label>
        <div class="col-sm-10">
          <input type="email" id="email" v-model="email" required class="form-control custom-input">
        </div>
      </div>
      <div class="row mb-3">
        <label for="cidade" class="col-sm-2 col-form-label">Cidade:</label>
        <div class="col-sm-10">
          <input type="text" id="cidade" v-model="cidade" required class="form-control custom-input">
        </div>
      </div>
      <div class="d-grid gap-2 w-25 mx-auto">
        <button class="btn btn-primary mt-3" type="submit">Cadastrar</button>
      </div>
    </form>
  </div>

  <p class="mt-5">{{ mensagem }}</p>
</template>

<script>
import http from '@/services/http.js';
import axios from 'axios';

export default {
  data() {
    return {
      cliente: '',
      email: '',
      cidade: '',
      mensagem: ''
    };
  },
  methods: {
    submitForm() {
      http.post('/API/connAPI.php', {
        function: 'Functions/insertClient',
        cliente: this.cliente,
        email: this.email,
        cidade: this.cidade
      })
        .then(response => {
          this.mensagem = response.data.data;
          this.limparFormulario();
        })
        .catch(error => {
          console.error(error);
        });
    },

    limparFormulario() {
      this.cliente = '';
      this.email = '';
      this.cidade = '';
    }

  }
};

</script>

<style>
.custom-input:focus {
  box-shadow: none;
}

label.col-sm-2.col-form-label {
  text-align: end;
}
</style>
