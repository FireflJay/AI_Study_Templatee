function initializeChat() {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');

    // 修改初始配置
    let currentConfig = {
        apiMode: 'OpenAI Format',  // 更新API模式
        apiDomain: 'https://api.siliconflow.cn/v1',  // 更新域名
        apiPath: '/chat/completions',  // 保持API路径
        apiKey: 'sk-gmuefviulipkqfwcywmeaqpohogdzxivucdgdrqxfnsbnqee',  // API密钥
        modelName: 'deepseek-ai/DeepSeek-R1'  // 严格保持模型名称一致
    };

    // 预设的欢迎消息
    const welcomeMessages = [
        {
            text: "你好！我是正宗 DeepSeek Reasoner (DeepSeek-R1) 👋",
            type: "ai"
        },
        {
            text: "关于现阶段大模型的一些特点：\n\n1. 模型的训练过程是将内容token化的，大模型看到的世界和人类看到的世界是不一样的\n\n2. 时间壁垒及知识的滞后性：大模型基础模型的训练数据的窗口是有截止时间的，包括2025年1月发布的DeepSeek-R1,发布时知识库的截止时间是在2023年10-12月\n\n3. 大模型在预训练的阶段，需要处理大量的PB级别的原始数据，对于原始数据的清洗需要大量的工序和时间，训练完成之后还要进行强化学习、微调、以基于人类反馈强化学习等\n\n有什么我可以帮你的吗？",
            type: "ai"
        }
    ];

    // 在初始化时添加API状态提示
    setTimeout(() => {
        // 在欢迎消息之后添加API状态提示
        welcomeMessages.push({
            text: "✅ API已配置完成，现在可以聊天啦！",
            type: "ai"
        });
        
        welcomeMessages.forEach((msg, index) => {
            setTimeout(() => {
                addMessage(msg.text, msg.type);
            }, index * 700);
        });
    }, 500);

    // 自动调整文本框高度
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 初始化设置对话框
    const settingsBtn = document.querySelector('.settings-btn');
    const settingsModal = document.getElementById('settingsModal');
    const closeBtn = settingsModal.querySelector('.close-btn');
    const cancelBtn = settingsModal.querySelector('.cancel-btn');
    const saveBtn = settingsModal.querySelector('.save-btn');

    // 绑定设置相关事件
    settingsBtn.addEventListener('click', openSettings);
    closeBtn.addEventListener('click', closeSettings);
    cancelBtn.addEventListener('click', closeSettings);
    saveBtn.addEventListener('click', saveSettings);
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) closeSettings();
    });

    function openSettings() {
        const apiModeSelect = document.getElementById('apiMode');
        apiModeSelect.innerHTML = `
            <option value="OpenAI Format" ${currentConfig.apiMode === 'OpenAI Format' ? 'selected' : ''}>OpenAI兼容（OpenAI Format）</option>
            <option value="azure" ${currentConfig.apiMode === 'azure' ? 'selected' : ''}>Azure OpenAI</option>
            <option value="custom" ${currentConfig.apiMode === 'custom' ? 'selected' : ''}>自定义模式</option>
        `;
        // 新增：设置当前模式,
        apiModeSelect.value = currentConfig.apiMode;
        
        // 1. 获取当前配置,在弹窗中显示：
        document.getElementById('apiDomain').value = currentConfig.apiDomain;
        document.getElementById('apiPath').value = currentConfig.apiPath;
        document.getElementById('apiKey').value = currentConfig.apiKey;
        document.getElementById('modelName').value = currentConfig.modelName;
        
        // 2.清空表单字段，而不是填充当前配置：
        // document.getElementById('apiDomain').value = '';
        // document.getElementById('apiPath').value = '';
        // document.getElementById('apiKey').value = '';
        // document.getElementById('modelName').value = '';

        settingsModal.classList.add('active');
    }

    function closeSettings() {
        settingsModal.classList.remove('active');
    }

    function saveSettings() {
        const newConfig = {
            apiMode: document.getElementById('apiMode').value,
            apiDomain: document.getElementById('apiDomain').value.trim(),
            apiPath: document.getElementById('apiPath').value.trim(),
            apiKey: document.getElementById('apiKey').value.trim(),
            modelName: document.getElementById('modelName').value.trim()
        };

        // 验证配置
        const errors = validateConfig(newConfig);
        if (errors.length > 0) {
            alert('配置错误:\n' + errors.join('\n'));
            return;
        }

        // 确保域名格式正确
        if (!newConfig.apiDomain.startsWith('https://')) {
            newConfig.apiDomain = 'https://' + newConfig.apiDomain;
        }

        // 确保路径以/开头
        if (!newConfig.apiPath.startsWith('/')) {
            newConfig.apiPath = '/' + newConfig.apiPath;
        }

        currentConfig = newConfig;
        localStorage.setItem('chatConfig', JSON.stringify(currentConfig));
        closeSettings();
        
        // 测试新配置
        addMessage('配置已更新。正在测试连接...', 'ai');
        testConnection();
    }

    // 添加配置验证函数
    function validateConfig(config) {
        const errors = [];
        
        if (!config.apiDomain.startsWith('https://')) {
          errors.push('API域名必须以 https:// 开头');
        }
        
        // if (!config.apiKey.startsWith('sk-')) {
        //   errors.push('API密钥格式不正确，应以 sk- 开头');
        // }
        
        if (config.apiKey.length < 20) {
          errors.push('API密钥长度不足');
        }
      
        return errors; // 确保返回错误列表
      }

        // 添加模型名称验证
        // if (config.modelName !== 'deepseek-ai/DeepSeek-R1') {
        //     errors.push('模型名称必须严格为: deepseek-ai/DeepSeek-R1');
        // }
        
        // return errors;
    }

    // 添加配置测试函数
    async function testConnection() {
        try {
            const apiUrl = `${currentConfig.apiDomain}${currentConfig.apiPath}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentConfig.apiKey}`
                },
                body: JSON.stringify({
                    model: currentConfig.modelName,
                    messages: [{role: "user", content: "测试"}],
                    max_tokens: 5,
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            addMessage('✅ 连接测试成功！你可以开始聊天了！', 'ai');
        } catch (error) {
            addMessage(`❌ 连接测试失败: ${error.message}`, 'ai');
        }
    }

    // 初始化时加载保存的配置
    const savedConfig = localStorage.getItem('chatConfig');
    if (savedConfig) {
        currentConfig = JSON.parse(savedConfig);
    }

    // async function sendMessage() {
    //     const message = chatInput.value.trim();
    //     if (!message) return;

    //     // 添加用户消息
    //     addMessage(message, 'user');
    //     chatInput.value = '';
    //     chatInput.style.height = 'auto';

    //     // 显示AI正在输入的状态
    //     const typingIndicator = addMessage('思考中...', 'ai');
        
    //     try {
    //         const apiUrl = `${currentConfig.apiDomain}${currentConfig.apiPath}`;
            
    //         const response = await fetch(apiUrl, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${currentConfig.apiKey}`
    //             },
    //             body: JSON.stringify({
    //                 model: currentConfig.modelName,
    //                 messages: [{
    //                     role: "user",
    //                     content: message
    //                 }],
    //                 temperature: 0.7,
    //                 max_tokens: 2000,
    //                 stream: false
    //             })
    //         });

    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    //         }

    //         // 移除"思考中"的消息
    //         typingIndicator.remove();

    //         const data = await response.json();
    //         if (data.choices && data.choices[0] && data.choices[0].message) {
    //             addMessage(data.choices[0].message.content, 'ai');
    //         } else {
    //             throw new Error('Invalid response format');
    //         }

    //     } catch (error) {
    //         console.error('API请求错误:', error);
    //         typingIndicator.remove();
    //         addMessage(`请求失败: ${error.message}\n\n可能的原因：\n1. API密钥无效\n2. 网络连接问题\n3. 跨域访问问题\n\n请检查网络连接或联系管理员。`, 'ai');
    //     }
    // }

    //***************聊天框的终止思考、重新生成模块 ↓******************* */
        let abortController = null;
        let lastUserMessage = null;

        async function sendMessage() {
            const message = chatInput.value.trim();
            if (!message) return;

            // 保存用户消息
            lastUserMessage = message;
            
            // 添加用户消息
            addMessage(message, 'user');
            chatInput.value = '';
            chatInput.style.height = 'auto';

            // 创建终止控制器
            abortController = new AbortController();

            // 显示AI正在输入的状态
            const typingIndicator = addMessage('思考中...', 'ai');
            
            // 显示终止按钮
            showStopButton(typingIndicator);

            try {
                const apiUrl = `${currentConfig.apiDomain}${currentConfig.apiPath}`;
                
                const response = await fetch(apiUrl, {
                    signal: abortController.signal,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentConfig.apiKey}`
                    },
                    body: JSON.stringify({
                        model: currentConfig.modelName,
                        messages: [{
                            role: "user",
                            content: message
                        }],
                        temperature: 0.7,
                        max_tokens: 2000,
                        stream: false
                    })
                });

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                // 移除"思考中"的消息
                typingIndicator.remove();

                const data = await response.json();
                if (data.choices?.[0]?.message?.content) {
                    const aiMessage = addMessage(data.choices[0].message.content, 'ai');
                    addRegenerateButton(aiMessage);
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    typingIndicator.querySelector('.content').innerHTML = `请求失败: ${error.message}`;
                    typingIndicator.classList.add('error');
                }
            } finally {
                // 移除终止按钮
                hideStopButton();
                abortController = null;
            }
        }

        // 显示终止按钮
        function showStopButton(targetMessage) {
            const stopBtn = document.createElement('div');
            stopBtn.className = 'stop-thinking-container';
            stopBtn.innerHTML = `
                <button class="stop-thinking-btn">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M6 6h12v12H6z"/>
                    </svg>
                    <span>终止思考</span>
                </button>
            `;
            
            stopBtn.querySelector('button').addEventListener('click', () => {
                if (abortController) {
                    abortController.abort();
                    const contentDiv = targetMessage.querySelector('.content');
                    targetMessage.querySelector('.content').textContent = '思考已终止';
                    targetMessage.classList.add('stopped');

                    // 添加重新生成按钮
                    addRegenerateButton(targetMessage); 
                }
            });
            
            chatMessages.appendChild(stopBtn);
        }

        // 隐藏终止按钮
        function hideStopButton() {
            const existingBtn = document.querySelector('.stop-thinking-container');
            if (existingBtn) existingBtn.remove();
        }

        // 添加重新生成按钮
        // 修改chat.js中的addRegenerateButton函数
        function addRegenerateButton(messageElement) {
            // 重新生成按钮
            const regenBtn = document.createElement('button');
            regenBtn.className = 'regenerate-btn';
            regenBtn.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>
                </svg>
            `;
            //                 <span>重新生成</span>

            
            // 复制按钮
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12V1z"/>
                </svg>
            `;
            //                 <span>复制</span>


            // 重新生成功能
            regenBtn.addEventListener('click', () => {
                if (lastUserMessage) {
                    chatInput.value = lastUserMessage;
                    sendMessage();
                }
            });

            // 复制功能
            copyBtn.addEventListener('click', async () => {
                try {
                    const content = messageElement.querySelector('.content').textContent;
                    await navigator.clipboard.writeText(content);
                    
                    // 显示成功提示
                    const successDiv = document.createElement('div');
                    successDiv.className = 'copy-success';
                    successDiv.textContent = '✓ 复制成功';
                    messageElement.appendChild(successDiv);
                    
                    // 3秒后移除提示
                    setTimeout(() => {
                        successDiv.remove();
                    }, 1500);
                } catch (err) {
                    console.error('复制失败:', err);
                }
            });

            // 添加按钮
            messageElement.appendChild(regenBtn);
            messageElement.appendChild(copyBtn);
        }

        // 修改addMessage函数添加消息容器
        function addMessage(text, type) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}`;
            
            // 创建消息内容容器
            const contentContainer = document.createElement('div');
            contentContainer.className = 'message-content-container';
            
            // 效果层
            const effectDiv = document.createElement('div');
            effectDiv.className = 'effect';
            
            // 内容层
            const contentDiv = document.createElement('div');
            contentDiv.className = 'content';
            contentDiv.innerHTML = formatMessage(text);

            if (type === 'ai') {
                const now = Date.now();
                effectDiv.style.setProperty('--shine-delay', `-${now % 8000}ms`);
            }

            contentContainer.appendChild(effectDiv);
            contentContainer.appendChild(contentDiv);
            messageDiv.appendChild(contentContainer);
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            return messageDiv;
        }

    // ********************停止思考、重新生成模块 ↑**************************

    function formatMessage(text) {
        return text
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>');
    }

    // chat.js 修复
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        // 创建效果容器
        const effectDiv = document.createElement('div');
        effectDiv.className = 'effect';
        
        // 创建内容容器
        const contentDiv = document.createElement('div');
        contentDiv.className = 'content';
        contentDiv.innerHTML = formatMessage(text);

        // 保持原有动画延迟逻辑
        if (type === 'ai') {
            const now = Date.now();
            const cycleDuration = 8000;
            const delay = -(now % cycleDuration) / 1000 + 's';
            effectDiv.style.setProperty('--shine-delay', delay);
        }

        messageDiv.appendChild(effectDiv);
        messageDiv.appendChild(contentDiv);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return messageDiv;
    }

    // 修改调试功能
    function addDebugInfo() {
        console.log('当前配置:', currentConfig);
        console.log('API URL:', `${currentConfig.apiDomain}${currentConfig.apiPath}`);
    }

    // 添加拖拽调整大小功能
    const chatSidebar = document.querySelector('.chat-sidebar');
    const resizeHandleSE = document.querySelector('.resize-handle-se');
    const resizeHandleSW = document.querySelector('.resize-handle-sw');

    const resizeHandleNE = document.querySelector('.resize-handle-ne');//添加上方的拖拽手柄
    const resizeHandleNW = document.querySelector('.resize-handle-nw'); 
    let isResizing = false;
    let currentHandle = null;
    let startX, startY, startWidth, startHeight;

    // 右下角拖拽
    // resizeHandleSE.addEventListener('mousedown', initResize);
    // 左下角拖拽
    // resizeHandleSW.addEventListener('mousedown', initResize);
    // 为所有手柄添加事件监听
    [resizeHandleSE, resizeHandleSW, resizeHandleNE, resizeHandleNW].forEach(handle => {
        handle.addEventListener('mousedown', initResize);
    });

    function initResize(e) {
        isResizing = true;
        currentHandle = e.target;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = chatSidebar.offsetWidth;
        startHeight = chatSidebar.offsetHeight;

        chatSidebar.classList.add('resizing');

        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
    }

    function resize(e) {
        if (!isResizing) return;

        let newWidth, newHeight;

        // if (currentHandle.classList.contains('resize-handle-se')) {
        //     // 右下角拖拽
        //     newWidth = startWidth + (e.clientX - startX);
        //     newHeight = startHeight + (e.clientY - startY);
        // } else {
        //     // 左下角拖拽
        //     newWidth = startWidth - (e.clientX - startX);
        //     newHeight = startHeight + (e.clientY - startY);
        // }
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        if (currentHandle.classList.contains('resize-handle-se')) {  // 右下角
            newWidth = startWidth + deltaX;
            newHeight = startHeight + deltaY;
        } else if (currentHandle.classList.contains('resize-handle-sw')) {  // 左下角
            newWidth = startWidth - deltaX;
            newHeight = startHeight + deltaY;
        } else if (currentHandle.classList.contains('resize-handle-ne')) {  // 右上角
            newWidth = startWidth + deltaX;
            newHeight = startHeight - deltaY;
        } else {  // 左上角
            newWidth = startWidth - deltaX;
            newHeight = startHeight - deltaY;
        }

        // 限制大小范围
        if (newWidth >= 600 && newWidth <= 1000) {
            chatSidebar.style.width = newWidth + 'px';
        }
        if (newHeight >= 600 && newHeight <= 800) {
            chatSidebar.style.height = newHeight + 'px';
        }

        // 保存当前大小到本地存储
        localStorage.setItem('chatWidth', chatSidebar.style.width);
        localStorage.setItem('chatHeight', chatSidebar.style.height);
    }

    function stopResize() {
        isResizing = false;
        chatSidebar.classList.remove('resizing');
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
    }

    // 恢复上次保存的大小
    const savedWidth = localStorage.getItem('chatWidth');
    const savedHeight = localStorage.getItem('chatHeight');
    if (savedWidth) chatSidebar.style.width = savedWidth;
    if (savedHeight) chatSidebar.style.height = savedHeight;

    // 还原大小按钮功能
    const restoreBtn = document.querySelector('.restore-size-container');
    restoreBtn.addEventListener('click', () => {
        chatSidebar.style.width = '800px';
        chatSidebar.style.height = '600px';
        
        // 清除保存的大小
        localStorage.removeItem('chatWidth');
        localStorage.removeItem('chatHeight');

        // 添加动画效果
        chatSidebar.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            chatSidebar.style.transition = '';
        }, 300);
    });
