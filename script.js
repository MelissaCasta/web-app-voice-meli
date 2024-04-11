document.addEventListener("DOMContentLoaded", function () {
  const startRecognitionButton = document.getElementById("startRecognition");
    const resultOutput = document.getElementById("result");
    const vozElement = document.getElementById("IHC");
    let nuevaVentana;

let textC = ''; //Variable que guardará el comando detectado

// Verificar si el navegador soporta reconocimiento de voz
if (!('webkitSpeechRecognition' in window)) {
  // Deshabilitar el botón si el navegador no soporta el reconocimiento de voz
  startRecognitionButton.disabled = true;
  // Mostrar un mensaje de error al usuario
  resultOutput.textContent = "Su navegador no soporta el reconocimiento de voz.";
} else {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false; // El reconocimiento no es continuo
    recognition.interimResults = false; // No se muestran resultados intermedios
    recognition.lang = "es-ES"; // Establecer el idioma del reconocimiento

    // Evento cuando se inicia el reconocimiento de voz
    recognition.onstart = function() {
      startRecognitionButton.textContent = "Escuchando...";
    };
    // Evento en caso de error durante el reconocimiento de voz
    recognition.onerror = function(event) {
      startRecognitionButton.textContent = "Comenzar Reconocimiento";
      resultOutput.textContent = "Error durante el reconocimiento: " + event.error;
    };

    recognition.onend = function() {
      startRecognitionButton.textContent = "Comenzar Reconocimiento";
    };

    // Evento cuando la voz es detectada
    recognition.onresult = function(event) {
        const result = event.results[0][0].transcript;
        resultOutput.textContent = "La orden identificada es: " + result;
        textC = result.toLowerCase();

        // Procesar diferentes comandos según el texto reconocido
        if (result.includes("aumentar tamaño")) {
          let currentSize = parseInt(window.getComputedStyle(vozElement).fontSize);
          vozElement.style.fontSize = (currentSize + 5) + "px";
          console.log("Tamaño aumentado.");
          enviarDatos(textC);
        } else 
        
        if (result.includes("disminuir tamaño")) {
          let currentSize = parseInt(window.getComputedStyle(vozElement).fontSize);
          vozElement.style.fontSize = (currentSize - 5) + "px";
          console.log("Tamaño disminuido.");
          enviarDatos(textC);
        } else 
        
        if (result.includes("nueva ventana")) {
          nuevaVentana = window.open("https://online.kadasofsolutions.com/my/courses.php", "_blank");
          console.log("Nueva ventana abierta.");
          enviarDatos(textC);
        } else 
        
        if (result.includes("cerrar ventana")) {
          nuevaVentana && nuevaVentana.close();
          console.log("Ventana cerrada.");
          enviarDatos(textC);
        } else 
        
        if (result.includes("cerrar navegador")) {
          window.close();
          console.log("Navegador cerrado.");
          enviarDatos(textC);
        } else 
        
        if (result.includes("aumentar tamaño IHC")) {
          let currentSize = parseInt(window.getComputedStyle(vozElement).fontSize);
          vozElement.style.fontSize = (currentSize + 5) + "px";
          console.log("Tamaño de IHC aumentado.");
          enviarDatos(textC);
        } else 
        
        if (result.includes("disminuir tamaño IHC")) {
          let currentSize = parseInt(window.getComputedStyle(vozElement).fontSize);
          vozElement.style.fontSize = (currentSize - 5) + "px";
          console.log("Tamaño de IHC disminuido.");
          enviarDatos(textC);
        }
      

        function enviarDatos(textoCom) {
          const apiUrl = "https://6614d0222fc47b4cf27d170b.mockapi.io/comandos";
      
          const datos = {
            comando: textoCom
          };
      
          const options = {
              method: 'POST', // Método HTTP POST para enviar los datos
              headers: {
                  'Content-Type': 'application/json' // Especificar el tipo de contenido JSON
              },
              body: JSON.stringify(datos) // Convertir el objeto a JSON
          };
      
          fetch(apiUrl, options)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Ocurrió un error al enviar los datos a la API.');
              }
              return response.json();
          })
          .then(data => {
              console.log(data);
          })
          .catch(error => {
              console.error('Error al enviar los datos a la API:', error);
          });
      }
      
    };

    // Evento de error
    recognition.onerror = function(event) {
        console.error('Error de reconocimiento de voz:', event.error);
    };

    // Palabra clave para iniciar el reconocimiento de voz
    const activationKeyword = 'Meli';

    // Iniciar el reconocimiento de voz cuando se detecta la palabra clave
    recognition.onstart = function() {
        console.log("Reconocimiento activado");
    };

    // Detectar la palabra clave y activar el reconocimiento de voz
    recognition.onend = function() {
        recognition.start();
    };

    // Iniciar el reconocimiento de voz
    recognition.start();
} 

});
