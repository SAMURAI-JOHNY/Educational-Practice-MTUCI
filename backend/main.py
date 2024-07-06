from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from hh_ru_parser.parser import get_vacancies

from schemas import Vacancies

from database.db_config import SessionLocal, engine
from database.models import Base, Vacancy
from database.crud import create_vacancy, update_vacancy, delete_old_vacancies

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def process_vacancies(vacancies, db: Session):
    existing_vacancy_ids = {vac.vacancy_id for vac in db.query(Vacancy).all()}

    for vacancy in vacancies:
        if vacancy["vacancy_id"] in existing_vacancy_ids:
            update_vacancy(db, vacancy)
        else:
            create_vacancy(db, vacancy)

    return existing_vacancy_ids


@app.post('/')
def vacancies_post(params: Vacancies, db: Session = Depends(get_db)):
    parse_vacancies = get_vacancies(params)
    new_vacancies_id = process_vacancies(parse_vacancies, db)

    delete_old_vacancies(new_vacancies_id, [vacancy["vacancy_id"] for vacancy in parse_vacancies], db)
    db.commit()

    return parse_vacancies


@app.get('/vacancies_filter')
def vacancies_filter(db: Session = Depends(get_db)):
    return db.query(Vacancy).all()