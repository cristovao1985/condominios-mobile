<template>
  <q-page class="q-ma-md">
    <span class="text-h5"> Meu Perfil </span> <br />

    <q-card>
      <q-card-section>
        <p>{{ condomnino.nome }}</p>
        <p>{{ condomnino.endereco }}</p>
        <p>{{ condomnino.telefone }}</p>
        <p>{{ condomnino.email }}</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import baseApi from "src/api/base/base.api";
export default {
  name: "PerfilPage",
  data() {
    return {
      condomnino: {},
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
          this.condomnino = res.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
