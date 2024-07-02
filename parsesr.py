import requests
import json
import pandas as pd
from bs4 import BeautifulSoup


def get_vacancies(params):
    url = 'https://api.hh.ru/vacancies'
    headers = {
        'User-Agent': 'User-Agent'
    }
    pars_vacancies = []
    for page in range(1, 20):
        params.page = page
        print(params.page)
        response = requests.get(url, params=params, headers=headers)
        if response.status_code == 200:
            vacancies = response.json().get('items', [])
            for vacancie in vacancies:
                pars_vacancies.append({'vacancie_id': vacancie.get('id'),
                                       'url': vacancie.get('alternate_url'),
                                       'name': vacancie.get('name'),
                                       'has_test': vacancie.get('has_test'),
                                       'company_name': vacancie.get('employer').get('name'),
                                       'vacancie_type': vacancie.get('type').get('name'),
                                       'snippet_requirement': vacancie.get('snippet').get('requirement'),
                                       'snippet_responsibility': vacancie.get('snippet').get('responsibility'),
                                       'schedule': vacancie.get('schedule').get('name'),
                                       'professional_roles': vacancie.get('professional_roles')[0].get('name'),
                                       'experience': vacancie.get('experience').get('name')})
        else:
            break
    return pars_vacancies