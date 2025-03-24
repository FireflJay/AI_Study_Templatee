function initializeSearch() {
    const searchInput = document.querySelector('.nav-search input');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if(searchTerm) {
            searchContent(searchTerm);
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if(searchTerm) {
                searchContent(searchTerm);
            }
        }
    });
}

function searchContent(term) {
    console.log('搜索内容:', term);
    // 这里可以实现实际的搜索逻辑
} 