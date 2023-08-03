#ifdef GL_ES
precision mediump float;
#endif

varying vec2 pos;
uniform sampler2D filter_background;
uniform vec2 filter_res;

// Funciones y definiciones para el ruido de Perlin
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626,
                      0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p =
      permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(
      0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return dot(m, g);
}

void main() {
  // Obtener una dirección aleatoria basada en la posición usando ruido de
  // Perlin
  vec2 factor = filter_res;
  // vec2 factor = vec2(100.0);

  vec2 randomOffset =
      vec2(snoise(pos * factor), snoise(pos * factor + vec2(1.0, 1.0)));

  float amplitude = 5.0;
  vec2 displacedPos = pos + randomOffset * amplitude;

  // Obtener el color de la posición desplazada
  vec4 col = texture2D(filter_background, pos);
  vec4 displacedCol = texture2D(filter_background, displacedPos);

  gl_FragColor = col * 0.0 + displacedCol;
}
