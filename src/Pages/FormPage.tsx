import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormDetails = {
  name: string;
  email: string;
  rollNumber: number;
  gender: "Male" | "Female" | "Other";
  myCheckbox: boolean;
};

const FormPage = () => {
  const schema: ZodType<FormDetails> = z
    .object({
      name: z.string().min(3).max(30),
      email: z.string().email(),
      rollNumber: z.number().max(100),
      gender: z.enum(["Male", "Female", "Other"]),
      myCheckbox: z.boolean(),
    })
    .refine((data) => data.myCheckbox === true, {
      message: "You must agree to the terms and conditions",
      path: ["myCheckbox"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDetails>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: FormDetails) => {
    console.log("IT WORKED", data);
  };

  const options = [
    { label: "Male", value: 1 },
    { label: "Female", value: 2 },
    { label: "Other", value: 3 },
  ];

  return (
    <div className="bg-body">
      <div className="bg-img">
        <div className="content">
          <header>Form Details</header>
          <form onSubmit={handleSubmit(submitData)}>
            <div className="input-box">
              <label>Name</label>
              <input
                type="text"
                {...register("name")}
                placeholder="Enter your name"
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div className="input-box">
              <label>Email</label>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className="input-box">
              <label>Roll Number</label>
              <input
                type="number"
                {...register("rollNumber", { valueAsNumber: true })}
                placeholder="Enter your roll number"
              />
              {errors.rollNumber && <span>{errors.rollNumber.message}</span>}
            </div>
            <div className="input-box">
              <label>Gender</label>
              <select>
                {options.map((option) => (
                  <option {...register("gender")} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.gender && <span>{errors.gender.message}</span>}
            </div>
            <div className="input-checkbox">
              <input type="checkbox" id="tick" {...register("myCheckbox")} />
              <label htmlFor="tick">I agree to the terms and conditions</label>
            </div>
            <p className="error-msg">
              {errors.myCheckbox && <span>{errors.myCheckbox.message}</span>}
            </p>
            <div className="style-button-cen">
              <button type="submit" className="style-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
