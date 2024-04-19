import classNames from "classnames"
import { FormItem, Input } from "components/ui"
import { Field } from "formik"

const Fields = [
  { type: 'text', label: 'Nombre', name: 'name', placeholder: 'Nombre' },
  { type: 'text', label: 'Primer apellido', name: 'firstSurname', placeholder: 'Primer apellido' },
  { type: 'text', label: 'Segundo apellido', name: 'secondSurname', placeholder: 'Segundo apellido' },
  // { type: 'text', label: 'Nombre de usuario', name: 'username', placeholder: 'Nombre de usuario' },
  // { type: 'email', label: 'Email', name: 'email', placeholder: 'Email' },
  { type: 'text', label: 'Código de empleado', name: 'employeeCode', placeholder: 'Código de empleado' },
  { type: 'text', label: 'Número de teléfono', name: 'phoneNumber', placeholder: 'Número de teléfono' }
]

export default function BasicInfoFields({ touched, errors, values, className }) {

  return (
    <>
      <div className={classNames(className)}>
        <div>
          <div className="mb-4">
            <h5>Información básica</h5>
            <p>
              Sesión para configurar la información básica del usuario.
            </p>
          </div>

          {Fields.map((field, index) => (
            <FormItem
              key={index}
              label={field.label}
              invalid={errors[field.name] && touched[field.name]}
              errorMessage={errors[field.name]}
            >
              <Field
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                component={field.component || Input}

              />
            </FormItem>
          ))}
        </div>
      </div>
    </>
  )
}