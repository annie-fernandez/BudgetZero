import { Button, Divider, Flex, TextInput } from "@mantine/core";
import React from "react";
import { ArrowRight } from "react-feather";
import { useForm } from "react-hook-form";
import useGlobalStore from "../../../store/useGlobalStore";
import { IStepProps } from "../RegisterUser";

interface IFormValues {
  name: string;
  grossSalary: number | null;
}

const Step1 = ({ nextStep }: IStepProps): JSX.Element => {
  const { user, setUser } = useGlobalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      name: user.name || "",
      grossSalary: user.grossSalary || null,
    },
  });

  const onSubmit = handleSubmit((data) => {
    setUser({ name: data.name, grossSalary: data.grossSalary });

    nextStep();
  });

  return (
    <form onSubmit={onSubmit}>
      <h1>Your basic info</h1>
      <TextInput
        {...register("name", {
          required: "Your name is required",
          minLength: {
            value: 5,
            message: "At least 5 letters",
          },
        })}
        defaultValue={user.name || ""}
        description="This is going to be your public name"
        error={errors.name?.message}
        label="Name"
        placeholder="Stephen Smith"
        withAsterisk
      />
      <br />
      <TextInput
        {...register("grossSalary", {
          required: "Your income is required",
          minLength: {
            value: 3,
            message: "At least 100 bucks bro cmon",
          },
        })}
        defaultValue={user.grossSalary || ""}
        description="How much money you make yearly before taxes"
        error={errors.grossSalary?.message}
        label="Gross Income"
        placeholder="50000"
        withAsterisk
      />
      <Divider mb={20} mt={20} />
      <Flex justify="end">
        <Button rightIcon={<ArrowRight size={16} />} type="submit">
          Next
        </Button>
      </Flex>
    </form>
  );
};

export default Step1;
