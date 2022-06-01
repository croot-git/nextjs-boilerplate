import React, { useEffect } from 'react';
import { logout } from 'app/auth';

function LogoutPage() {
	useEffect(() => {
		logout();
	});

	return <></>;
}

export default LogoutPage;
