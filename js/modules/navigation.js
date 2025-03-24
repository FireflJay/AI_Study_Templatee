function initializeNavigation() {
    const menuItems = document.querySelectorAll('.nav-menu a');
    
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // e.preventDefault();
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
} 


// Vue项目的入口文件，负责初始化实例和插件。这个函数可能处理导航相关的初始化，比如路由配置、事件监听或插件设置。
// 函数包含了阻止默认行为的代码，比如事件监听中的preventDefault()
// 注释掉潜在影响。首先，路由可能无法正确初始化，导致页面跳转问题。其次，全局导航守卫可能未注册，影响权限验证或页面加载动画。
// 另外，如果函数中绑定了事件监听器，比如处理滚动或点击，这些功能可能失效，导致交互问题
// 应该修改 initializeNavigation() 的实现，而非注释整个函数

// 保留路由初始化等必要逻辑
    // router.beforeEach(...); // 保留权限验证等关键逻辑

    // 移除或注释导致跳转失效的代码
    // document.querySelectorAll('.nav-menu a').forEach(link => {
    //     link.addEventListener('click', (e) => {
    //         e.preventDefault(); // 移除这行
    //     });
    // });

    // 1. 路由功能异常
    // 原因 ：initializeNavigation() 可能负责初始化路由配置或导航守卫。
    // 风险 ：页面跳转逻辑（如动态路由、权限验证）可能失效。
    // 示例 ：若使用 Vue Router，未初始化可能导致 this.$router 不可用。
    // 2. 全局事件监听失效
    // 原因 ：该函数可能绑定全局事件（如 window.onpopstate）或处理页面滚动行为。
    // 风险 ：浏览器前进/后退按钮、锚点跳转的平滑滚动可能异常。
    // 3. 插件或组件未注册
    // 原因 ：initializeNavigation() 可能注册导航相关的插件（如 vue-router）或全局组件。
    // 风险 ：依赖这些插件的功能（如 <router-link>）可能报错。
    // 4. 状态管理中断
    // 原因 ：若使用 Vuex/Pinia，该函数可能初始化状态管理或同步路由状态。
    // 风险 ：导航相关的状态（如当前路由参数）无法更新。