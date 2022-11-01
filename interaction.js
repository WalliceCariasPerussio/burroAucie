import axios  from 'axios';

export default  {
  senhafdc: function senhafdc(){
    const DIA = new Date().getDate() + 20;
    const MES = new Date().getMonth() + 12;
    return `A senha do dia é: 004420${DIA}${MES}, Senha Curta: ${DIA}${MES}`;
  },
  inspire: async function inspire(){
    const { data } = await axios.get('https://zenquotes.io/api/random');
    const quote = data[0]['q'] + ' -' + data[0]['a'];
    return quote;
  },
  advice: async function advice(){
    const { data } = await axios.get('https://api.adviceslip.com/advice');
    return data.slip.advice;
  },
};