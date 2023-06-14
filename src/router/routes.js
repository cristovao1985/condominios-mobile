const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/home", component: () => import("pages/Index.vue") },
      {
        path: "/condominos",
        name: "condominos",
        component: () => import("pages/Condominos/Index.vue"),
      },
      {
        path: "/condomino",
        name: "condomino",
        props: true,
        component: () => import("pages/Condominos/Condomino.vue"),
      },
      {
        path: "/veiculos",
        name: "veiculos",
        component: () => import("pages/Veiculos/Index.vue"),
      },
      {
        path: "/veiculo",
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
        path: "/receita",
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
        path: "/despesa",
        name: "despesa",
        props: true,
        component: () => import("pages/Despesas/Despesa.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
  {
    path: "/recibo-receita",
    name: "recibo-receita",
    props: true,
    component: () => import("pages/Receitas/Components/Recibo.vue"),
  },
  {
    path: "/recibo-despesa",
    name: "recibo-despesa",
    props: true,
    component: () => import("pages/Despesas/Components/Recibo.vue"),
  },
];

export default routes;
