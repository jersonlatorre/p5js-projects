#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

// Agrega una variable uniform para la posición del mouse
uniform vec2 u_mouse;

void main() {
  vec2 p = (gl_FragCoord.xy / u_resolution.xy);

  // Calcula la distancia entre la posición del mouse y la posición actual
  vec2 mouseDist = u_mouse - p;

  // Calcula la distancia desde el centro de la pantalla
  vec2 center = vec2(0.5);
  float distance = length(p - center);

  // Aplica una función sinusoidal para crear el efecto de ondulación
  float ripple = sin(distance * 10.0 - u_time * 2.0);

  // Ajusta la amplitud de la ondulación y la atenuación según la distancia al
  // mouse
  float amplitude = 0.03;
  float attenuation = 1.0 - smoothstep(0.0, 0.1, length(mouseDist));
  ripple *= amplitude * attenuation;

  // Desplaza la posición de muestreo en función de la ondulación
  vec2 distortedP = p + ripple * mouseDist;

  // Asegura que la posición esté dentro de la pantalla
  distortedP = clamp(distortedP, 0.0, 1.0);

  // Calcula el color en función de la posición distorsionada
  vec3 color = vec3(0.2, 0.4, 0.8) + vec3(0.1, 0.2, 0.4) * sin(ripple * 10.0);

  gl_FragColor = vec4(color, 1.0);
}
