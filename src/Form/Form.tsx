import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  favoriteDog: z.string().min(1, 'Please select your favorite dog'),
});

interface FormValues {
  username: string;
  password: string;
  favoriteDog: string;
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
              <label>Username</label>
              <input {...register('username')} />
              {errors.username && <span className="error">{errors.username.message}</span>}
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" {...register('password')} />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>
            <div className="input-group">
              <label>Favorite Dog</label>
              <select {...register('favoriteDog')}>
                <option value="">Select your favorite dog</option>
                <option value="Buddy">Buddy</option>
                <option value="Rocky">Rocky</option>
                <option value="Max">Max</option>
                <option value="Charl">Charlie</option>
              </select>
              {errors.favoriteDog && <span className="error">{errors.favoriteDog.message}</span>}
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
