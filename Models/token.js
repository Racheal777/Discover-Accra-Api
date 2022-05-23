
//user model
module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define( "token", {
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            
        },

        

    }, {timestamps: true}, )

    return Token
}