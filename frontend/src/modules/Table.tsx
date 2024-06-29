import React from "react";
import { GetVacancies } from "../api/GetVacancies"
import './Table.css'

export const vacancies = Object.values(GetVacancies);

export function Table() {
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