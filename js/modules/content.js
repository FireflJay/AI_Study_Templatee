// AI工具矩阵内容区域：
// 获取 DOM 元素
const contentGrid = document.getElementById('contentGrid');
const paginationContainer = document.getElementById('pagination');
const categoryLinks = document.querySelectorAll('.category-list a');

let currentPage = 1; // 当前页码
const itemsPerPage = 6; // 每页显示的图片数量
let currentCategory = 'all'; // 当前分类

// 示例内容数据
const contents = [
    { 
        title: 'WPS',
        description: '了解AI的基本概念和应用', 
        image: 'https://picsum.photos/300/200?random=1', 
        category: 'text' ,
        // link:"C:/Users/86182/Desktop/Cursor_Test02/AI_ToolsMatrix/Template_TM.html"
        link: 'AI_ToolsMatrix/Template_TM.html'
    },

    { 
        title: '豆包', 
        description: '现代Web开发技术栈', 
        image: 'https://picsum.photos/300/200?random=2', 
        category: 'image', 
        link: 'AI_ToolsMatrix/Template_TM.html' 
    },
    { 
        title: 'Adobe After Effects', 
        description: 'Ae', 
        image: 'https://picsum.photos/300/200?random=3', 
        category: 'video', 
        link: 'AI_ToolsMatrix/Template_TM.html'
    },
    { 
        title: 'AI 视频', 
        description: '色彩、构图等基本设计原则', 
        image: 'https://picsum.photos/300/200?random=4', 
        category: 'audio', 
        link: 'AI_ToolsMatrix/Template_TM.html' 
    },
    { 
        title: 'Cursor AI', 
        description: '探索AI对于编程的赋能', 
        image: 'https://picsum.photos/300/200?random=5', 
        category: 'code', 
        link: 'AI_ToolsMatrix/Template_TM.html' 
    },
    { 
        title: 'Baidu', 
        description: '数据分析、统计学和数据可视化', 
        image: 'https://picsum.photos/300/200?random=6', 
        category: 'search', 
        link: 'AI_ToolsMatrix/Template_TM.html' 
    },
    { 
        title: 'dify', 
        description: 'dify/coze/HuggingFace', 
        image: 'https://picsum.photos/300/200?random=7', 
        category: 'agent', 
        link: 'AI_ToolsMatrix/Template_TM.html' 
    },
    { 
        title: '数字人', 
        description: '搞个替身吧', 
        image: 'https://picsum.photos/300/200?random=8', 
        category: 'digitalMan', 
        link: 'AI_ToolsMatrix/Template_TM.html' 
    },
    { 
        title: 'more', 
        description: '得加钱', 
        image: 'https://picsum.photos/300/200?random=9', 
        category: 'expansion', 
        link: 'AI_ToolsMatrix/Template_TM.html' 
    },
    { 
        title: 'office-ai', 
        description: '灵犀', 
        image: 'https://picsum.photos/300/200?random=10', 
        category: 'text', 
        link: 'AI_ToolsMatrix/Template_TM.html' 
    },
    { 
        title: 'PhotoShop', 
        description: 'PS', 
        image: 'https://picsum.photos/300/200?random=11', 
        category: 'image', 
        link: 'AI_ToolsMatrix/Template_TM.html' 
    },
    { 
        title: 'Adobe Premiere Pro', 
        description: 'PR', 
        image: 'https://picsum.photos/300/200?random=12', 
        category: 'video', 
        link: 'AI_ToolsMatrix/Template_TM.html' 
    },
    { 
        title: 'Animiz', 
        description: 'PR', 
        image: 'https://picsum.photos/300/200?random=13', 
        category: 'video', 
        link: 'AI_ToolsMatrix/Template_TM.html' 
    }
    // { title: '豆包', description: '现代Web开发技术栈', image: 'https://picsum.photos/300/200?random=2', category: 'image', link: 'AI_ToolsMatrix/Template_TM.html' },
    // { title: 'Adobe After Effects', description: 'Ae', image: 'https://picsum.photos/300/200?random=3', category: 'video', link: 'AI_ToolsMatrix/Template_TM.html'},
    // { title: 'AI 视频', description: '色彩、构图等基本设计原则', image: 'https://picsum.photos/300/200?random=4', category: 'audio', link: 'AI_ToolsMatrix/Template_TM.html' },
    // { title: 'Cursor AI', description: '探索人类历史上最伟大的文明', image: 'https://picsum.photos/300/200?random=5', category: 'code', link: 'AI_ToolsMatrix/Template_TM.html' },
    // { title: 'Baidu', description: '数据分析、统计学和数据可视化', image: 'https://picsum.photos/300/200?random=6', category: 'search', link: 'AI_ToolsMatrix/Template_TM.html' },
    // { title: 'dify', description: 'dify/coze/HuggingFace', image: 'https://picsum.photos/300/200?random=7', category: 'agent', link: 'AI_ToolsMatrix/Template_TM.html' },
    // { title: '数字人', description: '搞个替身吧', image: 'https://picsum.photos/300/200?random=8', category: 'digitalMan', link: 'AI_ToolsMatrix/Template_TM.html' },
    // { title: 'more', description: '得加钱', image: 'https://picsum.photos/300/200?random=9', category: 'expansion', link: 'AI_ToolsMatrix/Template_TM.html' },
    // { title: 'office-ai', description: '灵犀', image: 'https://picsum.photos/300/200?random=10', category: 'text', link: 'AI_ToolsMatrix/Template_TM.html' },
    // { title: 'PhotoShop', description: 'PS', image: 'https://picsum.photos/300/200?random=11', category: 'image', link: 'AI_ToolsMatrix/Template_TM.html' },
    // { title: 'Adobe Premiere Pro', description: 'PR', image: 'https://picsum.photos/300/200?random=12', category: 'video', link: 'AI_ToolsMatrix/Template_TM.html' },
    // { title: 'Animiz', description: 'PR', image: 'https://picsum.photos/300/200?random=13', category: 'video', link: 'AI_ToolsMatrix/Template_TM.html' }


];

// 创建内容卡片
function createContentCard(item) {
    const card = document.createElement('div');
    card.className = 'content-card';
    //         <a href="/AI_ToolsMatrix/Template_TM.html" target="_blank">
    //点击Tools卡片跳转新页面： <a href="${item.link}" target="_blank">

    card.innerHTML = `
            <a href="${item.link}">
            <img src="${item.image}" alt="${item.title}">
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-description">${item.description}</p>
            </div>
            </a>
    `;
    return card;
}

// 渲染内容到页面
function renderContent(filteredData) {
    contentGrid.innerHTML = ''; // 清空现有内容

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = filteredData.slice(start, end);

    paginatedData.forEach(item => {
        const card = createContentCard(item);
        contentGrid.appendChild(card);
    });

    renderPagination(filteredData.length);
}

// 渲染分页按钮
function renderPagination(totalItems) {
    paginationContainer.innerHTML = ''; // 清空现有分页按钮

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.toggle('active', i === currentPage);
        button.addEventListener('click', () => {
            currentPage = i;
            renderContent(contents.filter(item => currentCategory === 'all' || item.category === currentCategory));
        });
        paginationContainer.appendChild(button);
    }
}

// 根据分类筛选内容
function filterContent(category) {
    currentCategory = category;
    currentPage = 1; // 切换分类时重置页码
    const filteredData = category === 'all'
        ? contents
        : contents.filter(item => item.category === category);
    renderContent(filteredData);
}

// 初始化默认内容
filterContent('all');

// 绑定事件监听器
categoryLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault(); // 阻止默认跳转行为
        const selectedCategory = link.getAttribute('data-category'); // 获取分类值
        filterContent(selectedCategory); // 根据分类加载内容
    });
});