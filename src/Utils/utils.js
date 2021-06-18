module.exports = {
    makeMember(member){
        return {
            username:member.user.username,
            warns:[],
            cases:[],
            xpData:{
                level:1,
                xp:0,
                next:{
                    level:2,
                    xp:30,
                },
                cooldown:Date.now()
            }
        }
    }
}
