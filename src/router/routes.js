const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/home", component: () => import("pages/Index.vue") },
      {
        path: "/products",
        name: "products",
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
        component: () => import("pages/Clientes/ListPage.vue"),
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
