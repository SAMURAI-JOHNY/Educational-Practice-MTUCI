from fastapi import FastAPI, Depends
from parsesr import get_vacancies, get_resume
from schemas import Vacancies
from database import SessionLocal, engine
from sqlalchemy.orm import Session
import sqlalchemy as sq
from models import Vacancie, Base
from crud import create_vacancie

Base.metadata.create_all(bind=engine)


app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post('/')
def vacancies_post(params: Vacancies, db: Session = Depends(get_db)):
    vacancies_table = Vacancie().qe
    vacs = get_vacancies(params)
    for vac in vacs:
        table_vacancie = db.execute(sq.select(vacancies_table).where(vacancies_table.vacancie_id == vac['id']))
        if table_vacancie is None:
            create_vacancie(db, vac)
        db.execute(sq.update(vacancies_table).where(
            vacancies_table.vacancie_id == vac['id']
        ).values(**vac))
        db.commit()
    return 'ok'