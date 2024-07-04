from sqlalchemy.orm import Session
import sqlalchemy as sq
from schemas import ParsVacancies
from models import Vacancie


def create_vacancie(db: Session, vacancies: ParsVacancies):
    db_vacancies = Vacancie(**vacancies)
    db.add(db_vacancies)
    db.commit()
    return db_vacancies


def update_vacancie(db: Session, vacancies: dict):
    db_vacancies = db.query(Vacancie).filter(Vacancie.vacancie_id == vacancies['vacancie_id']).first()
    for var, value in vacancies.items():
        if value is not None:
            setattr(db_vacancies, var, value)
    db.commit()
    return db_vacancies