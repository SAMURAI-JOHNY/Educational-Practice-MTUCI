import requests
import json
import pandas as pd


def get_vacancies():
    url = 'https://api.hh.ru/vacancies'
    headers = {
        'User-Agent': 'User-Agent'
    }
    params = {
        "area": 1,
        "per_page": 100
    }
    vacancies = requests.get(url, params=params, headers=headers)
    data = vacancies.content.decode()
    jsObj = json.loads(data)['items']
    pars_vacancies = []
    for vacancie in jsObj:
        pars_vacancies.append([vacancie['name'],
                               vacancie['premium'],
                               vacancie['has_test'],
                               vacancie['type']['name'],
                               vacancie['published_at'],
                               vacancie['snippet']['requirement'],
                               vacancie['snippet']['responsibility'],
                               vacancie['schedule']['name'],
                               vacancie['professional_roles'][0]['name'],
                               vacancie['experience']['name']])
    df = pd.DataFrame(pars_vacancies, columns=[
        'name',
        'premium',
        'has_test',
        'type_vacancie',
        'published_at',
        'snippet_requirement',
        'snippet_responsibility',
        'schedule_name',
        'professional_roles',
        'experience'
    ]).dropna(how='all')
    print(df)
    return jsObj