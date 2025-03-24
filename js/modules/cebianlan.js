// cebianlan.js 修改后
document.addEventListener('DOMContentLoaded', function() {
    // 顶级菜单交互
    document.querySelectorAll('.nav-top-parent').forEach(parent => {
        parent.addEventListener('click', function(e) {
            e.stopPropagation();
            const topMenu = this.closest('.top-level-menu');
            topMenu.classList.toggle('active');
            document.querySelector('.side-nav').classList.toggle('expanded', topMenu.classList.contains('active'));
        });
    });

    // 子菜单交互
    document.querySelectorAll('.nav-sub-parent').forEach(parent => {
        parent.addEventListener('click', function(e) {
            if (e.target.closest('.nav-sub-link')) return; // 保留链接功能
            e.stopPropagation();
            this.closest('.submenu-item').classList.toggle('active');
        });
    });

    // 其他原有代码...
    // 关闭其他同级菜单
    const siblings = Array.from(item.parentNode.children).filter(
        sibling => sibling !== item
    );
    siblings.forEach(sibling => {
        sibling.classList.remove('active');
    });
});


// AI+ 工具矩阵二级新增：
// 在原有JS中添加工具矩阵交互
document.querySelectorAll('.submenu-item').forEach(item => {
    const toggle = item.querySelector('.nav-sub-toggle');
    
    // 添加旋转动画
    toggle.addEventListener('click', function() {
        this.style.transform = `rotate(${item.classList.contains('active') ? 0 : 90}deg)`;
    });

    // 工具项激活状态
    item.querySelectorAll('.tool-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // 移除同级激活状态
            this.closest('.nav-sub-children').querySelectorAll('.tool-link')
                .forEach(l => l.classList.remove('active'));
                
            this.classList.add('active');
        });
    });
});



// 空值校验和事件委托：
document.addEventListener('DOMContentLoaded', function() {
    // 使用事件委托
    document.querySelector('.chapter-list').addEventListener('click', function(e) {
        const target = e.target.closest('.has-children .nav-parent');
        if (!target) return;

        const parentItem = target.closest('.has-children');
        parentItem.classList.toggle('active');
        
        // 侧边栏展开逻辑
        const sideNav = document.querySelector('.side-nav');
        sideNav.classList.toggle('expanded', parentItem.classList.contains('active'));
        
        // 关闭其他同级菜单
        Array.from(parentItem.parentNode.children)
            .filter(sibling => sibling !== parentItem)
            .forEach(sibling => sibling.classList.remove('active'));
    });
});

// main.js客服脚本的复用：
{/* <script> */}
document.addEventListener('DOMContentLoaded', () => {
    // 初始化客服弹窗
    const aiServiceLink = document.querySelector('#summonAIService'); // 修改选择器
    const aiServicePopup = document.querySelector('.ai-service-popup');
    const closePopupBtn = document.querySelector('.close-popup');
    const iframe = aiServicePopup.querySelector('iframe');
    
    // 设置iframe地址（与原页面一致）
    iframe.src = 'https://lowcode-4gnnge870e785fd6-1345465534.tcloudbaseapp.com/app-unztj686/preview/?envType=preview';
    
    let isPopupVisible = false;

    // 显示/隐藏弹窗函数（与原逻辑一致）
    function showPopup() { /* ... */ }
    function hidePopup() { /* ... */ }

    // 绑定点击事件（关键修改点）
    aiServiceLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPopup();
    });
    closePopupBtn.addEventListener('click', hidePopup);
});
// </script>


// 侧边栏召唤AI客服测试
// 添加在DOMContentLoaded事件内
// document.getElementById('summonAIService').addEventListener('click', function(e) {
//     e.preventDefault();
    
//     如果已有弹出层则先移除
//     const existingPopup = document.querySelector('.ai-service-popup');
//     if (existingPopup) existingPopup.remove();

//     创建弹出层
//     const popup = document.createElement('div');
//     popup.className = 'ai-service-popup';
//     popup.innerHTML = `
//         <div class="popup-content">
//             <div class="popup-header">
//                 <h3>AI客服小深</h3>
//                 <span class="close-btn">&times;</span>
//             </div>
//             <div class="chat-container"></div>
//             <div class="input-area">
//                 <input type="text" placeholder="输入您的问题...">
//                 <button class="send-btn">发送</button>
//             </div>
//         </div>
//     `;

//     添加关闭功能
//     popup.querySelector('.close-btn').addEventListener('click', () => {
//         popup.remove();
//     });

//     document.body.appendChild(popup);
// });