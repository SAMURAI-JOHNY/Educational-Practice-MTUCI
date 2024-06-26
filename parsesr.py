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
        vacancies = requests.get(url, params=params, headers=headers)
        data = vacancies.content.decode()
        jsObj = json.loads(data)['items']
        print(jsObj)
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
    return pars_vacancies



def get_resume():
    url = 'https://hh.ru/search/resume'
    headers = {
        'User-Agent': 'User-Agent'
    }
    page = requests.get(url, headers=headers)
    soup = BeautifulSoup(page.text, "html.parser")
    prof = soup.find_all('span', class_='title--iPxTj4waPRTG9LgoOG4t')
    status = soup.find_all('div',
                           class_='tag--vCYld4yoLU7RpJglYGnV tag_job-search-status-active--WAZ6Sx3vDygvcdzNm06h')
    age = soup.find_all('span',
                        attrs={'data-qa': 'resume-serp__resume-age'})
    expirience = soup.find_all('div',
                               class_='content--uYCSpLiTsRfIZJe2wiYy')
    all_resume = soup.find_all('div',
                               class_='bloko-text bloko-text_strong')
    all_resume = soup.find_all('label',
                               class_='trigger--KuxFv37AOoD_kgasIxEA')
    all_resume = soup.find_all('span',
                               class_='bloko-text bloko-text_strong')

    allsoup = list(map(lambda x: x.text, expirience))
    print(allsoup)
    return allsoup