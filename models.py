from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Vacancie(Base):
    __tablename__ = "vacancies"

    id = Column(Integer, primary_key=True)
    vacancie_id = Column(Integer, unique=True)
    url = Column(String, unique=True)
    name = Column(String)
    premium = Column(Boolean)
    has_test = Column(Boolean)
    company_name = Column(String)
    vacancie_type = Column(String)
    snippet_requirement = Column(String)
    snippet_responsibility = Column(String)
    schedule = Column(String)
    professional_roles = Column(String)
    experience = Column(String)