import ReciboReceita from "../pages/Receitas/components/Recibo.vue";
import ReciboDespesa from "../pages/Despesas/components/Recibo.vue";
import CondominoPage from "../pages/Condominos/Condomino.vue";
import PrestacaoContasMes from "../pages/Relatorios/components/PrestacaoContasMes";
import OrdemManutencao from "../pages/Manutencoes/components/OrdemManutencao.vue";

const routes = [
  { path: "/", redirect: { path: "/home" } },
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
        meta: { title: "Home" },
        component: () => import("pages/Index.vue"),
      },
      {
        path: "/condominos",
        name: "condominos",
        meta: { title: "Condominos" },
        component: () => import("pages/Condominos/Index.vue"),
      },
      {
        path: "/condomino/:id?",
        name: "condomino",
        meta: { title: "Condomino" },
        component: CondominoPage,
        props: true,
      },
      {
        path: "/veiculos",
        name: "veiculos",
        meta: { title: "Veículos" },
        component: () => import("pages/Veiculos/Index.vue"),
      },
      {
        path: "/veiculo/:id?",
        name: "veiculo",
        props: true,
        meta: { title: "Veículo" },
        component: () => import("pages/Veiculos/Veiculo.vue"),
      },
      {
        path: "/receitas",
        name: "receitas",
        meta: { title: "Receitas" },
        component: () => import("pages/Receitas/Index.vue"),
      },
      {
        path: "/recorrencia",
        name: "recorrencia",
        meta: { title: "Recorrência" },
        component: () => import("pages/Receitas/Recorrencia.vue"),
      },
      {
        path: "/receita/:id?",
        name: "receita",
        props: true,
        meta: { title: "Receita" },
        component: () => import("pages/Receitas/Receita.vue"),
      },
      {
        path: "/despesas",
        name: "despesas",
        meta: { title: "Despesas" },
        component: () => import("pages/Despesas/Index.vue"),
      },
      {
        path: "/despesa/:id?",
        name: "despesa",
        props: true,
        meta: { title: "Despesa" },
        component: () => import("pages/Despesas/Despesa.vue"),
      },
      {
        path: "/relatorios",
        name: "relatorios",
        meta: { title: "Relatórios" },
        component: () => import("pages/Relatorios/Index.vue"),
      },
      {
        path: "/ocorrencias",
        name: "ocorrencias",
        meta: { title: "Ocorrências" },
        component: () => import("pages/Ocorrencias/Index.vue"),
      },
      {
        path: "/ocorrencia/:id?",
        name: "ocorrencia",
        props: true,
        meta: { title: "Ocorrência" },
        component: () => import("pages/Ocorrencias/Ocorrencia.vue"),
      },
      {
        path: "/manutencoes",
        name: "manutencoes",
        meta: { title: "Manutenções" },
        component: () => import("pages/Manutencoes/Index.vue"),
      },
      {
        path: "/manutencao/:id?",
        name: "manutencao",
        props: true,
        meta: { title: "Manutenção" },
        component: () => import("pages/Manutencoes/Manutencao.vue"),
      },
    ],
  },
  {
    path: "/",
    children: [
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
      {
        path: "/ordem-manutencao",
        name: "ordem-manutencao",
        props: true,
        component: OrdemManutencao,
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
