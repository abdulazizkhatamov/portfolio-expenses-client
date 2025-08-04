import { Formik } from 'formik'
import { Link } from '@tanstack/react-router'
import * as Yup from 'yup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRegister } from '@/features/auth/hooks/useAuth'

const SignupSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(1, 'First name is required')
    .required('First name is required'),
  last_name: Yup.string()
    .min(1, 'Last name is required')
    .required('Last name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export default function RegisterForm() {
  const register = useRegister()
  return (
    <Formik
      initialValues={{ first_name: '', last_name: '', email: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        register.mutate(values)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="first_name">First name</Label>
              </div>
              <div className="flex flex-col gap-1">
                <Input
                  id="first_name"
                  type="text"
                  name="first_name"
                  placeholder="John"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                  aria-invalid={!!(errors.first_name && touched.first_name)}
                />
                {errors.first_name && touched.first_name && (
                  <div className="text-red-500 text-sm">
                    {errors.first_name}
                  </div>
                )}
              </div>
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="last_name">Last name</Label>
              </div>
              <div className="flex flex-col gap-1">
                <Input
                  id="last_name"
                  type="text"
                  name="last_name"
                  placeholder="Doe"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
                  aria-invalid={!!(errors.last_name && touched.last_name)}
                />
                {errors.last_name && touched.last_name && (
                  <div className="text-red-500 text-sm">{errors.last_name}</div>
                )}
              </div>
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="email">Email</Label>
              </div>
              <div className="flex flex-col gap-1">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  aria-invalid={!!(errors.email && touched.email)}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="flex flex-col gap-1">
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="********"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  aria-invalid={!!(errors.password && touched.password)}
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full"
                disabled={register.isPending}
              >
                {register.isPending ? 'Processing...' : 'Create Account'}
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account ?{' '}
            <Link to="/login" className="underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </form>
      )}
    </Formik>
  )
}
