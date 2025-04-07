document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有模块
    initializeNavigation();
    // 初始化导致导航栏链接无法正常跳转，在nabigation.js 中
    initializeSearch();
    initializeCarousel();
    initializeChat();
    // loadContent();
    
    // 添加模块加载优化代码
    initializeModules();
    
    // 监听键盘事件（添加位置：在DOMContentLoaded事件内部）
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isPopupVisible) {
            hidePopup();
        }
    }); 

    // AI客服功能 
    const aiServiceLink = document.querySelector('.ai-service-link');
    const aiServicePopup = document.querySelector('.ai-service-popup');
    const closePopupBtn = document.querySelector('.close-popup');
    const footer = document.querySelector('.site-footer');
    
    // 设置iframe地址
    const iframe = aiServicePopup.querySelector('iframe');
    iframe.src = 'https://lowcode-4gnnge870e785fd6-1345465534.tcloudbaseapp.com/app-unztj686/preview/?envType=preview';
    
    let isPopupVisible = false;//isPopupVisible标志跟踪状态,监视弹窗状态

    // 检测是否在页脚区域
    function isInFooterArea() {
        if (!footer) return false;
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // return (footerRect.top - windowHeight) <= 22;
        return footerRect.top <= windowHeight + 22; // 修改条件
    }

    // 显示弹窗
    function showPopup() {
        if (!isPopupVisible) {
            aiServicePopup.classList.add('show');
            isPopupVisible = true;
        }
    }

    // 隐藏弹窗
    function hidePopup() {
        if (isPopupVisible) {
            aiServicePopup.classList.remove('show');
            isPopupVisible = false;
            // 移除键盘监听（可选，适用于单次弹窗场景）
            document.removeEventListener('keydown', arguments.callee);  
        }
    }

    // 处理滚动事件,判断用户是否滚动到页脚区域，且滚动方向为向下时触发弹窗显示
    let lastScrollY = window.scrollY;
    function handleScroll() {
        const currentScrollY = window.scrollY;
        const isScrollingUp = currentScrollY < lastScrollY;

        if (isInFooterArea() && !isScrollingUp) {
            showPopup();
        } else if (!isInFooterArea() || isScrollingUp) {
            hidePopup();
        }

        lastScrollY = currentScrollY;
        
    }

    // 节流函数（优化滚动性能，
    // 高频滚动事件未节流，可能导致性能问题。
    // 建议使用 requestAnimationFrame 或 lodash 的 throttle 优化）
    function throttle(func, delay) {
        let lastTime = 0;
        return (...args) => {
        const now = Date.now();
        if (now - lastTime >= delay) {
            func.apply(this, args);
            lastTime = now;
        }
        };
    }
  
    // 修改后的监听滚动事件
    window.addEventListener('scroll', throttle(handleScroll, 100));
    // window.addEventListener('scroll', handleScroll);

    // 点击客服链接显示弹窗
    aiServiceLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPopup();
    });

    // 关闭弹窗
    closePopupBtn.addEventListener('click', () => {
        hidePopup();
    });

    // 初始检查是否在页脚区域
    if (isInFooterArea()) {
        showPopup();
    }
});


// ===================== 星星效果的生成 =========================

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('starsContainer');
    const starsCount = 200; // 星星数量
    
    // 清空容器，确保初始状态为空
    container.innerHTML = '';
    
    // 创建星星元素
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        
        // 随机选择星星类型，增加多样性
        const rand = Math.random();
        const size = rand > 0.9 ? 'stars5' : 
                    (rand > 0.75 ? 'stars4' : 
                    (rand > 0.5 ? 'stars3' : 
                    (rand > 0.25 ? 'stars2' : 'stars')));
        
        // 随机位置
        star.className = size;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        /**
         * =================== 方案二： ========================
         * // 随机位置，但确保顶部区域有更多星星
        star.className = size;
        
        // 调整星星分布，使顶部区域星星更密集
        let topPosition;
        if (Math.random() > 0.6) {
            // 40%的星星集中在页面上部30%的区域
            topPosition = Math.random() * 30;
        } else {
            // 60%的星星分布在整个页面
            topPosition = Math.random() * 100;
        }
        
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${topPosition}%`;
        
         */

        // 随机动画延迟
        star.style.animationDelay = `${Math.random() * 10}s`;
        
        // 为较大星星设置漂移方向
        if (size === 'stars3' || size === 'stars4' || size === 'stars5') {
            const driftX = (Math.random() - 0.5) * 20; // -10px到10px
            const driftY = (Math.random() - 0.5) * 20; // -10px到10px
            star.style.setProperty('--drift-x', `${driftX}px`);
            star.style.setProperty('--drift-y', `${driftY}px`);
        }
        
        container.appendChild(star);
    }
    
    // 延迟显示星星，避免突兀
    setTimeout(() => {
        container.classList.add('visible');
    }, 800);
});

// ============== 模块加载优化代码 =================
// 添加模块初始化函数
function initializeModules() {
    console.log("初始化模块...");
    
    // 确保 AOS 已加载
    if (typeof AOS === 'undefined') {
        console.error("AOS 库未加载");
        // 尝试加载 AOS
        const aosScript = document.createElement('script');
        aosScript.src = 'https://unpkg.com/aos@next/dist/aos.js';
        aosScript.onload = function() {
            console.log("AOS 库已加载");
            initAOS();
            refreshModules();
        };
        document.head.appendChild(aosScript);
        return;
    } else {
        initAOS();
        refreshModules();
    }
    
    function initAOS() {
        // 初始化 AOS 动画库，优化配置
        AOS.init({
            duration: 800,
            easing: 'cubic-bezier(0.19, 1, 0.22, 1)', // 更平滑的动画曲线
            once: false, // 允许动画重复
            mirror: true, // 向下滚动时启用镜像动画
            delay: 50,
            offset: 120, // 触发偏移量
            anchorPlacement: 'top-bottom'
        });
    }
    
    function refreshModules() {
        // 刷新 AOS 动画
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        const moduleCards = document.querySelectorAll('.module-card');
        
        if (moduleCards.length === 0) {
            console.warn("未找到模块卡片元素");
            return;
        }
        
        console.log(`找到 ${moduleCards.length} 个模块卡片`);
        
        // 确保模块卡片可见
        moduleCards.forEach(card => {
            // 确保卡片可见
            card.style.display = 'block';
            card.style.opacity = '1';
            
            // 预加载背景图片
            const bgDiv = card.querySelector('.module-bg');
            if (bgDiv) {
                const bgUrl = bgDiv.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
                if (bgUrl) {
                    const img = new Image();
                    img.src = bgUrl;
                    img.onload = function() {
                        // 图片加载完成后更新背景
                        bgDiv.style.opacity = '0.15';
                    };
                }
            }
        });
    }
}
