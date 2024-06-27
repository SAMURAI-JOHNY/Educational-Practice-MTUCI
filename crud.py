from sqlalchemy.orm import Session
from schemas import ParsVacancies
from models import Vacancie


def create_vacancie(db: Session, vacancies: dict):
    db_vacancies = Vacancie(**vacancies)
    db.add(db_vacancies)
    db.commit()
    db.refresh()
    return db_vacancies
