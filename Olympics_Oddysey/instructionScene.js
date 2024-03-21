class instructionScene extends Phaser.Scene {
  constructor() {
    super({ key: "instructionScene" });
  }

//load instructionScene image//
preload() {

  this.load.image("instructionSceneIMG", "assets/instructionScene.jpg");
  console.log("Image loaded: instructionSceneIMG");
}

  create() {
    console.log("instructionScene");
  
    this.instructionImage = this.add.image(0, 0, "instructionSceneIMG");
    // Adjust position and scale if necessary
    this.instructionImage.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);

    // Adjust camera position if necessary
    this.cameras.main.setPosition(0, 0);

    var spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        this.scene.start("level1");
      },
      this
    );
  }
}
