<template>
  <div>
    <div class="q-pa-xl text-center col" id="recibo">
      <q-img
        src="../../../../public/images/logo.png"
        spinner-color="white"
        style="height: 140px; max-width: 150px"
      />
      <p>
        Condomínio Residencial Morada do Sol <br />
        Rua do Sol, 100 - Arcoverde - PE <br />
        CNPJ 19.767.835/0001-08
      </p>
      <h6>Ordem de manutenção/serviço</h6>
      <p class="q-mt-xl">
        Declaramos para os devidos fins que no dia
        {{ dateFormat(manutencao.data) }} realizamos o serviço de
        {{ manutencao.titulo }} para o(a) senhor(a)
        <strong>{{ manutencao.condomino }} </strong> <br />
      </p>
    </div>
    <div class="q-ml-md">
      <strong> Descrição do serviço:</strong> <br />
      <div v-html="manutencao.descricao"></div>
    </div>
    <div class="q-pa-md text-center">
      _______________________________________________
      <p>{{ manutencao.condomino }}</p>
    </div>
    <div class="q-pa-md text-center">
      <p>Arcoverde, ____/____/________</p>
    </div>
  </div>
</template>
<script>
import formaters from "../../../helpers/formaters";
export default {
  name: "OrdemPage",
  data() {
    return {
      manutencao: {},
    };
  },
  mounted() {
    this.manutencao = JSON.parse(this.$route.query.data);
    this.printPage();
  },
  methods: {
    printPage() {
      window.print();
    },
    dateFormat(date) {
      return formaters.date(date);
    },
  },
};
</script>
