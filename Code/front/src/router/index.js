import Vue from "vue";
import VueRouter from "vue-router";
import isAuthenticatedGuard from "./auth-guard.js";

Vue.use(VueRouter);
const TITLE = "IZZI PARKING";
const routes = [
  {
    path: "*",
    redirect: "/404",
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404.vue"),
    meta: {
      requiresAuth: true,
      title: `${TITLE} - Error - 404`,
    },
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: {
      requiresAuth: false,
      title: `${TITLE} - Inicio`,
    },
  },
  {
    path: "/admin",
    beforeEnter: isAuthenticatedGuard,
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/",
        name: "dashboard_admin",
        component: () => import("../views/admin/Dashboard.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Administración`,
        },
      },
      {
        path: "/admin-position",
        name: "admin-position",
        component: () => import("../views/admin/AdminPosition.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Admininstrar Puestos`,
        },
      },
      {
        path: "/vehiculo",
        name: "vehiculo",
        component: () => import("../views/admin/Vehicle.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Administrar Vehiculos`,
        },
      },
      {
        path: "/ingreso",
        name: "ingreso",
        component: () => import("../views/admin/Entry.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Registrar ingreso`,
        },
      },
      {
        path: "/salida",
        name: "salida",
        component: () => import("../views/admin/Exit.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Registrar salida`,
        },
      },
      {
        path: "/ingreso-admin",
        name: "ingreso-admin",
        component: () => import("../views/admin/ManageEntry.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Administrar ingresos`,
        },
      },
    ],
  },
  {
    path: "/home",
    component: () => import("../views/Home.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("../views/user/Dashboard.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Inicio `,
        },
      },
      {
        path: "/reservas",
        name: "reservas",
        component: () => import("../views/Reserve.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Reservas`,
        },
      },
      {
        path: "/reservas-usuario",
        name: "reservas-usuario",
        component: () => import("../views/user/CalendarReserve.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Reservas`,
        },
      },
      {
        path: "/availablepositions",
        name: "available-positions",
        component: () => import("../views/AvailablePositions.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Puestos Disponibles`,
        },
      },

      {
        path: "/config-user",
        name: "config-user",
        component: () => import("../views/ConfigUser.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Usuario `,
        },
      },
      {
        path: "/puestos-disponibles",
        name: "puestos-disponibles",
        component: () => import("../views/AvailablePositions.vue"),
        meta: {
          requiresAuth: false,
          title: `${TITLE} - Puestos disponibles`,
        },
      },
      {
        path: "/helps",
        name: "helps",
        component: () => import("../views/user/Helps.vue"),
        meta: {
          requiresAuth: false,
          title: `${TITLE} - Ayudas`,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = sessionStorage.auth_code;
  document.title = to.meta.title;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const currentUser = auth ? JSON.parse(atob(auth)) : null;

  if (requiresAuth && !currentUser) next("Login");
  else if (!requiresAuth && currentUser && ["ADMIN", "SP"].includes(currentUser.DATA.level_user) && to.path != "/admin") {
    next("admin");
  } else if (!requiresAuth && currentUser && to.path !== "/home") next("home");
  else next();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

export default router;
