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
        <q-toolbar-title> Morada do Sol </q-toolbar-title>
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
          Controle de Condomínio
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
    title: "Condominos",
    caption: "Controle de condominos",
    icon: "people",
    link: "#/condominos",
  },
  {
    title: "Veículos",
    caption: "Controle de veiculos",
    icon: "drive_eta",
    link: "#/veiculos",
  },
  {
    title: "Receitas",
    caption: "Entrada de receitas",
    icon: "attach_money",
    link: "#/receitas",
  },
  {
    title: "Despesas",
    caption: "Despesas do condomínio",
    icon: "money_off_csred",
    link: "#/despesas",
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
