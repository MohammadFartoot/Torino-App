import * as Yup from "yup";

export const persianDigitsToEnglish = (str = "") =>
    str.replace(/[۰-۹]/g, d =>
        String.fromCharCode(d.charCodeAt(0) - 1728)
    );


export const bankFieldSchema = Yup.object().shape({
    payment: Yup.object().shape({
        shaba_code: Yup.string()
            .transform((value = "") => {
                const english = persianDigitsToEnglish(value);
                return english.replace(/\s/g, "");
            })
            .matches(/^[\d\s]+$/, "شماره شبا باید فقط شامل عدد باشد")
            .test("len", "شماره شبا باید دقیقاً ۲۴ رقم باشد", (value = "") => {
                const digits = value.replace(/\s/g, "");
                return digits.length === 24;
            }),
        debitCard_code: Yup.string()
            .transform((value = "") => {
                const english = persianDigitsToEnglish(value);
                return english.replace(/\s/g, "");
            })
            .matches(/^[\d\s]+$/, "شماره کارت باید فقط شامل عدد باشد")
            .test("len", "شماره کارت باید دقیقاً ۱۶ رقم باشد", (value = "") => {
                const digits = value.replace(/\s/g, "");
                return digits.length === 16;
            }),
        accountIdentifier: Yup.string()
            .transform((value = "") => {
                const english = persianDigitsToEnglish(value);
                return english.replace(/\s/g, "");
            })
            .matches(/^[\d\s]+$/, "شماره حساب باید فقط شامل عدد باشد")
            .test("len", "شماره حساب باید بین  ۱۰ تا ۱۶ رقم باشد", (value = "") => {
                const digits = value.replace(/\s/g, "");
                return digits.length >= 10 && digits.length <= 16;
            }),
    })
});