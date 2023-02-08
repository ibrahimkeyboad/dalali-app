function TextInput({ type, name, hint, formik }) {
  if (formik) {
    return (
      <input
        className='border-b-2 outline-none p-2 w-[100%] focus:border-[#098366]'
        placeholder={hint}
        {...formik.getFieldProps(name)}
        name={name}
        type={type}
      />
    );
  } else {
    return (
      <input
        className='border-2 rounded-md outline-none p-2 w-[100%] focus:border-[#098366]'
        placeholder={hint}
        name={name}
        type={type}
      />
    );
  }
}

export default TextInput;
