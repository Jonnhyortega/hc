 export const chatBotFunctions = () => {
  const chatContainer = document.getElementById("chat-container");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-button");
  const closeChat = document.getElementById("close-chat");
  const iconChat = document.getElementById("icon-chat");


  window.addEventListener("beforeunload", function(e) {
  console.log("La página se está recargando o cerrando");
});


 
  iconChat.addEventListener("click", () => {
    chatContainer.style.display = "flex";
    iconChat.innerHTML
  });
  
  closeChat.addEventListener("click", () => {
    chatContainer.style.display = "none";
    iconChat.style.display = "block";
  });


  // Historial local para mantener contexto
  let history = [];

  
  // Función para agregar mensajes al chat visualmente
  function addMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.className = "message " + sender;
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Enviar mensaje al backend
  async function sendMessage() {
    
    const message = chatInput.value.trim();
    if (!message) return;
    console.log("Enviando mensaje..."); 
    addMessage(message, "user");
    chatInput.value = "";
    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // CSRF token solo si tu endpoint lo requiere
        },
        body: JSON.stringify({
          message: message,
          history: history
        }),
        credentials: "same-origin"
      });

      const data = await response.json();
      if (response.ok && data.response) {
        addMessage(data.response, "assistant");
        // Si tu backend requiere historial, podrías actualizarlo aquí
        // history.push({role: "user", content: message});
        // history.push({role: "assistant", content: data.response});
      } else {
        addMessage("Error: " + (data.error || "No se pudo obtener respuesta."), "assistant");
      }
    } catch (err) {
      addMessage("Error de conexión con el servidor.", "assistant");
    }
  }

  // Enviar con botón o Enter
  sendButton.addEventListener("click", (e) => {
    console.log("Click en botón enviar");
    if (sendButton.disabled) return;
    sendMessage();
  });
  chatInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        console.log("Click en botón enviar");
        sendMessage()};
  });
};
