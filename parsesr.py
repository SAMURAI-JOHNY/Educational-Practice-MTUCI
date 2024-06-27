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
    for page in range(1, params.page + 1):
        response = requests.get(url, params=params, headers=headers)
        if response.status_code == 200:
            vacancies = response.json().get('items', [])
            for vacancie in vacancies:
                pars_vacancies.append({'id': vacancie.get('id'),
                                       'url': vacancie.get('alternate_url'),
                                       'position': vacancie.get('name'),
                                       'premium': vacancie.get('premium'),
                                       'test': vacancie.get('has_test'),
                                       'contacts': vacancie.get('contacts'),
                                       'company_name': vacancie.get('employer').get('name'),
                                       'vac_type': vacancie.get('type').get('name'),
                                       'published': vacancie.get('published_at'),
                                       'requirement': vacancie.get('snippet').get('requirement'),
                                       'responsibility': vacancie.get('snippet').get('responsibility'),
                                       'schedule': vacancie.get('schedule').get('name'),
                                       'professional_roles': vacancie.get('professional_roles')[0].get('name'),
                                       'experience': vacancie.get('experience').get('name')})
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