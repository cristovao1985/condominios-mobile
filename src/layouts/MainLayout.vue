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
          v-if="currentRoute() === 'Home'"
        />
        <q-btn
          v-else
          flat
          dense
          round
          icon="arrow_back"
          aria-label="Menu"
          @click="$router.go(-1)"
        />
        <q-toolbar-title>
          {{
            `${currentRoute() === "Home" ? "Morada do Sol" : currentRoute()}`
          }}
        </q-toolbar-title>
        <div>v.1.0.0.1</div>
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
        <q-btn
          flat
          label="Sair "
          icon="logout"
          class="text-negative"
          @click="loggout"
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
import helper from "../helpers/session";
const linksData = [
  {
    title: "Home",
    caption: "Página inicial",
    icon: "home",
    link: "#/home",
  },
  {
    title: "Condominos",
    caption: "Controle de moradores",
    icon: "people",
    link: "#/condominos",
  },
  {
    title: "Veículos",
    caption: "Controle de veículos",
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
  {
    title: "Financeiro",
    caption: "Prestação de contas",
    icon: "request_page",
    link: "#/relatorios",
  },
  {
    title: "Ocorrências",
    caption: "Livro de ocorrências e notícias",
    icon: "warning_amber",
    link: "#/ocorrencias",
  },
  {
    title: "Manutenções",
    caption: "Serviços e manutenções",
    icon: "handyman",
    link: "#/manutencoes",
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
  methods: {
    loggout() {
      helper.loggout();
      this.$router.push({ name: "login" });
    },
    currentRoute() {
      return this.$router.currentRoute.value.meta.title;
    },
  },
};
</script>
