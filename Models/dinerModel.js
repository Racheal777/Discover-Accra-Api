

//hotel model
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
    "restaurant",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      website: {
        type: DataTypes.STRING,
      },

      about: {
        type: DataTypes.TEXT,
      },

      images: [
        {
          type: DataTypes.STRING,
        },
      ],
      openingHours : [
        {
            type: DataTypes.STRING,
          },
      ],

      menu: [
        {
          type: DataTypes.STRING,
        },
      ],
    },
    { timestamps: true }
  );

  return Restaurant;
};