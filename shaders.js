function Shaders() {
    this.car = new GL.Shader('\
        varying vec3 normal;\
        uniform float speed;\
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

    this.fuel = new GL.Shader('\
        varying vec3 normal;\
        uniform float amount;\
        void main() {\
            normal = gl_Normal;\
            vec4 pos = vec4(gl_Vertex.x * 0.7, gl_Vertex.y * 0.95 * amount, gl_Vertex.z * 0.7, 1.0);\
            gl_Position = gl_ModelViewProjectionMatrix * pos;\
        }\
        ', '\
        varying vec3 normal;\
        void main() {\
            vec3 light = vec3(-0.75, 0.5, 0.5);\
            float brightness = dot(normal, light) * 0.5 + 0.5;\
            gl_FragColor = vec4(brightness * 0.5, brightness, brightness * 0.5, 1.0);\
        }\
    ');

     this.fuelCell = new GL.Shader('\
        varying vec3 normal;\
        void main() {\
            normal = gl_Normal;\
            vec4 pos = vec4(gl_Vertex.xyz * 1.0, 1.0);\
            gl_Position = gl_ModelViewProjectionMatrix * pos;\
        }\
        ', '\
        varying vec3 normal;\
        void main() {\
            vec3 light = vec3(-0.75, 0.5, 0.5);\
            float brightness = dot(normal, light) * 0.5 + 0.5;\
            gl_FragColor = vec4(brightness * 0.75, brightness * 0.75, brightness, 0.25);\
        }\
    ');

    this.trail = new GL.Shader('\
        uniform float speed;\
        varying float x;\
        void main() {\
        	x = gl_Vertex.x;\
            vec4 pos = vec4(gl_Vertex.x * 1.25 * speed, gl_Vertex.y, gl_Vertex.z, 1.0);\
            gl_Position = gl_ModelViewProjectionMatrix * pos;\
        }\
        ', '\
        varying float x;\
        void main() {\
            gl_FragColor = vec4(1.0, 0.5, 1.25 + x, 0.1);\
        }\
    ');

    this.downTrail = new GL.Shader('\
        uniform float speed;\
        varying float x;\
        void main() {\
        	x = gl_Vertex.x;\
            vec4 pos = vec4(gl_Vertex.y, -1.25 + gl_Vertex.x * speed, gl_Vertex.z, 1.0);\
            gl_Position = gl_ModelViewProjectionMatrix * pos;\
        }\
        ', '\
        varying float x;\
        void main() {\
            gl_FragColor = vec4(1.0, 0.5, 1.25 + x, 0.25);\
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