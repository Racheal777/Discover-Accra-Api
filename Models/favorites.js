


//user model
module.exports = (sequelize, DataTypes) => {
    const Favorites = sequelize.define( "favorite", {
        place: {
            type: DataTypes.STRING,
            allowNull: false
        },
        

    }, {timestamps: true}, )

    return Favorites
}