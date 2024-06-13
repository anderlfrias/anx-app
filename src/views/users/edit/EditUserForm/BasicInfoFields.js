import classNames from "classnames"
import AvatarUpload from "components/custom/AvatarUpload"
import { FormItem, Input } from "components/ui"
import { Field } from "formik"

const Fields = [
  { type: 'text', label: 'Nombre', name: 'name', placeholder: 'Nombre' },
  { type: 'text', label: 'Primer apellido', name: 'firstSurname', placeholder: 'Primer apellido' },
  { type: 'text', label: 'Segundo apellido', name: 'secondSurname', placeholder: 'Segundo apellido' },
  // { type: 'text', label: 'Nombre de usuario', name: 'username', placeholder: 'Nombre de usuario' },
  // { type: 'email', label: 'Email', name: 'email', placeholder: 'Email' },
  { type: 'text', label: 'Código de empleado', name: 'employeeCode', placeholder: 'Código de empleado' },
  { type: 'text', label: 'Número de teléfono', name: 'phoneNumber', placeholder: 'Número de teléfono' },
  { type: 'text', label: 'Código externo', name: 'externalCode', placeholder: 'Código externo' }
]

export default function BasicInfoFields({ touched, errors, values, className }) {

  return (
    <>
      <div className={classNames(className)}>
        <div>
          <FormItem
            className='mb-4'
            label="Foto de perfil"
            invalid={errors.profilePicture && touched.profilePicture}
            errorMessage={errors.profilePicture}
          >
            <Field name='profilePicture'>
              {({ field, form }) => (
                <AvatarUpload
                  field={field}
                  form={form}
                  value={values.profilePicture}
                  onChange={(value) =>  {
                    console.log('value', value)
                    form.setFieldValue('profilePicture', value || '')
                  }}
                />
              )}
            </Field>
          </FormItem>
          <div className='mb-6'>
            <h5>{`${values.name} ${values.firstSurname} ${values.secondSurname}`}</h5>
            <div className='grid'>
            <span className='text-gray-500'>{values.username} | {values.email}</span>
            </div>
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
                autoFocus={index === 0}
              />
            </FormItem>
          ))}
        </div>
      </div>
    </>
  )
}