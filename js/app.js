/*
 * Copyright 2013 George McKinney
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 
 * References:
 * - "Mobile Augmented Reality with HTML5 on BlackBerry 10"
 *   http://www.georgemckinney.com/2013/05/mobile-augmented-reality-with-
 *   html5-on-blackberry-10
 * 
 * - See http://inmensia.com/files/aruco/debug-posit/debug-posit.html for
 *   Google Chrome Browser Original  
 *
 * - See http://hosting.desire2learncapture.com/RIM/1/watch/114.aspx for
 *   Justin Lee, Christopher Saunders 
 *   JAM834 - Web API Deep Dive: Multimedia Playback, Streaming and Camera
 *
*/

            var canvas, context, imageData, detector, posit;
            var renderer1, renderer2, renderer3;
            var scene1, scene2, scene3, scene4;
            var camera1, camera2, camera3, camera4;
            var plane1, plane2, model, texture;
            var step = 0.0;
            var modelSize = 35.0; //millimeters   
            var video = document.querySelector('video');
                
              
                
              canvas = document.getElementById("canvas");
              context = canvas.getContext("2d");
            
              canvas.width = parseInt(canvas.style.width);
              canvas.height = parseInt(canvas.style.height);
            
            
            
              detector = new AR.Detector();
              posit = new POS.Posit(modelSize, canvas.width);
        
              createRenderers();
              createScenes();
        
              requestAnimationFrame(tick);
                
                
                

            function onFailSoHard(ex) {
                console.log(ex);
            }
            
            function tick(){
              requestAnimationFrame(tick);
              
              if (video.readyState === video.HAVE_ENOUGH_DATA){
                snapshot();
        
                var markers = detector.detect(imageData);
                drawCorners(markers);
                updateScenes(markers);
                
                render();
              }
            };

            function snapshot(){
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            };
    
            function drawCorners(markers){
              var corners, corner, i, j;
            
              context.lineWidth = 3;
        
              for (i = 0; i < markers.length; ++ i){
                corners = markers[i].corners;
                
                context.strokeStyle = "red";
                context.beginPath();
                
                for (j = 0; j < corners.length; ++ j){
                  corner = corners[j];
                  context.moveTo(corner.x, corner.y);
                  corner = corners[(j + 1) % corners.length];
                  context.lineTo(corner.x, corner.y);
                }
        
                context.stroke();
                context.closePath();
                
                context.strokeStyle = "green";
                context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
              }
            };
        
            function createRenderers(){
              renderer1 = new THREE.WebGLRenderer();
              renderer1.setClearColorHex(0xffffff, 1);
              renderer1.setSize(canvas.width, canvas.height);
              document.getElementById("container1").appendChild(renderer1.domElement);
              scene1 = new THREE.Scene();
              camera1 = new THREE.PerspectiveCamera(40, canvas.width / canvas.height, 1, 1000);
              scene1.add(camera1);
        
              renderer2 = new THREE.WebGLRenderer();
              renderer2.setClearColorHex(0xffffff, 1);
              renderer2.setSize(canvas.width, canvas.height);
              document.getElementById("container2").appendChild(renderer2.domElement);
              scene2 = new THREE.Scene();
              camera2 = new THREE.PerspectiveCamera(40, canvas.width / canvas.height, 1, 1000);
              scene2.add(camera2);
        
              renderer3 = new THREE.WebGLRenderer();
              renderer3.setClearColorHex(0xffffff, 1);
              renderer3.setSize(canvas.width, canvas.height);
              document.getElementById("container").appendChild(renderer3.domElement);
              
              scene3 = new THREE.Scene();
              camera3 = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5);
              scene3.add(camera3);
              
              scene4 = new THREE.Scene();
              camera4 = new THREE.PerspectiveCamera(40, canvas.width / canvas.height, 1, 1000);
              scene4.add(camera4);
            };
        
            function render(){
              renderer1.clear();
              renderer1.render(scene1, camera1);
              
              renderer2.clear();
              renderer2.render(scene2, camera2);
        
              renderer3.autoClear = false;
              renderer3.clear();
              renderer3.render(scene3, camera3);
              renderer3.render(scene4, camera4);
            };
        
            function createScenes(){
              //plane1 = createPlane();
              //scene1.add(plane1);
        
              //plane2 = createPlane();
              //scene2.add(plane2);
              
              texture = createTexture();
              scene3.add(texture);
            
              model = createModel();
              scene4.add(model);
            };
            
            function createPlane(){
              var object = new THREE.Object3D(),
                  geometry = new THREE.PlaneGeometry(1.0, 1.0, 0.0),
                  material = new THREE.MeshNormalMaterial(),
                  mesh = new THREE.Mesh(geometry, material);
              
              object.add(mesh);
              
              return object;
            };
            
            function createTexture(){
              var texture = new THREE.Texture(video),
                  object = new THREE.Object3D(),
                  geometry = new THREE.PlaneGeometry(1.0, 1.0, 0.0),
                  material = new THREE.MeshBasicMaterial( {map: texture, depthTest: false, depthWrite: false} ),
                  mesh = new THREE.Mesh(geometry, material);
              
              object.position.z = -1;
              
              object.add(mesh);
              
              return object;
            };
            
            function createModel(){
              var object = new THREE.Object3D(),
                  geometry = new THREE.SphereGeometry(0.5, 15, 15, Math.PI),
                  texture = THREE.ImageUtils.loadTexture("textures/earth.jpg"),
                  material = new THREE.MeshBasicMaterial( {map: texture} ),
                  mesh = new THREE.Mesh(geometry, material);
              
              object.add(mesh);
              
              return object;
            };
        
            function updateScenes(markers){
              var corners, corner, pose, i;
              
              if (markers.length > 0){
                corners = markers[0].corners;
                
                for (i = 0; i < corners.length; ++ i){
                  corner = corners[i];
                  
                  corner.x = corner.x - (canvas.width / 2);
                  corner.y = (canvas.height / 2) - corner.y;
                }
                
                pose = posit.pose(corners);
                
                //updateObject(plane1, pose.bestRotation, pose.bestTranslation);
                //updateObject(plane2, pose.alternativeRotation, pose.alternativeTranslation);
                updateObject(model, pose.bestRotation, pose.bestTranslation);
        
                updatePose("pose1", pose.bestError, pose.bestRotation, pose.bestTranslation);
                updatePose("pose2", pose.alternativeError, pose.alternativeRotation, pose.alternativeTranslation);
                
                step += 0.025;
                
                model.rotation.z -= step;
              }
              
              texture.children[0].material.map.needsUpdate = true;
            };
            
            function updateObject(object, rotation, translation){
              object.scale.x = modelSize;
              object.scale.y = modelSize;
              object.scale.z = modelSize;
              
              object.rotation.x = -Math.asin(-rotation[1][2]);
              object.rotation.y = -Math.atan2(rotation[0][2], rotation[2][2]);
              object.rotation.z = Math.atan2(rotation[1][0], rotation[1][1]);
        
              object.position.x = translation[0];
              object.position.y = translation[1];
              object.position.z = -translation[2];
            };
            
            function updatePose(id, error, rotation, translation){
              var yaw = -Math.atan2(rotation[0][2], rotation[2][2]);
              var pitch = -Math.asin(-rotation[1][2]);
              var roll = Math.atan2(rotation[1][0], rotation[1][1]);
              
              var d = document.getElementById(id);
              /*
              d.innerHTML = " error: " + error
                          + "<br/>"
                          + " x: " + (translation[0] | 0)
                          + " y: " + (translation[1] | 0)
                          + " z: " + (translation[2] | 0)
                          + "<br/>"
                          + " yaw: " + Math.round(-yaw * 180.0/Math.PI)
                          + " pitch: " + Math.round(-pitch * 180.0/Math.PI)
                          + " roll: " + Math.round(roll * 180.0/Math.PI);
              */
            };
            
            
            
        
                navigator.getUserMedia = navigator.getUserMedia||navigator.webkitGetUserMedia||false;
            
                if(!!navigator.getUserMedia) {
                    navigator.getUserMedia({audio: true, video: true}, function(stream) {
                        var video = document.querySelector('video');
                        video.src = ('webkitURL' in window)?window.webkitURL.createObjectURL(stream):stream;
                    }, onFailSoHard);
                } else {
                    alert("not supported"); // fallback.
                }