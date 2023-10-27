const Home = () => import("@/pages/Home/index.vue");

export default [
  {
    path: "/",
    name: "home",
    component: Home,
  },
];
