class introScene extends Phaser.Scene {
  constructor() {
    super({ key: "introScene" });
  }

//load introScene image//
preload() {
  console.log("introScene");

  this.load.image("introSceneIMG", "assets/introScene.jpg");
  console.log("Image loaded: introSceneIMG");

  this.load.audio("music", "assets/ROYALTY FREE Sports Competition Music  Epic Background Music Royalty Free by MUSIC4VIDEO.mp3");
}

 

  create() {
    console.log("introScene");
    
    // Display intro image
    this.introImage = this.add.image(0, 0, "introSceneIMG");
    this.introImage.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);

    // Load and play music
    this.music = this.sound.add("music");
    this.music.play();

    // Start the next scene when SPACE key is pressed
    var spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        this.scene.start("instructionScene");
      },
      this
    );
  }
}
