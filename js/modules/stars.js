// 星星背景生成脚本
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('starsContainer');
    if (!container) return;
    
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
        
        // 随机位置，但确保顶部区域有更多星星
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
        
        // 随机动画延迟
        star.style.animationDelay = `${Math.random() * 10}s`;
        
        // 为较大星星设置漂移方向
        if (size === 'stars3' || size === 'stars4' || size === 'stars5') {
            const driftX = (Math.random() - 0.5) * 20;
            const driftY = (Math.random() - 0.5) * 20;
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