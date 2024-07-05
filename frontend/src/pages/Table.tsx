import React from "react";
import { GetVacancies } from "./GetVacancies"
import { useState, useEffect } from "react";
import './Table.css';
import { useNavigate } from 'react-router-dom';
import { experience, schedule } from "./FilterId";

type Vacancy = {
    vacancie_id: number;
    url: string;
    name: string;
	has_test: boolean;
    company_name: string;
    contacts: string;
    vacancie_type: string;
    salary: string;
    snippet_requirement: string;
    snippet_responsibility: string;
    schedule: string;
    professional_roles: string;
    experience: string;
};

export function Table() {
	const [vacancies, setVacancies] = useState<Vacancy[]>([]);
	const [companyFilter, setCompanyFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
	const [onlyWithTestFilter, setOnlyWithTest] = useState(false);
    const [onlyWithoutTestFilter, setOnlyWithoutTest] = useState(false);
	const [NameFilter, setNameFilter] = useState('');
	const [scheduleFilter, setScheduleFilter] = useState('');
    const [experienceFilter, setExprinceFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 3;

    useEffect(() => {
        const fetchVacancies = async () => {
            const data = await GetVacancies();
            setVacancies(data);
        };

        fetchVacancies();
    }, []);

    const navigate = useNavigate();

	const uniqueSchedules = Array.from(new Set(vacancies.map(vacancy => vacancy.schedule)));
    const uniqueTypes = Array.from(new Set(vacancies.map(vacancy => vacancy.vacancie_type)));
    const uniqueExperiencies = Array.from(new Set(vacancies.map(vacancy => vacancy.experience)));


	const handleCompanyFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyFilter(event.target.value);
    };

    const handleTypeFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTypeFilter(event.target.value);
    };

	const handleOnlyWithTestFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOnlyWithTest(event.target.checked);
        if (event.target.checked) {
            setOnlyWithoutTest(false);
        }    
    };

    const handleOnlyWithoutTestFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOnlyWithoutTest(event.target.checked);
        if (event.target.checked) {
            setOnlyWithTest(false);
        }
    
    };

	const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(event.target.value);
    };

	const handleScheduleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setScheduleFilter(event.target.value);
    };

    const handleExperienceFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setExprinceFilter(event.target.value);
    };

    const handleShowMore = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleBackToParser = () => {
        navigate('/');
    };


    const filteredVacancies = vacancies.filter(vacancy =>
        (vacancy.company_name.toLowerCase().includes(companyFilter.toLowerCase())) &&
        (onlyWithTestFilter ? vacancy.has_test : true) &&
        (onlyWithoutTestFilter ? !vacancy.has_test : true) &&
		(vacancy.name.toLowerCase().includes(NameFilter.toLowerCase())) &&
		(scheduleFilter ? vacancy.schedule === scheduleFilter : true) &&
        (typeFilter ? vacancy.vacancie_type === typeFilter : true) &&
        (experienceFilter ? vacancy.experience === experienceFilter: true)
    );

    const displayedVacancies = filteredVacancies.slice(0, (currentPage + 1) * pageSize);

	return (
        <div>
            <div className="company-filter-container">
                <button onClick={handleBackToParser}>Вернуться к парсеру</button>
                <input
                    type="text"
                    value={companyFilter}
                    onChange={handleCompanyFilterChange}
                    placeholder="Фильтр по названию компании"
                />
                <select value={typeFilter} onChange={handleTypeFilterChange}>
                    <option value="">Все типы</option>
                    {uniqueTypes.map(vacancie_type => (
                        <option key={vacancie_type} value={vacancie_type}>{vacancie_type}</option>
                    ))}
                </select>
                <label className="test-label">с тестом
                <input
                    type="checkbox"
                    checked={onlyWithTestFilter}
                    onChange={handleOnlyWithTestFilterChange}
                    id="has-test-filter"
                    placeholder="наличие теста"
                />
                </label>
                <label className="test-label">без теста
                <input
                    type="checkbox"
                    checked={onlyWithoutTestFilter}
                    onChange={handleOnlyWithoutTestFilterChange}
                    id="no-has-test-filter"
                    placeholder="без теста"
                />
                </label>
                <input
                    className="vacancie-name-filter"
                    type="text"
                    value={NameFilter}
                    onChange={handleNameFilterChange}
                    placeholder="Фильтр по названию вакансии"
                />
                <select value={scheduleFilter} onChange={handleScheduleFilterChange}>
                    <option value="">Любой график</option>
                    {uniqueSchedules.map(schedule => (
                        <option key={schedule} value={schedule}>{schedule}</option>
                    ))}
                </select>
                <select className=".company-filter-container selec" value={experienceFilter} onChange={handleExperienceFilterChange}>
                    <option value="">Любой опыт работы</option>
                    {uniqueExperiencies.map(experience => (
                        <option key={experience} value={experience}>{experience}</option>
                    ))}
                </select>
            </div>
            <div className="vacancies">Найдено вакансий: {filteredVacancies.length}</div>
            <div className="table-container">
			    <table>
				    <tr>
					    <th>ссылка на вакансию</th>
					    <th>название вакансии</th>
					    <th>тестирование</th>
					    <th>компания</th>
					    <th>тип</th>
                        <th>зарплата</th>
					    <th>навыки</th>
					    <th>обязанности</th>
					    <th>график</th>
					    <th>роль</th>
					    <th>опыт</th>
				    </tr>
				    {displayedVacancies.map((val, key) => {
					    return (
						    <tr key={key}>
							    <td><a href={val.url} target="_blank">Перейти на сайт</a></td>
							    <td>{val.name}</td>
							    <td>{val.has_test ? 'есть' : 'нет'}</td>
							    <td>{val.company_name}</td>
							    <td>{val.vacancie_type}</td>
                                <td>{val.salary}</td>
							    <td>{val.snippet_requirement}</td>
							    <td>{val.snippet_responsibility}</td>
							    <td>{val.schedule}</td>
							    <td>{val.professional_roles}</td>
							    <td>{val.experience}</td>
                            </tr>
                        )
                    })}
                </table>
                <div className="button-container">
                    <button onClick={handleShowMore}>Показать ещё</button>
                </div>
            </div>
        </div>
	);
}