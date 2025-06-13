from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import google.generativeai as genai

# Configurar API key y modelo
genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash-latest')

# Contexto inicial con info de gestioncomercialhc.com (resumen o texto clave)
CONTEXT_INICIAL = """
Sos un asistente de IA especializado en el software de gestión comercial y administrativa llamado "Gestion Comercial HC".
Gestion Comercial HC es una plataforma especializada en soluciones para la gestión comercial y administrativa. 
Ofrece herramientas para optimizar ventas, control de inventarios, facturación electrónica, y administración de clientes, 
adaptándose a las necesidades de pequeñas y medianas empresas.
"""

@api_view(['POST'])
def chat_view(request):
    user_input = request.data.get('message')
    if not user_input:
        return Response({'error': 'No se proporcionó ningún mensaje.'}, status=400)

    historial = request.session.get('historial_chat', [])

    # Si es la primera interacción, agregamos el contexto inicial como primer mensaje "user"
    if not historial:
        historial.append({
            "role": "user",
            "content": CONTEXT_INICIAL
        })

    # Agregamos el mensaje actual del usuario
    historial.append({"role": "user", "content": user_input})

    mensajes = []
    for entry in historial:
        role = entry["role"]
        role_gemini = "model" if role == "assistant" else role
        mensajes.append({
            "role": role_gemini,
            "parts": [{"text": entry["content"]}]
        })

    try:
        chat = model.start_chat(history=mensajes)
        response = chat.send_message(user_input)

        historial.append({"role": "assistant", "content": response.text.strip()})
        request.session['historial_chat'] = historial
        request.session.modified = True

        return Response({'response': response.text.strip()})
    except Exception as e:
        return Response({'error': f'Hubo un problema al comunicarse con el servicio de IA: {str(e)}'}, status=503)
