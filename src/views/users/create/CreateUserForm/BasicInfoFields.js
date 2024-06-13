import classNames from "classnames"
import AvatarUpload from "components/custom/AvatarUpload"
import { FormItem, Input } from "components/ui"
import { Field } from "formik"

const Fields = [
  { type: 'text', label: 'Segundo apellido', name: 'secondSurname', placeholder: 'Segundo apellido' },
  { type: 'text', label: 'Nombre de usuario', name: 'username', placeholder: 'Nombre de usuario' },
  { type: 'email', label: 'Email', name: 'email', placeholder: 'Email' },
  { type: 'text', label: 'Código de empleado', name: 'employeeCode', placeholder: 'Código de empleado' },
  { type: 'text', label: 'Número de teléfono', name: 'phoneNumber', placeholder: 'Número de teléfono' },
  { type: 'text', label: 'Código externo', name: 'externalCode', placeholder: 'Código externo' }
]

export default function BasicInfoFields({ touched, errors, values, className }) {

  const onChangeName = (name, lastname, form) => {
    const normalizedName = name.replace(/\s/g, '').toLowerCase()
    const normalizedLastname = lastname.replace(/\s/g, '').toLowerCase()
    const newUsername = `${normalizedName}${normalizedLastname}`
    const newEmail = (normalizedName || normalizedLastname) && `${normalizedName}.${normalizedLastname}`
    form.setFieldValue('username', newUsername)
    form.setFieldValue('email', newEmail ? `${newEmail}@cmsiglo21.com` : '')
    form.setFieldValue('name', name)
    form.setFieldValue('firstSurname', lastname)
  }

  return (
    <>
      <div className={classNames(className)}>
        <div>
          <div className="mb-4">
            <h5>Información básica</h5>
            <p>
              Sesión para configurar la información básica del usuario.
              Por defecto, el usuario no tiene un rol asignado. Para asignar un rol, diríjase a la sección de edición de usuario.
            </p>
          </div>

          <FormItem
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

          <FormItem
            label="Nombre"
            invalid={errors.name && touched.name}
            errorMessage={errors.name}
          >
            <Field name='name'>
              {({ field, form }) => (
                <Input
                  field={field}
                  form={form}
                  type="text"
                  placeholder='Nombre'
                  value={values.name}
                  onChange={(e) => onChangeName(e.target.value, form.values.firstSurname, form)}
                  autoFocus
                />
              )}
            </Field>
          </FormItem>

          <FormItem
            label="Primer apellido"
            invalid={errors.firstSurname && touched.firstSurname}
            errorMessage={errors.firstSurname}
          >
            <Field>
              {({ field, form }) => (
                <Input
                  field={field}
                  form={form}
                  name="firstSurname"
                  type="text"
                  placeholder="Primer apellido"
                  value={values.firstSurname}
                  onChange={(e) => onChangeName(form.values.name, e.target.value, form)}
                />
              )}
            </Field>
          </FormItem>

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