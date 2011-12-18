var bg = [0.50, 0.60, 1.0, 1.0];
function mixWithBG(color, m) {
    return [
        mix(color[0], bg[0], m), 
        mix(color[1], bg[1], m), 
        mix(color[2], bg[2], m), 
        mix(color[3], bg[3], m)
    ];
}

var oldAcceleration = 5;
function render() {
    toggleAlpha(false);
    gl.clearColor(bg[0], bg[1], bg[2], bg[3]);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    placeCamera();
    gl.translate(-carState.x, -carState.y, 0);

    var terrainColor = [0.8, 0.4, 0.3, 1];
    shaders.terrainNormals.uniforms({ color: terrainColor }).draw(terrain.groundDepth.mesh);
    shaders.terrain.uniforms({ color: terrainColor }).draw(terrain.ground.mesh);
    for(var i = 0; i < terrain.wells.length; i++) {
        placeCamera();
        var pos = terrain.wells[i];
        gl.translate(pos - carState.x, terrain.ground.height[pos] - carState.y, -5);
        shaders.car.draw(terrain.wellMesh);
        shaders.fuel.uniforms({ amount: 1.0 }).draw(terrain.wellFuelMesh);
    }

    placeCamera();
    gl.translate(-carState.x, -carState.y, 0);

    gl.translate(0, 0, -100);
    shaders.terrain.uniforms({ color: mixWithBG(terrainColor, 0.5) }).draw(terrain.backGround.mesh);
    gl.translate(0, 0, -100);
    shaders.terrain.uniforms({ color: mixWithBG(terrainColor, 0.7) }).draw(terrain.backGround2.mesh);
    gl.translate(0, 0, -100);
    shaders.terrain.uniforms({ color: mixWithBG(terrainColor, 0.9) }).draw(terrain.backGround3.mesh);

    for(var i = 0; i < 1; i += 0.1) {
        gl.translate(0, -33, -10);
        shaders.terrain.uniforms({ color: mixWithBG([1.0, 1.0, 1.0, 1.0], i) }).draw(terrain.sky.mesh);
    }
    
    placeCamera();
    gl.translate(0, 5 + 0.25 * Math.sin(carState.time * 5), -5.0);
    toggleAlpha(true);
    var trailSize = (Math.random() * 0.25 + 0.5);
    if(carState.accelerate) trailSize *= 10;
    else if(carState.brake) trailSize *= -10;

    shaders.trail.uniforms({ speed: trailSize }).draw(car.trailMesh);

    var downTrailSize =  (Math.random() * 0.25 + 1.75);
    if(carState.fuelAmount > 0.01) 
        shaders.downTrail.uniforms({ speed: downTrailSize }).draw(car.trailMesh);

    toggleAlpha(false);
    shaders.car.uniforms({ speed: carState.speed }).draw(car.mesh);

    gl.translate(0, -0.7, 0);    
    shaders.fuelGuage.draw(car.fuelGuage);

    gl.translate(0, 0.1, 0);
    if(carState.fuelAmount > 0.01) {
        shaders.fuel.uniforms({ amount: carState.fuelAmount }).draw(car.fuel);
    }
}

function toggleAlpha(on) {
    if(on) {
        gl.enable(gl.ALPHA);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA)
        gl.disable(gl.DEPTH_TEST);
    }
    else {
        gl.disable(gl.ALPHA);
        gl.disable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);    
    }
}

function placeCamera() {
    var tilt = carState.speed / 8 + 15;
    gl.loadIdentity();
    gl.rotate(tilt, 0, 1, 0);
    gl.rotate(5, 1, 0, 0);
    gl.translate(tilt, -20, -50);
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