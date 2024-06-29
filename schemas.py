from pydantic import BaseModel
from typing import Union


class Vacancies(BaseModel):
    area: Union[int, None] = None
    per_page: int = 200
    page: int = 1
    experience: Union[str, None] = None
    only_with_salary: Union[bool, None] = None


class ParsVacancies(BaseModel):
    vacancie_id: int
    url: str
    name: str
    premium: bool
    has_test: bool
    company_name: str
    contacts: str
    vacancie_type: str
    snippet_requirement: str
    snippet_responsibility: str
    schedule: str
    professional_roles: str
    experience: str