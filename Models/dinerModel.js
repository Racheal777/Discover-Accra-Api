

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

      images: 
        {
          type: DataTypes.ARRAY(DataTypes.STRING),
        },
      
      openingHours : 
        {
            type: DataTypes.ARRAY(DataTypes.DATEONLY),
          },
      

      menu: 
        {
          type: DataTypes.ARRAY(DataTypes.STRING),
        },
      
    },
    { timestamps: true }
  );

  return Restaurant;
};