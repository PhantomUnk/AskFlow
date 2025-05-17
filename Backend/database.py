from tortoise import Tortoise

TORTOISE_ORM = {
    "connections": {"default": "sqlite://./Database/AskFlow.db"},
    "apps": {
        "models": {
            "models": ["tortoise_models.post"],  # Указываем модели
            "default_connection": "default",
        }
    }
}

async def init_db():
    await Tortoise.init(config=TORTOISE_ORM)
    await Tortoise.generate_schemas()  # Создаёт таблицы, если их нет

async def close_db():
    await Tortoise.close_connections()