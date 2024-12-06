exports.genToken = () => {
  const wordList = "123456789ABCDEFGHIJKLMNOPQRSTUVWSYZ";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += wordList.charAt(Math.floor(Math.random() * wordList.length));
  }
  return code;
};
