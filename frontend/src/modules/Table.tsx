import React from "react";
import { GetVacancies } from "../api/GetVacancies"
import { useState, useEffect } from "react";
import './Table.css'

type Vacancy = {
    vacancie_id: number;
    url: string;
    name: string;
	has_test: boolean;
    company_name: string;
    contacts: string;
    vacancie_type: string;
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
	const [hasTestFilter, setHasTestFilter] = useState(false);
	const [NameFilter, setNameFilter] = useState('');
	const [scheduleFilter, setScheduleFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 3;

    useEffect(() => {
        const fetchVacancies = async () => {
            const data = await GetVacancies();
            setVacancies(data);
        };

        fetchVacancies();
    }, []);

	const uniqueSchedules = Array.from(new Set(vacancies.map(vacancy => vacancy.schedule)));
    const uniqueTypes = Array.from(new Set(vacancies.map(vacancy => vacancy.vacancie_type)));

	const handleCompanyFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyFilter(event.target.value);
    };

    const handleTypeFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTypeFilter(event.target.value);
    };

	const handleHasTestFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHasTestFilter(event.target.checked);
    };

	const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(event.target.value);
    };

	const handleScheduleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setScheduleFilter(event.target.value);
    };

    const handleShowMore = () => {
        setCurrentPage(currentPage + 1);
    };


    const filteredVacancies = vacancies.filter(vacancy =>
        vacancy.company_name.toLowerCase().includes(companyFilter.toLowerCase()) &&
        vacancy.has_test === hasTestFilter &&
		vacancy.name.toLowerCase().includes(NameFilter.toLowerCase()) &&
		(scheduleFilter ? vacancy.schedule === scheduleFilter : true) &&
        (typeFilter ? vacancy.vacancie_type === typeFilter : true)
    );

    const displayedVacancies = filteredVacancies.slice(0, (currentPage + 1) * pageSize);

	return (
        <div>
            <div className="company-filter-container">
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
                <input
                    className="test-filter"
                    type="checkbox"
                    checked={hasTestFilter}
                    onChange={handleHasTestFilterChange}
                    id="has-test-filter"
                    placeholder="наличие теста"
                />
                <label className="test-label">наличие теста</label>
                <input
                    className="vacancie-name-filter"
                    type="text"
                    value={NameFilter}
                    onChange={handleNameFilterChange}
                    placeholder="Фильтр по должности"
                />
                <select value={scheduleFilter} onChange={handleScheduleFilterChange}>
                    <option value="">Все расписания</option>
                    {uniqueSchedules.map(schedule => (
                        <option key={schedule} value={schedule}>{schedule}</option>
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
					    <th>company_name</th>
					    <th>vacancie_type</th>
					    <th>snippet_requirement</th>
					    <th>snippet_responsibility</th>
					    <th>schedule</th>
					    <th>professional_roles</th>
					    <th>experience</th>
				    </tr>
				    {displayedVacancies.map((val, key) => {
					    return (
						    <tr key={key}>
							    <td><a href={val.url} target="_blank">Перейти на сайт</a></td>
							    <td>{val.name}</td>
							    <td>{val.has_test ? 'есть' : 'нет'}</td>
							    <td>{val.company_name}</td>
							    <td>{val.vacancie_type}</td>
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