(function (global) {
  function createModal() {
    const modal = document.createElement("div");
    modal.id = "sdk-modal";
    modal.style.display = "none";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "1000";
    modal.innerHTML = `
              <div id="sdk-modal-content" class="collapsed">
                  <div id="sdk-loader-container">
                      <div id="sdk-loader">
                          <div class="loader"></div>
                      </div>
                  </div>
                  <iframe id="sdk-iframe" allow="camera;geolocation" style="width: 100%; height: 100%;"></iframe>
              </div>
          `;
    document.body.appendChild(modal);

    return modal;
  }

  function open(url, onSuccess, onFailure) {
    if (!url.includes("potleex0.de") && !url.includes("settle.club")) {
      onFailure({ errorMsg: "Invalid URL provided" });
      return;
    }

    const modal = document.getElementById("sdk-modal") || createModal();
    const iframe = document.getElementById("sdk-iframe");
    const loaderContainer = document.getElementById("sdk-loader-container");
    const modalContent = document.getElementById("sdk-modal-content");

    modalContent.classList.add("collapsed");
    modalContent.classList.remove("closing");

    modal.style.display = "flex";
    loaderContainer.style.display = "flex";
    document.body.style.overflow = "hidden";

    iframe.style.visibility = "hidden";
    iframe.style.opacity = "0";
    iframe.src = url;

    iframe.onload = () => {
      modalContent.classList.remove("collapsed");
      loaderContainer.style.display = "none";
      setTimeout(() => {
        iframe.style.visibility = "visible";
        iframe.style.opacity = "1";
        iframe.style.transition = "opacity 1.5s";
      }, 500);
    };

    function handleMessage(event) {
      const message = event.data;
      const { type, transaction } = message;
      if (type === "success") {
        onSuccess(transaction);
        close();
      } else if (type === "failure") {
        onFailure(transaction);
        close();
      } else if (type === "close") {
        close();
      } else if (type === "reload") {
        window.location.reload();
      }
    }

    window.addEventListener("message", handleMessage);

    function close() {
      const modal = document.getElementById("sdk-modal");
      const iframe = document.getElementById("sdk-iframe");

      if (modal && iframe) {
        modalContent.classList.add("closing");
        setTimeout(() => {
          modal.style.display = "none";
          document.body.style.overflow = "";
          iframe.src = "";
        }, 500);
      }
      window.removeEventListener("message", handleMessage);
    }

    global.Settle.close = close;
  }

  global.Settle = {
    open: open,
    close: null,
  };

  // If using module.exports or ES6 export
  if (typeof module !== "undefined" && module.exports) {
    module.exports = global.Settle;
  } else if (typeof define === "function" && define.amd) {
    define(function () {
      return global.Settle;
    });
  }

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    @keyframes closeModal {
        0% { transform: scale(1); }
        100% { transform: scale(0); }
    }

    #sdk-modal-content {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        position: relative;
        width: 90%;
        height: 85%;
        max-width: 395px;
        max-height: 750px;
        overflow: hidden;
        transition: all 0.5s ease-in-out;
    }

    #sdk-modal-content.collapsed {
        width: 200px;
        height: 250px;
    }

    #sdk-modal-content.closing {
        animation: closeModal 0.5s forwards;
    }

    #sdk-loader-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .loader {
        border: 8px solid #f3f3f3;
        border-top: 8px solid #3498db;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
    }

    #sdk-iframe {
        border: none; 
        visibility: hidden;
        opacity: 0;       
    }

    @media (max-height: 650px) {
        #sdk-modal-content {
            transform: scale(0.8);
            height: 110%;
        }
    }
    `;
  document.head.appendChild(style);
})(window);
