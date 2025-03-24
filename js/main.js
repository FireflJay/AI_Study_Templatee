document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有模块
    initializeNavigation();
    // 初始化导致导航栏链接无法正常跳转，在nabigation.js 中
    initializeSearch();
    initializeCarousel();
    initializeChat();
    // loadContent();
    
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

