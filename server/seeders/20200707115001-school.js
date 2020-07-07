"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("School", [
      {
        name: "Phu Chan",
        address:
          "https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+THCS+Ph%C3%B9+Ch%E1%BA%A9n/@21.0849699,105.9458254,13.06z/data=!4m5!3m4!1s0x0:0x836adadcf1de231b!8m2!3d21.0957916!4d105.971235",
        neighborhood: "Phu Chan"
      },
      {
        name: "Chau Khe",
        address:
          "https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+ti%E1%BB%83u+h%E1%BB%8Dc+ch%C3%A2u+kh%C3%AA+I/@21.1261906,105.9214891,12.86z/data=!4m5!3m4!1s0x0:0xb50643aec705fe3!8m2!3d21.1252775!4d105.9227514",
        neighborhood: "Chau Che"
      },
      {
        name: "Ve An",
        address:
          "https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+Ti%E1%BB%83u+h%E1%BB%8Dc+V%E1%BB%87+An/@21.1792679,106.0479057,14.07z/data=!4m5!3m4!1s0x31350eaf6feeb135:0x6476c092d0b297de!8m2!3d21.1865075!4d106.060617",
        neighborhood: "Bac Ninh"
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("School", null, {});
  }
};
