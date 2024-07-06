def parse_salary(salary_info):
    if not salary_info:
        return "Зарплата не указана"

    salary_from = salary_info.get('from')
    salary_to = salary_info.get('to')
    
    if salary_from is None:
        return f"До {salary_to}"
    elif salary_to is None:
        return f"От {salary_from}"
    else:
        return f"{salary_from} - {salary_to}"


def parse_vacancy(vacancie):
    salary_info = vacancie.get('salary')
    
    return {
        'vacancy_id': vacancie.get('id'),
        'url': vacancie.get('alternate_url'),
        'name': vacancie.get('name'),
        'has_test': vacancie.get('has_test'),
        'company_name': vacancie.get('employer', {}).get('name', 'Не указана'),
        'vacancy_type': vacancie.get('type', {}).get('name', 'Не указано'),
        'salary': parse_salary(salary_info),
        'snippet_requirement': vacancie.get('snippet', {}).get('requirement', ''),
        'snippet_responsibility': vacancie.get('snippet', {}).get('responsibility', ''),
        'schedule': vacancie.get('schedule', {}).get('name', 'Не указано'),
        'professional_roles': vacancie.get('professional_roles', [{}])[0].get('name', 'Не указано'),
        'experience': vacancie.get('experience', {}).get('name', 'Не указано'),
    }
