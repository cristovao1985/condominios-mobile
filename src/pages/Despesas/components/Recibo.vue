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
      <h6>Recibo de pagamento</h6>
      <p class="q-mt-xl">
        Declaramos para os devidos fins que no dia
        {{ dateFormat(recibo.data_pagamento) }} pagamos à
        <strong>{{ recibo.beneficiario }} </strong> a importância de
        <strong>R${{ recibo.valor }}</strong>
        referente à {{ recibo.descricao }}
      </p>
    </div>
    <div class="q-pa-md text-center">
      _______________________________________________
      <p>{{ recibo.beneficiario }}</p>
    </div>
    <div class="q-pa-md text-center">
      <p>Arcoverde, ____/____/________</p>
    </div>
  </div>
</template>
<script>
import formaters from "../../../helpers/formaters";
export default {
  name: "ReciboPage",
  data() {
    return {
      recibo: {},
    };
  },
  mounted() {
    this.recibo = JSON.parse(this.$route.query.data);
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
