const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/home", component: () => import("pages/Index.vue") },
      {
        path: "/produtos",
        name: "produtos",
        component: () => import("pages/Produtos/ListPage.vue"),
      },
      {
        path: "/editProduct",
        name: "editProduct",
        component: () => import("pages/Produtos/EditPage.vue"),
        props: true,
      },
      {
        path: "/clientes",
        name:'clientes',
        component: () => import("pages/Clientes/ListPage.vue"),
      },
      {
        path: "/editClient",
        name: "editClient",
        component: () => import("pages/Clientes/EditPage.vue"),
        props: true,
      },
      {
        path: "/fornecedores",
        name:'fornecedores',
        component: () => import("pages/Fornecedores/ListPage.vue"),
      },
      {
        path: "/editFornecedor",
        name: "editFornecedor",
        component: () => import("pages/Fornecedores/EditPage.vue"),
        props: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
