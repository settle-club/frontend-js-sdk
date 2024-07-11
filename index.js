(function(global) {
    function createModal() {
        const modal = document.createElement('div');
        modal.id = 'sdk-modal';
        modal.style.display = 'none';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';
        modal.innerHTML = `
            <div id="sdk-modal-content" style="background-color: white; border-radius: 15px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); position: relative; width: 80%; height: 85%; max-width: 395px; overflow: hidden;">
                <div id="sdk-loader" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center;">
                    <div class="loader" style="border: 8px solid #f3f3f3; border-top: 8px solid #3498db; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite;"></div>
                </div>
                <iframe id="sdk-iframe" style="width: 100%; height: 100%; border: none;"></iframe>
            </div>
        `;
        document.body.appendChild(modal);

        return modal;
    }

    function open(url, onSuccess, onFailure) {
        if (!url.includes('potleex0.de') && !url.includes('settle.club')) {
            onFailure('Invalid URL');
            return;
        }

        const modal = document.getElementById('sdk-modal') || createModal();
        const iframe = document.getElementById('sdk-iframe');
        const loader = document.getElementById('sdk-loader');

        modal.style.display = 'flex';
        loader.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        iframe.style.display = 'none';
        iframe.src = url;

        iframe.onload = () => {
            loader.style.display = 'none';
            iframe.style.display = 'block';
        };

        function handleMessage(event) {
            // if (event.origin !== new URL(url).origin) {
            //     return;
            // }
            
            const message = event.data;
            console.log(message);
            if (message.type === 'success') {
                onSuccess();
                close();
                window.removeEventListener('message', handleMessage);
            } else if (message.type === 'failure') {
                onFailure(message.error);
                close();
                window.removeEventListener('message', handleMessage);
            }
        }

        window.addEventListener('message', handleMessage);
    }

    function close() {
        const modal = document.getElementById('sdk-modal');
        const iframe = document.getElementById('sdk-iframe');
        if (modal && iframe) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            iframe.src = "";
        }
    }

    global.Settle = {
        open: open,
        close: close
    };

    // If using module.exports or ES6 export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = global.Settle;
    } else if (typeof define === 'function' && define.amd) {
        define(function() { return global.Settle; });
    }

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

})(window);
