precision highp float;

uniform sampler2D uTexture; // Declara una uniforme para la textura
uniform vec2 uResolution;
uniform float uTime; // Tiempo uniforme para animar el efecto de ondulación
uniform float uPixelDensity;

float noise(vec2 p) {
  float n = fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
  return mix(-1.0, 1.0, n);
}

void main() {
  // Normaliza las coordenadas del fragmento
  vec2 uv = (gl_FragCoord.xy / uPixelDensity) / uResolution.xy;

  // Simula el ruido de Perlin con la función seno
  float noisex = noise(uv);
  float noisey = noise(uv + vec2(0.0, 1.0));

  // Desplaza las coordenadas uv en función del "ruido"
  uv += vec2(noisex, noisey) * 0.09;

  // Invierte el eje y
  // uv /= 1.5;
  // uv += vec2(0.25);
  uv.y = 1.0 - uv.y;

  // Toma el color de la textura
  vec4 textureColor = texture2D(uTexture, uv);

  // Establece el color del fragmento al color de la textura
  gl_FragColor = textureColor;
}
