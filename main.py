from fastapi import FastAPI
from parsesr import get_vacancies, get_resume
from schemas import Vacancies

app = FastAPI()


@app.post('/')
def vacancies(params: Vacancies):
    vacs = get_vacancies(params)
    return vacs