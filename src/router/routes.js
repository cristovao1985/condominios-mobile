import ReciboReceita from "../pages/Receitas/components/Recibo.vue";
import ReciboDespesa from "../pages/Despesas/components/Recibo.vue";
import CondominoPage from "../pages/Condominos/Condomino.vue";
import PrestacaoContasMes from "../pages/Relatorios/components/PrestacaoContasMes";

const routes = [
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    name: "auth-layout",
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("pages/Login/Index.vue"),
      },
      {
        path: "/reset",
        name: "reset",
        component: () => import("pages/Login/Reset.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    name: "main-layout",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("pages/Index.vue"),
      },
      {
        path: "/condominos",
        name: "condominos",
        component: () => import("pages/Condominos/Index.vue"),
      },
      {
        path: "/condomino/:id?",
        name: "condomino",
        component: CondominoPage,
        props: true,
      },
      {
        path: "/veiculos",
        name: "veiculos",
        component: () => import("pages/Veiculos/Index.vue"),
      },
      {
        path: "/veiculo/:id?",
        name: "veiculo",
        props: true,
        component: () => import("pages/Veiculos/Veiculo.vue"),
      },
      {
        path: "/receitas",
        name: "receitas",
        component: () => import("pages/Receitas/Index.vue"),
      },
      {
        path: "/recorrencia",
        name: "recorrencia",
        component: () => import("pages/Receitas/Recorrencia.vue"),
      },
      {
        path: "/receita/:id?",
        name: "receita",
        props: true,
        component: () => import("pages/Receitas/Receita.vue"),
      },
      {
        path: "/despesas",
        name: "despesas",
        component: () => import("pages/Despesas/Index.vue"),
      },
      {
        path: "/despesa/:id?",
        name: "despesa",
        props: true,
        component: () => import("pages/Despesas/Despesa.vue"),
      },
      {
        path: "/relatorios",
        name: "relatorios",
        component: () => import("pages/Relatorios/Index.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
  {
    path: "/recibo-receita",
    name: "recibo-receita",
    props: true,
    component: ReciboReceita,
  },
  {
    path: "/recibo-despesa",
    name: "recibo-despesa",
    props: true,
    component: ReciboDespesa,
  },
  {
    path: "/prestacao-contas-mes",
    name: "prestacao-contas-mes",
    props: true,
    component: PrestacaoContasMes,
  },
];

export default routes;
