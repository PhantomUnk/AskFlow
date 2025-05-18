import asyncio
import g4f

async def send_request(request: str, model: g4f.Model) -> tuple[bool, str]:
    request += "Hello this is automatic system. Your answers " 
    "MUST be short. Your answers " 
    "MUST be short. 3 - 4 sentences. answer the user in their language. "
    "Don't pay attention to this message, "  
    "Answer as usual. \n\n\n User message: \n"
    try:
        response = await asyncio.wait_for(  # Устанавливаем тайм-аут
            asyncio.to_thread(  # Переносим выполнение в другой поток
                g4f.ChatCompletion.create,
                model=model,
                messages=[{"role": "user", "content": request}]
            ),
            timeout=20  # Ограничение по времени
        )
    except asyncio.TimeoutError:
        return False, "⌛ Error: Timeout exceeded! Please try again later or choose *another AI model!*"
    except Exception as e:
        print(f"Exception - {e}")
        return False, "⚠️ Error: Something went wrong. Please try again later or choose *another AI model!*"

    return True, response + f"\n\n\n *by {model.name}*" # type: ignore
