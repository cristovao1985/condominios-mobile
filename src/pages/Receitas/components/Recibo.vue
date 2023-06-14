<template>
  <div>
    <div class="q-pa-xl text-center col" id="recibo">
      <h6>Recibo de pagamento</h6>
      <p>
        Condomínio Residencial Morada do Sol <br />
        Rua do Sol, 100 - Arcoverde - PE <br />
        CNPJ 19.767.835/0001-08
      </p>
      <p class="q-mt-xl">
        Declaramos para os devidos fins que no dia
        {{ recibo.data_pagamento }} recebemos do(a) senhor(a)
        <strong>{{ recibo.condomino }} </strong>, morador da unidade
        {{ recibo.endereco }}, a importância de
        <strong>R${{ recibo.valor }}</strong>
        referente à {{ recibo.descricao }}
      </p>
    </div>
    <div class="q-pa-md text-center">
      ____________________________________________
      <p>{{ recibo.condomino }}</p>
    </div>
    <div class="q-pa-md text-center">
      <p>Arcoverde, ____/____/________</p>
    </div>
  </div>
</template>
<script>
import router from "src/router";
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
  },
};
</script>
