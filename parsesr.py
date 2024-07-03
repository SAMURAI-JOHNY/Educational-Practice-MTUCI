import requests
import json


def get_vacancies(params):
    url = 'https://api.hh.ru/vacancies'
    headers = {
        'User-Agent': 'User-Agent'
    }
    pars_vacancies = []
    for page in range(1, 21):
        params.page = page
        print(params.page)
        response = requests.get(url, params=params, headers=headers)
        if response.status_code == 200:
            vacancies = response.json().get('items', [])
            for vacancie in vacancies:
                salary_info = vacancie.get('salary')
                if salary_info:
                    salary_from = salary_info.get('from')
                    salary_to = salary_info.get('to')
                    salary_str = f"{salary_from} - {salary_to}" if salary_from and salary_to else "Зарплата не указана"
                else:
                    salary_str = "Зарплата не указана"
                pars_vacancies.append({'vacancie_id': vacancie.get('id'),
                                       'url': vacancie.get('alternate_url'),
                                       'name': vacancie.get('name'),
                                       'has_test': vacancie.get('has_test'),
                                       'company_name': vacancie.get('employer').get('name'),
                                       'vacancie_type': vacancie.get('type').get('name'),
                                       'salary': salary_str,
                                       'snippet_requirement': vacancie.get('snippet', {}).get('requirement'),
                                       'snippet_responsibility': vacancie.get('snippet', {}).get('responsibility'),
                                       'schedule': vacancie.get('schedule').get('name'),
                                       'professional_roles': vacancie.get('professional_roles', [{}])[0].get('name'),
                                       'experience': vacancie.get('experience', {}).get('name')})
        else:
            break
    return pars_vacancies