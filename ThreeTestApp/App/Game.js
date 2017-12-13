(function () {

    var app = angular.module("Game", []);

    app.controller("GameController", function ($scope, $http) {

        LoadMaterials = function(data)
        {
            alert("loading materials")

            for (var s = 0; s < data.length; s++) {

                var material = new THREE.ShaderMaterial({
                    vertexShader: data[s].vert,
                    fragmentShader: data[s].frag,
                    name: data[s].name,
                    uniforms:
                    {
                        "uVec3": { type: "v3", value: new THREE.Vector3(1, 0, 0) }    // single Vector3
                    }
                });

                $scope.materials.push(material);
                debugger;
            }

            $scope.doRender = true;

            SetupWebGL();
        }

        GetMaterials = function () {
            $http({
                url: '/Game/GetMaterials',
                method: "GET",
            }).then(function (response) {

                LoadMaterials(angular.fromJson(response.data));

            });
        }

        SetupWebGL = function()
        {
            $scope.scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

            var renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            var geometry = new THREE.BoxGeometry(1, 1, 1);
            //var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

            var cube = new THREE.Mesh(geometry, $scope.materials[0]);
            debugger;
            $scope.scene.add(cube);
            console.log($scope.materials[0]);
            camera.position.z = 5;

            //Setup mouse listener

            var animate = function () {
                requestAnimationFrame(animate);

                    //cube.rotation.x += 0.1;
                    //cube.rotation.y += 0.1;

                    cube.material.uniforms.uVec3.value.add(new THREE.Vector3(0.001, 0.001, 0));

                    renderer.render($scope.scene, camera);
                
            };

            animate();
        }


        var onMouseClick = function (event) {
            event.preventDefault();

            var mouseX = event.clientX;
            var mouseY = event.clientY;

            alert(mouseX + " , " +mouseY)
        }

        $scope.init = function()
        {
            //Add custom mousedown event to this document
            document.addEventListener('mousedown', onMouseClick, false);

            $scope.doRender = false;
            $scope.materials = [];

            GetMaterials();


        }



    });



}());