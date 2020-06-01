const routes = [{
    "path": "goods",
    "component": "Layout",
    "meta": { "title": "商品管理", "icon": "" },
    "children": [
        {
            "path": "list",
            "component": "goods/index",
            "meta": { "title": "商品列表", "icon": "" }
        }, {
            "path": "recommend",
            "component": "goods/recommend",
            "meta": { "title": "商品推荐", "icon": "" }
        }, {
            "path": "recommend",
            "component": "goods/recommend",
            "meta": { "title": "精选商品", "icon": "" }
        }
    ]
}, {
    "path": "users",
    "component": "Layout",
    "meta": { "title": "用户管理", "icon": "" },
    "children": [
        {
            "path": "list",
            "component": "users/index",
            "meta": { "title": "用户列表", "icon": "" }
        }
    ]
}, {
    "path": "customer",
    "component": "Layout",
    "meta": { "title": "客户管理", "icon": "" },
    "children": [
        {
            "path": "list",
            "component": "customer/index",
            "meta": { "title": "客户列表", "icon": "" }
        }
    ]
}]