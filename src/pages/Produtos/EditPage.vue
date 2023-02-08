<template>
  <q-page class="q-ma-md">
    <q-form @submit="saveProduct" ref="form" class="q-gutter-md">
      <q-input v-model="object.NOME" label="Nome do produto" required />
      <q-input v-model="object.DESCRICAO" label="Descrição do produto" />
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
    <div class="q-mt-md">
      <q-btn label="Remover produto" outline class="full-width" color="red" />
    </div>
  </q-page>
</template>
<script>
import baseApi from "src/api/base/base.api";
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
      object: { ...(this.data || { ATIVO: 1, VALOR: 0 }) },
      categorias: [],
      subCategorias: [],
    };
  },
  mounted() {
    this.getCategories();
  },
  computed: {
    btnSaveText() {
      if (this.edit) return "Atualizar produto";

      return "Inserir produto";
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
        .insert("produtos", this.object)
        .then(() => {
          alert("Produo inserido com sucesso");
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally(() => {
          this.object = {};
          this.backToProductsList();
        });
    },
    async update() {
      await baseApi
        .update("produtos", this.object)
        .then(() => {
          alert("Produo alterado com sucesso");
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally(() => {
          this.object = {};
          this.backToProductsList();
        });
    },
    backToProductsList() {
      this.$router.push({ name: "products" });
    },
    getCategories() {
      baseApi
        .get("categorias")
        .then((response) => {
          response.data.forEach((item) => {
            this.categorias.push(item.NOME);
          });
        })
        .catch((error) => {});
    },
  },
};
</script>
