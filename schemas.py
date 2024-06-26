from pydantic import BaseModel
from typing import Union


class Vacancies(BaseModel):
    area: Union[int, None] = None
    page: Union[int, None] = None
    per_page: Union[int, None] = None
    experience: Union[str, None] = None
    only_with_salary: Union[bool, None] = None