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

    useEffect(() => {
        const fetchVacancies = async () => {
            const data = await GetVacancies();
            setVacancies(data);
        };

        fetchVacancies();
    }, []);

	const uniqueSchedules = Array.from(new Set(vacancies.map(vacancy => vacancy.schedule)));

	const handleCompanyFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyFilter(event.target.value);
    };

    const handleTypeFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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


    const filteredVacancies = vacancies.filter(vacancy =>
        vacancy.company_name.toLowerCase().includes(companyFilter.toLowerCase()) &&
        vacancy.vacancie_type.toLowerCase().includes(typeFilter.toLowerCase()) &&
        vacancy.has_test === hasTestFilter &&
		vacancy.name.toLowerCase().includes(NameFilter.toLowerCase()) &&
		(scheduleFilter ? vacancy.schedule === scheduleFilter : true)
    );

	return (
		<div>
			<input
                type="text"
                value={companyFilter}
                onChange={handleCompanyFilterChange}
                placeholder="Фильтр по названию компании"
            />
            <input
                type="text"
                value={typeFilter}
                onChange={handleTypeFilterChange}
                placeholder="Фильтр по типу вакансии"
            />
			<input
                type="checkbox"
                checked={hasTestFilter}
                onChange={handleHasTestFilterChange}
                id="has-test-filter"
				placeholder="наличие теста"
            />
			<input
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
            <div>{filteredVacancies.length}</div>
			<table>
				<tr>
					<th>vacancie_id</th>
					<th>url</th>
					<th>name</th>
					<th>has_test</th>
					<th>company_name</th>
					<th>contacts</th>
					<th>vacancie_type</th>
					<th>snippet_requirement</th>
					<th>snippet_responsibility</th>
					<th>schedule</th>
					<th>professional_roles</th>
					<th>experience</th>
				</tr>
				{filteredVacancies.map((val, key) => {
					return (
						<tr key={key}>
							<td>{val.vacancie_id}</td>
							<td>{val.url}</td>
							<td>{val.name}</td>
							<td>{val.has_test}</td>
							<td>{val.company_name}</td>
							<td>{val.contacts}</td>
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
		</div>
	);
}