export async function fetchCountry(): Promise<{ data: number }> {
	const response = await fetch('/api/mommyBoxCountryAreas', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const result = await response.json();

	return result;
}
