export const VolumetricLightShader = {
  uniforms: {
    tDiffuse: { value: null },
    lightPosition: { value: new THREE.Vector2(0.5, 0.5) },
    exposure: { value: 1 },
    decay: { value: 1 },
    density: { value: 0.96 },
    weight: { value: 0.5 },
    samples: { value: 50 },
  },
  vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
  fragmentShader: `
      varying vec2 vUv;
      uniform sampler2D tDiffuse;
      uniform vec2 lightPosition;
      uniform float exposure;
      uniform float decay;
      uniform float density;
      uniform float weight;
      uniform int samples;
      void main() {
        vec2 deltaTextCoord = vUv - lightPosition;
        deltaTextCoord *= 1.0 / float(samples) * density;
        vec4 color = vec4(0.0);
        float illuminationDecay = 1.0;
        for (int i = 0; i < 100; i++) {
          if (i == samples) break;
          vUv -= deltaTextCoord;
          vec4 sample = texture2D(tDiffuse, vUv);
          sample *= illuminationDecay * weight;
          color += sample;
          illuminationDecay *= decay;
        }
        gl_FragColor = color * exposure;
      }
    `,
};
