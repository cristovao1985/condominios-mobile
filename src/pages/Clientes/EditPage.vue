<template>
  <q-page class="q-ma-md">
    <h6>{{ edit? `Editar registro #${data.ID}`:'Inserir registro' }}</h6>
    <q-form @submit="saveProduct" ref="form" class="q-gutter-md">
      <div v-for="item in model" :key="item.id">
        <template v-if="item.form && item.type === 'checkbox'">
          <q-checkbox
            v-model="object[item.field]"
            :label="item.field"
            :true-value="1"
            :false-value="0"
            v-if="item.form"
          />
        </template>
        <template v-else-if="item.form && item.type === 'select'">
          <q-select
            v-model="object[item.field]"
            :label="item.field"
            required
            :options="dataSelections[item.field]"
            v-if="item.form"
          />
        </template>
        <template v-else-if="item.form && item.type === 'mobile'">
          <q-input
            v-model="object[item.field]"
            :label="item.field"
            v-if="item.form"
            mask="(##)#####-####"
          />
        </template>
        <template v-else-if="item.form && item.type === 'phone'">
          <q-input
            v-model="object[item.field]"
            :label="item.field"
            v-if="item.form"
            mask="(##)####-####"
          />
        </template>
        <template v-else>

          <q-input
            v-model="object[item.field]"
            :label="item.field"
            required
            :type="item.type"
            v-if="item.form"
          />
        </template>
      </div>
      <!-- <q-input v-model="object.DESCRICAO" label="Descrição do produto" />
      <q-input
        v-model="object.VALOR"
        label="Valor do produto"
        required
        type="number"
        min="0.01"
        step="0.01"
      />
      <q-select
        v-model="object.CATEGORIA"
        :options="categorias"
        label="Categoria"
      />
      <q-select
        v-model="object.SUBCATEGORIA"
        :options="subCategorias"
        label="Sub Categoria"
      />

      <q-checkbox
        v-model="object.ATIVO"
        label="Ativo?"
        :true-value="1"
        :false-value="0"
      /> -->
      <div class="q-mt-md">
        <q-btn
          :label="btnSaveText"
          type="submit"
          class="full-width"
          color="primary"
        />
      </div>
    </q-form>
    <div class="q-mt-md">
      <q-btn label="Remover registro" outline class="full-width" color="red" v-if="edit"/>
    </div>
  </q-page>
</template>
<script>
import baseApi from "src/api/base/base.api";
import clientesModel from "../../models/clientes";
export default {
  name: "EditPage",
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
      object: { ...(this.data || {}) },
      dataSelections: {
        CATEGORIA: [],
        SUBCATEGORIA: [],
      },
      model: [...clientesModel],
      tableName:'clientes'
    };
  },
  mounted() {
    this.getCategories();
  },
  computed: {
    btnSaveText() {
      if (this.edit) return "Atualizar registro";

      return "Inserir registro";
    },
  },
  methods: {
    async saveProduct() {
      this.$refs.form.validate().then(() => {
        if (this.edit) {
          this.update();
          return;
        }
        this.insert();
      });
    },
    async insert() {
      await baseApi
        .insert(this.tableName, this.object)
        .then(() => {
          alert("Registro inserido com sucesso");
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally(() => {
          this.object = {};
          this.backToList();
        });
    },
    async update() {
      await baseApi
        .update(this.tableName, this.object)
        .then(() => {
          alert("Registro alterado com sucesso");
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally(() => {
          this.object = {};
          this.backToList();
        });
    },
    backToList() {
      this.$router.push({ name: this.tableName });
    },
    getCategories() {
      baseApi
        .get("categorias")
        .then((response) => {
          response.data.forEach((item) => {
            this.dataSelections["CATEGORIA"].push(item.NOME);
          });
        })
        .catch((error) => {});
    },
  },
};
</script>
