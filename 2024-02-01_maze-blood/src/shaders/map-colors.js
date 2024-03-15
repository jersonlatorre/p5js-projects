export let mapColorsShaderSrc = `
  precision highp float;

  varying vec2 vTexCoord;
  uniform sampler2D tex0;
  uniform vec2 texelSize;

  void main() {
      vec4 textureColor = texture2D(tex0, vTexCoord);

      // Calcula la intensidad del brillo del color resultante
      float brightness = (textureColor.r + textureColor.g + textureColor.b) / 3.0;

      vec3 color;

      // Escala el brillo a un índice entre 0 y 5 y selecciona el color correspondiente
      if (brightness < 0.25) {
          color = vec3(0.0, 0.0, 0.0); // Negro
      } else if (brightness < 0.3) {
          color = vec3(1.0, 0.0, 0.3); // Rojo
      } else if (brightness < 0.4) {
          color = vec3(1.0, 0.64, 0.0); // Naranja
      } else if (brightness < 0.85) {
          color = vec3(1.0, 0.92, 0.15); // Amarillo
      } else if (brightness < 1.0) {
          color = vec3(0.16, 0.67, 1.0); // Azul
      } else {
          color = vec3(1.0, 1.0, 1.0); // Casi blanco
      }

      gl_FragColor = vec4(color, 1.0);
  }
`
