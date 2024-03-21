console.log("GGGGGG");

let config = {
  type: Phaser.AUTO,
  width: 960,
  height: 560,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
  },
  backgroundColor: "#000000",
  scene: [introScene, instructionScene, level1, level2, level3, goalScene ]
  
};

let game = new Phaser.Game(config);
