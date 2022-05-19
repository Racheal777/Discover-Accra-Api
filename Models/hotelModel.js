

//hotel model
module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define(
    "hotel",
    {
      hotelName: {
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
      

      amenities: 
        {
          type: DataTypes.ARRAY(DataTypes.STRING),
        },
      
    },
    { timestamps: true }
  );

  return Hotel;
};