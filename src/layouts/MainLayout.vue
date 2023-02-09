<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title> Mini PDV </q-toolbar-title>
        <div>v.BETA</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "Home",
    caption: "Página inicial",
    icon: "home",
    link: "#/home",
  },
  {
    title: "Vendas",
    caption: "Controle de vendas",
    icon: "shopping_cart",
    link: "#/vendas",
  },
  {
    title: "Produtos",
    caption: "Controle de produtos",
    icon: "shopping_cart",
    link: "#/produtos",
  },
  {
    title: "Clientes",
    caption: "Controle de clientes",
    icon: "people",
    link: "#/clientes",
  },
  {
    title: "Fornecedores",
    caption: "Controle de Fornecedores",
    icon: "business_center",
    link: "#/fornecedores",
  },
];

export default {
  name: "MainLayout",
  components: {
    EssentialLink,
  },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
    };
  },
};
</script>
