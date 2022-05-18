
//user model
module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define( "review", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        

        message: {
            type: DataTypes.STRING,
            allowNull: false
        },

        ratings: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {timestamps: true}, )

    return Review
}