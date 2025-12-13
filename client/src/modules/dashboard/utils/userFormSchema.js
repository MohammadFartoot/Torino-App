import * as Yup from "yup";

export const userFieldSchema = Yup.object().shape({
    fullName: Yup
        .string()
        .matches(/^[\u0600-\u06FFa-zA-Z\s]{3,20}$/
            , "نام و نام خانوادگی باید حداقل ۳ رقم باشد"),
    nationalCode: Yup
        .string()
        .transform((value) =>
            value.replace(/[۰-۹]/g, (d) =>
                String.fromCharCode(d.charCodeAt(0) - 1728)
            )
        )
        .trim()
        .matches(/^\d{10}$/, "کد ملی نامعتبر است"),
    birthDate: Yup
        .string()
        .transform((value) => value.replace(/[۰-۹]/g, (d) =>
            String.fromCharCode(d.charCodeAt(0) - 1728))).trim(),
    gender: Yup.string()
})