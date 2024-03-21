class goalScene extends Phaser.Scene {
  constructor() {
    super({ key: "goalScene" });
  }

//load introScene image//
preload() {
  console.log("goalScene");

  this.load.image("endSceneIMG", "assets/endScene.jpg");
  console.log("Image loaded: endSceneIMG");

  
}

 

  create() {
    console.log("goalScene");
    
    // Display intro image
    this.introImage = this.add.image(0, 0, "endSceneIMG");
    this.introImage.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);



    var rDown = this.input.keyboard.addKey("R");


    rDown.on(
      "down",
      function () {
        console.log("R");
        this.scene.start("introScene");
      },
      this
    );
  }
}
