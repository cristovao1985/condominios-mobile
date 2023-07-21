<template>
  <q-page class="q-ma-md">
    <h6>{{ edit ? `Editar registro #${object.id}` : "Inserir registro" }}</h6>
    <q-form @submit="saveReceita" ref="form" class="q-gutter-md">
      <q-select
        v-model="object.id_condomino"
        :options="condominos"
        label="Condomino"
        option-value="id"
        option-label="nome"
        emit-value
        map-options
        :value="object.condomino"
        required
        autofocus
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
        required
      />
      <q-checkbox
        v-model="object.pago"
        label="Pago?"
        :true-value="1"
        :false-value="0"
        :value="object.pago"
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
import receitasApi from "src/api/receitas/receitas.api";
export default {
  name: "Receita",
  data() {
    return {
      object: {
        descricao: "Taxa de condomínio",
        valor: 100,
        pago: 1,
        data_pagamento: "",
        id_condomino: null,
        mes: "",
        condomino: "",
        categoria: "",
        id: "",
        ano: new Date().getFullYear(),
      },
      tableName: "receitas",
      condominos: [],
      edit: false,
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
      categorias: [
        "TAXA DE CONDOMÍNIO",
        "MULTAS",
        "TAXAS",
        "OUTROS",
        "ACORDOS",
      ],
    };
  },
  computed: {
    btnSaveText() {
      return this.edit ? "Atualizar registro" : "Inserir registro";
    },
  },
  mixins: [ShowToastMixin],
  async created() {
    this.getCondominos();

    if (this.$route.params.id) {
      this.edit = true;
      await this.getReceita();
      if (this.edit) {
        this.object.data_pagamento = this.object.data_pagamento.substring(
          0,
          10
        );
      } else {
        this.object.mes = new Date()
          .toLocaleString("pt-br", { month: "long" })
          .toUpperCase();
        this.object.data_pagamento = new Date().toISOString().split("T")[0];
      }
    } else {
      this.edit = false;
      //this.object = {};
      //this.backToList();
      this.object.mes = new Date()
        .toLocaleString("pt-br", { month: "long" })
        .toUpperCase();
      this.object.data_pagamento = new Date().toISOString().split("T")[0];
    }
  },
  methods: {
    async getCondominos() {
      await baseApi.get("condominos", "nome").then((result) => {
        // result.data.forEach((item) => {
        //   this.condominos.push({ label: item.nome, value: item.id });
        // });
        this.condominos = result.data;
      });
    },
    async saveReceita() {
      this.$refs.form.validate().then(() => {
        delete this.object.condomino;
        if (this.edit) {
          this.update();
          return;
        }
        this.insert();
      });
    },
    async insert() {
      if (!this.object.id_condomino) {
        ShowToastMixin.showToast("Informe um condomino válido", "warning");
        return;
      }
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
    async getReceita() {
      await receitasApi
        .getById(this.tableName, this.$route.params.id)
        .then((result) => {
          if (result.data.length) {
            this.object = result.data[0];
          }
        });
    },
  },
};
</script>
