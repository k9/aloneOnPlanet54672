function Shaders() {
    this.car = new GL.Shader('\
        varying vec3 normal;\
        void main() {\
            normal = gl_Normal;\
            vec4 pos = vec4(gl_Vertex.x, gl_Vertex.y, gl_Vertex.z, 1.0);\
            gl_Position = gl_ModelViewProjectionMatrix * pos;\
        }\
        ', '\
        varying vec3 normal;\
        void main() {\
            vec3 light = vec3(-0.75, 0.5, 0.5);\
            float brightness = dot(normal, light) * 0.5 + 0.5;\
            gl_FragColor = vec4(brightness, brightness, brightness, 1.0);\
        }\
    ');

    this.fuelCell = new GL.Shader('\
        varying vec3 normal;\
        void main() {\
            normal = gl_Normal;\
            vec4 pos = vec4(gl_Vertex.x * 2.0, gl_Vertex.y * 2.0, gl_Vertex.z * 2.0, 1.0);\
            gl_Position = gl_ModelViewProjectionMatrix * pos;\
        }\
        ', '\
        varying vec3 normal;\
        void main() {\
            vec3 light = vec3(-0.75, 0.5, 0.5);\
            float brightness = dot(normal, light) * 0.5 + 0.5;\
            gl_FragColor = vec4(brightness, brightness, brightness, 1.0);\
        }\
    ');

    this.trail = new GL.Shader('\
        uniform float speed;\
        void main() {\
            vec4 pos = vec4(gl_Vertex.x * 1.25 * speed, gl_Vertex.y, gl_Vertex.z, 1.0);\
            gl_Position = gl_ModelViewProjectionMatrix * pos;\
        }\
        ', '\
        void main() {\
            gl_FragColor = vec4(1.0, 0.4, 0.4, 0.1);\
        }\
    ');

    this.downTrail = new GL.Shader('\
        uniform float speed;\
        void main() {\
            vec4 pos = vec4(gl_Vertex.y, -0.5 + gl_Vertex.x * speed, gl_Vertex.z, 1.0);\
            gl_Position = gl_ModelViewProjectionMatrix * pos;\
        }\
        ', '\
        void main() {\
            gl_FragColor = vec4(1.0, 0.4, 0.4, 0.1);\
        }\
    ');

    this.ground = new GL.Shader('\
        void main() {\
            gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
        }\
        ', '\
        uniform vec4 color;\
        void main() {\
            gl_FragColor = color;\
        }\
    ');
}