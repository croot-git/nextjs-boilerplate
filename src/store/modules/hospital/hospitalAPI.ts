export async function fetchHospital(): Promise<{ data: number }> {
	const response = await fetch('/api/mommyBoxHospital', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const result = await response.json();

	return result;
}
