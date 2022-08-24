export function validate(obj, model) {
  const modelEntries = Object.entries(obj);

  const isObjectValid = modelEntries.every((property) => {
    const [key, value] = property;
    const config = model[key];

    // Comprueba que está definido en el modelo
    if (!config) return false;

    // Comprueba que tiene un valor (si no es opcional)
    const hasValue = config.optional ? true : !!value;
    console.log({ hasValue, value })
    if (!hasValue) return false;

    // Comprueba que el tipo del valor es válido
    const isTypeValid = hasValue ? typeof value === config.type : true;
    if (!isTypeValid) return false;
  });

  return isValid
}

// const User = {
//   name: {
//     type: 'string',
//     optional: false,
//   },
//   surname: {
//     type: 'string',
//     optional: true,
//   },
// }

