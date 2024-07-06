import requests
from .parser_utils import parse_vacancy

def fetch_vacancies(url, params, headers):
    response = requests.get(url, params=params, headers=headers)
    if response.status_code == 200:
        return response.json().get('items', [])
    return []


def get_vacancies(params):
    url = 'https://api.hh.ru/vacancies'
    headers = {
        'User-Agent': 'User-Agent'
    }
    pars_vacancies = []

    for page in range(20):
        params.page = page  
        
        vacancies = fetch_vacancies(url, params, headers)
        if not vacancies:
            break
        
        for vacancie in vacancies:
            pars_vacancies.append(parse_vacancy(vacancie))

    return pars_vacancies
