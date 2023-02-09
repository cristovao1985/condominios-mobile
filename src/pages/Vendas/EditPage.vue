<template>
  <q-page class="q-ma-md">
    <h6>{{ edit ? `Editar registro #${data.ID}` : "Inserir registro" }}</h6>

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
    <div class="q-mb-md">
      <q-btn label="Adicionar produto" @click="openModalProdutos" />
    </div>
    <div>
      <TableVendas
        :data="produtosVenda"
        :columns="produtoVendaModel"
        :title="'Produtos'"
        :showDeleteButton="true"
        :showAddButton="false"
        :canEditQtde="true"
        :changeValue="changeValue"
      />
    </div>
    <div class="q-mt-md">
      <q-btn
        :label="btnSaveText"
        type="submit"
        class="full-width"
        color="primary"
      />
    </div>

    <div class="q-mt-md">
      <q-btn
        label="Remover registro"
        outline
        class="full-width"
        color="red"
        v-if="edit"
      />
    </div>
    <SearchProductModal
      :show="showSearchProdutosModal"
      @add="addProduto"
      @remove="removeProduto"
      @openModal="openModalProdutos"
      :data="produtos"
      :columns="produtoModel"
      @closeModal="closeModalProdutos"
      :showDeleteButton="false"
      :showAddButton="true"
    />
  </q-page>
</template>
<script>
import vendasApi from "src/api/vendas/vendas.api";
import baseApi from "src/api/base/base.api";
import vendasModel from "../../models/vendas";
import produtosModel from "../../models/produtos";
import produtosVendasModel from "../../models/produtos_vendas";
import TableVendas from "../../components/TableVendas.vue";
import SearchProductModal from "src/components/SearchProductModal.vue";

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
  components: {
    TableVendas,
    SearchProductModal
  },
  watch: {
    produtosVenda() {
      console.log("mecheu");
    },
  },
  data() {
    return {
      object: { ...(this.data || {}) },
      dataSelections: {
        TIPO_PAGAMENTO: ["DINHEIRO", "CARTÃO DE CRÉDITO", "DÉBITO", "PIX"],
      },
      model: [...vendasModel],
      produtoModel: produtosModel,
      tableName: "vendas",
      produtos: [],
      produtosVenda: [],
      showSearchProdutosModal: false,
      produtoVendaModel: produtosVendasModel,
    };
  },
  mounted() {
    this.getAllProducts();
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
        const venda = {
          ID: this.object.ID,
          TIPO_PAGAMENTO: this.object.TIPO_PAGAMENTO,
          PAGO: this.object.PAGO,
        };

        this.object = venda;
        if (this.edit) {
          this.update();
          return;
        }
        this.insert();
      });
    },
    async insert() {
      await vendasApi
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
      await vendasApi
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
    async getAllProducts() {
      await baseApi
        .get("produtos")
        .then((response) => {
          this.produtos = [...response.data];
          this.produtos.map((item) => {
            item.QUANTIDADE = 1;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openModalProdutos() {
      this.showSearchProdutosModal = true;
    },
    closeModalProdutos() {
      this.showSearchProdutosModal = false;
    },
    addProduto(item) {
      this.produtosVenda.push(item);
    },
    removeProduto(item) {
      this.produtosVenda.splice(item, 1);
    },
    changeValue(item) {
      objIndex = this.produtosVenda.findIndex((obj) => obj.id == 1);
      this.produtosVenda[objIndex] = item;
    },
  },
};
</script>
