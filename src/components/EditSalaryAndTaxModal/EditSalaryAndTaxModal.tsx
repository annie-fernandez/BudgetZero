import { Button, Divider, Flex, TextInput } from "@mantine/core";
import { ArrowRight } from "react-feather";
import { useForm } from "react-hook-form";
import useGlobalStore from "../../store/useGlobalStore";
import { closeAllModals } from "@mantine/modals";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Database } from "../../../types/database.types";
import { showNotification } from "@mantine/notifications";

interface IFormValues {
  grossIncome: number | null;
  tax: number | null;
}

const EditSalaryAndTaxInformation = (): JSX.Element => {
  const { user, setUser, fetchCategoriesWithTransactions, fetchTransactions } =
    useGlobalStore();
  const session = useSession();
  const supabase = useSupabaseClient<Database>();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      grossIncome: user.grossIncome || null,
      tax: user.tax || null,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (session?.user.id === null) return;

    setUser({ grossIncome: data.grossIncome, tax: data.tax });

    setIsLoading(true);

    const { error: resError } = await supabase
      .from("users")
      .update({
        gross_income: data.grossIncome || 0,
        tax: data.tax,
      })
      .eq("id", session?.user.id || "");

    setIsLoading(false);

    if (resError) {
      return showNotification({
        title: "Error",
        message: "Something went wrong",
      });
    }

    fetchTransactions({ supabase });
    fetchCategoriesWithTransactions({ supabase });
    closeAllModals();
  });

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        mt={10}
        {...register("grossIncome", {
          required: "Your income is required",
          valueAsNumber: true,
          minLength: {
            value: 3,
            message: "At least 100 bucks bro cmon",
          },
        })}
        defaultValue={user.grossIncome || ""}
        description="How much money you make yearly before taxes"
        error={errors.grossIncome?.message}
        label="Gross Income"
        placeholder="50000"
        withAsterisk
        type="number"
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
        <Button
          variant="subtle"
          mr={10}
          onClick={() => {
            closeAllModals();
          }}
        >
          Cancel
        </Button>
        <Button
          loading={isLoading}
          rightIcon={<ArrowRight size={16} />}
          type="submit"
        >
          Save
        </Button>
      </Flex>
    </form>
  );
};

export default EditSalaryAndTaxInformation;
