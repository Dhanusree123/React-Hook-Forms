import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z.string().min(1, "User Name is required"),
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .min(18, "Age must be greater than or equal to 18"),
  email: z.string().email("Invalid email address"),
  phonenumber: z
    .string()
    .regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
});

type formData = z.infer<typeof formSchema>;

const HookFormD = () => {
  const form = useForm<formData>({
    defaultValues: {
      username: "",
      age: undefined,
      email: "",
      phonenumber: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: formData) => {
    console.log("Form Submitted", data);
  };

  return (
    <>
      <div>
        <div className="form-block">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h1>Login Form</h1>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" {...register("username")} />
            <p className="errors">{errors.username?.message}</p>

            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              {...register("age", { valueAsNumber: true })}
            />
            <p className="errors">{errors.age?.message}</p>

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" {...register("email")} />
            <p className="errors">{errors.email?.message}</p>

            <label htmlFor="phonenumber">Phone Number</label>
            <input type="text" id="phonenumber" {...register("phonenumber")} />
            <p className="errors">{errors.phonenumber?.message}</p>

            <button className="btn-submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HookFormD;
