<template>
  <div>
    <div class="q-pa-md text-center col" id="recibo">
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
      <h6>PRESTAÇÃO DE CONTAS {{ recibo.mes }}/{{ recibo.ano }}</h6>
      <TableDespesas :data="recibo.despesas" />
      <br />
      <TableReceitas :data="recibo.receitas" />
    </div>
    <div class="row justify-between bg-grey-3 q-pa-sm">
      <div>
        <strong>TOTAL RECEITAS: R${{ recibo.totalR }}</strong>
      </div>
      <div>
        <strong>TOTAL DESPESAS: R${{ recibo.totalD }}</strong>
      </div>
      <div>
        <strong
          >SALDO: R${{ (recibo.totalR - recibo.totalD).toFixed(2) }}</strong
        >
      </div>
    </div>
  </div>
</template>
<script>
import TableDespesas from "./TableDespesas";
import TableReceitas from "./TableReceitas";
export default {
  name: "PrestacaoMesPage",
  components: {
    TableDespesas,
    TableReceitas,
  },
  data() {
    return {
      recibo: {
        despesas: [],
        receitas: [],
        mes: "",
        ano: "",
        totalR: 0,
        totalD: 0,
        saldo: 0,
      },
      logoPath: "",
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
