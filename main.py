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

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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
    for vac in vacs:
        vacancies_table = db.query(Vacancie).filter_by(vacancie_id=vac["vacancie_id"]).first()
        print(vacancies_table)
        if vacancies_table != None:
            update_vacancie(db, vac)
        else:
            create_vacancie(db, vac)
    return vacs


@app.get('/vacancies_filter')
async def vacancies_filter(db: Session = Depends(get_db)):
    items = db.query(Vacancie).all()
    return items