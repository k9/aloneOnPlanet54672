var bg = [0.90, 0.85, 1.0, 1.0];
function mixWithBG(color, m) {
    return [
        mix(color[0], bg[0], m), 
        mix(color[1], bg[1], m), 
        mix(color[2], bg[2], m), 
        mix(color[3], bg[3], m)
    ];
}

function render() {
    gl.clearColor(bg[0], bg[1], bg[2], bg[3]);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.loadIdentity();
    gl.rotate(Math.min(carState.speed / 10, 20), 0, 1, 0);
    gl.translate(0, -20, -75);
    shaders.car.uniforms({ speed: carState.speed }).draw(car.mesh);
    shaders.trail.draw(car.trailMesh);
    gl.translate(0, -1, 0);

    gl.translate(-car.x, -car.y, 0);
    shaders.ground.uniforms({ color: [0.85, 0.6, 0.6, 1] }).draw(terrain.ground.mesh);
    gl.translate(0, 0, -100);
    shaders.ground.uniforms({ color: mixWithBG([0.85, 0.6, 0.6, 1], 0.5) }).draw(terrain.backGround.mesh);
    gl.translate(0, 0, -100);
    shaders.ground.uniforms({ color: mixWithBG([0.85, 0.6, 0.6, 1], 0.7) }).draw(terrain.backGround2.mesh);
    gl.translate(0, 0, -100);
    shaders.ground.uniforms({ color: mixWithBG([0.85, 0.6, 0.6, 1], 0.9) }).draw(terrain.backGround3.mesh);

    for(var i = 0; i < 1; i += 0.1) {
        gl.translate(0, -33, -10);
        shaders.ground.uniforms({ color: mixWithBG([1.0, 1.0, 1.0, 1.0], i) }).draw(terrain.sky.mesh);
    }
}

function setupRender() {
    gl.canvas.width = 800;
    gl.canvas.height = 600;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.matrixMode(gl.PROJECTION);
    gl.loadIdentity();
    gl.perspective(45, gl.canvas.width / gl.canvas.height, 0.1, 1000);
    gl.matrixMode(gl.MODELVIEW);
    gl.enable(gl.DEPTH_TEST);
}