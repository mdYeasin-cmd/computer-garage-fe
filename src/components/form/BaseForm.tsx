import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ZodType } from "zod";

type TBaseForm = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  validationSchema: ZodType;
};

const BaseForm = ({ children, onSubmit, validationSchema }: TBaseForm) => {
  const methods = useForm({
    resolver: zodResolver(validationSchema),
  });

  return (
    <FormProvider {...methods}>
      <form style={{ width: "100%" }} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default BaseForm;
