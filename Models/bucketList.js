
//Bucket List model
module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define( "list", {
        place: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },

        
    }, {timestamps: true}, )

    return List
}