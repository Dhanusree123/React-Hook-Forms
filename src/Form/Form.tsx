import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  age: z.string().min(1, 'Please select your age'),
});

interface FormValues {
  email: string;
  password: string;
  age: number;
}

const MyForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    navigate('/home');
  };

  return (
    <div className="background">
      <div className="container">
        <div className="image-section">
          <img src="https://images.pexels.com/photos/30081803/pexels-photo-30081803/free-photo-of-energetic-boxer-dog-enjoying-a-sunny-day-outside.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="Side Image" />
        </div>
        <div className="form-section">
          <h1>User Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="input-group">
              <label>Email</label>
              <input {...register('email')} />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" {...register('password')} />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>
            <div className="input-group">
              <label>Age</label>
              <select {...register('age')}>
                <option value="">Select your age</option>
                <option value="0-12">0-12</option>
                <option value="13-19">13-19</option>
                <option value="20-60">20-60</option>
                <option value="Morethan 60"> Morethan 60 </option>
              </select>
              {errors.age && <span className="error">{errors.age.message}</span>}
            </div>
            <button type="submit" className="submit-btn">Login</button>
            <a href="#" className="forgot-password">Forgot password?</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyForm;
