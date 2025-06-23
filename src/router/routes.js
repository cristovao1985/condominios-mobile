import ReciboReceita from "../pages/Receitas/components/Recibo.vue";
import ReciboDespesa from "../pages/Despesas/components/Recibo.vue";
import CondominoPage from "../pages/Condominos/CondominoPage.vue";
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
        component: () => import("src/pages/Login/IndexPage.vue"),
      },
      {
        path: "/reset",
        name: "reset",
        component: () => import("src/pages/Login/ResetPage.vue"),
      },
      {
        path: "/password",
        name: "password",
        props: true,
        component: () => import("src/pages/AlterarSenha/IndexPage.vue"),
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
        component: () => import("src/pages/Condominos/IndexPage.vue"),
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
        component: () => import("src/pages/Veiculos/IndexPage.vue"),
      },
      {
        path: "/veiculo/:id?",
        name: "veiculo",
        props: true,
        meta: { title: "Veículo" },
        component: () => import("src/pages/Veiculos/VeiculoPage.vue"),
      },
      {
        path: "/receitas",
        name: "receitas",
        meta: { title: "Receitas" },
        component: () => import("src/pages/Receitas/IndexPage.vue"),
      },
      {
        path: "/recorrencia",
        name: "recorrencia",
        meta: { title: "Recorrência" },
        component: () => import("src/pages/Receitas/RecorrenciaPage.vue"),
      },
      {
        path: "/receita/:id?",
        name: "receita",
        props: true,
        meta: { title: "Receita" },
        component: () => import("src/pages/Receitas/ReceitaPage.vue"),
      },
      {
        path: "/despesas",
        name: "despesas",
        meta: { title: "Despesas" },
        component: () => import("src/pages/Despesas/IndexPage.vue"),
      },
      {
        path: "/despesa/:id?",
        name: "despesa",
        props: true,
        meta: { title: "Despesa" },
        component: () => import("src/pages/Despesas/DespesaPage.vue"),
      },
      {
        path: "/relatorios",
        name: "relatorios",
        meta: { title: "Prestação de contas" },
        component: () => import("src/pages/Relatorios/IndexPage.vue"),
      },
      {
        path: "/ocorrencias",
        name: "ocorrencias",
        meta: { title: "Ocorrências" },
        component: () => import("src/pages/Ocorrencias/IndexPage.vue"),
      },
      {
        path: "/ocorrencia/:id?",
        name: "ocorrencia",
        props: true,
        meta: { title: "Ocorrência" },
        component: () => import("src/pages/Ocorrencias/OcorrenciaPage.vue"),
      },
      {
        path: "/manutencoes",
        name: "manutencoes",
        meta: { title: "Manutenções" },
        component: () => import("src/pages/Manutencoes/IndexPage.vue"),
      },
      {
        path: "/manutencao/:id?",
        name: "manutencao",
        props: true,
        meta: { title: "Manutenção" },
        component: () => import("src/pages/Manutencoes/ManutencaoPage.vue"),
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
