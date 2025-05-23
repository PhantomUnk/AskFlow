import asyncio
import g4f

async def send_request(request: str, model: g4f.Model, retries: int = 3) -> tuple[bool, str]:
    request_with_data = request + "\n\n All your answers MUST be short. Only 2 - 3 sentences!!! Answer to me In the language I wrote in at the beginning. " 
    try:
        response = await asyncio.wait_for(
            asyncio.to_thread(
                g4f.ChatCompletion.create,
                model=model,
                messages=[{"role": "user", "content": request_with_data}]
            ),
            timeout=20
        )
    except asyncio.TimeoutError:
        if retries > 0:
            print(f"⌛ Timeout exceeded! Retrying... Attempts left: {retries}")
            return await send_request(request, model, retries - 1)
        else:
            print("⌛ Timeout exceeded! No more retries.")
            return False, "⌛ Error: Timeout exceeded! Please try again later or choose *another AI model!*"
    except Exception as e:
        if retries > 0:
            print(f"⚠️ Exception - {e}. Retrying... Attempts left: {retries}")
            return await send_request(request, model, retries - 1)
        else:
            print(f"⚠️ Exception - {e}. No more retries.")
            return False, "⚠️ Error: Something went wrong. Please try again later or choose *another AI model!*"

    return True, response + f"\n\n\n *by {model.name}*" #type: ignore
