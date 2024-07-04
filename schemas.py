from pydantic import BaseModel


class Vacancies(BaseModel):
    text: str | None = None 
    experience: str | None = None
    schedule: str | None = None
    employment: str | None = None
    per_page: int = 100
    page: int = 1
    only_with_salary: bool = False


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