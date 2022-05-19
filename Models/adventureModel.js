

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
          type: DataTypes.ARRAY(DataTypes.STRING),
        },
      
      openingHours : 
        {
            type: DataTypes.ARRAY(DataTypes.DATEONLY),
          },
      

      activities: 
        {
          type: DataTypes.ARRAY(DataTypes.STRING),
        },
      
    },
    { timestamps: true }
  );

  return Adventure;
};