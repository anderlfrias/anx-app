import React from 'react'
import SignInForm from './SignInForm'

const SignIn = () => {
	return (
		<>
			<div className="mb-8">
				<h3 className="mb-1">Administración de Usuarios</h3>
				<p>Centro Médico Siglo 21</p>
			</div>
			<SignInForm disableSubmit={false} />
		</>
	)
}

export default SignIn