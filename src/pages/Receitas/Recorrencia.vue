<template>
  <q-page class="q-ma-md">
    <h6>Inserir registros em massa</h6>
    <q-form ref="form" class="q-gutter-md">
      <div class="row">
        <div class="col q-ma-sm">
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
          <q-checkbox
            v-model="object.pago"
            label="Pago?"
            :true-value="1"
            :false-value="0"
            :value="object.pago"
          />
        </div>
        <div class="col q-ma-sm">
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
        </div>
      </div>
    </q-form>

    <TableCondominos :data="condominos" @setSelecteds="setSelecteds" />
    <div class="q-mt-md">
      <q-btn
        :label="btnSaveText"
        type="submit"
        class="full-width"
        color="primary"
        v-if="showBtnSave"
        @click="saveReceita"
      />
    </div>
  </q-page>
</template>
<script>
import baseApi from "src/api/base/base.api";
import TableCondominos from "./components/TableCondominos";
import ShowToastMixin from "../../mixins/notify";
import receitasApi from "src/api/receitas/receitas.api";
export default {
  name: "Recorrencia",
  components: {
    TableCondominos,
  },
  data() {
    return {
      object: {
        descricao: "Taxa de condomínio",
        valor: 100,
        pago: 0,
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
      categorias: ["TAXA DE CONDOMÍNIO", "MULTAS", "OUTROS"],
      selected: [],
    };
  },
  computed: {
    btnSaveText() {
      return this.edit ? "Atualizar registro" : "Inserir registro";
    },
    showBtnSave() {
      return this.selected.length;
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
        result.data.forEach((condomino) => {
          if (condomino.proprietario) {
            this.condominos.push(condomino);
          }
        });
      });
    },
    async saveReceita() {
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

      try {
        this.selected.forEach(async (item) => {
          this.object.id_condomino = item.id;
          delete this.object.condomino;
          await baseApi.insert(this.tableName, this.object);
        });

        ShowToastMixin.showToast(
          `${this.selected.length} registros inseridos com sucesso`,
          "positive"
        );
      } catch (error) {
        ShowToastMixin.showToast(error.message, "negative");
      } finally {
        this.object = {};
        this.backToList();
      }
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
    setSelecteds({ selected }) {
      this.selected = selected;
    },
  },
};
</script>
