import React from 'react'
import { Input, Button, Checkbox, FormItem, FormContainer, Alert } from 'components/ui'
import { PasswordInput } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'

const validationSchema = Yup.object().shape({
	email: Yup.string().required('Ingrese su usuario o correo electrónico'),
	password: Yup.string().required('Ingrese su contraseña'),
	rememberMe: Yup.bool()
})

const SignInForm = props => {

	const { 
		disableSubmit = false, 
		className, 
		// forgotPasswordUrl = '/forgot-password',
		// signUpUrl = '/sign-up'
	} = props

	const [message, setMessage] = useTimeOutMessage()

	const { signIn } = useAuth()

	const onSignIn = async (values, setSubmitting) => {
		const { email, password } = values
		setSubmitting(true)
		
		const result = await signIn({ user: email, password })

		if (result.status === 'failed') {
			setMessage(result.message)
		}

		setSubmitting(false)
	}

	return (
		<div className={className}>
			{message && <Alert className="uppercase mb-4 max-w-96" type="danger" showIcon>{message}</Alert>}
			<Formik
				initialValues={{
					email: '', 
					password: '', 
					rememberMe: true 
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					if(!disableSubmit) {
						onSignIn(values, setSubmitting)
					} else {
						setSubmitting(false)
					}
				}}
			>
				{({touched, errors, isSubmitting}) => (
					<Form>
						<FormContainer>
							<FormItem
								label="Usuario o Correo Electrónico"
								invalid={errors.email && touched.email}
								errorMessage={errors.email}
							>
								<Field 
									type="text" 
									autoComplete="off" 
									name="email" 
									placeholder="Usuario o Correo Electrónico" 
									component={Input} 
								/>
							</FormItem>
							<FormItem
								label="Contraseña"
								invalid={errors.password && touched.password}
								errorMessage={errors.password}
							>
								<Field
									autoComplete="off" 
									name="password" 
									placeholder="Contraseña" 
									component={PasswordInput} 
								/>
							</FormItem>
							<div className="flex justify-between mb-6">
								<Field className="mb-0" name="rememberMe" component={Checkbox} children="Recordar usuario" />
							</div>
							<Button block loading={isSubmitting} variant="solid" type="submit">
								{ isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión' }
							</Button>
							<div className="mt-4 text-center">
								<span>Aún no tienes una cuenta?</span>
								<strong className="ml-1">
									Contacta a tu supervisor
								</strong>
							</div>
						</FormContainer>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default SignInForm