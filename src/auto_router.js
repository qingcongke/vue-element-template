export default [
  {
    path: "/1-0",
    name: "1-0一级目录",
    icon: "iconfont thr-iconpassword",
    component: resolve => require(["./views/Index"], resolve),
    children: [
      {
        path: "/1-1",
        name: "1-1",
        icon: "el-icon-tickets",
        meta: { tag: 1 },
        component: resolve => require(["./views/Home"], resolve)
      },
      {
        path: "/1-2",
        name: "1-2",
        icon: "th-large",
        meta: { tag: 3 },
        component: resolve => require(["./views/Home"], resolve)
      }
    ]
  },
  {
    path: "/2-0",
    name: "2-0一级目录",
    icon: "th-large",
    component: resolve => require(["./views/Index"], resolve),
    children: [
      {
        path: "/2-1",
        name: "2-1",
        icon: "th-large",
        meta: { tag: 2 },
        component: resolve => require(["./views/Home"], resolve)
      }
    ]
  }
];
