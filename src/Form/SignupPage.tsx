import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});
type IFormValues = z.infer<typeof schema>;

const SignupPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: IFormValues) => {
    console.log(data);
    alert('Account created successfully!');
  };

  return (
    <div className="background">
      <header className="header">
        <img
          src="https://www.svgrepo.com/show/303516/coca-cola-4-logo.svg"
          alt="Logo"
          className="logo"
        />
        <div className="header-right">
          <a href="#" className="need-help">Need help?</a>
          <img
            src="https://www.svgrepo.com/show/13688/settings.svg"
            alt="Settings"
            className="settings-icon"
          />
        </div>
      </header>

      <div className="body">
        <div className="image-section">
          <img
            src="https://assets.minimals.cc/public/assets/illustrations/illustration-dashboard.webp"
            alt="Side Illustration"
          />
        </div>

        <div className="form-section">
          <h1>Get started absolutely free</h1>
          <p>
            Already have an account? <a href="/" className="get-started">Sign in</a>
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="name-group">
              <div className="input-group">
                <label>First name</label>
                <input
                  {...register('firstName')}
                  placeholder="First name"
                  aria-invalid={!!errors.firstName}
                />
                {errors.firstName && <span className="error">{errors.firstName.message}</span>}
              </div>
              <div className="input-group">
                <label>Last name</label>
                <input
                  {...register('lastName')}
                  placeholder="Last name"
                  aria-invalid={!!errors.lastName}
                />
                {errors.lastName && <span className="error">{errors.lastName.message}</span>}
              </div>
            </div>
            <div className="input-group">
              <label>Email address</label>
              <input
                {...register('email')}
                placeholder="Email address"
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                {...register('password')}
                placeholder="6+ characters"
                aria-invalid={!!errors.password}
              />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>
            <button type="submit" className="submit-btn">Create account</button>
          </form>
          <p className="terms">
            By signing up, I agree to <a href="#">Terms of service</a> and <a href="#">Privacy policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
