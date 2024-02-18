import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TBaseForm = {
  onSubmit: any;
  children: ReactNode;
} & TFormConfig;

const BaseForm = ({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: TBaseForm) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    // methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        style={{ width: "100%" }}
        onSubmit={methods.handleSubmit(submitHandler)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default BaseForm;
