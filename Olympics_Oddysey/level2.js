class level2 extends Phaser.Scene {
  constructor() {
    super({ key: "level2" });
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("world2", "assets/Map_2.tmj");

    // Step 2 : Preload any images here
    this.load.image("GymIMG", "assets/8_Gym_32x32.png");
    this.load.image("Room2IMG", "assets/Room_Builder_32x32.png");
    this.load.image("FloorIMG", "assets/TileAndStone.png");

    this.load.spritesheet('gen', 'assets/female-gen.png',{ frameWidth:64, frameHeight:64 });
    this.load.image('paper', 'assets/paper_correct.png');
    this.load.image('paper2', 'assets/paper_correct.png');
    this.load.image('paper3', 'assets/paper_wrong.png');


  } // end of preload //

  create() {
    console.log("animationScene");

    this.anims.create({
      key:'gen-up',
      frames:this.anims.generateFrameNumbers('gen',
      { start:105, end:112 }),
      frameRate:5,
      repeat:-1
  });

  this.anims.create({
      key:'gen-left',
      frames:this.anims.generateFrameNumbers('gen',
      { start:118, end:125 }),
      frameRate:5,
      repeat:-1
  });

  this.anims.create({
      key:'gen-down',
      frames:this.anims.generateFrameNumbers('gen',
      { start:131, end:138 }),
      frameRate:5,
      repeat:-1
  });

  this.anims.create({
      key:'gen-right',
      frames:this.anims.generateFrameNumbers('gen',
      { start:144, end:151 }),
      frameRate:5,
      repeat:-1
  });


    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "world2" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let gymtiles = map.addTilesetImage("8_Gym_32x32", "GymIMG");
    let room2tiles = map.addTilesetImage("Room_Builder_32x32", "Room2IMG");
    let floortiles = map.addTilesetImage("TileAndStone", "FloorIMG");

    //Step 5  create an array of tiles
    let tilesArray = [gymtiles, room2tiles, floortiles];

    // Step 6  Load in layers by layers
    
    this.floorLayer = map.createLayer("floorLayer", tilesArray, 0, 0);
    this.wallLayer1 = map.createLayer("wallLayer1", tilesArray, 0, 0);
    this.sitsLayer = map.createLayer("sitsLayer", tilesArray, 0, 0);
    this.shadow2 = map.createLayer("shadow2", tilesArray, 0, 0);
    this.propsLayer = map.createLayer("propsLayer", tilesArray, 0, 0);
    this.wallLayer2 = map.createLayer("wallLayer2", tilesArray, 0, 0);

    this.cursors = this.input.keyboard.createCursorKeys();


    // player //
    let  player = map.findObject("ObjectLayer1",(obj) => obj.name === "player");
    this.player = this.physics.add.sprite(player.x, player.y, "gen");
  
    this.player.body.setSize(this.player.width * 0.4, this.player.height * 0.6)

    // make the camera follow the player
     this.cameras.main.startFollow(this.player);

     // Define your items with objectLayer
     let  paper = map.findObject("ObjectLayer1",(obj) => obj.name === "paper");
    this.paper = this.physics.add.image(paper.x, paper.y, "paper");

     // Set up overlap detection between player and paper1
    this.physics.add.overlap(this.player, this.paper, this.collectPaper, null, this);

     let  paper2 = map.findObject("ObjectLayer1",(obj) => obj.name === "paper2");
    this.paper2 = this.physics.add.image(paper2.x, paper2.y, "paper2");

    // Set up overlap detection between player and paper2
    this.physics.add.overlap(this.player, this.paper2, this.collectPaper2, null, this);

     let  paper3 = map.findObject("ObjectLayer1",(obj) => obj.name === "paper3");
     this.paper3 = this.physics.add.image(paper3.x, paper3.y, "paper3");

      // Set up overlap detection between player and paper3
      this.physics.add.overlap(this.player, this.paper3, this.handlePaper3Overlap, null, this);

      this.papersCollected = {
        paper1: false,
        paper2: false
    };


  } // end of create //

  // Callback function for paper1 collection
  collectPaper(player, paper) {
    // Remove paper from the scene
    paper.destroy();
    this.papersCollected.paper1 = true; // Update state variable
}

// Callback function for paper2 collection
collectPaper2(player, paper2) {
    // Remove paper from the scene
    paper2.destroy();
    this.papersCollected.paper2 = true; // Update state variable
}

// Define the handlePaper3Overlap callback function
handlePaper3Overlap(player, paper3) {
  // Shake the main camera for 200 milliseconds with an intensity of 0.02
  this.cameras.main.shake(200, 0.02);
  
  // Determine the direction of the bounce-back based on player's position relative to paper3
  const bounceVelocityX = player.x > paper3.x ? 200 : -200;
  const bounceVelocityY = player.y > paper3.y ? 200 : -200;
  
  // Apply the bounce-back velocity to the player
  player.setVelocityX(bounceVelocityX);
  player.setVelocityY(bounceVelocityY);
}

  update() {
     if (this.cursors.left.isDown)
     {
         this.player.setVelocityX(-160);
       this.player.anims.play('gen-left', true);
     }
     else if (this.cursors.right.isDown)
     {
         this.player.setVelocityX(160);
     this.player.anims.play('gen-right', true);
  } else if (this.cursors.up.isDown)
     {
      this.player.setVelocityY(-160);
         this.player.anims.play('gen-up', true);
  } else if (this.cursors.down.isDown)
     {
         this.player.setVelocityY(160);
       this.player.anims.play('gen-down', true);
     } else {
         this.player.setVelocity(0);
         this.player.anims.stop();
     }

     // Check if both papers are collected
    if (this.papersCollected.paper1 && this.papersCollected.paper2) {
      // Check for teleportation to level 3 only if both papers are collected
      if (
          this.player.x > 1568 &&
          this.player.x < 1600 &&
          this.player.y < 161 &&
          this.player.y > 59
      ) {
          console.log("nextstage");
          this.level3(); // Call the level3 function within the scene context
      }
    }


  } // end of update //

      // Function to teleport to level 2
level3() {
  console.log("Teleporting to level 3");
  this.scene.start("level3");
}

}

