from sqlalchemy.orm import Session
import sqlalchemy as sq
from schemas import ParsVacancies
from .models import Vacancy


def create_vacancy(db: Session, vacancy_data: ParsVacancies):
    db_vacancy = Vacancy(**vacancy_data)

    db.add(db_vacancy)
    db.commit()
    
    return db_vacancy


def set_vacancy_attributes(vacancy_instance: Vacancy, attributes: dict):
    for attr, value in attributes.items():
        if value is not None:
            setattr(vacancy_instance, attr, value)


def get_vacancy_by_id(db: Session, vacancy_id: int) -> Vacancy:
    return db.query(Vacancy).filter(Vacancy.vacancy_id == vacancy_id).first()


def update_vacancy(db: Session, vacancy_data: dict):
    vacancy_id = vacancy_data.get('vacancy_id')
    db_vacancy = get_vacancy_by_id(db, vacancy_id)

    if db_vacancy is None:
        raise ValueError("Vacancy not found")
        
    set_vacancy_attributes(db_vacancy, vacancy_data)
    db.commit()
    return db_vacancy


def delete_old_vacancies(existing_ids, new_vacancies_ids, db: Session):
    for old_vacancy_id in existing_ids:

        if old_vacancy_id not in new_vacancies_ids:
            vacancy_to_delete = get_vacancy_by_id(db, old_vacancy_id)

            if vacancy_to_delete:
                db.delete(vacancy_to_delete)
