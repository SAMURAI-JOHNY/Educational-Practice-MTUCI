from fastapi import FastAPI
from parsesr import get_vacancies
from schemas import Vacancies

app = FastAPI()


@app.get('/')
def vacancies():
    vac = get_vacancies()
    return vac