export const parseEnv = () => {
  const variablesEnv = Object.entries(process.env);
  const reg = /^RSS_/;
  let foundVariables = [];

  for (let i = 0; i < variablesEnv.length; i++) {
    const [key, value] = variablesEnv[i];

    if (key.match(reg)) {
      foundVariables.push(`${key}=${value}`);
    }
  }
  
  const strFoundVariables = foundVariables.join('; ');
  console.log(strFoundVariables);
};

parseEnv();
