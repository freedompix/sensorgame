//  ███╗   ███╗███████╗ █████╗ ████████╗██████╗  █████╗ ██╗     ██╗     ███████╗
//  ████╗ ████║██╔════╝██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗██║     ██║     ██╔════╝
//  ██╔████╔██║█████╗  ███████║   ██║   ██████╔╝███████║██║     ██║     ███████╗
//  ██║╚██╔╝██║██╔══╝  ██╔══██║   ██║   ██╔══██╗██╔══██║██║     ██║     ╚════██║
//  ██║ ╚═╝ ██║███████╗██║  ██║   ██║   ██████╔╝██║  ██║███████╗███████╗███████║
//  ╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝
//                                                                              



window.addEventListener('DOMContentLoaded', function () {
  // scene.debugLayer.show();
});



// Do stuff with the new orientation data
window.addEventListener("deviceorientation", handleOrientation, true);
function handleOrientation(event) {
  absolute = event.absolute;
  alpha = event.alpha;
  beta = event.beta;
  gamma = event.gamma;


}


var absolute;
var alpha;
var beta;
var gamma;

window.tomatoloaded;
window.generated = 0;
window.sceneReadyForRebuildFlag = 0;


window.particleSystem = null;
window.particleSystem2 = null;

var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

//var tomatoloaded;
//window.pointsEnableFlag=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
window.pointsEnableFlag = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
window.pauseTimer = 0;
window.pauseTimerStartTime = new Date().getTime();
console.log(window.pauseTimerStartTime);
//////// mouse module
var cursorX = 50;
var cursorY = 50;
var cursorMouseX = 50;
var cursorMouseY = 50;
var cursorDeltaX = 0;
var cursorDeltaY = 0;
//////
var cursorCanvasX;
var cursorCanvasY;
///
var cursorSpeed = 1; //change to % of screen
var cursorMaxSpeed = 10; //change to % of screen
///



//#



function archetypeMouseProcessing(e) {
  window.cursorMouseX = e.pageX / window.innerWidth * 100;
  window.cursorMouseY = e.pageY / window.innerHeight * 100;
  ////control inversion
  window.cursorMouseX = Math.abs(100 - window.cursorMouseX);
  window.cursorMouseY = Math.abs(100 - window.cursorMouseY);
  //console.log(window.cursorMouseY+ ' 4');
}
document.addEventListener("mousemove", archetypeMouseProcessing);
/////////

//##PARAMETRS
var createScene = function () {
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.FreeCamera("Camera2", new BABYLON.Vector3(0, 0, -5), scene);


  // camera.attachControl(canvas, true);
  //camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius;
  scene.activeCamera = camera;
  scene.clearColor = new BABYLON.Color3(0.9, 0.7, 0.7);

  //var motionblur = new BABYLON.MotionBlurPostProcess("mb",scene,1.0,camera );  


  new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
  new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
  new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 11, -1), scene);
  //  new BABYLON.MeshBuilder.CreatePlane("plane", {height:2, width: 1, sideOrientation: BABYLON.Mesh.DOUBLESIDE},scene);


  new BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 0.25 }, scene);

  var hl = new BABYLON.HighlightLayer("hl1", scene);
  //hl.addMesh(scene.getMeshByID('sphere'),BABYLON.Color3.White());

  //var material = new BABYLON.StandardMaterial("material", scene);
  //material.diffuseColor = new BABYLON.Color3(0.7, 0.3, 0.3);


  //texture
  var material = new BABYLON.PBRMaterial("material", scene);
  material.albedoColor = new BABYLON.Color3(0.7, 0.3, 0.3); //
  material.reflectivityColor = new BABYLON.Color3(0.003, 0.003, 0.003);
  material.albedoTexture = new BABYLON.Texture("https://freedompix.github.io/gpt3_ru_gate/meat_texture.jpg", scene);


  //material.emissiveTexture = new BABYLON.Texture("textures/top_light.png", scene);
  material.emissiveColor = new BABYLON.Color3(0.1, 0, 0);
  material.bumpTexture = new BABYLON.Texture("https://freedompix.github.io/gpt3_ru_gate/meat_texture.jpg", scene);


  material.albedoTexture.uScale = 3.0;
  material.albedoTexture.vScale = 3.0;
  material.bumpTexture.uScale = 3.0;
  material.bumpTexture.vScale = 3.0;

  scene.getMeshByID("sphere").material = material;

  window.particleSystem = new BABYLON.ParticleSystem("particles", 2000);
  window.particleSystem.particleTexture = new BABYLON.Texture("https://freedompix.github.io/gpt3_ru_gate/particle_meat_texture3.png");
  window.particleSystem.emitter = new BABYLON.Vector3(0, 0, 0);
  window.particleSystem.minSize = 0.02;
  window.particleSystem.maxSize = 0.5;
  window.particleSystem.minLifeTime = 0.1;
  window.particleSystem.maxLifeTime = 0.1;
  window.particleSystem.gravity = new BABYLON.Vector3(0, 0, -3.0);
  window.particleSystem.direction1 = new BABYLON.Vector3(0, 0, -2);
  window.particleSystem.direction2 = new BABYLON.Vector3(0, 0, 0);
  window.particleSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0); // Starting all from
  window.particleSystem.maxEmitBox = new BABYLON.Vector3(0, 0, 0);
  //window.particleSystem.textureMask = new BABYLON.Color4(0.1, 0.8, 0.8, 1.0);

  window.particleSystem.emitter = scene.getMeshByID("sphere").position.clone();
  window.particleSystem.color1 = new BABYLON.Color4(0.5, 0.0, 0.0, 0.3);
  window.particleSystem.color2 = new BABYLON.Color4(0.5, 0.0, 0.0, 0.3);
  window.particleSystem.colorDead = new BABYLON.Color4(0.9, 0.0, 0.0, 0.0);
  window.particleSystem.emitRate = 340;
  window.particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
  window.particleSystem.start();




  // Create a particle system

  window.particleSystem2 = new BABYLON.ParticleSystem("particles2", 2000, scene);

  window.particleSystem2.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;


  //Texture of each particle
  window.particleSystem2.particleTexture = new BABYLON.Texture("https://freedompix.github.io/gpt3_ru_gate/brust.png", scene);

  // Where the particles come from
  window.particleSystem2.emitter = scene.getMeshByName('sphere').position.clone(); // the starting object, the emitter
  window.particleSystem2.minEmitBox = new BABYLON.Vector3(-0.1, 0.1, -0, 10); // Starting all from
  window.particleSystem2.maxEmitBox = new BABYLON.Vector3(0.1, -0.1, -1, 10); // To...

  // Colors of all particles
  window.particleSystem2.color1 = new BABYLON.Color4(1, 0, 0, 1.0);
  window.particleSystem2.color2 = new BABYLON.Color4(1, 0.3, 0.3, 0.3);
  window.particleSystem2.colorDead = new BABYLON.Color4(1, 0, 0, 0.0);

  // Size of each particle (random between...
  window.particleSystem2.minSize = 0.01;
  window.particleSystem2.maxSize = 0.4;

  // Life time of each particle (random between...
  window.particleSystem2.minLifeTime = 1;
  window.particleSystem2.maxLifeTime = 4;

  // Emission rate
  window.particleSystem2.emitRate = 60;

  // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
  // particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

  // Set the gravity of all particles


  // Direction of each particle after it has been emitted
  window.particleSystem2.direction1 = new BABYLON.Vector3(0.1, 0.01, -0.01);
  window.particleSystem2.direction2 = new BABYLON.Vector3(-0.1, 0, -0.20);
  window.particleSystem2.gravity = new BABYLON.Vector3(0.0, -0.01, -0.01);

  window.particleSystem2.targetStopDuration = 1;
  // Angular speed, in radians
  window.particleSystem2.minAngularSpeed = 0;
  window.particleSystem2.maxAngularSpeed = Math.PI;

  // Speed
  window.particleSystem2.minEmitPower = 15;
  window.particleSystem2.maxEmitPower = 25;
  window.particleSystem2.updateSpeed = 0.05;









  return scene;
};

var scene = createScene();
//scene.debugLayer.show();

BABYLON.AbstractMesh.prototype.moveTo = function (targetPos, speed) {
  var ease = new BABYLON.CubicEase();
  ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
  BABYLON.Animation.CreateAndStartAnimation('at5', this, 'position', speed, 60, this.position, targetPos, 0, ease);
};
BABYLON.AbstractMesh.prototype.backTogame = function () {
  let speed = 100;
  let targetPos = -0.1;
  let ease = new BABYLON.CubicEase();
  ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
  BABYLON.Animation.CreateAndStartAnimation('animation' + Math.random(), this, 'position.z', speed, 60, this.position.z, targetPos, 0, ease);
  console.log('animation done');
};
BABYLON.AbstractMesh.prototype.pointDestroy = function () {
  let speed = 500;
  let targetPos = -0.1;
  let ease = new BABYLON.CubicEase();
  ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
  BABYLON.Animation.CreateAndStartAnimation('animation' + Math.random(), this, 'position.z', speed, 60, -0.05, 0.2, 0, ease);
  console.log('animation deleting done');
};






function generateSceneSituation()
{
  //scene.getMeshByName['tomato0'].position = new BABYLON.Vector3(0, 0, -1);  
  //  console.log(scene.getMeshByID['tomato0']);
}
function generateSceneSituation2()
{
  var points = [];
  ///reset
  for (let i = 0; i < 16; i++)
  {
    //points[i] = scene.getMeshByName["tomato"+i];  
    //
  }
  //points[1] = scene.getMeshByName["tomato"+1];  

  let resetDefaultPosition = 1;
  scene.getMeshByName["tomato0"].position = new BABYLON.Vector3(0, 0, resetDefaultPosition);
  scene.getMeshByName["tomato1"].position = new BABYLON.Vector3(-0.6, 0.6, resetDefaultPosition);
  scene.getMeshByName["tomato2"].position = new BABYLON.Vector3(-0.3, 0.3, resetDefaultPosition);
  scene.getMeshByName["tomato3"].position = new BABYLON.Vector3(0, 0.9, resetDefaultPosition);
  scene.getMeshByName["tomato4"].position = new BABYLON.Vector3(0, 0.45, resetDefaultPosition);
  scene.getMeshByName["tomato5"].position = new BABYLON.Vector3(0.6, 0.6, resetDefaultPosition);
  scene.getMeshByName["tomato6"].position = new BABYLON.Vector3(0.3, 0.3, resetDefaultPosition);
  scene.getMeshByName["tomato7"].position = new BABYLON.Vector3(-0.45, 0, resetDefaultPosition);
  scene.getMeshByName["tomato8"].position = new BABYLON.Vector3(-0.9, 0, resetDefaultPosition);
  scene.getMeshByName["tomato9"].position = new BABYLON.Vector3(0.45, 0, resetDefaultPosition);
  scene.getMeshByName["tomato10"].position = new BABYLON.Vector3(0.9, 0, resetDefaultPosition);
  scene.getMeshByName["tomato11"].position = new BABYLON.Vector3(0, -0.45, resetDefaultPosition);
  scene.getMeshByName["tomato12"].position = new BABYLON.Vector3(0, -0.9, resetDefaultPosition);
  scene.getMeshByName["tomato13"].position = new BABYLON.Vector3(0.6, -0.6, resetDefaultPosition);
  scene.getMeshByName["tomato14"].position = new BABYLON.Vector3(0.3, -0.3, resetDefaultPosition);
  scene.getMeshByName["tomato15"].position = new BABYLON.Vector3(-0.6, -0.6, resetDefaultPosition);
  scene.getMeshByName["tomato16"].position = new BABYLON.Vector3(-0.3, -0.3, resetDefaultPosition);

  totalPoints = 1 + Math.round(Math.random() * 5);

  for (let i = 0; i < totalPoints.lenght; i++) {
    let actualIndex = Math.round(Math.random() * 16);
    scene.getElementByID["tomato" + i].position.z = -1;

  }
}




//  
var ground = BABYLON.SceneLoader.ImportMesh("", "https://freedompix.github.io/gpt3_ru_gate/", "noodles2.glb", scene, function (importedMeshes) {
  let imported = importedMeshes[0].clone('ground');
  scene.removeMesh(importedMeshes[0]);
  importedMeshes[0].dispose();
  imported.flipFaces(true);
  imported.rotation = new BABYLON.Vector3(-Math.PI / 2, 0, 0);
  imported.position = new BABYLON.Vector3(0, 0, 0.2);
  imported.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);



});
var tomato = BABYLON.SceneLoader.ImportMesh("", "https://freedompix.github.io/gpt3_ru_gate/", "tomato4.glb", scene, function (importedMeshes) {
  // alert(1);  
  //importedMeshes[0].scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);  
  //importedMeshes[0].rotation = new BABYLON.Vector3(Math.PI/2, 0.0, 0.0);   

  let topZ = -0.1;
  topZ = 0.2;

  let imported = importedMeshes[0].clone('tomato0');
  scene.removeMesh(importedMeshes[0]);
  importedMeshes[0].dispose();
  imported.flipFaces(true);
  imported.rotation = new BABYLON.Vector3(-Math.PI / 2, 0, 0);
  imported.position = new BABYLON.Vector3(0, 0, topZ);
  imported.scaling = new BABYLON.Vector3(0.0007, 0.0007, 0.0007);

  ///highlight  
  //let hl=scene.getHighlightLayerByName('hl1');
  //hl.addMesh(scene.getMeshByName('tomato.RootNode (gltf orientation matrix).RootNode (model correction matrix).6ce19d8d33f34e74b05ffabace843d67.fbx.RootNode.Sphere.Sphere_Mat.1_0'),BABYLON.Color3.Green());

  let clone2 = [];
  for (let i = 1; i < 17; i++)
  {
    clone2[i] = imported.clone('tomato' + i);
  }
  //clone2[0].position = new BABYLON.Vector3(1+(i*0.1), 0, topZ);  

  clone2[1].position = new BABYLON.Vector3(-0.6, 0.6, topZ);
  clone2[2].position = new BABYLON.Vector3(-0.3, 0.3, topZ);
  clone2[3].position = new BABYLON.Vector3(0, 0.9, topZ);
  clone2[4].position = new BABYLON.Vector3(0, 0.45, topZ);
  clone2[5].position = new BABYLON.Vector3(0.6, 0.6, topZ);
  clone2[6].position = new BABYLON.Vector3(0.3, 0.3, topZ);
  clone2[7].position = new BABYLON.Vector3(-0.45, 0, topZ);
  clone2[8].position = new BABYLON.Vector3(-0.9, 0, topZ);
  clone2[9].position = new BABYLON.Vector3(0.45, 0, topZ);
  clone2[10].position = new BABYLON.Vector3(0.9, 0, topZ);
  clone2[11].position = new BABYLON.Vector3(0, -0.45, topZ);
  clone2[12].position = new BABYLON.Vector3(0, -0.9, topZ);
  clone2[13].position = new BABYLON.Vector3(0.6, -0.6, topZ);
  clone2[14].position = new BABYLON.Vector3(0.3, -0.3, topZ);
  clone2[15].position = new BABYLON.Vector3(-0.6, -0.6, topZ);
  clone2[16].position = new BABYLON.Vector3(-0.3, -0.3, topZ);

  window.tomatoloaded = 1;
});



////RUN

engine.runRenderLoop(function () {
  window.pauseTimer = new Date().getTime() - window.pauseTimerStartTime;

  //console.log(cursorSpeed); 

  //cursorMaxSpeed;  

  window.cursorDeltaX = window.cursorMouseX - window.cursorX;
  window.cursorDeltaY = window.cursorMouseY - window.cursorY;


  //console.log(cursorDeltaX); 

  //if((Math.abs(window.cursorDeltaX)/3)<cursorMaxSpeed*0,1; )  

  //window.cursorX=window.cursorX+(Math.sign(window.cursorDeltaX)*0.2);
  //window.cursorY=window.cursorY+(Math.sign(window.cursorDeltaY)*0.2);  
  window.cursorX = window.cursorX + window.cursorDeltaX * 0.02;
  window.cursorY = window.cursorY + window.cursorDeltaY * 0.02;

  var deltaX = (window.cursorX - 50) * 0.2 * ((window.cursorX - 50) * 0.2) * 0.02;
  var deltaY = (window.cursorY - 50) * 0.2 * ((window.cursorY - 50) * 0.2) * 0.02;
  let cordZeroX = (window.cursorX - 50) / 50;
  let cordZeroY = (window.cursorY - 50) / 50;



  if (gamma > 0 || gamma < 0 || gamma == 0) {
    //betta *
    cordZeroX = gamma * -0.03;
    console.log(gamma);
  }

  if (beta > 0 || beta < 0 || beta == 0) {
    //betta *
    cordZeroY = beta * -0.03;
    console.log(beta);
  }



  //scene.activeCamera.position.x=sceneVecCord*0.1;
  //if(window.cursorX<50)
  //scene.activeCamera.rotation.y=0+cordZeroX*0.2; 
  //else scene.activeCamera.rotation.y=0+cordZeroX*0.2;

  scene.activeCamera.rotation.y = 0 + cordZeroX * 0.5;
  scene.activeCamera.rotation.x = 0 + cordZeroY * 0.5;
  scene.activeCamera.position.x = 0 + cordZeroX * 1 * 1 * -2.0;
  scene.activeCamera.position.y = 0 + cordZeroY * 1 * 1 * 2.0;



  if (Math.sqrt(Math.abs(cordZeroX * cordZeroX) + Math.abs(cordZeroY * cordZeroY)) < 0.5) {
    scene.getMeshByID('sphere').position.x = -2 * cordZeroX;
    scene.getMeshByID('sphere').position.y = 2 * cordZeroY;

    //scene.getMeshByID('sphere').moveTo(new BABYLON.Vector3(cordZeroX*1,cordZeroY*1,-1.1),10);

    //  console.log(cordZeroX+ ' - ' +scene.getMeshByID('sphere').position.x);
    scene.getMeshByID('sphere').position.z = -0.1 + (Math.abs(cordZeroX) + Math.abs(cordZeroY)) * 0.15;
  }

  if (Math.sqrt(Math.abs(cordZeroX * cordZeroX) + Math.abs(cordZeroY * cordZeroY)) > 0.5) {
    let propotion = Math.sqrt(Math.abs(cordZeroX * cordZeroX) + Math.abs(cordZeroY * cordZeroY)) / 0.5;
    let newX = cordZeroX / propotion;
    let newY = cordZeroY / propotion;
    scene.getMeshByID('sphere').position.x = -2 * newX;
    scene.getMeshByID('sphere').position.y = 2 * newY;
    //scene.getMeshByID('sphere').position.z=-0.1+((Math.abs(cordZeroX)+Math.abs(cordZeroY))*0.15);  
  }



  scene.getMeshByID('sphere').rotation.x = cordZeroY * 7;
  scene.getMeshByID('sphere').rotation.y = cordZeroX * 7;



  //console.log(cordZeroX + " " +cordZeroY);  
  const zoomLevel = -5;

  scene.activeCamera.position.z = zoomLevel + Math.abs((Math.abs(cordZeroX) + Math.abs(cordZeroY)) * 0.5);



  //scene.getCameraByID('Camera2').rotationZ=1;
  //console.log(scene.activeCamera.rotation.y);
  //console.log(scene.getCameraByID('Camera2').rotation.y);

  // 

  window.particleSystem.emitter = scene.getMeshByID("sphere").position.clone();
  //window.particleSystem.emitter.z=-5;





  //####CHECK STATE  
  //points check


  if (window.tomatoloaded == 1) {

    //check all points  
    var flag = 0;
    for (let i = 0; i <= 16; i++)
    {

      if (
      Math.abs(scene.getMeshByName('tomato' + i).position.x - scene.getMeshByName('sphere').position.x) < 0.15 &&

      Math.abs(scene.getMeshByName('tomato' + i).position.y - scene.getMeshByName('sphere').position.y) < 0.15 &&

      window.pointsEnableFlag[i] == 0 &&

      scene.getMeshByName('tomato' + i).position.z < -0.08)
      {




        ///##DESTROYING  
        window.pauseTimerStartTime = new Date().getTime();
        window.pauseTimer = 0;
        window.particleSystem2.emitter = scene.getMeshByName('tomato' + i).position.clone();
        window.particleSystem2.start();
        scene.getMeshByName('tomato' + i).pointDestroy(); //

        //scene.getMeshByName('tomato'+i).position.z=0.5;//  simple destroying   

        window.pointsEnableFlag[i] = 1;
        console.log(window.pointsEnableFlag); //loging active points




      }
      if (window.pointsEnableFlag[i] == 0)
      {
        flag = 1;
      }
    } //end checking  


    ///initial 
    console.log(window.pauseTimer);

    if (flag == 0 && window.pauseTimer > 2000) // && window.sceneReadyForRebuildFlag==0
      {
        //  /$$$$$$   /$$$$$$  /$$      /$$ /$$$$$$$$
        // /$$__  $$ /$$__  $$| $$$    /$$$| $$_____/
        //| $$  \__/| $$  \ $$| $$$$  /$$$$| $$      
        //| $$ /$$$$| $$$$$$$$| $$ $$/$$ $$| $$$$$   
        //| $$|_  $$| $$__  $$| $$  $$$| $$| $$__/   
        //| $$  \ $$| $$  | $$| $$\  $ | $$| $$      
        //|  $$$$$$/| $$  | $$| $$ \/  | $$| $$$$$$$$
        // \______/ |__/  |__/|__/     |__/|________/  
        ///initial 

        function drawPoints(array)
        {
          for (let i = 0; i < array.length; i++)
          {
            scene.getMeshByName('tomato' + array[i]).backTogame();
            window.pointsEnableFlag[array[i]] = 0;
          }
        }


        drawPoints(new Array(2, 11, 9));
        console.log(window.pointsEnableFlag);

        window.sceneReadyForRebuildFlag = 1;

        // generateSceneSituation()
        console.log("All points terminated!");
        // scene.getMeshByName('tomato5').position.z=-1;

        //  scene.getMeshByName('tomato4').backTogame();
        //  scene.getMeshByName('tomato2').backTogame(); 
        // window.pointsEnableFlag[4]=0;
        // window.pointsEnableFlag[2]=0;   




      }


  }












  if (window.tomatoloaded == 1 && window.generated == 0) {
    console.log("init");
    //generateSceneSituation(); 
    //var h2 = new BABYLON.HighlightLayer("hl2", scene);
    //h2.addMesh(scene.getMeshByID('tomato'),BABYLON.Color3.White()); 
    window.generated = 1;
  }
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});




//window.requestAnimationFrame(animate);