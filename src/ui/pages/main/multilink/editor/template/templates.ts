import { MLDraftTimer } from '../../../../../../common/types/instance/mlDraft/mlTimer.class';

import { SocialNetwork, SocialService } from 'common/constants';
import {
  MLDraftAudio,
  MLDraftButton,
  MLDraftCarousel,
  MLDraftDivider,
  MLDraftImage,
  MLDraftImageText,
  MLDraftLink,
  MLDraftLogo,
  MLDraftShop,
  MLDraftSocial,
  MLDraftText,
  MLDraftVideo,
  MLDraftVote,
  MLDraftWidget,
  Nullable,
  TIncomingImage,
} from 'common/types/instance';
import { parseRawImage } from 'common/utils/ui';
import socials from 'img/socials';
import socialServices from 'img/socials/additional';

export const getTemplates = (name: string, avatar: Nullable<TIncomingImage>) => {
  const logo = parseRawImage(avatar) ?? null;
  const img2 =
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYYGRgaHBkfGhoaGh8cGB8ZLiEnJy4hJCQuLkA3Li5ALSQkN1M3Kz0xSkpKHzdTXFNKW0BKSDEBDAwMEA8QHhISHzomISU2NDY6NzYxMTE0NDQxP0A/PzExMT9AQD9APz8xQD9AQEBAQD9AQDExQEA/MTExPzQxNP/AABEIAOsAyAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQMEBQYCBwj/xAA6EAACAQIEBAQEBQMDBAMAAAABAgADEQQFITESQVFhBiJxgTJCkaETscHR8BUjUmJy8QcUguEzU5L/xAAaAQACAwEBAAAAAAAAAAAAAAADBAABAgUG/8QAKBEAAwACAgICAgICAwEAAAAAAAECAxESIQQxQVETIhVhQnEUMqEF/9oADAMBAAIRAxEAPwC8EIQnoTgCGFosSQgloNFBnbpoDaVsvT0RyZGzTHrRplzvyHUyyp4VzymA8aY/z8A5fz84TGputG5x1TS0V2P8U1y3kcpbTykrLXwL4pqpikFR+JKhs/E2nqbzFk9db9I2DCZcc0nOvZ14hTOkfVtKorAMpDA7EG4M7M86/wCk+eB6Jw7sONDdF+YruZ6Jeedy43jtywi7FEIQmCBAQiyECEISiBCEWQgQhCQiCEISE2Iw0MINtCWTZ59FheLO6cBiWicMkUUYnQX9BLFcquL7GCrLM+ws4qr0iHg8vLak6S4p4VV0Alfi8YmGHmvwnn0lLR8Xozhb6Em3pAUsmTufQ7jmMc/suyx8WZgKNHhQhWfQdbcz/Os8VzGpxsXY8yO59P5zm98SYh6zseG4Gif7d7zG1MsY/EVuWF7mdDxYUR37ZJyS639HOT0KQAqVC2jeVRztGM5q0nctTXhvuORPWaqh4WHAC9Q3tso/WUeZ+G3TiZAWXva8KrlsKrl1vZX5Fmb4eulRDZgw1+0+hcBm6OAbjUDafNdSmy7gj1mvyHOwqIjMVIA1gPJ8dZe/k3VNdz2e8JVB2MdBnnmWZ69hrxjqNZo8LnV95ysni1JJypmihIlDFq3OSgYq5a9hd7FhCLIQIRIsooIQgJCBCEJCCNtCK20JZNnn4WPUaLEgAawpJffaWuXUvmnXyZOKONjjlSRLweG4REx+YJSUs5sB9Z3WrADWZzMcC2KPApCr8x3NoklyrdejpbUrjJS5j4uoVbpqVOh0/l/aV2HyCmHVw44Drxb6dJsh4XpJTKU1UMRYuygt/PSZ7DZM2HLLxBka91Nx+cdxZZ01L0CzRS7NHQwFF1DcIflc6CPf0qgdOBb9r7ylTMOBeG3EoBK9P5+0ipnVV2+E8G4VdAR3gnN76rovHrXo0/8ASKX+P3P7xurlNM/Jf3MpaeYVjqadh7kmKmaVv/qsOwJgnyT/AO3/AKHWn/idV/DOHvcIPTlKLMfBaMf7b/ht0YafUTRJm7HRkI9jI+LxGl7/AKgQkZsietltcVtIxdbIsThjxKbjqp0k/L8/ZdKinTmDrL7D5rwGzWI77e8k1cHQrgngUnt5Wjn5XrVIA3L9j2W5oj6o+vTnL7D49l3268p5/iPD6Ibo7of9Q0+okvCYvE0uYqL630gbwTfckVqfk9Lw+LDSUDMFgM7RjzRuYPwzV5fjw1gd+XQzn5cFQHnImWcICEXCBCEJCghCEhAbaEG2hLIYlai8yAIuJ8TYakutRTbkvmM8bqZjUYaudeUhtULHWd1+KqfbFsPjOXts9MxHjRXfhRLgnQkzeZLTtTBvcnUnvPFMhThdPqZ7fgdKQ7KPyi/mxMJKS8aX5GvoovEniVaJKKOJueugmXXMXrHQEdr3EgZx/erNr5Qx+s1Ph7KVVQbXgnxwxy+Q7jn0O4DLWI8w0MvcHlqJykmkthJCxDJmqg+PDMehoYZek5bDr0EkzlhAUwyIT4degkavg0YcJA1juY1+Eqo1Zth+sm4XBqou2rHeUm12i618nnOfZU1Im48h+FxyPRh09JRUM2ei1idu+09kxeFR0KMAQRYzyjxJkJpOUOvOmx0uOl52vC8pWuF+xPJild66L7KPEFOsOFwOLrLg5XTbVftPJKFZkex0I7za5JnjEDXXpGsmFruGJ5JU962jSf0gcm//AELiSsNhmTkLdpHwubBtGHuDLOlVHJvrFLdrqiQpfaLfBYi4sd5LvKhGI1H2k+jViFxrtDUskQhCDLCEISFiOdD6GEKmx9DCWiHz3/QgKf4gdSltLDzX6HpK5aK3v076ThMQRcXNunL3nVMcRA6kCenMKaSfJmzyXAAIHt8XDb67z0zDfBbsB9pkKdKyUwNuKw9haazCt5faczyq5aYrgr92zzmtheCuyW2Y/nNtlK+USuz/AAIFUVB82/rJ2W1Jz/JvkkdXDK1su1WdqJwjR0RbZp9CgSFmOPSkhZjtsOZMsJWZhlKVWDNfTlyk632SWVvh5GdmxFTc6IOgnWe58tFCzGwH3ljiPIthoBMTWyR8fiXQsVpU1ue78hNRM1Xfou3wh17Zn8X48rlvIQBfnzmny7GNj6BSooDgXRh1mI8SeHamHqEcNlJ07esTwvialNzqQtxY9DflOlWGJhVHtHLjybutN+/gm47LCSVcFXTS/L3lZSL0313H0Insj5amJpKWI4+HSoBrfv1E89zbKXW4dCCCbNbyn0MY8bzJr9WE/FU9V6HMBmIca/US4oYl1+E8Q7b/AEmHplqbTRZfilfY2aO3CpbE8uNw9z6NHRzixs2n2lnQzMix3EzhDW1Fx9YlKvYjlFLwS/RU5aPSMHXDoGEflJ4er/2zxHYx2vjixsug+85GSeNNHQxvkkyzq1lUEswAAuSTsJRp4xwZJH4wHcg2jGd3OHqi/wAjflPCa5IO8b8Pw5zy23ol7l6R9Av4ownCf76bHreE+eTUPUxY5/Fx9szuifmWVVKDFaiFWG4Maywf3U/3L+c958W5OmIospUcVjY21E8XqZU9GqOIbMDfteb8byPyzt+zVZF3NfR6Ngzekh6N+tpeYF9pTZcg/BsORP53llhni2Vb2c/G9UO5jS46bLzUyuwBItLZjZr8mFj6ygx+PTDseM2HKI5IddI7GC0l2aag+kosVm5q4hKVM6KQWIlV/WK2KHBh1Kpsztpp2k/JMsTDX83G5+JoJRxXfsOv2fRsFfScMZFo4i8kiAaMceLImJW4jPhahwGsebOD7WkyqkhJUamxIFwZcPXRu1ynSLnH0qRW9RVboCLn0map5FR4y/AovsvISzWozniaSadOad0lpMDGCJfJrsqaNb8JuA6D5elukm1uGqvCToYmZ4IVFII9Oso8syzEqxDN5PlLb2mJW+09aHf0qdt6Y9ivCVF/9Pcbypr+ASDenWHbiBB+02lHDWGrEx2sLL5f4Ixj8vNPpilxD6MfhMgxKaEo46ho9Wyh9ymv1BmlNZuX7zmorsLW+ptDLzsm+xavEh/0UODrlF4SCO3KTaGIB0G8nVsNtc622GxkX8MA6KNzrM1nm12uyR49S+n0c465puN7qRb2nlNbwfieLyp5TqOIhdO4nq78YtYgCxIPvGKxJJdtSLacrdfT94TB5VYU1PyEeLb2zzmj/wBPcSbG6DbQtrCer/EAduIbWv7xJv8Aks39GvxIu6iXBEw3iHKgSdPSbyVma4XiUnmPygPHyvHQlnjlO17RkspUimVO8nUDoCJyEsGjeXk8JU8idY/T3tiE1plgxuspc5y9aro7f+Q7iXKjSVOacX4bBd7X94JS/gdxZdNbM5nnjFMN/bQa9FmXbxy/FfhPuZsPDngNHpvVxHmqVA3ADsg5H1mDz7wtXp1igpsSToAN/SXMY3tPtjL8ypriujfeFvF6Vjw34W/xO89Aw1S4E8d8OeAcRxLUqMKRBBA3b3nr+X4cqoBMTzxCf6sZWV3O2tMmfh3jTUpJQHppGqouCDFqnRUU/REqVlTS1zOMJiyzWtbS4tGsTU2stzrp7fvH8JhreY2uemwHQS9rQXX2WCicO4G5nQQSPjaV1uBcjW3WZMfIlTGAC4seW40MYfFDhBY2FrmQErktqLnpY3vbnp95JpUyRc+YabdOlpbRrSRYYZb+frt2EfMrabcPw6fZfccpLTFD5rj8vrLMNP2NVUYasQfTQARkICLHUa/vJbYpNr3PbWNVEAI0J3uRz7StETGnAAsR7de3aRxTZbaW6fsesce+wFtwWb9uccprdSoJ9e/X/iaXogjP8O43FxuD0hIaYohuEjc8JHK/I/zrCTiy9mrjbrHIhkFmjMY7D8LNIGD+JvaaTNKFxxSgoJZzOhivlJy80cbJaCR2UX17yQo1Mi4xrC/czU9s0hyli+BQF1PIcveOIhdrnU9e3aUFLFlGsf8AmaXLagIvF/IVSdLDEvvRKo4XmZMpKL6wUx5aI5xRBqZw9fkov35CQcShO7G3aTazAcx7SpzDHrYgXJ7SPt6RMa0tjVN1253O2/EOX6ycKqoo4mA9TMq7Yhz/AG04Bf4gPveSMPkDX46zlz/jc2hKxLW29BFSbLz+phtEBc/6Rp9dp0iVm3KoOg8zftO8EbLa1gNBbaOV8WiC7ECA6+C2/pDlOiBzJPUxxUAJPWVtDMDUNkUkf5HRZYIp5nWX38mWhjFoNxv1nKI1jYenKTLTktaQrfWiDUuPisPUzhKTMulgOW8lVmXnaVObZ/ToqWZtP1mpl09LsvY7iKDC1mB6jYRk5jTpLZnUa9bD0nnudeOne60hYdT+0x2JxjueJ2JPczpYf/n1S3XQOq+j2sZlhmfi/FS+mgYWOsJ4fSc3GvMQh/46fsxt/Z9SQhCcYoarpxKRM69MB9dppzKTNqOtxGMNd6+xXyZ6VL4HhQRhcdBKHOgACBJa1SADflKvMHvf0v8AeN4Yar2AeSWukRKmE40uNxtDKceVNjLDJLEMnQAj0kPH4Eo+mx1hKU3uKD48jns1GDxgYSU1e43mEwmYlHKk7flNFh8bxCc7JgqHr4OiqmlsuUwZbVjpA4FF1t9ZAq5kyrvtKXH+JKgFkQcXUzUYLr0gLtctNmor1VUakAfSZ/FZxSF7uW0tZPXr/N5m2xFWo39ws3+n5ZcZf4eer5iOBOvP2mv+Mp7th1cpdDR8QVHPDSThUaDmZJo5e72eqx7g72mjweXJSFlX3O5lZmdaxIuAL79rfwQdXKepRc9vZMyx+Hy7AD6RzHZrTpfG6r0udZ59nXjAIBToEg3PGxHmPe8zjt+PiOJWcrv5zcjteGx+FVLlXSMVUqj1Gt4lpbK3Ee20i1c4c7AC8zWBwvDaXSJtMXhiH12anbHPxnfViZg/G+YcTimp0Xf/AHfz85t8wrinTZz8ovPJMZWLuznckmPeDj3XLXSMWvgjkQtOoTq7BiJuPURYqbj1EJTK6PqOEITypQSLjafED1tJU4cS5enszU7WjMuLAjpKPF1LP9PpNNmFCzEjYzMZgms6njtUc1rjWmSMiqWrW63Eucyo3S/MH7TJ0sVwVEfuLzdNTDKR1ErOuFqg89y0YbOMvuwccwNZzhqrpoLjt1mjrYe6kcxIlLDcW8NOSXP7IG8lT0UdbNHJ1JtGP+5ud5dYnLCuq7fcSCcIp3W3cdYxNQ10YeV/KI9KuVIuNJsaGfllAAAsAJn0wPl11tzkZ6bodP8A1Fc+GcnoZwZ5/wAjUVswY/NM9muN0Kjcyjx+dOt1FwdRciQsPi2Y66nrAx4bn9mPfmTWkRszysnUfWTvDWFRFLO6gnlfbtHnqXUjftzlW+DdgupsNu0b1VTxb0Z5pmgxmf4embX4iP8AEXkZPGdIfI/2mcr5E5NwZDr5W6akST4uNrs2sqXyXniTxItZAiXFzrfSZO0cKdxE4Y1jxzE6kzvbODCLaAEIlsps6p7j1EItMaj1EJbRjZ9QQhCeTLCEISEI2LoBhMjmuHsW02m3lTmOFBYdDGfHy8K7Fs+Pa2jzvF0yAGGomyyHF8dJeqi0YxXh9gSUsVO4j2V4BqR2NjHM2SMkdPtAIdS9NE2pS17GVWIoEaDca+svSmkh4mmYvjvTN5I62RMLiQdGnWJy0MOJfp1jT4Vr6SVhSy77d4RvXcsElvqkQcJS4dOX5R18GDyk+pTVvMtr9p1TTnKeV+y5x/Bjs7yDjF1+Ia+szVGo1InThbZtN56y9AOO8zGfZAGJdRr80Zw+Sn+tBpTn/Rj6eMvufppLKkAVuTfuN5UYjCMjEcxup3Pf/iSMBX4WFh9445VLolPS2h+pXC9+h5SPjQ7ISg/4lxicGGXjUdyLfeRsjcfilCQVbToQf50mU0lv6B/l2tr4Mf8AgB9OHhftoD27GQmp8vz3HebXxDkTJd0uOoEpcUl1D2+Lc2587jkYaKVdoNGbZQFLG0OGTcQh3I7H1kdhCB5rYlNdR6iEWn8Q9RCZbKPpuEITyhsIQhIQIzXp8Qt9I9OZaKa2cUjpOigiARZPkpIYq0+kY4JOtGXpzc0ZqSKcN0kHHUTw7S4VO84rUri03OTTB3j3JiaWJdG8p9j0mnwOLDjv0lDmOFIY8o7l/ENekdyzNRyQljuprTNEyWNxFZQwiYaqGWKw1uN4l2mdCWmtoz2c+H0qDTRuR6TIYjJalM2dPcbfWenMQY0y300PrGsPlXC0+0YvHv0YPKcQUPC4Nud49nPh/UVqGhGpA095ra+CQn4R7iclAotCPydvkgCxOX2M4GnTxFIk2LWFxeYfxJhRSqBbEoRcrYWPb1m3w44CeDS4IOmkYxeVpWFnN/b9ZWDM8dNv0zLWntHmGIwflLDi4T8JPOx29ZSPoZ7GMgoBSuvCdxckX6ymx/gam+tNrHodo9Plw/YXFkcvTPNKY1HrCXWZeHq2HcBkNr6Eagj1hDc4fexjaPoKEITy4QJyZ1OZCAIkISyghEhLK2LEhCTRZyydIms7iXlmSqzDDqdWkGi6KbDYyzxjgtaVj4fh7i8axvc6Ynkn9toWlU4HI5SyWuGFxr1lRiU4gCDqI1Tcow10N/bsZKlP/ZvG3PXwXDVIitYyH+LedK/L6TPAJzLBgvMxhxTGtr/Uxn8Vxut5z+I504Pe0ihr5M1lT+AfgP8AkBG0RL2Ltp319IrYdmPmEHphd/ubCb69bAVtvehxqa/K4HtGGpP8rrxD7zj/ALxDpxC/QaRxKqdvrrNcaRluWyZhm4xwVEF/qDCc06g0taEDSrfQea6L0QMBAxUcEiQhLKCEIkhAhCBlmQiRIl5ZDq8QmJeN1Wsp9JEiMo8diDx36Tp8UCt+Uh4zX11ldiq7Itwd49EJ6E+bTY/Sx4JPvIuOzK20qmxdiSN5U1mYsba35foY7PjpvbB1leujUYbOFT4z+0uUrpUW6Nr2nnNelUY3uthyB1j2VYqpTaxB4edvzXvNX4qa5S+zG/7Ny2OK6GoRbfqJycxYjSpIK4pKgC1bA/K40v6ypzTJyp8rkDly+4gZxy3qumYdP7NHTxpvq9+15OoFX0Np5pUy+ouoNzrrxWlplmZ10IDozodyBcqe0Jk8VcdyzSbXzs3GJypGB09+cosXhihIfzLyJ3+sv8vxR2JuOR7SVi8IrrE5yVFar0bcTc7n2YirhixBRyDpYMbH2bnFnOZ4V6DErql9VIuB/O0I9Pa3LQH9l0erTmKsQzz52hIRYgmihIQhIUwiGKYjSyM5MSEJCmEaxC3E7iNLXsy/Rn8UwXUa9ZlPE9ZltY6HWauqPMwmS8Ur5B2InV8aVyQjT/bRmP6mOYPqN4jYtSfK5HrpK6puZxOrpIZ/DLWyxbFvye//AJEzk41+IeYj00lfT+ITpT+cvSZn8cr4LHDZm9yGJIO/r1EvcBm7LZHPEh+FrXt37jsZkOXvLDAuSCL6W2gqmX1oHnxJLaNHjUNr8Kup1UjaUf46gkFeEnQG5IvLHIKh8yX8tzpykDGaFT1vf2MrH3tfQvjlJtF74XzJw/AzXW9r7W9v5vN6lbgOu08py/8A+Wmetp6fiNaQPaIeZjSpf2ET4ttErG4RXH6xJxlzkpv1hEt1PWw/Ca7P/9k=';
  const img1 =
    'data:image/jpeg;base64,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';
  return [
    [
      new MLDraftLogo({
        isFilled: !!avatar,
        logo,
        size: 100,
        padding: [24, 0, 0, 0],
        margin: [0, 0, 24, 0],
      }),
      new MLDraftText({
        isFilled: false,
        text: name,
        fontSize: 22,
        fontWeight: 700,
        textAlign: 'center',
        margin: [0, 0, 24, 0],
        padding: [12, 24, 12, 24],
        background: '#0002',
      }),
      new MLDraftSocial({
        isFilled: false,
        links: [
          'https://vk.com',
          'https://youtube.com',
          'https://instagram.com',
          'https://facebook.com/',
        ],
        linkTypes: [
          SocialNetwork.VK,
          SocialNetwork.YOUTUBE,
          SocialNetwork.INSTAGRAM,
          SocialNetwork.FACEBOOK,
        ],
        margin: [0, 0, 24, 0],
        padding: [12, 24, 12, 24],
      }),
      new MLDraftText({
        isFilled: false,
        text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit quos, quod natus fugiat eaque quae, eius sed beatae, et impedit doloribus! Doloremque, ut alias repellendus ducimus illum recusandae saepe possimus laboriosam accusamus rem debitis odit non a eveniet perferendis numquam sit labore nihil impedit. Eos dicta harum at libero dignissimos.',
        fontSize: 18,
        fontWeight: 400,
        margin: [0, 0, 24, 0],
        padding: [0, 24, 0, 24],
      }),
      new MLDraftLink({
        isFilled: false,
        href: '',
        linkType: 'third-party' as const,
        title: 'Ссылка',
        fontSize: 20,
        fontWeight: 500,
        padding: [12, 24, 12, 24],
        margin: [0, 24, 12, 24],
        background: `#f${Math.random().toString(16).substr(-4)}f40`,
      }),
      new MLDraftLink({
        isFilled: false,
        href: '',
        linkType: 'third-party' as const,
        title: 'Ссылка',
        fontSize: 20,
        fontWeight: 500,
        padding: [12, 24, 12, 24],
        margin: [0, 24, 12, 24],
        background: `#f${Math.random().toString(16).substr(-4)}f40`,
      }),
      new MLDraftLink({
        isFilled: false,
        href: '',
        linkType: 'third-party' as const,
        title: 'Ссылка',
        fontSize: 20,
        fontWeight: 500,
        padding: [12, 24, 12, 24],
        margin: [0, 24, 12, 24],
        background: `#f${Math.random().toString(16).substr(-4)}f40`,
      }),
    ],
    [
      new MLDraftLogo({
        isFilled: !!avatar,
        logo,
        size: 100,
        padding: [24, 0, 0, 0],
        margin: [0, 0, 24, 0],
      }),
      new MLDraftText({
        isFilled: false,
        text: name,
        fontSize: 22,
        fontWeight: 700,
        textAlign: 'center',
        margin: [0, 0, 24, 0],
        padding: [12, 24, 12, 24],
        background: '#0002',
      }),
      new MLDraftText({
        isFilled: false,
        text: 'Lorem ipsum, dolor sit amet.',
        fontSize: 18,
        fontWeight: 400,
        margin: [0, 0, 24, 0],
        padding: [0, 24, 0, 24],
      }),
      new MLDraftImageText({
        isFilled: false,
        image: null,
        text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit quos, quod natus fugiat eaque quae, eius sed beatae, et impedit doloribus!',
        imgPosition: 'left',
        fontSize: 18,
        fontWeight: 400,
        padding: [0, 24, 0, 24],
      }),
      new MLDraftImageText({
        isFilled: false,
        image: null,
        text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit quos, quod natus fugiat eaque quae, eius sed beatae, et impedit doloribus!',
        imgPosition: 'right',
        fontSize: 18,
        fontWeight: 400,
        padding: [0, 24, 0, 24],
      }),
      new MLDraftSocial({
        isFilled: false,
        links: [
          'https://vk.com',
          'https://youtube.com',
          'https://instagram.com',
          'https://facebook.com/',
        ],
        linkTypes: [
          SocialNetwork.VK,
          SocialNetwork.YOUTUBE,
          SocialNetwork.INSTAGRAM,
          SocialNetwork.FACEBOOK,
        ],
        padding: [12, 24, 12, 24],
      }),
      new MLDraftSocial({
        isFilled: false,
        links: [
          'https://donationalerts.com',
          'https://boosty.com',
          'https://www.patreon.com/',
          'https://discord.ee',
        ],
        linkTypes: [
          SocialService.DONATIONALERTS,
          SocialService.BOOSTY,
          SocialService.PATREON,
          SocialService.DISCORD,
        ],
        padding: [12, 24, 12, 24],
      }),
    ],
    [
      new MLDraftAudio({
        isFilled: false,
        url: 'https://dl6.ru-music.cc/mp3/56188.mp3',
        margin: [0, 24, 12, 24],
        padding: [24, 0, 0, 0],
      }),
      new MLDraftWidget({
        isFilled: true,
        url: 'https://promoreal.ru/quizy/okna/test/index.html',
        width: 300,
        height: 986,
        margin: [0, 0, 12, 0],
        padding: [0, 12, 24, 12],
      }),
      new MLDraftTimer({
        isFilled: false,
        href: 'asd',
        image: 'https://i.ibb.co/T49BVq6/bgcImg.jpg',
        countdown: 12,
        title: '123',
      }),
      new MLDraftCarousel({
        isFilled: false,
        images: [...socials, ...socialServices].map(data => data.src),
        titles: [...socials, ...socialServices].map(data => data.title),
        itemsPerView: 4,
        dots: true,
        arrows: false,
        margin: [0, 0, 24, 0],
        background: '#0002',
      }),
    ],
  ] as const;
};
