export default [
  {
    path: "/1-0",
    name: "1-0一级目录",
    icon: "th-large",
    component: resolve => require(["./views/Index"], resolve),
    children: [
      {
        path: "/1-1",
        name: "1-1",
        icon: "th-large",
        meta: { tag: 1 },
        component: resolve => require(["./views/Home"], resolve)
      }
    ]
  }
];
