import classNames from "classnames"
import { PasswordInput } from "components/shared"
import { FormItem } from "components/ui"
import { Field } from "formik"

export default function ChangePasswordFields({ touched, errors, className }) {
  return (
    <div className={classNames(className)}>
      <div>
        <div className="mb-4">
          <h5>Contraseña</h5>
          <p>
            Dejar en blanco si desea asignar la contraseña por defecto.
          </p>
        </div>

        <FormItem
          label="Contraseña"
          invalid={errors.password && touched.password}
          errorMessage={errors.password}
        >
          <Field
            name="password"
            type="password"
            placeholder="Contraseña"
            component={PasswordInput}
            autoFocus
          />
        </FormItem>

        <FormItem
          label="Confirmar contraseña"
          invalid={errors.confirmPassword && touched.confirmPassword}
          errorMessage={errors.confirmPassword}
        >
          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
            component={PasswordInput}
          />
        </FormItem>
      </div>
    </div>
  )
}