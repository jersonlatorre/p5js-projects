let generatedText = ''
function setup() {
  createCanvas(600, 600)
  background(255)

  axios
    .post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: 'completa la frase con no más de 10 palabras con temática aleatoria: el más extraño problema con el mundo es ',
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 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',
        },
      }
    )
    .then((response) => {
      generatedText = 'El problema con el mundo es ' + response.data.choices[0].message.content
    })
}

function draw() {
  background('blue')
  textAlign(CENTER, CENTER)
  textSize(14)
  fill('white')
  text(generatedText, width / 2, height / 2)
}
