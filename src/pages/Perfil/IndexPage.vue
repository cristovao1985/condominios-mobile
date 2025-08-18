<template>
  <q-page class="q-ma-md">
    <span class="text-h5"> Meu Perfil </span> <br />

    <q-card>
      <q-card-section>
        <p class="text-bold">{{ condomino.nome }}</p>
        <p>{{ condomino.endereco }}</p>
        <p>{{ condomino.telefone }}</p>
        <p>{{ condomino.email }}</p>        
        <p>{{ condomino?.cpf?.substring(0,5) }}...</p>        
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import baseApi from "src/api/base/base.api";
import formaters from 'src/helpers/formaters';
export default {
  name: "PerfilPage",
  data() {
    return {
      condomino: {},
    };
  },
  created() {
    this.getPerfil();
  },
  methods: {
    getPerfil() {
      const morador = JSON.parse(localStorage.getItem("morador"));
      baseApi
        .getById("condominos", morador.id)
        .then((res) => {
          this.condomino = res.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dateFormat(date) {
      return formaters.receiptDate(date);
    },
  },
};
</script>
