import classNames from "classnames"
import { PasswordInput } from "components/shared"
import { Card, FormItem } from "components/ui"
import { Field } from "formik"

export default function ChangePasswordFields({ touched, errors, className }) {
  return (
    <div className={classNames(className)}>
      <Card>
        <div className="mb-4">
          <h5>Contraseña</h5>
          <p>
            Dejar en blanco si desea mantener la contraseña actual.
          </p>
        </div>

        <FormItem
          label="Contraseña"
          invalid={!!touched.password && !!errors.password}
          errorMessage={errors.password}
        >
          <Field
            name="password"
            type="password"
            placeholder="Contraseña"
            component={PasswordInput}
          />
        </FormItem>

        <FormItem
          label="Confirmar contraseña"
          invalid={!!touched.confirmPassword && !!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
        >
          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
            component={PasswordInput}
          />
        </FormItem>
      </Card>
    </div>
  )
}