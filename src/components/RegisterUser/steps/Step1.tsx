import { Button, Divider, Flex, TextInput } from "@mantine/core";
import { ArrowRight } from "react-feather";
import { useForm } from "react-hook-form";
import useGlobalStore from "../../../store/useGlobalStore";
import { IStepProps } from "../RegisterUser";
import { IconCurrencyDollar } from "@tabler/icons-react";
import { moneyValidation } from "../../../helpers/formatToTwoDecimalPlaces";

interface IFormValues {
  name: string;
  grossIncome: number | null;
  tax: number | null;
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
      grossIncome: user.grossIncome || null,
      tax: user.tax || null,
    },
  });

  const onSubmit = handleSubmit((data) => {
    setUser({ name: data.name, grossIncome: data.grossIncome, tax: data.tax });

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
      <TextInput
        mt={10}
        {...register("grossIncome", {
          required: "Your income is required",
          valueAsNumber: true,
          minLength: {
            value: 3,
            message: "At least 100 bucks bro cmon",
          },
          validate: (value) => {
            if (value === null) {
              return "Your income is required";
            }

            if (value !== undefined) {
              const string = value?.toString();
              return moneyValidation(string) === -1 ? "Invalid currency format." : true;
            }
          },
        })}
        defaultValue={user.grossIncome || ""}
        description="How much money you make yearly before taxes"
        error={errors.grossIncome?.message}
        label="Gross Income"
        placeholder="50000"
        withAsterisk
        icon={<IconCurrencyDollar size={15}/>}
      />
      <TextInput
        mt={10}
        {...register("tax", {
          required: "Your tax is required",
          valueAsNumber: true,
        })}
        defaultValue={user.tax || ""}
        description="What percent of your salary goes to taxes?"
        error={errors.tax?.message}
        label="Tax"
        placeholder="23"
        withAsterisk
        type="number"
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
