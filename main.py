from fastapi import FastAPI, Depends
from sqlalchemy import insert

from parsesr import get_vacancies, get_resume
from schemas import Vacancies
from database import SessionLocal, engine
from sqlalchemy.orm import Session
import sqlalchemy as sq
from models import Base, Vacancie
from crud import create_vacancie, update_vacancie

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
    vacs = get_vacancies(params)
    for vac in vacs:
        vacancies_table = db.query(Vacancie).filter_by(vacancie_id=vac["vacancie_id"]).first()
        if vacancies_table is not None:
            update_vacancie(db, vac)
        else:
            create_vacancie(db, vac)
    return 'ok'