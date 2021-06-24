module.exports = async (client, interaction) => {
    if(interaction.isButton()){
      console.log(interaction)

      switch ( interaction.id ){
        default:

          //Ne fait rien
          await interaction.deferUpdate()
      }
    }

}
