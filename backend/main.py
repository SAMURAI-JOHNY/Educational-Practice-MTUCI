from fastapi import FastAPI, Depends
from sqlalchemy import insert

from parsesr import get_vacancies
from schemas import Vacancies
from database import SessionLocal, engine
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from models import Base, Vacancie
from crud import create_vacancie, update_vacancie

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


@app.post('/')
def vacancies_post(params: Vacancies, db: Session = Depends(get_db)):
    vacs = get_vacancies(params)
    db_vacancie_id = [vac.vacancie_id for vac in db.query(Vacancie).all()]

    for vac in vacs:
        vacancies_table = db.query(Vacancie).filter_by(vacancie_id=vac["vacancie_id"]).first()
        if vacancies_table:
            update_vacancie(db, vac)
        else:
            create_vacancie(db, vac)

    for vac_id in db_vacancie_id: 
        if vac_id not in [vac["vacancie_id"] for vac in vacs]:
            vac_to_delete = db.query(Vacancie).filter_by(vacancie_id=vac_id).first()
            if vac_to_delete:
                db.delete(vac_to_delete)
    db.commit()
    return vacs


@app.get('/vacancies_filter')
def vacancies_filter(db: Session = Depends(get_db)):
    items = db.query(Vacancie).all()
    return items