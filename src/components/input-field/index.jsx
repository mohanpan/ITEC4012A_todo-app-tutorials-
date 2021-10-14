import "./styles.css"

export const Input = ({ name, label, type, required, register, errors, validationSchema}) => {
    return (
        <div className="form-control-input">
            <label>
                {label}
                {required && "*"}
                {!required && "(Optional)"}
            </label>

            <input name={name} type={type} {...register(name, validationSchema)} />

            {
                (errors[name]?.type === "required") && <span className="errors">This field is required!</span>
            }
        </div>
    )
}