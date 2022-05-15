

//hotel model
module.exports = (sequelize, DataTypes) => {
  const Adventure = sequelize.define(
    "adventure",
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
          type: DataTypes.STRING,
        },
      
      openingHours : 
        {
            type: DataTypes.STRING,
          },
      

      activities: 
        {
          type: DataTypes.STRING,
        },
      
    },
    { timestamps: true }
  );

  return Adventure;
};