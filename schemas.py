from pydantic import BaseModel


class Vacancies(BaseModel):
    name: str = None
    type: str = None
    premium: bool = None