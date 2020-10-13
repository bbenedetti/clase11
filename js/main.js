$ ( document ).ready( function(){
 console.log('DOM listo');

     var scene = new THREE.Scene();
     var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


     var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			$("body").append( renderer.domElement );


      let geometry = new THREE.IcosahedronGeometry( 2.5, 3);
      geometry.computeFlatVertexNormals();
    	var material = new THREE.MeshPhongMaterial( { color: 0xF76330, flatShading:true , transparent:true , opacity:0.8} );
      let bola = new THREE.Mesh( geometry, material );
      scene.add( bola );
      bola.position.z =  -4;

      let geometry_2 = new THREE.IcosahedronGeometry(2.5,3);
      let material_2 = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe:true });
      let bola2 = new THREE.Mesh(geometry_2, material_2);
      scene.add(bola2);
      bola2.position.z =  -4;


      let geometry_3 = new THREE.RingGeometry(3,4);
      let material_3 = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe:true });
      let bola3 = new THREE.Mesh(geometry_3, material_3);
      scene.add(bola3);
      let bola4 = new THREE.Mesh(geometry_3, material_3);
      scene.add(bola4);
      bola3.position.z =  -4;
      bola4.position.z =  -4;

      camera.position.z = 6;
      let contenedor = new THREE.Object3D();
      scene.add( contenedor);

      for ( let i = 0; i < bola.geometry.vertices.length; i++){
        let geometry = new THREE.SphereGeometry(0.1, 0.1);
        let material = new THREE.MeshLambertMaterial({color: 0xf90161});
        let cubo = new THREE.Mesh(geometry, material);
        cubo.position.set(bola.geometry.vertices[i].x , bola.geometry.vertices [i].y, bola.geometry.vertices[i].z);
        contenedor.add(cubo);
        contenedor.position.z =  -4;
      }

     bola.scale.x = 0.6;
     bola.scale.y = 0.6;
     bola.scale.z = 0.6;

     bola4.scale.x = 1.1;
     bola4.scale.y = 1.1;
     bola4.scale.z = 1.1;

     let malla = new THREE.Object3D();
     scene.add( malla);

     let countX = 10;
     let countY = 10;

     for( let i = 0; i < countX; i++){
        for(let j = 0; j < countY; j++){
          for ( let k = 0; k < countZ; k++){
           let geometry = new THREE.MeshLambertMaterial({color:0xFFFFFF});
           let nodo = new THREE.Mesh( geometry, material);
           nodo.position.x = -((countX/2) * 0.5) + (i * 0.5);
           nodo.position.y = -((countY/2) * 0.5) + (j * 0.5);
           nodo.position.z = -((countZ/2) * 0.5) + (k * 0.5);
           malla.add(nodo);
        }
     }
   }


      // var light = new THREE.AmbientLight( 0xFFFFFF); // soft white light
      // scene.add( light );

      var light = new THREE.PointLight( 0xffffff, 1, 100 );
      light.position.set( 0, 0, 4 );
      light.castShadow = true;
      scene.add( light );



      function animate(){
        requestAnimationFrame( animate );

        bola.rotation.y += -0.01;
        bola.rotation.x += -0.01;

        bola2.rotation.y += -0.01;
        bola2.rotation.x += -0.01;

        bola3.rotation.z += -0.006;
        bola4.rotation.z += 0.006;


        for( let i = 0; i < bola.geometry.vertices.length; i++){
            bola.geometry.vertices[i].x += (-0.005 + (Math.random() * 0.01) );
            bola.geometry.vertices[i].y += (-0.005 + (Math.random() * 0.01) );
            bola.geometry.vertices[i].z += (-0.005 + (Math.random() * 0.01) );
        }

     bola.geometry.verticesNeedUpdate = true;


        for( let i = 0; i < contenedor.children.length; i++){
          contenedor.children[i].position.x = bola.geometry.vertices[i].x;
          contenedor.children[i].position.y = bola.geometry.vertices[i].y;
          contenedor.children[i].position.z = bola.geometry.vertices[i].z;

          bola2.geometry.vertices[i].x = bola.geometry.vertices[i].x;
          bola2.geometry.vertices[i].y = bola.geometry.vertices[i].y;
          bola2.geometry.vertices[i].z = bola.geometry.vertices[i].z;

        }

bola2.geometry.verticesNeedUpdate = true;


contenedor.rotation.y += -0.01;
contenedor.rotation.x += -0.01;

malla.rotation.z += -0.01;
     renderer.render (scene, camera);

      };

animate();

});
