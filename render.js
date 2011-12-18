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

    placeCamera();
    gl.translate(-car.x, -car.y, 0);

    var terrainColor = [0.85, 0.6, 0.6, 1];
    shaders.ground.uniforms({ color: terrainColor }).draw(terrain.ground.mesh);
    gl.translate(0, 0, -100);
    shaders.ground.uniforms({ color: mixWithBG(terrainColor, 0.5) }).draw(terrain.backGround.mesh);
    gl.translate(0, 0, -100);
    shaders.ground.uniforms({ color: mixWithBG(terrainColor, 0.7) }).draw(terrain.backGround2.mesh);
    gl.translate(0, 0, -100);
    shaders.ground.uniforms({ color: mixWithBG(terrainColor, 0.9) }).draw(terrain.backGround3.mesh);

    for(var i = 0; i < 1; i += 0.1) {
        gl.translate(0, -33, -10);
        shaders.ground.uniforms({ color: mixWithBG([1.0, 1.0, 1.0, 1.0], i) }).draw(terrain.sky.mesh);
    }
    
    placeCamera();
    gl.translate(0, 1.5, 0);
    gl.enable(gl.ALPHA);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA)
    gl.disable(gl.DEPTH_TEST);
    var trailSize = (Math.random() * 0.25 + 0.5);
    if(carState.accelerate) trailSize *= 3;
    else if(carState.brake) trailSize *= -3;

    shaders.trail.uniforms({ speed: trailSize }).draw(car.trailMesh);

    var downTrailSize =  (Math.random() * 0.5 + 0.5) * 1.5;
    shaders.downTrail.uniforms({ speed: downTrailSize }).draw(car.trailMesh);
    gl.enable(gl.DEPTH_TEST);

    shaders.car.uniforms({ speed: carState.speed }).draw(car.mesh);
    gl.translate(0, 2.5, 0);
    //shaders.fuelCell.uniforms({ speed: carState.speed }).draw(car.fuelCell);
}

function placeCamera() {
    gl.loadIdentity();
    gl.rotate(Math.min(carState.speed / 5, 30), 0, 1, 0);
    gl.rotate(5, 1, 0, 0);
    gl.translate(Math.min(carState.speed / 5, 100), -20, -75);
}

function setupRender() {
    gl.canvas.width = 800;
    gl.canvas.height = 600;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.matrixMode(gl.PROJECTION);
    gl.loadIdentity();
    gl.perspective(35, gl.canvas.width / gl.canvas.height, 0.1, 1000);
    gl.matrixMode(gl.MODELVIEW);
    gl.enable(gl.DEPTH_TEST);
}