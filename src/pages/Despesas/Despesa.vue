<template>
  <q-page class="q-ma-md">
    <h6>{{ edit ? `Editar registro #${data.id}` : "Inserir registro" }}</h6>
    <q-form @submit="saveDespesa" ref="form" class="q-gutter-md">
      <q-input
        v-model="object.beneficiario"
        label="Fornecedor\Cobrador"
        required
        autofocus
        placeholder="Digite para quem pagou o valor"
      />
      <q-select
        v-model="object.categoria"
        :options="categorias"
        label="Informe uma categoria"
        required
      />
      <q-select
        v-model="object.mes"
        :options="meses"
        label="Mês de referência"
        required
      />
      <q-input v-model="object.descricao" label="Descrição" required />
      <q-input
        v-model="object.valor"
        label="Valor R$"
        type="number"
        min="1"
        step="0.10"
        required
      />
      <q-input
        v-model="object.data_pagamento"
        label="Data pagamento"
        type="date"
      />
      <q-checkbox
        v-model="object.pago"
        label="Pago?"
        :true-value="1"
        :false-value="0"
      />

      <div class="q-mt-md">
        <q-btn
          :label="btnSaveText"
          type="submit"
          class="full-width"
          color="primary"
        />
      </div>
    </q-form>
  </q-page>
</template>
<script>
import baseApi from "src/api/base/base.api";

import ShowToastMixin from "../../mixins/notify";
export default {
  name: "Receita",
  props: {
    edit: {
      type: Boolean,
      required: true,
      default: () => {
        return false;
      },
    },
    data: {
      type: Object,
    },
  },
  data() {
    return {
      object: {
        ...(this.data || {
          descricao: "Boleto",
          valor: 0,
          pago: 0,
          data_pagamento: "",
          mes: "",
          beneficiario: "",
        }),
      },
      tableName: "despesas",
      condominos: [],
      meses: [
        "JANEIRO",
        "FEVEREIRO",
        "MARÇO",
        "ABRIL",
        "MAIO",
        "JUNHO",
        "JULHO",
        "AGOSTO",
        "SETEMBRO",
        "OUTUBRO",
        "NOVEMBRO",
        "DEZEMBRO",
      ],
      categorias: ["DESPESAS GERAIS","ÁGUA","ENERGIA","PRESTADORES DE SERVIÇOS","MATERIAL DE ESCRITÓRIO","TRANSPORTE"]
    };
  },
  computed: {
    btnSaveText() {
      return this.edit ? "Atualizar registro" : "Inserir registro";
    },
  },
  mixins: [ShowToastMixin],
  created() {
    if (this.edit) {
      this.object.data_pagamento = this.data.data_pagamento.substring(0, 10);
    } else {
      this.object.mes = new Date()
        .toLocaleString("pt-br", { month: "long" })
        .toUpperCase();
      this.object.data_pagamento = new Date().toISOString().split("T")[0];
    }
  },
  methods: {
    async saveDespesa() {
      this.$refs.form.validate().then(() => {
        if (this.edit) {
          this.update();
          return;
        }
        this.insert();
      });
    },
    async insert() {
      if (!this.object.mes) {
        ShowToastMixin.showToast("Informe um mês de referência", "warning");
        return;
      }
      await baseApi
        .insert(this.tableName, this.object)
        .then(() => {
          ShowToastMixin.showToast("Registro inserido com sucesso", "positive");
        })
        .catch((error) => {
          ShowToastMixin.showToast(error.message, "negative");
        })
        .finally(() => {
          this.object = {};
          this.backToList();
        });
    },
    async update() {
      delete this.object.condomino;
      delete this.object.endereco;
      await baseApi
        .update(this.tableName, this.object)
        .then(() => {
          ShowToastMixin.showToast("Registro alterado com sucesso", "positive");
        })
        .catch((error) => {
          ShowToastMixin.showToast(error.message, "negative");
        })
        .finally(() => {
          this.object = {};
          this.backToList();
        });
    },
    backToList() {
      this.$router.push({ name: this.tableName });
    },
  },
};
</script>
