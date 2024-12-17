import * as Yup from "yup";
import { CurrencyType, EcommerceProductFormData } from "@/utils/formDatas";

type ValidationSchema<T> = Yup.ObjectSchema<T>;

export const validateForm = async <T>(
  formData: T,
  schema: ValidationSchema<T>,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
): Promise<boolean> => {
  try {
    await schema.validate(formData, { abortEarly: false });
    setErrors({});
    return true;
  } catch (err) {
    const errorObj = (err as Yup.ValidationError).inner.reduce(
      (acc: Record<string, string>, error) => {
        if (error.path) {
          acc[error.path] = error.message;
        }
        return acc;
      },
      {},
    );
    setErrors(errorObj);
    return false;
  }
};

export const ProductCreateValidationSchema =
  Yup.object<EcommerceProductFormData>({
    title: Yup.string().required("Bu alan zorunludur"),
    description: Yup.string().required("Bu alan zorunludur"),
    categoryId: Yup.number().required("Bu alan zorunludur"),
    brandId: Yup.number().required("Bu alan zorunludur"),
    quantity: Yup.number().required("Bu alan zorunludur"),
    listPrice: Yup.number().required("Bu alan zorunludur"),
    salePrice: Yup.number().required("Bu alan zorunludur"),
    vatRate: Yup.number().required("Bu alan zorunludur"),
    dimensionalWeight: Yup.number().required("Bu alan zorunludur"),
    currencyType: Yup.string()
      .required("Geçerli bir değer girilmeli")
      .oneOf(Object.values(CurrencyType)),
  });
