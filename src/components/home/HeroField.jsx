import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform vec2 u_res;
uniform vec2 u_light;
uniform float u_time;

void main() {
  vec2 uv = v_uv;
  uv.x *= u_res.x / max(u_res.y, 1.0);

  vec3 ro = vec3(0.0, 1.15, 2.4);
  vec3 rd = normalize(vec3((v_uv * 2.0 - 1.0) * vec2(u_res.x / max(u_res.y, 1.0), 1.0), -1.35));

  float t = -ro.y / rd.y;
  vec3 col = vec3(0.027, 0.043, 0.07);

  if (t > 0.0) {
    vec3 p = ro + rd * t;
    float fog = exp(-0.085 * t * t);
    vec2 g = abs(fract(p.xz * 0.55) - 0.5);
    float line = 1.0 - smoothstep(0.0, 0.03, min(g.x, g.y));
    vec3 lightPos = vec3((u_light.x - 0.5) * 8.0, 1.8, (u_light.y - 0.5) * -6.0 + 1.2);
    float dist = length(p - vec3(lightPos.x, 0.0, lightPos.z));
    float lamp = exp(-dist * 0.28) * 0.9;
    vec3 floorCol = mix(vec3(0.05, 0.1, 0.18), vec3(0.72, 1.0, 0.23), lamp * 0.55);
    floorCol += line * vec3(0.18, 0.28, 0.4) * (0.12 + lamp * 0.4);
    col = mix(col, floorCol, fog);
  }

  float vignette = smoothstep(1.15, 0.25, length(v_uv - 0.5));
  float sweep = 0.04 * sin(u_time * 0.15 + v_uv.x * 3.0);
  col *= vignette;
  col += sweep * vec3(0.05, 0.08, 0.12);
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Unable to compile the home hero shader:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function HeroField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    if (reduced || (coarse && small)) return undefined;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return undefined;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      return undefined;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      return undefined;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Unable to link the home hero shader program:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      return undefined;
    }

    const buffer = gl.createBuffer();
    if (!buffer) {
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      return undefined;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.useProgram(program);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uLight = gl.getUniformLocation(program, "u_light");
    const uTime = gl.getUniformLocation(program, "u_time");

    const light = { x: 0.72, y: 0.42 };
    const target = { x: 0.72, y: 0.42 };
    let frame = 0;
    let start = performance.now();
    let visible = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    const onMove = (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      const bounds = canvas.getBoundingClientRect();
      target.x = (event.clientX - bounds.left) / Math.max(bounds.width, 1);
      target.y = (event.clientY - bounds.top) / Math.max(bounds.height, 1);
    };

    const draw = (now) => {
      frame = 0;
      if (!visible || document.hidden) return;
      light.x += (target.x - light.x) * 0.06;
      light.y += (target.y - light.y) * 0.06;
      gl.uniform2f(uLight, light.x, 1.0 - light.y);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frame = requestAnimationFrame(draw);
    };

    const startRendering = () => {
      if (visible && !document.hidden && !frame) {
        frame = requestAnimationFrame(draw);
      }
    };
    const stopRendering = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startRendering();
      else stopRendering();
    });
    observer.observe(canvas);

    const onVisibilityChange = () => {
      if (document.hidden) stopRendering();
      else startRendering();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stopRendering();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
