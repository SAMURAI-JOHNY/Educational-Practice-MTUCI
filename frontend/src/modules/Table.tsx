import React from "react";
import { GetVacancies } from "../api/GetVacancies"
import { useState, useEffect } from "react";
import './Table.css'

type Vacancy = {
    vacancie_id: number;
    url: string;
    name: string;
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

    useEffect(() => {
        const fetchVacancies = async () => {
            const data = await GetVacancies();
            setVacancies(data);
        };

        fetchVacancies();
    }, []);
	return (
		<div>
			<table>
				<tr>
					<th>vacancie_id</th>
					<th>url</th>
					<th>name</th>
					<th>company_name</th>
					<th>contacts</th>
					<th>vacancie_type</th>
					<th>snippet_requirement</th>
					<th>snippet_responsibility</th>
					<th>schedule</th>
					<th>professional_roles</th>
					<th>experience</th>
				</tr>
				{vacancies.map((val, key) => {
					return (
						<tr key={key}>
							<td>{val.vacancie_id}</td>
							<td>{val.url}</td>
							<td>{val.name}</td>
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