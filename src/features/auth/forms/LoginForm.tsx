import { Formik } from 'formik'
import { Link } from '@tanstack/react-router'
import * as Yup from 'yup'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useLogin } from '@/features/auth/hooks/useAuth'

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export default function LoginForm() {
  const login = useLogin()

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={SigninSchema}
      onSubmit={(values) => {
        login.mutate(values)
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
            <div className="grid gap-3">
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
                disabled={login.isPending}
              >
                {login.isPending ? 'Processing...' : 'Login'}
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </form>
      )}
    </Formik>
  )
}
